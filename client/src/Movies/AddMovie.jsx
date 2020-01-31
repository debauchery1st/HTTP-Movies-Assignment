import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const handleChange = e =>
    setMovie({ ...movie, [e.currentTarget.name]: e.currentTarget.value });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = movie.stars.includes(",")
      ? { ...movie, stars: movie.stars.split(",") }
      : movie;
    axios
      .post(`http://localhost:5000/api/movies/`, payload)
      .then(res => props.history.push("/"))
      .catch(err => console.log(err.response));
  };

  return (
    <form onSubmit={handleSubmit} className="movie-card save-wrapper">
      <input
        placeholder="Movie Title"
        name="title"
        value={movie.title}
        onChange={handleChange}
      />
      <div className="movie-director">
        <input
          placeholder="Director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
      </div>
      <div className="movie-metascore">
        <input
          placeholder="Meta Score"
          name="metascore"
          type="number"
          value={movie.metascore}
          onChange={handleChange}
        />
      </div>
      <input
        placeholder="Stars,"
        name="stars"
        value={movie.stars}
        onChange={handleChange}
      />
      <button>add</button>
    </form>
  );
};

export default AddMovie;
