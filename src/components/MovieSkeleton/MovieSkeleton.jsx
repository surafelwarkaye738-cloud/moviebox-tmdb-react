import React from "react";

import "./MovieSkeleton.css";

function MovieSkeleton({
  count = 6,
}) {
  return (
    <div
      className="movie-skeleton-row"
      aria-label="Loading movies"
    >
      {Array.from(
        { length: count }
      ).map(
        (_, index) => (
          <div
            className="movie-skeleton"
            key={index}
          >
            {/* Poster skeleton */}

            <div className="movie-skeleton-poster"></div>

            {/* Title skeleton */}

            <div className="movie-skeleton-title"></div>

            {/* Meta skeleton */}

            <div className="movie-skeleton-meta">

              <span></span>

              <span></span>

            </div>

          </div>
        )
      )}
    </div>
  );
}

export default MovieSkeleton;