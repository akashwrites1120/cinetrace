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
    <div className="min-h-[80vh] pb-16">
      <div className="text-center py-16 max-w-2xl mx-auto px-4">
        <h1 className="mb-6 text-4xl font-bold">
          Find Your Next Favorite Movie
        </h1>
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSearchTextEnter(e);
                }
              }}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-16 flex justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
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
          <p className="text-gray-400 mb-6 px-4">
            {enteredSearchText ? (
              <>
                Found {movies.length} results for{" "}
                <span className="text-white font-semibold">
                  "{enteredSearchText}"
                </span>
              </>
            ) : (
              <>Recommended Movies</>
            )}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
            {movies.map((movie) => (
              <MovieDetails key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}

      {!loading && movies.length === 0 && !error && (
        <div className="text-center text-gray-400 mt-16">
          <p>No movies found. Try searching for something else.</p>
        </div>
      )}
    </div>
  );
}

export default MoviesPortal;