import React, { useState, useEffect } from "react";
import axios from "axios";
import PosterMeta from "./PosterMeta";
import { omdbUrl } from "./omdb";

const Poster = props => {
  const [meta, setMeta] = useState({ Poster: "" });
  const title = props.title ? props.title.replace(" ", "+") : undefined;
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

  const renderMeta = () => {
    return <p>test</p>;
  };
  return (
    <>
      <img className="movie-poster-image" src={billboard} />
      <div className="movie-poster-meta">
        <PosterMeta {...meta} />
      </div>
    </>
  );
};

export default Poster;
