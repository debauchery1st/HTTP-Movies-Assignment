import React, { useState, useEffect } from "react";
import axios from "axios";
const blankForm = {
  id: 0,
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const EditMovie = props => {
  const [movie, setMovie] = useState({ ...blankForm });
  const { id } = props.match.params || undefined;

  useEffect(() => {
    id &&
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err.response));
  }, [id]);

  const handleChange = e =>
    setMovie({ ...movie, [e.currentTarget.name]: e.currentTarget.value });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = movie.stars.includes(",")
      ? { ...movie, stars: movie.stars.split(",") }
      : movie;
    axios
      .put(`http://localhost:5000/api/movies/${id}`, payload)
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
        Metascore:{" "}
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
      <button>update</button>
    </form>
  );
};

export default EditMovie;
