import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  MyListProvider,
} from "./context/MyListContext";

import Home from "./pages/Home/Home";

import Search from "./pages/search/search";

import MovieDetails from "./pages/MovieDetails/MovieDetails";

import MyList from "./pages/MyList/MyList";

import Login from "./pages/Login/Login";

import Profile from "./pages/Profile/Profile";

import Credits from "./pages/Credits/Credits";

import "./App.css";

function App() {
  return (
    <AuthProvider>

      <MyListProvider>

        <BrowserRouter>

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* SEARCH */}

            <Route
              path="/search"
              element={<Search />}
            />

            {/* MOVIE DETAILS */}

            <Route
              path="/movie/:movieId"
              element={<MovieDetails />}
            />

            {/* MY LIST */}

            <Route
              path="/my-list"
              element={<MyList />}
            />

            {/* LOGIN */}

            <Route
              path="/login"
              element={<Login />}
            />

            {/* PROFILE */}

            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* CREDITS */}

            <Route
              path="/credits"
              element={<Credits />}
            />

          </Routes>

        </BrowserRouter>

      </MyListProvider>

    </AuthProvider>
  );
}

export default App;