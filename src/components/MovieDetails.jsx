import React from "react";

const MovieDetails = ({ movie }) => {
  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: "var(--surface-color)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "var(--shadow)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.backgroundColor = "var(--surface-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
        e.currentTarget.style.backgroundColor = "var(--surface-color)";
      }}
    >
      <div
        style={{ position: "relative", paddingTop: "140%", overflow: "hidden" }}
      >
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            marginBottom: "0.25rem",
            lineHeight: "1.4",
          }}
        >
          {movie.Title}
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            marginBottom: "0.5rem",
          }}
        >
          {movie.Year}
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "0.75rem",
            fontSize: "0.85rem",
          }}
        >
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "500" }}
          >
            IMDB
          </a>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "500" }}
          >
            Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
