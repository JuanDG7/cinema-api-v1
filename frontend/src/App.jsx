import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home.jsx";
import MoviesPage from "./pages/Movies.jsx";
import MovieDetailPage from "./pages/MovieDetail.jsx";
import NewMoviePage from "./pages/NewMovie.jsx";
import EditMoviePage from "./pages/EditMovie.jsx";
import RootLayout from "./pages/Root.jsx";
import MoviesLayout from "./pages/MoviesRoot.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "/movies",
        element: <MoviesLayout />,
        children: [
          { index: true, element: <MoviesPage /> },
          { path: "/movies/:movieId", element: <MovieDetailPage /> },
          { path: "/movies/new", element: <NewMoviePage /> },
          { path: "/movies/:movieId/edit", element: <EditMoviePage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
