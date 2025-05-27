// import { useLoaderData } from 'react-router-dom';

import classes from "./MoviesList.module.css";

function MoviesList({ movies }) {
  // const movies = useLoaderData();

  return (
    <div className={classes.movies}>
      <h1>All Movies</h1>
      <ul className={classes.list}>
        {movies.map((event) => (
          <li key={event.id} className={classes.item}>
            <a href="...">
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
