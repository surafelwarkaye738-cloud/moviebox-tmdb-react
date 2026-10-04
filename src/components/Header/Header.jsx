import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Header.css";

function Header() {
  /*
    Navigation helper.
  */
  const navigate =
    useNavigate();

  /*
    Current URL information.
  */
  const location =
    useLocation();

  /*
    Search input state.
  */
  const [searchText, setSearchText] =
    useState("");

  /*
    When the URL changes,
    update the search box if
    a query exists.
  */
  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search
      );

    const query =
      params.get("query") || "";

    setSearchText(query);
  }, [location.search]);

  /*
    Submit search.
  */
  const handleSearchSubmit = (
    event
  ) => {
    /*
      Prevent page refresh.
    */
    event.preventDefault();

    /*
      Remove unnecessary spaces.
    */
    const query =
      searchText.trim();

    /*
      Don't search an empty string.
    */
    if (!query) {
      return;
    }

    /*
      Open Search page.

      Example:

      /search?query=Spider-Man
    */
    navigate(
      `/search?query=${encodeURIComponent(
        query
      )}&page=1`
    );
  };

  /*
    Clear the search input.
  */
  const handleClearSearch = () => {
    setSearchText("");

    /*
      If we are currently on
      the search page, go back home.
    */
    if (
      location.pathname ===
      "/search"
    ) {
      navigate("/");
    }
  };

  return (
    <header className="header">

      <div className="header-container">

        {/* =================================
            LOGO
        ================================= */}

        <Link
          to="/"
          className="header-logo"
          aria-label="Netflix Clone Home"
        >
          NETFLIX
        </Link>

        {/* =================================
            NAVIGATION
        ================================= */}

        <nav
          className="header-nav"
          aria-label="Main navigation"
        >

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "header-nav-link active"
                : "header-nav-link"
            }
          >
            Home
          </Link>

        </nav>

        {/* =================================
            SEARCH
        ================================= */}

        <form
          className="header-search"
          onSubmit={
            handleSearchSubmit
          }
        >

          <span
            className="header-search-icon"
            aria-hidden="true"
          >
            🔎
          </span>

          <input
            type="search"
            value={searchText}
            onChange={(event) =>
              setSearchText(
                event.target.value
              )
            }
            placeholder="Search movies..."
            aria-label="Search movies"
          />

          {searchText && (
            <button
              type="button"
              className="header-search-clear"
              onClick={
                handleClearSearch
              }
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <button
            type="submit"
            className="header-search-button"
          >
            Search
          </button>

        </form>

      </div>

    </header>
  );
}

export default Header;