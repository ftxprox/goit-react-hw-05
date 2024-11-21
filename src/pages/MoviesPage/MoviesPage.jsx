import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjJmNGI0OTAwNzYwYmQyYjlmNWNiYmNhNDNkNTg5NSIsIm5iZiI6MTczMjEyODI5MC42MjY2ODkyLCJzdWIiOiI2NzNjYTE0MzNiNDgwNDgxY2RkZGQ3NDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EZTSZ71QzKhdAXuLk7HNB5PGwAevIYo4ufbV_d0SoQU";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
          params: {
            query,
          },
        });

        // Перевірка статусу відповіді
        if (response.status !== 200) {
          throw new Error("Invalid request. Please check your query.");
        }

        // Якщо результатів немає
        if (response.data.results.length === 0) {
          throw new Error("No movies found matching your query.");
        }

        setMovies(response.data.results);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          // Якщо помилка від сервера
          setError(`Error: ${err.response.status} - ${err.response.data.status_message}`);
        } else {
          // Інші помилки (наприклад, мережеві)
          setError(err.message || "Failed to fetch movies. Please try again later.");
        }
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const inputValue = form.elements.query.value.trim();

    if (inputValue) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={s.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          className={s.input}
          placeholder="Enter movie title..."
        />
        <button type="submit" className={s.button} disabled={loading}>
          Search Movies
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className={s.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} query={query} />}
    </div>
  );
};

export default MoviesPage;