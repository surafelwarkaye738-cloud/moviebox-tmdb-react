import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useMyList,
} from "../../context/MyListContext";

import "./MovieCard.css";

function MovieCard({
  movie,
  onPlay,
}) {
  /*
    Navigation.
  */
  const navigate =
    useNavigate();

  /*
    My List state and actions.
  */
  const {
    isInMyList,
    toggleMyList,
  } = useMyList();

  /*
    Check whether this movie
    is currently saved.
  */
  const saved =
    isInMyList(movie.id);

  /*
    Open movie details.
  */
  const openDetails = () => {
    navigate(
      `/movie/${movie.id}`
    );
  };

  /*
    Play movie.
  */
  const handlePlay = (
    event
  ) => {
    /*
      Don't also trigger
      the card click.
    */
    event.stopPropagation();

    if (onPlay) {
      onPlay(movie);
    }
  };

  /*
    Add or remove movie
    from My List.
  */
  const handleMyList = (
    event
  ) => {
    event.stopPropagation();

    toggleMyList(movie);
  };

  /*
    Keyboard support.
  */
  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      openDetails();
    }
  };

  return (
    <article
      className="movie-card"
      onClick={openDetails}
      onKeyDown={
        handleKeyDown
      }
      role="button"
      tabIndex={0}
    >

      {/* =================================
          IMAGE
      ================================= */}

      <div className="movie-card-image-wrapper">

        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-card-image"
            loading="lazy"
          />
        ) : (
          <div className="movie-card-placeholder">
            No Image
          </div>
        )}

        {/* =================================
            OVERLAY
        ================================= */}

        <div className="movie-card-overlay">

          <div className="movie-card-actions">

            {/* PLAY */}

            <button
              type="button"
              className="movie-card-play-button"
              onClick={
                handlePlay
              }
              aria-label={
                `Play ${movie.title}`
              }
            >
              ▶
            </button>

            {/* MY LIST */}

            <button
              type="button"
              className={
                saved
                  ? "movie-card-add-button saved"
                  : "movie-card-add-button"
              }
              onClick={
                handleMyList
              }
              aria-label={
                saved
                  ? `Remove ${movie.title} from My List`
                  : `Add ${movie.title} to My List`
              }
            >
              {saved ? "✓" : "＋"}
            </button>

          </div>

          <button
            type="button"
            className="movie-card-info-button"
            onClick={(event) => {
              event.stopPropagation();

              openDetails();
            }}
          >
            More Info
          </button>

        </div>

      </div>

      {/* =================================
          INFORMATION
      ================================= */}

      <div className="movie-card-info">

        <h3
          className="movie-card-title"
          title={movie.title}
        >
          {movie.title}
        </h3>

        <div className="movie-card-meta">

          <span>
            {movie.year || "N/A"}
          </span>

          <span>
            ⭐{" "}
            {movie.rating ||
              "N/A"}
          </span>

        </div>

      </div>

    </article>
  );
}

export default MovieCard;