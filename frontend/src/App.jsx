import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home.jsx";
import MoviesPage, { loader as moviesLoader } from "./pages/Movies.jsx";
import MovieDetailPage, {
  loader as eventDetailLoader,
} from "./pages/MovieDetail.jsx";
import NewMoviePage, { action as newMovieAction } from "./pages/NewMovie.jsx";
import EditMoviePage from "./pages/EditMovie.jsx";
import RootLayout from "./pages/Root.jsx";
import MoviesLayout from "./pages/MoviesRoot.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";
import ErrorPage from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "movies",
        element: <MoviesLayout />,
        children: [
          { index: true, element: <MoviesPage />, loader: moviesLoader },
          {
            path: ":movieId",
            element: <MovieDetailPage />,
            loader: eventDetailLoader,
          },
          { path: "new", element: <NewMoviePage />, action: newMovieAction },
          { path: ":movieId/edit", element: <EditMoviePage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
