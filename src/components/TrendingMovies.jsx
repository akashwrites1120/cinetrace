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
            padding: "4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              border: "4px solid rgba(99, 102, 241, 0.3)",
              borderTop: "4px solid var(--primary-color)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
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
