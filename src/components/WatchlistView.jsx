import MovieDetails from "./MovieDetails";

const BookmarkIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

function WatchlistView({ items, isInWatchlist, onToggleWatchlist, onBrowse }) {
  if (items.length === 0) {
    return (
      <div className="animate-fade-up flex min-h-[60vh] flex-col items-center justify-center pb-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-surface text-text-secondary/60">
          <BookmarkIcon />
        </span>
        <h1 className="mt-6 font-display text-3xl font-medium tracking-tight">
          Nothing saved{" "}
          <span className="font-light italic text-accent">yet</span>.
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
          Tap the heart on any film and it will be waiting for you here — even
          after you close the tab.
        </p>
        <button
          onClick={onBrowse}
          className="mt-8 cursor-pointer rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-accent-strong"
        >
          Browse movies
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-3xl px-1 pt-14 pb-2 text-center sm:pt-20">
        <p className="eyebrow animate-fade-up">Saved for later</p>

        <h1
          className="animate-fade-up mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Your <span className="font-light italic text-accent">watchlist</span>.
        </h1>

        <p
          className="animate-fade-up mt-5 text-sm text-text-secondary"
          style={{ animationDelay: "180ms" }}
        >
          <span className="font-semibold text-text tabular-nums">{items.length}</span>{" "}
          {items.length === 1 ? "film" : "films"} waiting to be watched.
        </p>
      </section>

      <div className="border-t border-border pt-2">
        <div className="movie-grid pt-8">
          {items.map((movie, i) => (
            <MovieDetails
              key={movie.imdbID}
              movie={movie}
              index={i}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchlistView;
