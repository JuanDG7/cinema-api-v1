import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message + "STATUS CODE 500";
  }
  if (error.status === 404) {
    title = "Not found! STATUS CODE 404";
    message = "Could not find the page or resource you were looking for.";
  }
  return (
    <div>
      <MainNavigation />
      <h1>Error</h1>
      <p>
        <strong>{title}</strong>
      </p>
      <p>
        <strong>{message}</strong>
      </p>
      <p>If you think this is a bug, please report it to the support team.</p>
      <p>Please try again later.</p>
    </div>
  );
}

export default ErrorPage;
