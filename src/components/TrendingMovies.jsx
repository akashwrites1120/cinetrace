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
    <div className="min-h-[80vh] pb-16">
      <div className="text-center py-16 max-w-2xl mx-auto px-4">
        <h1 className="mb-4 text-4xl font-bold">Trending Now</h1>
        <p className="text-gray-400">Top picks for you this week</p>
      </div>

      {loading && (
        <div className="text-center py-16 flex justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && <ErrorAlert error={error} searchTerm="Trending" />}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 px-4">
          {movies.map((movie) => (
            <MovieDetails key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrendingMovies;