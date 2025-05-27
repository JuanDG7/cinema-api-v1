import { useParams } from "react-router-dom";

function MovieDetailPage() {
  const params = useParams();

  return (
    <div>
      <h1>Detalles de la Peli</h1>
      <p>El id de la pelie es {params.movieId}</p>
    </div>
  );
}

export default MovieDetailPage;
