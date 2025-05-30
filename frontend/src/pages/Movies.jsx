import { useLoaderData } from "react-router-dom";
import MoviesList from "../components/MoviesList.jsx";

function MoviesPage() {
  const movies = useLoaderData();
  return <MoviesList movies={movies} />;
}

export default MoviesPage;

export async function loader() {
  const response = await fetch("http://localhost:8000/api/movies");
  if (!response.ok) {
    // return { error: "Failed to fetch movies" }; esto retorna en esta misma pagina este objeto si hay error
    throw new Response(
      JSON.stringify("Failed to fetch movies", { status: 500 })
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.movies;
  }
}
