import { Link, useSubmit } from "react-router-dom";

import classes from "./MovieItem.module.css";

function MovieItem({ movie }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.movie}>
      <img src={"http://localhost:8000/" + movie.imageUrl} alt={movie.title} />

      <h1>{movie.title}</h1>
      <time>{new Date(movie.createdAt).toLocaleDateString()}</time>
      <p>{movie.content}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default MovieItem;
