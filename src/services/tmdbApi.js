import {
  TMDB_BASE_URL,
  TMDB_API_TOKEN,
  TMDB_DEFAULT_LANGUAGE,
  TMDB_IMAGE_BASE_URL,
} from "../config/api";

import {
  findBestTrailer,
} from "../utils/movieTrailer";

/*
  Main TMDB request helper.
*/
const createRequest = async (
  endpoint,
  params = {}
) => {
  /*
    Check token.
  */
  if (!TMDB_API_TOKEN) {
    throw new Error(
      "TMDB API token is missing. Check .env.local in the project root and restart the React app."
    );
  }

  /*
    Remove accidental spaces.
  */
  const cleanToken =
    TMDB_API_TOKEN.trim();

  /*
    Create API URL.
  */
  const url = new URL(
    `${TMDB_BASE_URL}${endpoint}`
  );

  /*
    Add query parameters.
  */
  const searchParams =
    new URLSearchParams({
      language:
        TMDB_DEFAULT_LANGUAGE,
      ...params,
    });

  url.search =
    searchParams.toString();

  /*
    Send request.
  */
  const response = await fetch(
    url.toString(),
    {
      method: "GET",

      headers: {
        accept:
          "application/json",

        Authorization:
          `Bearer ${cleanToken}`,
      },
    }
  );

  /*
    Handle errors.
  */
  if (!response.ok) {
    let errorMessage =
      `TMDB request failed with status ${response.status}.`;

    try {
      const errorData =
        await response.json();

      if (
        errorData.status_message
      ) {
        errorMessage +=
          ` ${errorData.status_message}`;
      }
    } catch {
      /*
        Ignore JSON parsing errors.
      */
    }

    throw new Error(
      errorMessage
    );
  }

  /*
    Return parsed JSON.
  */
  return response.json();
};

/*
  Trending movies.

  timeWindow:
  day
  week
*/
export const getTrendingMovies = (
  timeWindow = "day"
) =>
  createRequest(
    `/trending/movie/${timeWindow}`
  );

/*
  Popular movies.
*/
export const getPopularMovies =
  () =>
    createRequest(
      "/movie/popular"
    );

/*
  Top-rated movies.
*/
export const getTopRatedMovies =
  () =>
    createRequest(
      "/movie/top_rated"
    );

/*
  Now-playing movies.
*/
export const getNowPlayingMovies =
  () =>
    createRequest(
      "/movie/now_playing"
    );

/*
  Upcoming movies.
*/
export const getUpcomingMovies =
  () =>
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
  Movie details.

  Also request:
  videos
  credits
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
  Movie videos.
*/
export const getMovieVideos = (
  movieId
) =>
  createRequest(
    `/movie/${movieId}/videos`
  );

/*
  Get the best available
  trailer for a movie.
*/
export const getMovieTrailer =
  async (
    movieId
  ) => {
    const data =
      await getMovieVideos(
        movieId
      );

    return findBestTrailer(
      data.results || []
    );
  };

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