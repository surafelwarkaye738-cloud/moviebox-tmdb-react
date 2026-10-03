import {
  TMDB_BASE_URL,
  TMDB_API_TOKEN,
  TMDB_DEFAULT_LANGUAGE,
  TMDB_IMAGE_BASE_URL,
} from "../config/api";

const createRequest = async (
  endpoint,
  params = {}
) => {
  if (!TMDB_API_TOKEN) {
    throw new Error(
      "TMDB API token is missing. Add REACT_APP_TMDB_API_TOKEN to .env.local and restart the React app."
    );
  }

  const url = new URL(
    `${TMDB_BASE_URL}${endpoint}`
  );

  const searchParams = new URLSearchParams({
    language: TMDB_DEFAULT_LANGUAGE,
    ...params,
  });

  url.search = searchParams.toString();

  const response = await fetch(
    url.toString(),
    {
      method: "GET",

      headers: {
        accept: "application/json",

        Authorization: `Bearer ${TMDB_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    let errorMessage =
      `TMDB request failed with status ${response.status}.`;

    try {
      const errorData =
        await response.json();

      if (errorData.status_message) {
        errorMessage +=
          ` ${errorData.status_message}`;
      }
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

/*
  Get trending movies.

  timeWindow can be:
  "day"
  "week"
*/
export const getTrendingMovies = (
  timeWindow = "day"
) =>
  createRequest(
    `/trending/movie/${timeWindow}`
  );

/*
  Get popular movies.
*/
export const getPopularMovies = () =>
  createRequest("/movie/popular");

/*
  Get top-rated movies.
*/
export const getTopRatedMovies = () =>
  createRequest(
    "/movie/top_rated"
  );

/*
  Get movies currently playing.
*/
export const getNowPlayingMovies = () =>
  createRequest(
    "/movie/now_playing"
  );

/*
  Get upcoming movies.
*/
export const getUpcomingMovies = () =>
  createRequest(
    "/movie/upcoming"
  );

/*
  Search movies.
*/
export const searchMovies = (
  query,
  page = 1
) =>
  createRequest(
    "/search/movie",
    {
      query,
      page: String(page),
      include_adult: "false",
    }
  );

/*
  Get complete movie details.
*/
export const getMovieDetails = (
  movieId
) =>
  createRequest(
    `/movie/${movieId}`,
    {
      append_to_response:
        "videos,credits",
    }
  );

/*
  Get movie videos.
*/
export const getMovieVideos = (
  movieId
) =>
  createRequest(
    `/movie/${movieId}/videos`
  );

/*
  Build poster URL.
*/
export const getPosterUrl = (
  posterPath,
  size = "w500"
) => {
  if (!posterPath) {
    return "";
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};

/*
  Build backdrop URL.
*/
export const getBackdropUrl = (
  backdropPath,
  size = "original"
) => {
  if (!backdropPath) {
    return "";
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
};