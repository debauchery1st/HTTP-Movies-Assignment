import React, { useState } from "react";
import Poster from "./Poster";

const MovieCard = props => {
  const [meta, setmeta] = useState({ ...props.movie });
  const { title, director, metascore, stars } = meta;

  const updateMeta = newMeta => {
    setmeta({ ...meta, ...newMeta });
  };
  const MoviePoster = () => <Poster title={title} updater={updateMeta} />;
  return (
    //className="movie-card save-wrapper"
    <div className="movie-card save-wrapper movie-poster">
      <MoviePoster />
    </div>
  );
};

export default MovieCard;
