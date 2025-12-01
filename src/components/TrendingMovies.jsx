import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/FetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetails from "./MovieDetails";

function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies(
      (data) => {
        setMovies(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div style={{ minHeight: "80vh", paddingBottom: "4rem" }}>
      <div
        style={{
          textAlign: "center",
          padding: "4rem 0",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
          Trending Now
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Top picks for you this week
        </p>
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            padding: "2rem",
          }}
        >
          Loading trending movies...
        </div>
      )}

      {error && <ErrorAlert error={error} searchTerm="Trending" />}

      {!loading && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieDetails key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrendingMovies;
