import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      confirmDelete: false,
      alertDeleteMessage: "WARNING... CLICK AGAIN TO DELETE FROM DATABASE."
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  };

  deleteMovie = () => {
    if (!this.state.confirmDelete) {
      this.setState({
        ...this.state,
        confirmDelete: true,
        alertMessage: "warning, press again to delete"
      });
      return;
    }
    this.state.movie &&
      axios
        .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
        .then(() => this.props.history.push("/"))
        .catch(err => console.log(err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="edit-button" onClick={this.editMovie}>
          Edit
        </div>
        <div className="delete-button" onClick={this.deleteMovie}>
          {this.state.alertMessage && <p>{this.state.alertDeleteMessage}</p>}
          Delete
        </div>
      </div>
    );
  }
}
