import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from "./Movies/EditMovie";
import crudClient from "./utils/crudClient";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const lmdb = crudClient("http://localhost:5000/api/"); // lambda movie data base

  const updateMovie = (movie, cbThen, cbErr) =>
    lmdb.put(
      `movies/${movie.id}`,
      r => cbThen(r.data),
      err => cbErr(err)
    );

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => <Movie {...props} addToSavedList={addToSavedList} />}
      />
      <Route
        path="/update-movie/:id"
        render={props => <EditMovie {...props} updateMovie={updateMovie} />}
      />
    </>
  );
};

export default App;
