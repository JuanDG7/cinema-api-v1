import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
            >
              Authentication
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
