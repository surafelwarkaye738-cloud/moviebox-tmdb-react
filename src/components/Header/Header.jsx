import React, { useState } from "react";

import "./Header.css";

function Header() {
  // Controls whether the search box is visible
  const [searchOpen, setSearchOpen] = useState(false);

  // Controls the mobile navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="netflix-header">

      {/* =========================
          LEFT SIDE
      ========================== */}

      <div className="header-left">

        {/* Logo */}

        <a
          href="#home"
          className="netflix-logo"
          aria-label="Netflix home"
        >
          NETFLIX
        </a>


        {/* Desktop Navigation */}

        <nav className="desktop-navigation">

          <a
            href="#home"
            className="navigation-link active"
          >
            Home
          </a>

          <a
            href="#tv-shows"
            className="navigation-link"
          >
            TV Shows
          </a>

          <a
            href="#movies"
            className="navigation-link"
          >
            Movies
          </a>

          <a
            href="#new-popular"
            className="navigation-link"
          >
            New & Popular
          </a>

          <a
            href="#my-list"
            className="navigation-link"
          >
            My List
          </a>

        </nav>


        {/* Mobile Menu Button */}

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================== */}

      <div className="header-right">


        {/* Search */}

        <div
          className={`search-wrapper ${
            searchOpen ? "search-open" : ""
          }`}
        >

          <button
            type="button"
            className="header-icon-button"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
            aria-label="Search"
          >

            <svg
              className="header-svg-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
              />
            </svg>

          </button>


          {searchOpen && (

            <input
              type="text"
              className="header-search-input"
              placeholder="Titles, people, genres"
              autoFocus
              aria-label="Search titles"
            />

          )}

        </div>


        {/* Kids */}

        <a
          href="#kids"
          className="kids-link"
        >
          Kids
        </a>


        {/* Notifications */}

        <button
          type="button"
          className="header-icon-button"
          aria-label="Notifications"
        >

          <svg
            className="header-svg-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >

            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
            />

            <path
              d="M10 21h4"
            />

          </svg>

        </button>


        {/* Profile */}

        <button
          type="button"
          className="profile-button"
          aria-label="Open profile menu"
        >

          <span className="profile-avatar">
            S
          </span>

          <span className="profile-arrow">
            ▼
          </span>

        </button>

      </div>


      {/* =========================
          MOBILE NAVIGATION
      ========================== */}

      {mobileMenuOpen && (

        <nav className="mobile-navigation">

          <a href="#home">
            Home
          </a>

          <a href="#tv-shows">
            TV Shows
          </a>

          <a href="#movies">
            Movies
          </a>

          <a href="#new-popular">
            New & Popular
          </a>

          <a href="#my-list">
            My List
          </a>

        </nav>

      )}

    </header>
  );
}

export default Header;