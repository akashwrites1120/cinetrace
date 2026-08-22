import { useEffect, useRef, useState } from "react";
import { fetchMovies } from "../api/FetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetails from "./MovieDetails";
import SkeletonCard from "./SkeletonCard";

const POPULAR_TAGS = [
  "Action",
  "Comedy",
  "Drama",
  "Romance",
  "Thriller",
  "Horror",
  "Sci-Fi",
  "Adventure",
];

const SEED_GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Thriller",
  "Adventure",
  "Animation",
  "Romance",
  "Horror",
];

const SURPRISE_TERMS = [
  "time travel",
  "space",
  "heist",
  "detective",
  "dystopia",
  "revenge",
  "cyberpunk",
  "spy",
  "samurai",
  "wizard",
  "pirate",
  "road trip",
  "artificial intelligence",
  "vampire",
  "mafia",
  "survival",
  "jazz",
  "chess",
];

const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

const dedupe = (list) =>
  Array.from(new Map(list.filter(Boolean).map((m) => [m.imdbID, m])).values());

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DiceIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ClapperIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1-.3 2.1.3 2.4 1.4Z" />
    <path d="m6.2 5.3 3.1 3.9M12.4 3.4l3.1 4" />
    <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </svg>
);

function MoviesPortal({ isInWatchlist, onToggleWatchlist }) {
  const [searchInputText, setSearchInputText] = useState("");
  const [enteredSearchText, setEnteredSearchText] = useState("");
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const usedGenresRef = useRef(new Set());

  useEffect(() => {
    let cancelled = false;
    const genres = shuffle(SEED_GENRES).slice(0, 5);
    genres.forEach((genre) => usedGenresRef.current.add(genre));
    let collected = [];
    let completed = 0;

    const finish = () => {
      if (cancelled) return;
      const unique = shuffle(dedupe(collected)).slice(0, 12);
      setMovies(unique);
      setLoading(false);
      if (unique.length === 0) setError("Could not load recommendations.");
    };

    genres.forEach((genre) => {
      fetchMovies(
        genre,
        (data) => {
          if (!cancelled) collected = [...collected, ...data];
        },
        () => {},
        () => {
          completed += 1;
          if (completed === genres.length) finish();
        },
        3
      );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current && inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const revealResults = () => {
    window.setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 120);
  };

  const performSearch = (term) => {
    setSearchInputText(term);
    setEnteredSearchText(term);
    setLoading(true);
    setMovies(null);
    setError(null);

    fetchMovies(
      term,
      (data) => {
        setMovies(data);
        setLoading(false);
        revealResults();
      },
      (err) => {
        if (err) setError(err);
        setLoading(false);
      },
      null
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const term = searchInputText.trim();
    if (term) performSearch(term);
  };

  const handleTagClick = (tag) => {
    if (tag === enteredSearchText) return;
    performSearch(tag);
  };

  const handleSurprise = () => {
    const pool = SURPRISE_TERMS.filter((t) => t !== enteredSearchText);
    performSearch(pool[Math.floor(Math.random() * pool.length)]);
  };

  const handleViewMore = () => {
    if (loadingMore || enteredSearchText) return;
    setLoadingMore(true);

    const pool = SEED_GENRES.filter((g) => !usedGenresRef.current.has(g));
    const genres = shuffle(pool.length > 0 ? pool : SEED_GENRES).slice(0, 4);
    genres.forEach((genre) => usedGenresRef.current.add(genre));

    let collected = [];
    let completed = 0;

    const finish = () => {
      const existingIds = new Set(movies.map((m) => m.imdbID));
      const fresh = shuffle(dedupe(collected)).filter(
        (m) => !existingIds.has(m.imdbID)
      );
      if (fresh.length === 0) {
        setExhausted(true);
      } else {
        setMovies([...movies, ...fresh]);
      }
      setLoadingMore(false);
    };

    genres.forEach((genre) => {
      fetchMovies(
        genre,
        (data) => {
          collected = [...collected, ...data];
        },
        () => {},
        () => {
          completed += 1;
          if (completed === genres.length) finish();
        },
        3
      );
    });
  };

  const clearInput = () => {
    setSearchInputText("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-3xl px-1 pt-14 pb-2 text-center sm:pt-20">
        <p className="eyebrow animate-fade-up">Discover · Search · Save</p>

        <h1
          className="animate-fade-up mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Every film leaves a{" "}
          <span className="font-light italic text-accent">trace</span>.
        </h1>

        <p
          className="animate-fade-up mx-auto mt-5 max-w-xl text-base text-text-secondary sm:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          Dig up plots, ratings and hidden gems — then keep what you love on
          your watchlist.
        </p>

        <form
          onSubmit={onSubmit}
          className="animate-fade-up relative mx-auto mt-9 max-w-xl"
          style={{ animationDelay: "270ms" }}
          role="search"
        >
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search films, people, genres…"
            value={searchInputText}
            onChange={(e) => setSearchInputText(e.target.value)}
            className="h-[54px] w-full rounded-full border border-border bg-surface pr-14 pl-12 text-[15px] outline-none transition-all duration-300 placeholder:text-text-secondary/60 focus:border-accent/60 focus:bg-elevated focus:shadow-[0_0_0_4px_rgba(245,197,24,0.08)]"
          />
          {searchInputText ? (
            <button
              type="button"
              onClick={clearInput}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 grid h-7 w-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-elevated hover:text-text"
            >
              <CloseIcon />
            </button>
          ) : (
            <kbd className="kbd pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 sm:block">
              /
            </kbd>
          )}
        </form>

        <div
          className="animate-fade-up mt-5 flex items-center justify-center gap-5 text-xs text-text-secondary"
          style={{ animationDelay: "360ms" }}
        >
          <button
            type="button"
            onClick={handleSurprise}
            className="group inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-200 hover:text-accent"
          >
            <DiceIcon />
            <span className="transition-transform duration-200 group-hover:underline group-hover:decoration-accent/60 group-hover:underline-offset-4">
              Surprise me
            </span>
          </button>
          <span className="hidden items-center gap-1.5 sm:flex">
            Press <kbd className="kbd">/</kbd> anywhere to search
          </span>
        </div>

        <div
          className="animate-fade-up mt-8 overflow-x-auto scrollbar-hide"
          style={{ animationDelay: "450ms" }}
        >
          <div className="flex min-w-max flex-wrap justify-center gap-2 px-4 sm:min-w-0 sm:px-0">
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`tag-pill ${
                  enteredSearchText === tag ? "tag-pill-active" : ""
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section ref={resultsRef} className="scroll-mt-24">
        {loading && (
          <>
            <div className="skeleton mx-auto mb-2 h-4 w-44 rounded-md" />
            <div className="movie-grid pt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {!loading && error && (
          <ErrorAlert error={error} searchTerm={enteredSearchText || "random picks"} />
        )}

        {!loading && !error && movies && movies.length > 0 && (
          <>
            <div className="border-t border-border pt-7">
              <p className="animate-fade-up text-sm text-text-secondary">
                {enteredSearchText ? (
                  <>
                    Found <span className="font-semibold text-text tabular-nums">{movies.length}</span>{" "}
                    films for{" "}
                    <span className="font-display text-base italic text-accent">
                      “{enteredSearchText}”
                    </span>
                  </>
                ) : (
                  <>
                    Curated picks for tonight,{" "}
                    <span className="font-display text-base italic text-text">
                      fresh every visit
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="movie-grid pt-6">
              {movies.map((movie, i) => (
                <MovieDetails
                  key={movie.imdbID}
                  movie={movie}
                  index={i}
                  isInWatchlist={isInWatchlist}
                  onToggleWatchlist={onToggleWatchlist}
                />
              ))}
            </div>
            {!enteredSearchText && !exhausted && (
              <div className="flex justify-center pt-10">
                <button
                  type="button"
                  onClick={handleViewMore}
                  disabled={loadingMore}
                  className="cursor-pointer rounded-full border border-border bg-surface px-8 py-3 text-sm font-medium text-text transition-all duration-200 hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? "Loading more…" : "View more"}
                </button>
              </div>
            )}
            {!enteredSearchText && exhausted && (
              <p className="pt-10 text-center text-sm text-text-secondary">
                That's every trace we have for now.
              </p>
            )}
          </>
        )}

        {!loading && !error && movies && movies.length === 0 && (
          <div className="animate-fade-up py-24 text-center">
            <span className="inline-block text-text-secondary/50">
              <ClapperIcon />
            </span>
            <p className="mt-5 font-display text-xl italic">
              No traces found for “{enteredSearchText}”.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Check the spelling or try a broader term.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default MoviesPortal;
