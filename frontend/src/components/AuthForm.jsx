import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>

        {data?.message && <p className={classes.error}>{data.message}</p>}

        {data?.data && Array.isArray(data.data) && (
          <ul className={classes.errors}>
            {data.data.map((err, index) => (
              <li key={index}>{err.msg}</li>
            ))}
          </ul>
        )}

        {!isLogin && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" />
          </p>
        )}

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </p>

        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </p>

        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting.." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
