import React from "react";

const MovieDetails = ({ movie }) => {
  return (
    <div className="animate-fade-in bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-750 h-full flex flex-col cursor-pointer">
      <div className="relative pt-[120%] sm:pt-[140%] overflow-hidden">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-2 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base mb-0.5 sm:mb-1 leading-snug line-clamp-2">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
          {movie.Year}
        </p>

        <div className="mt-auto flex gap-2 sm:gap-3 text-xs sm:text-sm">
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            IMDB
          </a>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;