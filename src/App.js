import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/search/search";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Search */}
        <Route
          path="/search"
          element={<Search />}
        />

        {/* Movie Details */}
        <Route
          path="/movie/:movieId"
          element={<MovieDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;