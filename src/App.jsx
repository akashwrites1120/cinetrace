import React, { useState } from "react";
import Header from "./components/Header";
import MoviesPortal from "./components/MoviesPortal";
import TrendingMovies from "./components/TrendingMovies";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container" style={{ flex: 1 }}>
        {activeTab === "home" && <MoviesPortal />}
        {activeTab === "trending" && <TrendingMovies />}
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "var(--text-secondary)",
          borderTop: "1px solid var(--border-color)",
          marginTop: "auto",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} CineTrace.{" "}
          <a
            href="https://github.com/akashwrites1120/cinetrace"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary-color)", textDecoration: "none" }}
          >
            Github
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
