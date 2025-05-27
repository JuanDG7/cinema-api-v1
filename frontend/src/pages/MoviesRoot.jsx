import { Outlet } from "react-router-dom";
import MoviesNavigation from "../components/MoviesNavigation";

function MoviesRootLayout() {
  return (
    <>
      <MoviesNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MoviesRootLayout;
