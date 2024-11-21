import { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjJmNGI0OTAwNzYwYmQyYjlmNWNiYmNhNDNkNTg5NSIsIm5iZiI6MTczMjEyODI5MC42MjY2ODkyLCJzdWIiOiI2NzNjYTE0MzNiNDgwNDgxY2RkZGQ3NDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EZTSZ71QzKhdAXuLk7HNB5PGwAevIYo4ufbV_d0SoQU";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${API_TOKEN }` },
        });

        console.log(response);

        setCast(response.data.cast);
      } catch (err) {
        setError("Failed to fetch cast information.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={s.error}>{error}</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={s.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={s.item}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
            className={s.image}
          />
          <p className={s.name}>{actor.name}</p>
          <p className={s.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;