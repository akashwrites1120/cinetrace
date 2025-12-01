export const fetchMovies = async (
  searchText,
  moviesCallback,
  errorCallback,
  finallyCallback
) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchText}&apikey=${
        import.meta.env.VITE_OMDB_API_KEY
      }&type=movie`
    );
    const data = await response.json();

    if (data.Response === "True") {
      const movieDetailsPromises = data.Search.map((movie) =>
        fetchMovieDetails(movie.imdbID, errorCallback)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);

      moviesCallback(movieDetails);
      errorCallback(null);
    } else {
      moviesCallback([]);
      errorCallback(data.Error);
    }
  } catch (err) {
    moviesCallback([]);
    errorCallback("An error occurred while fetching data.");
  } finally {
    if (finallyCallback) finallyCallback();
  }
};

export const fetchTrendingMovies = async (
  moviesCallback,
  errorCallback,
  finallyCallback
) => {
  const trendingIds = [
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

  try {
    const movieDetailsPromises = trendingIds.map((id) =>
      fetchMovieDetails(id, errorCallback)
    );
    const movieDetails = await Promise.all(movieDetailsPromises);
    const validMovies = movieDetails.filter((m) => m && m.Response === "True");
    moviesCallback(validMovies);
  } catch (err) {
    if (errorCallback)
      errorCallback("An error occurred while fetching trending movies.");
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
  } catch (err) {
    if (errorCallback)
      errorCallback("An error occurred while fetching movie details.");
    return null;
  }
};
