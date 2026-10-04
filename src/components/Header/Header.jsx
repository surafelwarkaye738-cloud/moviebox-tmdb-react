import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useMyList,
} from "../../context/MyListContext";

import {
  useAuth,
} from "../../context/AuthContext";

import "./Header.css";

function Header() {
  /*
    React Router navigation.
  */
  const navigate =
    useNavigate();

  /*
    Current URL information.
  */
  const location =
    useLocation();

  /*
    My List count.
  */
  const {
    myListCount,
  } = useMyList();

  /*
    Authentication state.
  */
  const {
    user,
    isAuthenticated,
    signOut,
  } = useAuth();

  /*
    Search input.
  */
  const [searchText, setSearchText] =
    useState("");

  /*
    Profile dropdown state.
  */
  const [
    profileMenuOpen,
    setProfileMenuOpen,
  ] = useState(false);

  /*
    Reference to profile menu.
  */
  const profileMenuRef =
    useRef(null);

  /*
    Keep search input synchronized
    with the current URL.
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
    Close profile menu when the
    user clicks outside it.
  */
  useEffect(() => {
    const handleOutsideClick =
      (event) => {
        if (
          profileMenuRef.current &&
          !profileMenuRef.current.contains(
            event.target
          )
        ) {
          setProfileMenuOpen(
            false
          );
        }
      };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
    Search submit.
  */
  const handleSearchSubmit = (
    event
  ) => {
    event.preventDefault();

    const query =
      searchText.trim();

    if (!query) {
      return;
    }

    navigate(
      `/search?query=${encodeURIComponent(
        query
      )}&page=1`
    );
  };

  /*
    Clear search.
  */
  const handleClearSearch = () => {
    setSearchText("");

    if (
      location.pathname ===
      "/search"
    ) {
      navigate("/");
    }
  };

  /*
    Get user initials.
  */
  const getInitials = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part.charAt(0).toUpperCase()
      )
      .join("");
  };

  /*
    Open profile.
  */
  const handleProfile = () => {
    setProfileMenuOpen(false);

    navigate("/profile");
  };

  /*
    Open login.
  */
  const handleLogin = () => {
    setProfileMenuOpen(false);

    navigate("/login");
  };

  /*
    Sign out.
  */
  const handleSignOut = () => {
    setProfileMenuOpen(false);

    signOut();

    navigate("/");
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

          <Link
            to="/my-list"
            className={
              location.pathname ===
              "/my-list"
                ? "header-nav-link active"
                : "header-nav-link"
            }
          >
            My List
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

        {/* =================================
            MY LIST COUNT
        ================================= */}

        <Link
          to="/my-list"
          className="header-list-count"
          aria-label={`My List, ${myListCount} saved movies`}
          title="My List"
        >
          ♡

          {myListCount > 0 && (
            <span>
              {myListCount}
            </span>
          )}
        </Link>

        {/* =================================
            PROFILE
        ================================= */}

        <div
          className="header-user-menu"
          ref={profileMenuRef}
        >

          {isAuthenticated ? (
            <>
              <button
                type="button"
                className="header-profile-button"
                onClick={() =>
                  setProfileMenuOpen(
                    (current) =>
                      !current
                  )
                }
                aria-expanded={
                  profileMenuOpen
                }
                aria-haspopup="menu"
              >

                <span className="header-profile-avatar">
                  {getInitials()}
                </span>

                <span className="header-profile-name">
                  {user?.name ||
                    "Profile"}
                </span>

                <span
                  className={
                    profileMenuOpen
                      ? "header-profile-arrow open"
                      : "header-profile-arrow"
                  }
                >
                  ▼
                </span>

              </button>

              {profileMenuOpen && (
                <div
                  className="header-profile-dropdown"
                  role="menu"
                >

                  <div className="profile-dropdown-user">

                    <div className="dropdown-avatar">
                      {getInitials()}
                    </div>

                    <div>
                      <strong>
                        {user?.name}
                      </strong>

                      <span>
                        {user?.email}
                      </span>
                    </div>

                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <button
                    type="button"
                    className="profile-dropdown-item"
                    onClick={
                      handleProfile
                    }
                  >
                    <span>
                      👤
                    </span>

                    Profile
                  </button>

                  <Link
                    to="/my-list"
                    className="profile-dropdown-item"
                    onClick={() =>
                      setProfileMenuOpen(
                        false
                      )
                    }
                  >
                    <span>
                      ♡
                    </span>

                    My List

                    {myListCount >
                      0 && (
                      <span className="dropdown-count">
                        {myListCount}
                      </span>
                    )}
                  </Link>

                  <div className="profile-dropdown-divider"></div>

                  <button
                    type="button"
                    className="profile-dropdown-item sign-out-item"
                    onClick={
                      handleSignOut
                    }
                  >
                    <span>
                      ⇥
                    </span>

                    Sign Out
                  </button>

                </div>
              )}

            </>
          ) : (
            <button
              type="button"
              className="header-sign-in-button"
              onClick={
                handleLogin
              }
            >
              Sign In
            </button>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;