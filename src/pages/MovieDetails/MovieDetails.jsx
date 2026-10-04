import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

import {
  useMyList,
} from "../../context/MyListContext";

import {
  getMovieDetails,
  getPosterUrl,
  getBackdropUrl,
} from "../../services/tmdbApi";

import {
  findBestTrailer,
} from "../../utils/movieTrailer";

import "./MovieDetails.css";

function MovieDetails() {
  /*
    Get movie ID from URL.
  */
  const { movieId } =
    useParams();

  /*
    Router navigation.
  */
  const navigate =
    useNavigate();

  /*
    My List.
  */
  const {
    isInMyList,
    toggleMyList,
  } = useMyList();

  /*
    Movie data.
  */
  const [movie, setMovie] =
    useState(null);

  /*
    Page loading.
  */
  const [loading, setLoading] =
    useState(true);

  /*
    Page error.
  */
  const [error, setError] =
    useState("");

  /*
    Trailer modal.
  */
  const [isTrailerOpen, setIsTrailerOpen] =
    useState(false);

  const [selectedTrailer, setSelectedTrailer] =
    useState(null);

  const [trailerError, setTrailerError] =
    useState("");

  /*
    Load movie details.
  */
  useEffect(() => {
    const loadMovieDetails =
      async () => {
        try {
          setLoading(true);

          setError("");

          const data =
            await getMovieDetails(
              movieId
            );

          setMovie(data);
        } catch (error) {
          console.error(
            "Failed to load movie details:",
            error
          );

          setError(
            error.message ||
              "Unable to load movie details."
          );
        } finally {
          setLoading(false);
        }
      };

    loadMovieDetails();
  }, [movieId]);

  /*
    Format runtime.
  */
  const formatRuntime = (
    runtime
  ) => {
    if (!runtime) {
      return "N/A";
    }

    const hours =
      Math.floor(
        runtime / 60
      );

    const minutes =
      runtime % 60;

    if (hours === 0) {
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  };

  /*
    Go Home.
  */
  const handleBack = () => {
    navigate("/");
  };

  /*
    Play trailer.
  */
  const handlePlay = () => {
    const videos =
      movie?.videos?.results ||
      [];

    const trailer =
      findBestTrailer(
        videos
      );

    setIsTrailerOpen(true);

    setSelectedTrailer(
      trailer
    );

    setTrailerError(
      trailer
        ? ""
        : "No trailer is available for this movie."
    );
  };

  /*
    Close trailer.
  */
  const handleCloseTrailer =
    () => {
      setIsTrailerOpen(false);

      setSelectedTrailer(
        null
      );

      setTrailerError("");
    };

  /*
    Add/remove from My List.
  */
  const handleAddToList = () => {
    if (!movie) {
      return;
    }

    toggleMyList(movie);
  };

  /*
    Loading.
  */
  if (loading) {
    return (
      <div className="movie-details-page">

        <Header />

        <main className="movie-details-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading movie details...
          </p>

        </main>

        <Footer />

      </div>
    );
  }

  /*
    Error.
  */
  if (error) {
    return (
      <div className="movie-details-page">

        <Header />

        <main className="movie-details-error">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            className="details-back-button"
            onClick={
              handleBack
            }
          >
            Back to Home
          </button>

        </main>

        <Footer />

      </div>
    );
  }

  /*
    Movie not found.
  */
  if (!movie) {
    return (
      <div className="movie-details-page">

        <Header />

        <main className="movie-details-error">

          <h2>
            Movie not found
          </h2>

          <button
            type="button"
            className="details-back-button"
            onClick={
              handleBack
            }
          >
            Back to Home
          </button>

        </main>

        <Footer />

      </div>
    );
  }

  /*
    Backdrop.
  */
  const backdropUrl =
    getBackdropUrl(
      movie.backdrop_path,
      "original"
    );

  /*
    Poster.
  */
  const posterUrl =
    getPosterUrl(
      movie.poster_path,
      "w500"
    );

  /*
    Release year.
  */
  const releaseYear =
    movie.release_date
      ? movie.release_date.slice(
          0,
          4
        )
      : "N/A";

  /*
    Rating.
  */
  const rating =
    typeof movie.vote_average ===
    "number"
      ? movie.vote_average.toFixed(
          1
        )
      : "N/A";

  /*
    Genres.
  */
  const genres =
    movie.genres?.length
      ? movie.genres
          .map(
            (genre) =>
              genre.name
          )
          .join(" • ")
      : "Movie";

  /*
    Cast.
  */
  const cast =
    movie.credits?.cast
      ? movie.credits.cast.slice(
          0,
          6
        )
      : [];

  /*
    My List status.
  */
  const saved =
    isInMyList(movie.id);

  return (
    <div className="movie-details-page">

      <Header />

      <main>

        {/* =================================
            HERO
        ================================= */}

        <section
          className="movie-details-hero"
          style={{
            backgroundImage:
              backdropUrl
                ? `
                  linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.96) 0%,
                    rgba(0, 0, 0, 0.80) 40%,
                    rgba(0, 0, 0, 0.35) 75%,
                    rgba(0, 0, 0, 0.80) 100%
                  ),
                  linear-gradient(
                    to top,
                    #000000 0%,
                    transparent 50%
                  ),
                  url("${backdropUrl}")
                `
                : "linear-gradient(#181818, #000000)",
          }}
        >

          <div className="movie-details-content">

            <button
              type="button"
              className="back-button"
              onClick={
                handleBack
              }
            >
              ← Back
            </button>

            <div className="movie-details-main">

              {/* POSTER */}

              <div className="movie-details-poster-wrapper">

                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={
                      movie.title
                    }
                    className="movie-details-poster"
                  />
                ) : (
                  <div className="poster-placeholder">
                    No Poster
                  </div>
                )}

              </div>

              {/* INFORMATION */}

              <div className="movie-details-info">

                <h1>
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="movie-tagline">
                    {movie.tagline}
                  </p>
                )}

                <div className="movie-meta">

                  <span>
                    {releaseYear}
                  </span>

                  <span>
                    ⭐ {rating}
                  </span>

                  <span>
                    {genres}
                  </span>

                  <span>
                    {formatRuntime(
                      movie.runtime
                    )}
                  </span>

                </div>

                <p className="movie-description">
                  {movie.overview ||
                    "No description available."}
                </p>

                <div className="movie-actions">

                  <button
                    type="button"
                    className="details-play-button"
                    onClick={
                      handlePlay
                    }
                  >
                    ▶ Play Trailer
                  </button>

                  <button
                    type="button"
                    className={
                      saved
                        ? "details-list-button saved"
                        : "details-list-button"
                    }
                    onClick={
                      handleAddToList
                    }
                  >
                    {saved
                      ? "✓ In My List"
                      : "＋ My List"}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================
            CAST
        ================================= */}

        {cast.length > 0 && (
          <section className="movie-cast-section">

            <div className="movie-details-container">

              <h2>
                Cast
              </h2>

              <div className="cast-grid">

                {cast.map(
                  (person) => {

                    const profileUrl =
                      person.profile_path
                        ? getPosterUrl(
                            person.profile_path,
                            "w185"
                          )
                        : "";

                    return (
                      <article
                        key={
                          person.id
                        }
                        className="cast-card"
                      >

                        {profileUrl ? (
                          <img
                            src={profileUrl}
                            alt={
                              person.name
                            }
                            className="cast-image"
                            loading="lazy"
                          />
                        ) : (
                          <div className="cast-placeholder">
                            No Image
                          </div>
                        )}

                        <h3>
                          {person.name}
                        </h3>

                        <p>
                          {person.character ||
                            "Unknown role"}
                        </p>

                      </article>
                    );
                  }
                )}

              </div>

            </div>

          </section>
        )}

        {/* =================================
            MORE INFORMATION
        ================================= */}

        <section className="movie-information-section">

          <div className="movie-details-container">

            <h2>
              More Information
            </h2>

            <div className="movie-information-grid">

              <div>
                <span>
                  Original Title
                </span>

                <strong>
                  {movie.original_title ||
                    movie.title}
                </strong>
              </div>

              <div>
                <span>
                  Original Language
                </span>

                <strong>
                  {movie.original_language
                    ? movie.original_language.toUpperCase()
                    : "N/A"}
                </strong>
              </div>

              <div>
                <span>
                  Release Date
                </span>

                <strong>
                  {movie.release_date ||
                    "N/A"}
                </strong>
              </div>

              <div>
                <span>
                  Vote Count
                </span>

                <strong>
                  {movie.vote_count ??
                    "N/A"}
                </strong>
              </div>

              <div>
                <span>
                  Popularity
                </span>

                <strong>
                  {typeof movie.popularity ===
                  "number"
                    ? movie.popularity.toFixed(
                        1
                      )
                    : "N/A"}
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {movie.status ||
                    "N/A"}
                </strong>
              </div>

            </div>

          </div>

        </section>

      </main>

      <TrailerModal
        isOpen={
          isTrailerOpen
        }
        video={
          selectedTrailer
        }
        title={
          movie.title
        }
        loading={false}
        error={
          trailerError
        }
        onClose={
          handleCloseTrailer
        }
      />

      <Footer />

    </div>
  );
}

export default MovieDetails;