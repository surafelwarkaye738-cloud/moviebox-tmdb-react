import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import MovieRow from "../../components/MovieRow/MovieRow";
import Footer from "../../components/Footer/Footer";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getPosterUrl,
  getBackdropUrl,
  getMovieTrailer,
} from "../../services/tmdbApi";

import {
  mapMovies,
} from "../../utils/movieMapper";

import "./Home.css";

function Home() {
  /*
    React Router navigation.
  */
  const navigate =
    useNavigate();

  /*
    Featured Hero movie.
  */
  const [featuredMovie, setFeaturedMovie] =
    useState(null);

  /*
    Movie categories.
  */
  const [trendingToday, setTrendingToday] =
    useState([]);

  const [trendingThisWeek, setTrendingThisWeek] =
    useState([]);

  const [popularMovies, setPopularMovies] =
    useState([]);

  const [topRatedMovies, setTopRatedMovies] =
    useState([]);

  const [nowPlayingMovies, setNowPlayingMovies] =
    useState([]);

  const [upcomingMovies, setUpcomingMovies] =
    useState([]);

  /*
    Loading state.
  */
  const [loading, setLoading] =
    useState(true);

  /*
    Error state.
  */
  const [error, setError] =
    useState("");

  /*
    Trailer modal.
  */
  const [isTrailerOpen, setIsTrailerOpen] =
    useState(false);

  const [selectedTrailer, setSelectedTrailer] =
    useState(null);

  const [trailerTitle, setTrailerTitle] =
    useState("");

  const [trailerLoading, setTrailerLoading] =
    useState(false);

  const [trailerError, setTrailerError] =
    useState("");

  /*
    Load TMDB movie categories.
  */
  const loadMovies = async () => {
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
        Fetch independent endpoints
        concurrently.
      */
      const [
        trendingTodayData,
        trendingThisWeekData,
        popularData,
        topRatedData,
        nowPlayingData,
        upcomingData,
      ] = await Promise.all([
        getTrendingMovies("day"),

        getTrendingMovies("week"),

        getPopularMovies(),

        getTopRatedMovies(),

        getNowPlayingMovies(),

        getUpcomingMovies(),
      ]);

      /*
        Convert TMDB results.
      */
      const trendingTodayMovies =
        mapMovies(
          trendingTodayData.results,
          getPosterUrl,
          getBackdropUrl
        );

      const trendingThisWeekMovies =
        mapMovies(
          trendingThisWeekData.results,
          getPosterUrl,
          getBackdropUrl
        );

      const popularMappedMovies =
        mapMovies(
          popularData.results,
          getPosterUrl,
          getBackdropUrl
        );

      const topRatedMappedMovies =
        mapMovies(
          topRatedData.results,
          getPosterUrl,
          getBackdropUrl
        );

      const nowPlayingMappedMovies =
        mapMovies(
          nowPlayingData.results,
          getPosterUrl,
          getBackdropUrl
        );

      const upcomingMappedMovies =
        mapMovies(
          upcomingData.results,
          getPosterUrl,
          getBackdropUrl
        );

      /*
        Save state.
      */
      setTrendingToday(
        trendingTodayMovies
      );

      setTrendingThisWeek(
        trendingThisWeekMovies
      );

      setPopularMovies(
        popularMappedMovies
      );

      setTopRatedMovies(
        topRatedMappedMovies
      );

      setNowPlayingMovies(
        nowPlayingMappedMovies
      );

      setUpcomingMovies(
        upcomingMappedMovies
      );

      /*
        First trending movie becomes
        the Hero movie.
      */
      if (
        trendingTodayMovies.length >
        0
      ) {
        setFeaturedMovie(
          trendingTodayMovies[0]
        );
      }
    } catch (error) {
      console.error(
        "Failed to load TMDB movies:",
        error
      );

      setError(
        error.message ||
          "Unable to load movies from TMDB."
      );
    } finally {
      /*
        Loading finished.
      */
      setLoading(false);
    }
  };

  /*
    Load data on first render.
  */
  useEffect(() => {
    loadMovies();
  }, []);

  /*
    Play movie trailer.
  */
  const handlePlay = async (
    movie
  ) => {
    try {
      /*
        Open modal immediately.
      */
      setIsTrailerOpen(true);

      setTrailerTitle(
        movie.title
      );

      setSelectedTrailer(
        null
      );

      setTrailerError("");

      setTrailerLoading(true);

      /*
        Fetch trailer.
      */
      const trailer =
        await getMovieTrailer(
          movie.id
        );

      if (!trailer) {
        setTrailerError(
          "No trailer is available for this movie."
        );

        return;
      }

      setSelectedTrailer(
        trailer
      );
    } catch (error) {
      console.error(
        "Failed to load trailer:",
        error
      );

      setTrailerError(
        error.message ||
          "Unable to load the movie trailer."
      );
    } finally {
      setTrailerLoading(
        false
      );
    }
  };

  /*
    Close trailer.
  */
  const handleCloseTrailer =
    () => {
      setIsTrailerOpen(
        false
      );

      setSelectedTrailer(
        null
      );

      setTrailerTitle("");

      setTrailerError("");

      setTrailerLoading(
        false
      );
    };

  /*
    Open details page.
  */
  const handleMoreInfo = (
    movie
  ) => {
    navigate(
      `/movie/${movie.id}`
    );
  };

  return (
    <div className="home-page">

      <Header />

      <main className="home-main">

        {/* =================================
            LOADING STATE
        ================================= */}

        {loading && (
          <section className="home-loading-state">

            <div className="home-loading-hero">

              <div className="home-loading-hero-text">

                <div className="skeleton-line skeleton-small"></div>

                <div className="skeleton-line skeleton-title"></div>

                <div className="skeleton-line skeleton-description"></div>

                <div className="skeleton-line skeleton-description short"></div>

                <div className="skeleton-buttons">

                  <div></div>

                  <div></div>

                </div>

              </div>

            </div>

            <div className="home-loading-rows">

              <section className="home-skeleton-section">

                <div className="home-skeleton-heading"></div>

                <MovieSkeleton
                  count={7}
                />

              </section>

              <section className="home-skeleton-section">

                <div className="home-skeleton-heading"></div>

                <MovieSkeleton
                  count={7}
                />

              </section>

              <section className="home-skeleton-section">

                <div className="home-skeleton-heading"></div>

                <MovieSkeleton
                  count={7}
                />

              </section>

            </div>

          </section>
        )}

        {/* =================================
            ERROR STATE
        ================================= */}

        {!loading &&
          error && (
            <section className="home-error">

              <div className="home-error-icon">
                ⚠
              </div>

              <h2>
                Something went wrong
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={
                  loadMovies
                }
                className="retry-button"
              >
                Try Again
              </button>

            </section>
          )}

        {/* =================================
            MAIN CONTENT
        ================================= */}

        {!loading &&
          !error &&
          featuredMovie && (
            <>

              <Hero
                movie={
                  featuredMovie
                }
                onPlay={
                  handlePlay
                }
                onMoreInfo={
                  handleMoreInfo
                }
              />

              <section className="home-movie-sections">

                <MovieRow
                  title="🔥 Trending Today"
                  movies={
                    trendingToday
                  }
                  onPlay={
                    handlePlay
                  }
                />

                <MovieRow
                  title="📈 Trending This Week"
                  movies={
                    trendingThisWeek
                  }
                  onPlay={
                    handlePlay
                  }
                />

                <MovieRow
                  title="⭐ Popular Movies"
                  movies={
                    popularMovies
                  }
                  onPlay={
                    handlePlay
                  }
                />

                <MovieRow
                  title="🏆 Top Rated"
                  movies={
                    topRatedMovies
                  }
                  onPlay={
                    handlePlay
                  }
                />

                <MovieRow
                  title="🎬 Now Playing"
                  movies={
                    nowPlayingMovies
                  }
                  onPlay={
                    handlePlay
                  }
                />

                <MovieRow
                  title="🚀 Upcoming Movies"
                  movies={
                    upcomingMovies
                  }
                  onPlay={
                    handlePlay
                  }
                />

              </section>

            </>
          )}

      </main>

      {/* =================================
          TRAILER MODAL
      ================================= */}

      <TrailerModal
        isOpen={
          isTrailerOpen
        }
        video={
          selectedTrailer
        }
        title={
          trailerTitle
        }
        loading={
          trailerLoading
        }
        error={
          trailerError
        }
        onClose={
          handleCloseTrailer
        }
      />

      <Footer />

    </div>
  );
}

export default Home;