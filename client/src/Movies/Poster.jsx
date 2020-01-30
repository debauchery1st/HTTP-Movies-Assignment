import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosterMeta from "./PosterMeta";
import { omdbUrl } from "./omdb";

const Poster = props => {
  const [meta, setMeta] = useState({ Poster: "" });
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const params = useParams();
  const title = props.meta.title
    ? props.meta.title.replace(" ", "+")
    : undefined;
  const billboard =
    (meta.Poster && meta.Poster !== "N/A" && meta.Poster) ||
    "https://placekitten.com/300/445";
  useEffect(() => {
    title &&
      !meta.Poster.length > 0 &&
      axios
        .get(`${omdbUrl}&t=${title}`)
        .then(res => {
          setMeta(res.data);
        })
        .catch(err => console.log(err.response));
  }, [title, meta]);

  // should we update the server with meta?
  useEffect(() => {
    if (!shouldUpdate) return;
    setShouldUpdate(false);
    console.log("updating the server records");
    props.update(meta);
    const { id } = params;
    const {
      Actors: stars,
      Title: title,
      Director: director,
      Metascore: metascore
    } = meta;
    const movie = { id, title, stars, director, metascore }; // reconstruct the movie object from updated info
    const payload = movie.stars.includes(",")
      ? { ...movie, stars: movie.stars.split(",") }
      : movie;
    return () =>
      axios
        .put(`http://localhost:5000/api/movies/${id}`, payload)
        .then(res => props.history.push(`/movies`))
        .catch(err => console.log(err.response));
  }, [shouldUpdate, meta, params, props]);
  const sameThing = () => {
    const { stars, title, director, metascore } = props.meta;
    const { Actors, Title, Director, Metascore } = meta;
    if (!stars.join) return;
    const a = stars.join(",") === Actors;
    const b = title === Title;
    const c = metascore === Metascore;
    const d = director === Director;
    // console.log(`stars: ${a}, title: ${b}, director: ${d} metascore: ${c}`);
    return a && b && c && d;
  };
  return (
    <>
      <img
        className="movie-poster-image"
        src={billboard}
        alt={meta.Title || props.meta.title}
      />
      <div className="movie-poster-meta">
        <PosterMeta {...meta} />
        {meta.Actors && sameThing() ? (
          ""
        ) : (
          <button onClick={() => setShouldUpdate(true)}>import</button>
        )}
      </div>
    </>
  );
};

export default Poster;
