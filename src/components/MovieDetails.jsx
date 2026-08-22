import { useState } from "react";
import MovieModal from "./MovieModal";

const HeartIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FilmIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5" />
  </svg>
);

const MovieDetails = ({ movie, index = 0, isInWatchlist, onToggleWatchlist }) => {
  const [open, setOpen] = useState(false);

  const saved = isInWatchlist ? isInWatchlist(movie.imdbID) : false;
  const rating =
    movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : null;
  const poster = movie.Poster !== "N/A" ? movie.Poster : null;

  return (
    <>
      <article
        className="group animate-fade-up"
        style={{ animationDelay: `${Math.min(index * 45, 450)}ms` }}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="cursor-pointer select-none"
          aria-label={`View details for ${movie.Title}`}
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-text-secondary/40 group-hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.85)]">
            {poster ? (
              <img
                src={poster}
                alt={movie.Title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-text-secondary/40">
                <FilmIcon />
              </div>
            )}

            {rating && (
              <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 text-xs font-semibold text-accent backdrop-blur-sm">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {rating}
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist(movie);
              }}
              aria-label={
                saved
                  ? `Remove ${movie.Title} from watchlist`
                  : `Add ${movie.Title} to watchlist`
              }
              className={`absolute right-2.5 top-2.5 z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-full border backdrop-blur-md transition-all duration-200 max-sm:opacity-100 ${
                saved
                  ? "animate-heart-pop border-accent/60 bg-black/70 text-accent opacity-100"
                  : "border-white/15 bg-black/50 text-white/80 hover:scale-110 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
              }`}
            >
              <HeartIcon filled={saved} />
            </button>

            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/85 to-transparent p-4 pt-10 text-xs font-medium tracking-wide text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
              View details →
            </span>
          </div>

          <h3 className="mt-3 line-clamp-1 px-0.5 text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-accent">
            {movie.Title}
          </h3>
          <p className="mt-0.5 px-0.5 text-xs text-text-secondary">
            {movie.Year}
          </p>
        </div>
      </article>

      {open && (
        <MovieModal
          movie={movie}
          onClose={() => setOpen(false)}
          saved={saved}
          onToggleSave={onToggleWatchlist}
        />
      )}
    </>
  );
};

export default MovieDetails;
