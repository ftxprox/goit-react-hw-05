import { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjJmNGI0OTAwNzYwYmQyYjlmNWNiYmNhNDNkNTg5NSIsIm5iZiI6MTczMjEyODI5MC42MjY2ODkyLCJzdWIiOiI2NzNjYTE0MzNiNDgwNDgxY2RkZGQ3NDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EZTSZ71QzKhdAXuLk7HNB5PGwAevIYo4ufbV_d0SoQU";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID is required.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}/reviews`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });

        if (response.status !== 200) {
          throw new Error("Invalid request. Please check the movie ID.");
        }

        if (response.data.results.length === 0) {
          throw new Error("No reviews found for this movie.");
        }

        setReviews(response.data.results);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data.status_message}`);
        } else {
          setError(err.message || "Failed to fetch reviews.");
        }
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={s.error}>{error}</p>;
  if (reviews.length === 0) return <p className={s.message}>Sorry, no reviews available.</p>;

  return (
    <ul className={s.list}>
      {reviews.map((review) => (
        <li key={review.id} className={s.item}>
          <h3 className={s.author}>Author: {review.author}</h3>
          <p className={s.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;