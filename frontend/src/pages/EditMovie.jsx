import { useRouteLoaderData } from "react-router-dom";
import MovieForm from "../components/MovieForm";

function EditMoviePage() {
  const data = useRouteLoaderData("movie-detail");
  console.log("EditMoviePage: movie data", data);

  return (
    <div>
      <MovieForm method="PUT" movie={data} />
    </div>
  );
}

export default EditMoviePage;
