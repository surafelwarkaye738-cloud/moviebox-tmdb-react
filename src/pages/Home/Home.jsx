import React, {
  useEffect,
  useState,
} from "react";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import MovieRow from "../../components/MovieRow/MovieRow";
import Footer from "../../components/Footer/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getPosterUrl,
  getBackdropUrl,
} from "../../services/tmdbApi";

import {
  mapMovies,
} from "../../utils/movieMapper";

import "./Home.css";

function Home() {
  /*
    Featured movie displayed
    in the Hero section.
  */
  const [featuredMovie, setFeaturedMovie] =
    useState(null);

  /*
    Trending today.
  */
  const [trendingToday, setTrendingToday] =
    useState([]);

  /*
    Trending this week.
  */
  const [trendingThisWeek, setTrendingThisWeek] =
    useState([]);

  /*
    Popular movies.
  */
  const [popularMovies, setPopularMovies] =
    useState([]);

  /*
    Top-rated movies.
  */
  const [topRatedMovies, setTopRatedMovies] =
    useState([]);

  /*
    Movies currently playing.
  */
  const [nowPlayingMovies, setNowPlayingMovies] =
    useState([]);

  /*
    Upcoming movies.
  */
  const [upcomingMovies, setUpcomingMovies] =
    useState([]);

  /*
    Loading state.
  */
  const [loading, setLoading] =
    useState(true);

  /*
    Error message.
  */
  const [error, setError] =
    useState("");

  /*
    Load all movie categories.
  */
  const loadMovies = async () => {
    try {
      /*
        Start loading.
      */
      setLoading(true);

      /*
        Clear old errors.
      */
      setError("");

      /*
        Request all categories
        at the same time.
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
        Convert raw TMDB arrays
        into our application format.
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
        Save everything into state.
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
        Use the first trending movie
        as the main Hero movie.
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
        Loading ends whether
        request succeeded or failed.
      */
      setLoading(false);
    }
  };

  /*
    Load movies when the page starts.
  */
  useEffect(() => {
    loadMovies();
  }, []);

  /*
    Play movie.
  */
  const handlePlay = (movie) => {
    console.log(
      `Playing movie: ${movie.title}`
    );
  };

  /*
    More information.
  */
  const handleMoreInfo = (movie) => {
    console.log(
      `More information: ${movie.title}`
    );
  };

  /*
    Add/remove movie from My List.
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

        {/*
          Loading UI.
        */}
        {loading && (
          <div className="home-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading movies from TMDB...
            </p>

          </div>
        )}

        {/*
          Error UI.
        */}
        {!loading && error && (
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

        {/*
          Main movie interface.
        */}
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
                  onPlay={handlePlay}
                  onAddToList={
                    handleAddToList
                  }
                />

                <MovieRow
                  title="📈 Trending This Week"
                  movies={
                    trendingThisWeek
                  }
                  onPlay={handlePlay}
                  onAddToList={
                    handleAddToList
                  }
                />

                <MovieRow
                  title="⭐ Popular Movies"
                  movies={
                    popularMovies
                  }
                  onPlay={handlePlay}
                  onAddToList={
                    handleAddToList
                  }
                />

                <MovieRow
                  title="🏆 Top Rated"
                  movies={
                    topRatedMovies
                  }
                  onPlay={handlePlay}
                  onAddToList={
                    handleAddToList
                  }
                />

                <MovieRow
                  title="🎬 Now Playing"
                  movies={
                    nowPlayingMovies
                  }
                  onPlay={handlePlay}
                  onAddToList={
                    handleAddToList
                  }
                />

                <MovieRow
                  title="🚀 Upcoming Movies"
                  movies={
                    upcomingMovies
                  }
                  onPlay={handlePlay}
                  onAddToList={
                    handleAddToList
                  }
                />

              </section>

            </>
          )}

      </main>

      <Footer />

    </div>
  );
}

export default Home;