import { redirect } from "react-router-dom";
import MoviesForm from "../components/MovieForm";

function NewMoviePage() {
  return <MoviesForm />;
}

export default NewMoviePage;

export async function action({ request }) {
  const data = await request.formData();

  const response = await fetch("http://localhost:8000/api/movies/createMovie", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error("Error al crear la película");
  }

  return redirect("/movies"); // Redirect to the movies page after successful creation
}
