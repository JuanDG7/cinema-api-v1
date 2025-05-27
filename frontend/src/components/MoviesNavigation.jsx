import classes from "./MoviesNavigation.module.css";

import { NavLink } from "react-router-dom";

function MoviesNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              All Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MoviesNavigation;
