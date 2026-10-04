import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";

import {
  useMyList,
} from "../../context/MyListContext";

import "./MyList.css";

function MyList() {
  /*
    Navigation helper.
  */
  const navigate =
    useNavigate();

  /*
    Get My List data and
    actions from Context.
  */
  const {
    myList,
    myListCount,
    clearMyList,
  } = useMyList();

  /*
    Go to a specific movie.
  */
  const handleMovieClick = (
    movie
  ) => {
    navigate(
      `/movie/${movie.id}`
    );
  };

  /*
    Movie Card Play button.
  */
  const handlePlay = (
    movie
  ) => {
    console.log(
      `Play "${movie.title}" from My List`
    );
  };

  /*
    Ask before clearing
    everything.
  */
  const handleClearAll = () => {
    if (
      myList.length === 0
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to remove all movies from My List?"
      );

    if (confirmed) {
      clearMyList();
    }
  };

  return (
    <div className="my-list-page">

      <Header />

      <main className="my-list-main">

        <div className="my-list-container">

          {/* =================================
              HEADER
          ================================= */}

          <header className="my-list-header">

            <div>

              <p className="my-list-label">
                Your Collection
              </p>

              <h1>
                My List
              </h1>

              <p className="my-list-count">
                {myListCount}{" "}
                {myListCount === 1
                  ? "movie"
                  : "movies"}
              </p>

            </div>

            {myListCount > 0 && (
              <button
                type="button"
                className="clear-list-button"
                onClick={
                  handleClearAll
                }
              >
                Clear My List
              </button>
            )}

          </header>

          {/* =================================
              EMPTY STATE
          ================================= */}

          {myListCount === 0 && (
            <section className="my-list-empty">

              <div className="my-list-empty-icon">
                ＋
              </div>

              <h2>
                Your list is empty
              </h2>

              <p>
                Add movies you want to
                watch later. They will
                appear here automatically.
              </p>

              <button
                type="button"
                className="browse-movies-button"
                onClick={() =>
                  navigate("/")
                }
              >
                Browse Movies
              </button>

            </section>
          )}

          {/* =================================
              SAVED MOVIES
          ================================= */}

          {myListCount > 0 && (
            <section
              className="my-list-grid"
              aria-label="My saved movies"
            >

              {myList.map(
                (movie) => (
                  <div
                    key={movie.id}
                    className="my-list-card-wrapper"
                  >

                    <MovieCard
                      movie={movie}
                      onPlay={
                        handlePlay
                      }
                    />

                    <button
                      type="button"
                      className="my-list-details-button"
                      onClick={() =>
                        handleMovieClick(
                          movie
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>
                )
              )}

            </section>
          )}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default MyList;