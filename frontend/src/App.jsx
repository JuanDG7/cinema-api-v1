import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home.jsx";
import MoviesPage, { loader as moviesLoader } from "./pages/Movies.jsx";
import MovieDetailPage, {
  loader as movieDetailLoader,
  action as deleteEventAction,
} from "./pages/MovieDetail.jsx";
import NewMoviePage from "./pages/NewMovie.jsx";
import EditMoviePage from "./pages/EditMovie.jsx";
import RootLayout from "./pages/Root.jsx";
import MoviesLayout from "./pages/MoviesRoot.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";
import ErrorPage from "./pages/Error.jsx";
import { action as manipulateEventAction } from "./components/MovieForm.jsx";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/Newsletter.jsx";

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
            id: "movie-detail",
            loader: movieDetailLoader,
            children: [
              {
                index: true,
                element: <MovieDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditMoviePage />,
                action: manipulateEventAction,
              },
            ],
          },
        ],
      },
      {
        path: "new",
        element: <NewMoviePage />,
        action: manipulateEventAction,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
