import { Suspense, useEffect, useState } from "react";
import { useParams, Link, Outlet, useLocation, } from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjJmNGI0OTAwNzYwYmQyYjlmNWNiYmNhNDNkNTg5NSIsIm5iZiI6MTczMjEyODI5MC42MjY2ODkyLCJzdWIiOiI2NzNjYTE0MzNiNDgwNDgxY2RkZGQ3NDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EZTSZ71QzKhdAXuLk7HNB5PGwAevIYo4ufbV_d0SoQU";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        setMovie(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.status_message || "Failed to fetch movie details.");
        } else {
          setError("An unexpected error occurred.");
        }
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <p className={s.error}>{error}</p>;
  if (!movie) return <Loader />;

  return (
    <div className={s.container}>
      <Link to={location.state?.from || "/"} className={s.backLink}>
        Go back
      </Link>
      <h1>{movie.title || "No title available"}</h1>
      <p className={s.overview}>{movie.overview || "No overview available."}</p>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
        alt={movie.title || "Poster not available"}
        className={s.poster}
      />
      <div className={s.additional}>
        <Link to="cast" state={{ from: location.state?.from || "/" }}>
          <button className={s.button}>Cast</button>
        </Link>
        <Link to="reviews" state={{ from: location.state?.from || "/" }}>
          <button className={s.button}>Reviews</button>
        </Link>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;