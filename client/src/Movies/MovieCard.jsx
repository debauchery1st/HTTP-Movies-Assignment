import React, { useState } from "react";
import Poster from "./Poster";

const MovieCard = props => {
  const [meta, setmeta] = useState({ ...props.movie });
  const update = newMeta => {
    console.log("importing...", newMeta);
    setmeta({ ...meta, ...newMeta });
  };
  return (
    <div className="movie-card save-wrapper movie-poster">
      <Poster meta={meta} update={update} />
    </div>
  );
};

export default MovieCard;
