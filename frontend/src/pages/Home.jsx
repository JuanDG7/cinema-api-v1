import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <h1>HOMEPAGE</h1>
      <p>
        ir a <Link to="/products">PRODUCTOS</Link>.
      </p>
    </div>
  );
}
export default HomePage;
