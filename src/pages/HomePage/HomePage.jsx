import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

const API_URL = "https://api.themoviedb.org/3/trending/movie/day";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjJmNGI0OTAwNzYwYmQyYjlmNWNiYmNhNDNkNTg5NSIsIm5iZiI6MTczMjEyODI5MC42MjY2ODkyLCJzdWIiOiI2NzNjYTE0MzNiNDgwNDgxY2RkZGQ3NDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EZTSZ71QzKhdAXuLk7HNB5PGwAevIYo4ufbV_d0SoQU";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={s.title}>Trending <span>Movies in 2024 year</span></h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <Loader />}
    </div>
  );
};

export default HomePage;

