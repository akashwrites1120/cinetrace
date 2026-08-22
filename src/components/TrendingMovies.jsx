import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/FetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetails from "./MovieDetails";
import SkeletonCard from "./SkeletonCard";

function TrendingMovies({ isInWatchlist, onToggleWatchlist }) {
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
    <div className="pb-20">
      <section className="mx-auto max-w-3xl px-1 pt-14 pb-2 text-center sm:pt-20">
        <p className="eyebrow animate-fade-up">This week</p>

        <h1
          className="animate-fade-up mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          The <span className="font-light italic text-accent">essentials</span>,
          ranked.
        </h1>

        <p
          className="animate-fade-up mx-auto mt-5 max-w-xl text-base text-text-secondary sm:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          Twelve defining films — modern epics sitting beside all-time greats.
        </p>
      </section>

      {loading && (
          <div className="movie-grid pt-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && <ErrorAlert error={error} searchTerm="trending picks" />}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="border-t border-border pt-8">
            <p className="eyebrow animate-fade-up">Top {movies.length}</p>
          </div>
          <div className="movie-grid pt-6">
            {movies.map((movie, i) => (
              <div key={movie.imdbID} className="relative">
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-6 -left-1 z-10 leading-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] select-none font-display text-6xl italic sm:-top-8 sm:-left-2 sm:text-7xl ${
                    i < 3 ? "text-accent" : "text-text/85"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <MovieDetails
                  movie={movie}
                  index={i}
                  isInWatchlist={isInWatchlist}
                  onToggleWatchlist={onToggleWatchlist}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TrendingMovies;
