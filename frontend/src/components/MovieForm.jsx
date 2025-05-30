import { useNavigate, Form } from "react-router-dom";

import classes from "./MovieForm.module.css";

function MovieForm({ method, movie }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method="post" className={classes.form} enctype="multipart/form-data">
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
          defaultValue={movie ? movie.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default MovieForm;
