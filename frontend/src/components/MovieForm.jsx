import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "./MovieForm.module.css";

function MovieForm({ method, movie }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  console.log("🛠️ Action data:", data);
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form
      method={method}
      className={classes.form}
      encType="multipart/form-data"
    >
      {data && data.data && (
        <ul>
          {data.data.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error.msg}
            </li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={movie ? movie.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" name="image" />
      </p>

      <p>
        <label htmlFor="Content">Description</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          required
          defaultValue={movie ? movie.content : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting.." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default MovieForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  let url = "http://localhost:8000/api/movies/createMovie";

  if (method === "PUT") {
    const movieId = params.movieId;
    url = "http://localhost:8000/api/movies/" + movieId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: data,
  });

  if (response.status === 422) {
    return await response.json();
  }

  if (!response.ok) {
    throw new Error("Error al crear la película");
  }

  return redirect("/movies"); // Redirect to the movies page after successful creation
}
