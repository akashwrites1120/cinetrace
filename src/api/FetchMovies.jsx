export const fetchMovies = async (
  searchText,
  moviesCallback,
  errorCallback,
  finallyCallback,
  limit
) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchText}&apikey=${
        import.meta.env.VITE_OMDB_API_KEY
      }&type=movie`
    );
    const data = await response.json();

    if (data.Response === "True") {
      const selected =
        limit > 0
          ? [...data.Search].sort(() => Math.random() - 0.5).slice(0, limit)
          : data.Search;
      const movieDetailsPromises = selected.map((movie) =>
        fetchMovieDetails(movie.imdbID, errorCallback)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);
      const validDetails = movieDetails.filter(Boolean);

      if (validDetails.length > 0) {
        moviesCallback(validDetails);
        errorCallback(null);
      } else {
        moviesCallback([]);
        errorCallback("An error occurred while fetching movie details.");
      }
    } else {
      moviesCallback([]);
      errorCallback(data.Error);
    }
  } catch {
    moviesCallback([]);
    errorCallback("An error occurred while fetching data.");
  } finally {
    if (finallyCallback) finallyCallback();
  }
};

export const fetchMoviesPage = async (searchText, page, errorCallback) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&page=${page}&apikey=${
        import.meta.env.VITE_OMDB_API_KEY
      }&type=movie`
    );
    const data = await response.json();

    if (data.Response === "True") {
      const movieDetailsPromises = data.Search.map((movie) =>
        fetchMovieDetails(movie.imdbID)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);
      return {
        movies: movieDetails.filter(Boolean),
        totalResults: Number(data.totalResults) || 0,
      };
    }
    return { movies: [], totalResults: 0 };
  } catch {
    if (errorCallback) errorCallback("An error occurred while fetching data.");
    return { movies: [], totalResults: 0 };
  }
};

export const fetchTrendingMovies = async (
  moviesCallback,
  errorCallback,
  finallyCallback
) => {
  const FALLBACK_TRENDING_IDS = [
    "tt15398776", // Oppenheimer
    "tt1517268", // Barbie
    "tt1160419", // Dune
    "tt4154796", // Avengers: Endgame
    "tt0816692", // Interstellar
    "tt1375666", // Inception
    "tt0468569", // The Dark Knight
    "tt1877830", // The Batman
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0109830", // Forrest Gump
    "tt0133093", // The Matrix
  ];

  const fetchTrendingFromIds = async (ids, moviesCb, errorCb) => {
    try {
      const movieDetailsPromises = ids.map((id) =>
        fetchMovieDetails(id, null)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);
      const validMovies = movieDetails.filter(
        (m) => m && m.Response === "True"
      );
      moviesCb(validMovies);
    } catch {
      if (errorCb)
        errorCb("An error occurred while fetching trending movies.");
    }
  };

  const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!tmdbKey) {
    console.warn(
      "VITE_TMDB_API_KEY is not set — falling back to curated trending list."
    );
    await fetchTrendingFromIds(FALLBACK_TRENDING_IDS, moviesCallback, errorCallback);
    if (finallyCallback) finallyCallback();
    return;
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbKey}`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No trending movies returned.");
    }

    const top = data.results.slice(0, 12);

    const imdbIdPromises = top.map(async (movie) => {
      const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${tmdbKey}&append_to_response=external_ids`
      );
      const details = await detailsResponse.json();
      return details && details.external_ids ? details.external_ids.imdb_id : null;
    });

    const imdbIds = (await Promise.all(imdbIdPromises)).filter(Boolean);

    if (imdbIds.length === 0) {
      throw new Error("Could not map trending movies to IMDb.");
    }

    const movieDetails = await Promise.all(
      imdbIds.map((id) => fetchMovieDetails(id, null))
    );
    const order = new Map(imdbIds.map((id, i) => [id, i]));
    const validMovies = movieDetails
      .filter((m) => m && m.Response === "True")
      .sort((a, b) => order.get(a.imdbID) - order.get(b.imdbID));

    if (validMovies.length > 0) {
      moviesCallback(validMovies);
    } else {
      throw new Error("An error occurred while fetching trending movies.");
    }
  } catch {
    console.warn("TMDB trending failed — falling back to curated list.");
    await fetchTrendingFromIds(FALLBACK_TRENDING_IDS, moviesCallback, errorCallback);
  } finally {
    if (finallyCallback) finallyCallback();
  }
};

export const fetchMovieDetails = async (id, errorCallback) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${
        import.meta.env.VITE_OMDB_API_KEY
      }`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch {
    if (errorCallback)
      errorCallback("An error occurred while fetching movie details.");
    return null;
  }
};
