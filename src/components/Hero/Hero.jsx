import React, { useState } from "react";
import "./Hero.css";

function Hero({ movie, onPlay, onMoreInfo }) {
  const [imageError, setImageError] = useState(false);

  if (!movie) {
    return null;
  }

  const {
    title = "Featured Movie",
    description = "Discover something new to watch.",
    year = "2026",
    rating = "N/A",
    genre = "Movie",
    duration = "2h",
    backdrop = "",
  } = movie;

  const handlePlay = () => {
    if (onPlay) {
      onPlay(movie);
    }
  };

  const handleMoreInfo = () => {
    if (onMoreInfo) {
      onMoreInfo(movie);
    }
  };

  return (
    <section className="hero">

      {/* Background image */}
      {!imageError && backdrop ? (
        <img
          src={backdrop}
          alt=""
          className="hero-background"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="hero-background-fallback">
          <div className="hero-fallback-content">
            <span>NETFLIX</span>
            <strong>{title}</strong>
          </div>
        </div>
      )}

      {/* Dark overlays */}
      <div className="hero-gradient-left"></div>
      <div className="hero-gradient-bottom"></div>
      <div className="hero-gradient-top"></div>

      {/* Hero content */}
      <div className="hero-content">

        <div className="hero-content-inner">

          <p className="hero-featured-label">
            NETFLIX ORIGINAL
          </p>

          <h1 className="hero-title">
            {title}
          </h1>

          <div className="hero-meta">

            <span className="hero-rating">
              ★ {rating}
            </span>

            <span>
              {year}
            </span>

            <span>
              {duration}
            </span>

            <span className="hero-quality">
              HD
            </span>

          </div>

          <p className="hero-description">
            {description}
          </p>

          <p className="hero-genre">
            {genre}
          </p>

          <div className="hero-buttons">

            {/* Play button */}
            <button
              type="button"
              className="hero-play-button"
              onClick={handlePlay}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>

              Play
            </button>

            {/* More information button */}
            <button
              type="button"
              className="hero-info-button"
              onClick={handleMoreInfo}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <line
                  x1="12"
                  y1="10"
                  x2="12"
                  y2="16"
                />

                <circle
                  cx="12"
                  cy="7"
                  r="0.8"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>

              More Info
            </button>

          </div>

        </div>

      </div>

      {/* Age rating */}
      <div className="hero-age-rating">
        13+
      </div>

    </section>
  );
}

export default Hero;