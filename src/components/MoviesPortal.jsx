import { useState, useEffect } from "react";
import { fetchMovies } from "../api/FetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetails from "./MovieDetails";

function MoviesPortal() {
  const [searchInputText, setSearchInputText] = useState("");
  const [enteredSearchText, setEnteredSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random movies on initial load
    const randomTerms = [
      "Marvel",
      "Star Wars",
      "Harry Potter",
      "Lord of the Rings",
      "Avengers",
      "Batman",
      "Spider-Man",
    ];
    const randomTerm =
      randomTerms[Math.floor(Math.random() * randomTerms.length)];
    fetchMovies(
      randomTerm,
      (data) => {
        setMovies(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      () => {}
    );
  }, []);

  const onSearchTextEnter = (e) => {
    e.preventDefault();
    if (!searchInputText.trim()) return;

    setLoading(true);
    setMovies([]);
    setError(null);

    fetchMovies(
      searchInputText,
      (data) => {
        setMovies(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      () => {
        setEnteredSearchText(searchInputText);
        setLoading(false);
      }
    );
  };

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
        <h1 style={{ marginBottom: "1.5rem", fontSize: "2.5rem" }}>
          Find your next favorite movie
        </h1>
        <form onSubmit={onSearchTextEnter}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search for movies..."
              className="form-control"
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
              style={{ paddingLeft: "3rem" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-secondary)",
              }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </form>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div
            className="spinner-border text-primary"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
              border: "0.25em solid currentColor",
              borderRightColor: "transparent",
              borderRadius: "50%",
              animation: "spinner-border .75s linear infinite",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <style>{`
            @keyframes spinner-border {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {!loading && error && (
        <ErrorAlert
          error={error}
          searchTerm={enteredSearchText || "Random Selection"}
        />
      )}

      {!loading && movies.length > 0 && (
        <>
          <p className="text-muted" style={{ marginBottom: "1.5rem" }}>
            {enteredSearchText ? (
              <>
                Found {movies.length} results for{" "}
                <span style={{ color: "var(--text-color)", fontWeight: "600" }}>
                  "{enteredSearchText}"
                </span>
              </>
            ) : (
              <>Recommended Movies</>
            )}
          </p>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieDetails key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}

      {!loading && movies.length === 0 && !error && (
        <div
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginTop: "4rem",
          }}
        >
          <p>No movies found. Try searching for something else.</p>
        </div>
      )}
    </div>
  );
}

export default MoviesPortal;
