import React, {
  useRef,
} from "react";

import MovieCard from "../MovieCard/MovieCard";

import "./MovieRow.css";

function MovieRow({
  title,
  movies = [],
  onPlay,
}) {
  /*
    Reference to the scrollable
    movie container.
  */
  const rowRef =
    useRef(null);

  /*
    Scroll left.
  */
  const scrollLeft = () => {
    if (!rowRef.current) {
      return;
    }

    rowRef.current.scrollBy({
      left: -600,

      behavior: "smooth",
    });
  };

  /*
    Scroll right.
  */
  const scrollRight = () => {
    if (!rowRef.current) {
      return;
    }

    rowRef.current.scrollBy({
      left: 600,

      behavior: "smooth",
    });
  };

  /*
    Don't render an empty row.
  */
  if (
    !movies ||
    movies.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="movie-row"
      aria-label={title}
    >

      {/* =================================
          HEADER
      ================================= */}

      <div className="movie-row-header">

        <h2 className="movie-row-title">
          {title}
        </h2>

        <div className="movie-row-controls">

          <button
            type="button"
            className="movie-row-arrow"
            onClick={
              scrollLeft
            }
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>

          <button
            type="button"
            className="movie-row-arrow"
            onClick={
              scrollRight
            }
            aria-label={`Scroll ${title} right`}
          >
            ›
          </button>

        </div>

      </div>

      {/* =================================
          MOVIE LIST
      ================================= */}

      <div
        className="movie-row-wrapper"
      >

        <div
          ref={rowRef}
          className="movie-row-list"
        >

          {movies.map(
            (movie) => (
              <MovieCard
                key={
                  movie.id
                }
                movie={
                  movie
                }
                onPlay={
                  onPlay
                }
              />
            )
          )}

        </div>

      </div>

    </section>
  );
}

export default MovieRow;