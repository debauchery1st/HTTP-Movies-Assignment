import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from "./Movies/EditMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const updateSavedList = movie => {
    console.log(movie);
  };
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
        render={props => <EditMovie {...props} />}
      />
    </>
  );
};

export default App;
