import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
      <p>
        Go to <Link to="/products">the list of products </Link>
      </p>
    </div>
  );
}

export default Home;
