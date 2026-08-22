import { useEffect, useState } from "react";
import Header from "./components/Header";
import MoviesPortal from "./components/MoviesPortal";
import TrendingMovies from "./components/TrendingMovies";
import WatchlistView from "./components/WatchlistView";
import useWatchlist from "./hooks/useWatchlist";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const watchlist = useWatchlist();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeTab]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        watchlistCount={watchlist.items.length}
      />

      <main className="container flex-1">
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "home" && (
            <MoviesPortal
              isInWatchlist={watchlist.has}
              onToggleWatchlist={watchlist.toggle}
            />
          )}
          {activeTab === "trending" && (
            <TrendingMovies
              isInWatchlist={watchlist.has}
              onToggleWatchlist={watchlist.toggle}
            />
          )}
          {activeTab === "watchlist" && (
            <WatchlistView
              items={watchlist.items}
              isInWatchlist={watchlist.has}
              onToggleWatchlist={watchlist.toggle}
              onBrowse={() => setActiveTab("home")}
            />
          )}
        </div>
      </main>

      <footer className="mt-auto border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-text-secondary sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} CineTrace — every film leaves a
            trace.
          </p>
          <a
            href="https://github.com/akashwrites1120/cinetrace"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
