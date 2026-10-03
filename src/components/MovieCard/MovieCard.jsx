import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./MovieCard.css";

function MovieCard({
  movie,
  onPlay,
  onAddToList,
}) {
  /*
    React Router navigation.
  */
  const navigate =
    useNavigate();

  /*
    Open the movie details page.
  */
  const openDetails = () => {
    navigate(
      `/movie/${movie.id}`
    );
  };

  /*
    Handle Play.
  */
  const handlePlay = (
    event
  ) => {
    event.stopPropagation();

    if (onPlay) {
      onPlay(movie);
    }
  };

  /*
    Handle My List.
  */
  const handleAddToList = (
    event
  ) => {
    event.stopPropagation();

    if (onAddToList) {
      onAddToList(
        movie,
        true
      );
    }
  };

  /*
    Handle keyboard navigation.
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
            HOVER OVERLAY
        ================================= */}

        <div className="movie-card-overlay">

          <div className="movie-card-actions">

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

            <button
              type="button"
              className="movie-card-add-button"
              onClick={
                handleAddToList
              }
              aria-label={
                `Add ${movie.title} to My List`
              }
            >
              ＋
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
          MOVIE INFORMATION
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