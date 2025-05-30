import { useLoaderData } from "react-router-dom";
import MovieItem from "../components/MovieItem.jsx";

function MovieDetailPage() {
  const data = useLoaderData();

  return <MovieItem movie={data} />;
}

export default MovieDetailPage;

export async function loader({ params }) {
  const id = params.movieId;
  const response = await fetch("http://localhost:8000/api/movies/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify("Failed to fetch movie details"), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.movie;
  }
}
