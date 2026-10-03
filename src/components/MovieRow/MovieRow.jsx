import React, { useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";

function MovieRow({
  title,
  movies = [],
  onPlay,
  onAddToList,
}) {
  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: -700,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: 700,
        behavior: "smooth",
      });
    }
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-row">

      <div className="movie-row-header">

        <h2 className="movie-row-title">
          {title}
        </h2>

        <div className="movie-row-controls">

          <button
            type="button"
            className="movie-row-arrow"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <button
            type="button"
            className="movie-row-arrow"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            ›
          </button>

        </div>

      </div>

      <div
        className="movie-row-container"
        ref={rowRef}
      >
        <div className="movie-row-list">

          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={onPlay}
              onAddToList={onAddToList}
            />
          ))}

        </div>
      </div>

    </section>
  );
}

export default MovieRow;