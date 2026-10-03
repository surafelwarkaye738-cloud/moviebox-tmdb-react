const TMDB_GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const getGenreNames = (
  genreIds = []
) => {
  return genreIds
    .map(
      (genreId) =>
        TMDB_GENRES[genreId]
    )
    .filter(Boolean)
    .slice(0, 3)
    .join(" • ") || "Movie";
};

export const mapMovie = (
  movie,
  getPosterUrl,
  getBackdropUrl
) => {
  return {
    id: movie.id,

    title:
      movie.title ||
      movie.original_title ||
      "Untitled Movie",

    poster: getPosterUrl(
      movie.poster_path,
      "w500"
    ),

    backdrop: getBackdropUrl(
      movie.backdrop_path,
      "original"
    ),

    description:
      movie.overview ||
      "No description available.",

    year: movie.release_date
      ? movie.release_date.slice(0, 4)
      : "N/A",

    rating:
      typeof movie.vote_average ===
      "number"
        ? movie.vote_average.toFixed(1)
        : "N/A",

    genre: getGenreNames(
      movie.genre_ids
    ),

    duration: "N/A",
  };
};

export const mapMovies = (
  movies = [],
  getPosterUrl,
  getBackdropUrl
) => {
  return movies.map((movie) =>
    mapMovie(
      movie,
      getPosterUrl,
      getBackdropUrl
    )
  );
};