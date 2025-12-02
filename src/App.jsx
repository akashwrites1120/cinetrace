import React, { useState } from "react";
import Header from "./components/Header";
import MoviesPortal from "./components/MoviesPortal";
import TrendingMovies from "./components/TrendingMovies";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container flex-1">
        {activeTab === "home" && <MoviesPortal />}
        {activeTab === "trending" && <TrendingMovies />}
      </main>
      <footer className="text-center p-8 text-text-secondary border-t border-border mt-auto">
        <p>
          &copy; {new Date().getFullYear()} CineTrace.{" "}
          <a
            href="https://github.com/akashwrites1120/cinetrace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary no-underline hover:text-primary-hover"
          >
            Github
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
