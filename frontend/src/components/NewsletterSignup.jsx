import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";
import { Form, useFetcher } from "react-router-dom";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/Newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        name="email"
        required
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
