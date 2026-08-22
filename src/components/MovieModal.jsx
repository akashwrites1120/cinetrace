import { useEffect } from "react";

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f5c518" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ratingPercent = (rating) => {
  if (!rating) return null;
  const value = parseFloat(rating.Value);
  if (Number.isNaN(value)) return null;
  if (rating.Source.includes("Internet Movie")) return value * 10;
  if (rating.Source.includes("Rotten") || rating.Source.includes("Metacritic"))
    return value;
  return null;
};

const MetaRow = ({ label, value }) =>
  value && value !== "N/A" ? (
    <p className="text-sm leading-relaxed">
      <span className="mr-2 text-text-secondary">{label}</span>
      {value}
    </p>
  ) : null;

const MovieModal = ({ movie, onClose, saved, onToggleSave }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const poster =
    movie.Poster !== "N/A" ? movie.Poster : null;

  const metaLine = [
    movie.Year,
    movie.Rated !== "N/A" && movie.Rated,
    movie.Runtime !== "N/A" && movie.Runtime,
  ]
    .filter(Boolean)
    .join(" · ");

  const genres = (movie.Genre || "")
    .split(", ")
    .filter((g) => g && g !== "N/A")
    .slice(0, 4);

  const ratings = (movie.Ratings || []).slice(0, 3);
  const imdbScore = movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : null;
  const imdbVotes = movie.imdbVotes && movie.imdbVotes !== "N/A" ? movie.imdbVotes : null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${movie.Title} details`}
    >
      <div
        className="fixed inset-0 animate-fade-in bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl animate-scale-in overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border bg-bg/70 text-text-secondary backdrop-blur transition-all duration-200 hover:rotate-90 hover:border-text-secondary hover:text-text"
        >
          <CloseIcon />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
            {poster && (
              <div className="mx-auto w-36 shrink-0 sm:mx-0 sm:w-44">
                <img
                  src={poster}
                  alt={movie.Title}
                  className="aspect-[2/3] w-full rounded-xl border border-border object-cover shadow-lg"
                />
              </div>
            )}

            <div className="min-w-0 flex-1 pr-8 sm:pr-2">
              <h2 className="font-display text-2xl font-medium leading-tight text-balance sm:text-3xl">
                {movie.Title}
              </h2>

              <p className="mt-2 text-sm tracking-wide text-text-secondary">
                {metaLine}
              </p>

              {imdbScore && (
                <div className="mt-4 flex items-baseline gap-1.5">
                  <StarIcon size={20} />
                  <span className="font-display text-2xl font-semibold text-accent">
                    {imdbScore}
                  </span>
                  <span className="text-sm text-text-secondary">/ 10</span>
                  {imdbVotes && (
                    <span className="ml-2 text-xs text-text-secondary">
                      {imdbVotes} votes
                    </span>
                  )}
                </div>
              )}

              {genres.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {movie.Plot && movie.Plot !== "N/A" && (
                <p className="mt-5 text-sm leading-relaxed text-text/90">
                  {movie.Plot}
                </p>
              )}

              <div className="mt-5 space-y-1.5 text-text/90">
                <MetaRow label="Director" value={movie.Director} />
                <MetaRow label="Writer" value={movie.Writer} />
                <MetaRow label="Starring" value={movie.Actors} />
              </div>

              {ratings.length > 0 && (
                <div className="mt-6 space-y-3">
                  {ratings.map((rating) => {
                    const pct = ratingPercent(rating);
                    return (
                      <div key={rating.Source}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-text-secondary">{rating.Source.replace("Internet Movie Database", "IMDb")}</span>
                          <span className="font-semibold text-text">{rating.Value}</span>
                        </div>
                        {pct !== null && (
                          <div className="h-1 overflow-hidden rounded-full bg-elevated">
                            <div
                              className="h-full rounded-full bg-accent animate-grow-x"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-accent-strong"
                >
                  Open in IMDb
                </a>
                <button
                  onClick={() => onToggleSave(movie)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    saved
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-border text-text hover:border-text-secondary"
                  }`}
                >
                  <span className={saved ? "animate-heart-pop inline-flex" : "inline-flex"}>
                    <HeartIcon filled={saved} />
                  </span>
                  {saved ? "In watchlist" : "Watchlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
