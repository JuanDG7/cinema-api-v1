import { Link } from "react-router-dom";

import classes from "./MoviesList.module.css";

import MovieList from "./MovieItem";
function MoviesList({ movies }) {
  return (
    <div className={classes.movies}>
      <h1>All Movies</h1>
      <ul className={classes.list}>
        {movies.map((movie) => (
          <li key={movie._id} className={classes.item}>
            <Link to={movie._id}>
              <img
                src={"http://localhost:8000/" + movie.imageUrl}
                alt={movie.title}
              />
              <div className={classes.content}>
                <h2>{movie.title}</h2>
                <time>{new Date(movie.createdAt).toLocaleDateString()}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
