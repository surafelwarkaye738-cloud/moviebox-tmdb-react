import React from "react";

import {
  Link,
} from "react-router-dom";

import "./Footer.css";

function Footer() {
  /*
    Get the current year dynamically.
  */
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =================================
            BRAND
        ================================= */}

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >
            NETFLIX
          </Link>

          <p>
            A React-based educational
            movie discovery application
            powered by TMDB.
          </p>

        </div>

        {/* =================================
            NAVIGATION
        ================================= */}

        <div className="footer-column">

          <h3>
            Explore
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/search">
            Search Movies
          </Link>

          <Link to="/my-list">
            My List
          </Link>

        </div>

        {/* =================================
            ACCOUNT
        ================================= */}

        <div className="footer-column">

          <h3>
            Account
          </h3>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/login">
            Sign In
          </Link>

        </div>

        {/* =================================
            INFORMATION
        ================================= */}

        <div className="footer-column">

          <h3>
            Information
          </h3>

          <Link to="/credits">
            Credits & Attribution
          </Link>

          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>

        </div>

      </div>

      {/* =================================
          BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © {currentYear} Netflix Clone.
            Educational portfolio project.
          </p>

          <p>
            This product uses the TMDB API
            but is not endorsed or certified
            by TMDB.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;