import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStoredMyList,
  saveStoredMyList,
  clearStoredMyList,
} from "../utils/myListStorage";

import {
  getPosterUrl,
  getBackdropUrl,
} from "../services/tmdbApi";

/*
  Create the Context.
*/
const MyListContext =
  createContext(null);

/*
  Convert different movie formats
  into one consistent format for
  My List.
*/
const normalizeMovie = (
  movie
) => {
  /*
    Handle poster.
  */
  const poster =
    movie.poster ||
    getPosterUrl(
      movie.poster_path,
      "w500"
    );

  /*
    Handle backdrop.
  */
  const backdrop =
    movie.backdrop ||
    getBackdropUrl(
      movie.backdrop_path,
      "original"
    );

  /*
    Handle year.
  */
  const year =
    movie.year ||
    (
      movie.release_date
        ? movie.release_date.slice(
            0,
            4
          )
        : "N/A"
    );

  /*
    Handle rating.
  */
  const rating =
    movie.rating ||
    (
      typeof movie.vote_average ===
      "number"
        ? movie.vote_average.toFixed(
            1
          )
        : "N/A"
    );

  /*
    Handle genres.
  */
  let genre =
    movie.genre || "";

  if (!genre) {
    if (
      Array.isArray(
        movie.genres
      ) &&
      movie.genres.length > 0
    ) {
      genre =
        movie.genres
          .map(
            (item) =>
              item.name
          )
          .join(" • ");
    }
  }

  if (!genre) {
    genre = "Movie";
  }

  /*
    Handle description.
  */
  const description =
    movie.description ||
    movie.overview ||
    "No description available.";

  /*
    Handle runtime.
  */
  let duration =
    movie.duration || "N/A";

  if (
    (!movie.duration ||
      movie.duration === "N/A") &&
    movie.runtime
  ) {
    const hours = Math.floor(
      movie.runtime / 60
    );

    const minutes =
      movie.runtime % 60;

    duration =
      hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes}m`;
  }

  /*
    Return the final saved movie.
  */
  return {
    id: movie.id,

    title:
      movie.title ||
      movie.original_title ||
      "Untitled Movie",

    poster,

    backdrop,

    description,

    year,

    rating,

    genre,

    duration,
  };
};

/*
  Provider component.
*/
export function MyListProvider({
  children,
}) {
  /*
    Load saved movies when the
    application starts.
  */
  const [myList, setMyList] =
    useState(() =>
      getStoredMyList()
    );

  /*
    Save My List whenever the
    state changes.
  */
  useEffect(() => {
    saveStoredMyList(myList);
  }, [myList]);

  /*
    Check whether one movie
    is already saved.
  */
  const isInMyList = (
    movieId
  ) => {
    return myList.some(
      (movie) =>
        movie.id === movieId
    );
  };

  /*
    Add or remove a movie.
  */
  const toggleMyList = (
    movie
  ) => {
    const normalizedMovie =
      normalizeMovie(movie);

    setMyList(
      (currentList) => {
        /*
          Check whether movie
          already exists.
        */
        const exists =
          currentList.some(
            (item) =>
              item.id ===
              normalizedMovie.id
          );

        /*
          If it exists, remove it.
        */
        if (exists) {
          return currentList.filter(
            (item) =>
              item.id !==
              normalizedMovie.id
          );
        }

        /*
          Otherwise put the newest
          movie at the beginning.
        */
        return [
          normalizedMovie,
          ...currentList,
        ];
      }
    );
  };

  /*
    Remove one specific movie.
  */
  const removeFromMyList = (
    movieId
  ) => {
    setMyList(
      (currentList) =>
        currentList.filter(
          (movie) =>
            movie.id !== movieId
        )
    );
  };

  /*
    Remove everything.
  */
  const clearMyList = () => {
    setMyList([]);
    clearStoredMyList();
  };

  /*
    Listen for localStorage
    changes from another browser tab.
  */
  useEffect(() => {
    const handleStorage =
      (event) => {
        if (
          event.key ===
          "netflix_clone_my_list"
        ) {
          setMyList(
            getStoredMyList()
          );
        }
      };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  /*
    Values available to all
    components using the context.
  */
  const value = {
    myList,

    myListCount:
      myList.length,

    isInMyList,

    toggleMyList,

    removeFromMyList,

    clearMyList,
  };

  return (
    <MyListContext.Provider
      value={value}
    >
      {children}
    </MyListContext.Provider>
  );
}

/*
  Custom hook for consuming
  My List context.
*/
export const useMyList = () => {
  const context =
    useContext(
      MyListContext
    );

  if (!context) {
    throw new Error(
      "useMyList must be used inside MyListProvider."
    );
  }

  return context;
};