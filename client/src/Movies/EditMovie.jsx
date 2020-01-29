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
    props.updateMovie(movie, console.log, console.log);
    props.history.push(`/movies/${movie.id}`);
  };

  return (
    <div className="edit-movie">
      <form onSubmit={handleSubmit}>
        <h1>edit movie</h1>
        <input
          placeholder="Movie Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          placeholder="Director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          placeholder="Meta Score"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
          placeholder="Stars,"
          name="stars"
          value={movie.stars}
          onChange={handleChange}
        />
        <button>update</button>
      </form>
    </div>
  );
};

export default EditMovie;
