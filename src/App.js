import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Movie Details Page */}
        <Route
          path="/movie/:movieId"
          element={<MovieDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;