import React, {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";

import {
  searchMovies,
  getPosterUrl,
  getBackdropUrl,
} from "../../services/tmdbApi";

import {
  mapMovies,
} from "../../utils/movieMapper";

import "./search.css";

function Search() {
  /*
    Read and control URL parameters.

    Example:

    /search?query=Spider-Man&page=1
  */
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  /*
    Get the search text from the URL.
  */
  const query = (
    searchParams.get("query") ||
    ""
  ).trim();

  /*
    Get page number from URL.
  */
  const pageValue = Number(
    searchParams.get("page") || 1
  );

  /*
    Make sure page is a valid
    positive integer.
  */
  const page =
    Number.isInteger(pageValue) &&
    pageValue > 0
      ? Math.min(pageValue, 500)
      : 1;

  /*
    Search results.
  */
  const [movies, setMovies] =
    useState([]);

  /*
    Total number of results.
  */
  const [totalResults, setTotalResults] =
    useState(0);

  /*
    Total number of pages.
  */
  const [totalPages, setTotalPages] =
    useState(0);

  /*
    Loading state.
  */
  const [loading, setLoading] =
    useState(false);

  /*
    Error state.
  */
  const [error, setError] =
    useState("");

  /*
    Search TMDB whenever
    query or page changes.
  */
  useEffect(() => {
    /*
      Prevent an old request from
      changing state after a new
      request has started.
    */
    let isActive = true;

    /*
      If there is no search query,
      don't call the API.
    */
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
      setLoading(false);
      setError("");

      return () => {
        isActive = false;
      };
    }

    /*
      Load the search results.
    */
    const loadSearchResults =
      async () => {
        try {
          /*
            Start loading.
          */
          setLoading(true);

          /*
            Clear previous error.
          */
          setError("");

          /*
            Call TMDB search API.
          */
          const data =
            await searchMovies(
              query,
              page
            );

          /*
            Convert TMDB results
            to our app format.
          */
          const mappedMovies =
            mapMovies(
              data.results || [],
              getPosterUrl,
              getBackdropUrl
            );

          /*
            Don't update state if
            this request is outdated.
          */
          if (!isActive) {
            return;
          }

          /*
            Store movies.
          */
          setMovies(
            mappedMovies
          );

          /*
            Store total results.
          */
          setTotalResults(
            data.total_results || 0
          );

          /*
            TMDB normally returns
            the total number of pages.

            We cap this at 500 because
            TMDB pagination is limited.
          */
          setTotalPages(
            Math.min(
              data.total_pages || 1,
              500
            )
          );
        } catch (error) {
          if (!isActive) {
            return;
          }

          console.error(
            "Search request failed:",
            error
          );

          setError(
            error.message ||
              "Unable to search for movies."
          );

          setMovies([]);
          setTotalResults(0);
          setTotalPages(0);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

    loadSearchResults();

    /*
      Cleanup function.
    */
    return () => {
      isActive = false;
    };
  }, [query, page]);

  /*
    Play button handler.
  */
  const handlePlay = (
    movie
  ) => {
    console.log(
      `Playing movie: ${movie.title}`
    );
  };

  /*
    My List handler.
  */
  const handleAddToList = (
    movie,
    added
  ) => {
    if (added) {
      console.log(
        `Added "${movie.title}" to My List`
      );
    } else {
      console.log(
        `Removed "${movie.title}" from My List`
      );
    }
  };

  /*
    Go to another search page.
  */
  const handlePageChange = (
    newPage
  ) => {
    /*
      Don't allow invalid pages.
    */
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    /*
      Copy current parameters.
    */
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    /*
      Change only the page.
    */
    nextParams.set(
      "page",
      String(newPage)
    );

    /*
      Update URL.
    */
    setSearchParams(
      nextParams
    );

    /*
      Scroll to the top.
    */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
    Calculate whether a previous page
    exists.
  */
  const hasPreviousPage =
    page > 1;

  /*
    Calculate whether a next page
    exists.
  */
  const hasNextPage =
    page < totalPages;

  return (
    <div className="search-page">

      <Header />

      <main className="search-main">

        <div className="search-container">

          {/* =================================
              NO SEARCH QUERY
          ================================= */}

          {!query && (
            <section className="search-empty-state">

              <div className="search-empty-icon">
                🔎
              </div>

              <h1>
                Search for movies
              </h1>

              <p>
                Use the search box above
                to find movies from TMDB.
              </p>

            </section>
          )}

          {/* =================================
              SEARCH HEADER
          ================================= */}

          {query && (
            <header className="search-results-header">

              <div>

                <p className="search-label">
                  Search results
                </p>

                <h1>
                  "{query}"
                </h1>

              </div>

              {!loading &&
                !error &&
                totalResults > 0 && (
                  <p className="search-count">
                    {totalResults.toLocaleString()}
                    {" "}
                    {totalResults === 1
                      ? "result"
                      : "results"}
                  </p>
                )}

            </header>
          )}

          {/* =================================
              LOADING
          ================================= */}

          {loading && (
            <section className="search-loading">

              <div className="search-spinner"></div>

              <p>
                Searching for movies...
              </p>

            </section>
          )}

          {/* =================================
              ERROR
          ================================= */}

          {!loading &&
            error && (
              <section className="search-error">

                <h2>
                  Something went wrong
                </h2>

                <p>
                  {error}
                </p>

                <button
                  type="button"
                  className="search-retry-button"
                  onClick={() => {
                    const nextParams =
                      new URLSearchParams(
                        searchParams
                      );

                    setSearchParams(
                      nextParams
                    );
                  }}
                >
                  Try Again
                </button>

              </section>
            )}

          {/* =================================
              NO RESULTS
          ================================= */}

          {!loading &&
            !error &&
            query &&
            movies.length === 0 && (
              <section className="search-no-results">

                <div className="no-results-icon">
                  🎬
                </div>

                <h2>
                  No movies found
                </h2>

                <p>
                  We couldn't find any movies
                  matching "{query}".
                </p>

              </section>
            )}

          {/* =================================
              MOVIE RESULTS
          ================================= */}

          {!loading &&
            !error &&
            movies.length > 0 && (
              <>

                <section
                  className="search-results-grid"
                  aria-label="Search results"
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
                          handlePlay
                        }
                        onAddToList={
                          handleAddToList
                        }
                      />
                    )
                  )}

                </section>

                {/* =================================
                    PAGINATION
                ================================= */}

                {totalPages > 1 && (
                  <nav
                    className="search-pagination"
                    aria-label="Search pagination"
                  >

                    <button
                      type="button"
                      className="pagination-button"
                      onClick={() =>
                        handlePageChange(
                          page - 1
                        )
                      }
                      disabled={
                        !hasPreviousPage
                      }
                    >
                      ← Previous
                    </button>

                    <span className="pagination-current">
                      Page{" "}
                      <strong>
                        {page}
                      </strong>
                      {" "}
                      of{" "}
                      <strong>
                        {totalPages}
                      </strong>
                    </span>

                    <button
                      type="button"
                      className="pagination-button"
                      onClick={() =>
                        handlePageChange(
                          page + 1
                        )
                      }
                      disabled={
                        !hasNextPage
                      }
                    >
                      Next →
                    </button>

                  </nav>
                )}

              </>
            )}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Search;