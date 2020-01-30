import React from "react";

const PosterMeta = ({
  Title: title,
  // Year,
  // Rated,
  // Released,
  // Runtime,
  // Genre,
  Director: director,
  // Writer,
  Actors: stars,
  // Plot,
  // Language,
  // Country,
  // Awards,
  // Poster,
  // Ratings,
  Metascore: metascore
  // imdbRating,
  // imdbVotes,
  // imdbID,
  // Type,
  // DVD,
  // BoxOffice,
  // Production,
  // Website,
  // Response
}) => {
  return (
    <span className="movie-meta">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      {stars &&
        stars.split(",").map(star => (
          <div key={star.id} className="movie-star">
            {star}
          </div>
        ))}
    </span>
  );
};

export default PosterMeta;
