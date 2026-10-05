import React from "react";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { MyListProvider } from "./context/MyListContext";

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
        <HashRouter>
          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/search"
              element={<Search />}
            />

            <Route
              path="/movie/:movieId"
              element={<MovieDetails />}
            />

            <Route
              path="/my-list"
              element={<MyList />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/credits"
              element={<Credits />}
            />

          </Routes>
        </HashRouter>
      </MyListProvider>
    </AuthProvider>
  );
}

export default App;