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
    Navigation.
  */
  const navigate =
    useNavigate();

  /*
    Hero movie.
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
    Main loading state.
  */
  const [loading, setLoading] =
    useState(true);

  /*
    Main error.
  */
  const [error, setError] =
    useState("");

  /*
    Trailer modal state.
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
    Load movie categories.
  */
  const loadMovies = async () => {
    try {
      setLoading(true);

      setError("");

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
      setLoading(false);
    }
  };

  /*
    Load movies on page start.
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
        Open modal immediately
        so the user sees feedback.
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
        Fetch best trailer.
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
    Close trailer modal.
  */
  const handleCloseTrailer =
    () => {
      setIsTrailerOpen(false);

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

  /*
    My List placeholder.
    Real My List comes in
    the next phase.
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

  return (
    <div className="home-page">

      <Header />

      <main className="home-main">

        {loading && (
          <div className="home-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading movies from TMDB...
            </p>

          </div>
        )}

        {!loading &&
          error && (
            <div className="home-error">

              <h2>
                Something went wrong
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={loadMovies}
                className="retry-button"
              >
                Try Again
              </button>

            </div>
          )}

        {!loading &&
          !error &&
          featuredMovie && (
            <>

              <Hero
                movie={featuredMovie}
                onPlay={handlePlay}
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
                  onAddToList={
                    handleAddToList
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
                  onAddToList={
                    handleAddToList
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
                  onAddToList={
                    handleAddToList
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
                  onAddToList={
                    handleAddToList
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
                  onAddToList={
                    handleAddToList
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
                  onAddToList={
                    handleAddToList
                  }
                />

              </section>

            </>
          )}

      </main>

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