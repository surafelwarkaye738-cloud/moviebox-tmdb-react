import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useMyList,
} from "../../context/MyListContext";

import "./Profile.css";

function Profile() {
  const navigate =
    useNavigate();

  const {
    user,
    updateProfile,
    signOut,
  } = useAuth();

  const {
    myListCount,
  } = useMyList();

  /*
    Edit mode.
  */
  const [
    editing,
    setEditing,
  ] = useState(false);

  /*
    Editable name.
  */
  const [
    name,
    setName,
  ] = useState(
    user?.name || ""
  );

  /*
    Form error.
  */
  const [
    error,
    setError,
  ] = useState("");

  /*
    Get initials.
  */
  const getInitials = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part.charAt(0).toUpperCase()
      )
      .join("");
  };

  /*
    Save profile.
  */
  const handleSave = () => {
    const cleanName =
      name.trim();

    if (!cleanName) {
      setError(
        "Name cannot be empty."
      );

      return;
    }

    const success =
      updateProfile({
        name: cleanName,
      });

    if (!success) {
      setError(
        "Unable to update your profile."
      );

      return;
    }

    setError("");

    setEditing(false);
  };

  /*
    Cancel editing.
  */
  const handleCancel = () => {
    setName(
      user?.name || ""
    );

    setError("");

    setEditing(false);
  };

  /*
    Sign out.
  */
  const handleSignOut = () => {
    signOut();

    navigate("/");
  };

  /*
    If there is no user, show
    a login prompt.
  */
  if (!user) {
    return (
      <div className="profile-page">

        <Header />

        <main className="profile-main">

          <section className="profile-guest">

            <div className="profile-guest-icon">
              👤
            </div>

            <h1>
              Sign in to view your profile
            </h1>

            <p>
              Create a profile to
              personalize your Netflix
              clone experience.
            </p>

            <button
              type="button"
              className="profile-primary-button"
              onClick={() =>
                navigate(
                  "/login"
                )
              }
            >
              Sign In
            </button>

          </section>

        </main>

        <Footer />

      </div>
    );
  }

  return (
    <div className="profile-page">

      <Header />

      <main className="profile-main">

        <div className="profile-container">

          {/* =================================
              PROFILE HERO
          ================================= */}

          <section className="profile-hero">

            <div className="profile-avatar-large">
              {getInitials()}
            </div>

            <div className="profile-hero-info">

              <p className="profile-label">
                My Account
              </p>

              <h1>
                {user.name}
              </h1>

              <p>
                {user.email}
              </p>

            </div>

          </section>

          {/* =================================
              STATS
          ================================= */}

          <section className="profile-stats">

            <div className="profile-stat-card">

              <span>
                My List
              </span>

              <strong>
                {myListCount}
              </strong>

              <small>
                Saved movies
              </small>

            </div>

            <div className="profile-stat-card">

              <span>
                Account
              </span>

              <strong>
                Demo
              </strong>

              <small>
                Frontend profile
              </small>

            </div>

            <div className="profile-stat-card">

              <span>
                Status
              </span>

              <strong>
                Active
              </strong>

              <small>
                Profile available
              </small>

            </div>

          </section>

          {/* =================================
              PROFILE DETAILS
          ================================= */}

          <section className="profile-section">

            <div className="profile-section-header">

              <div>

                <p className="profile-section-label">
                  Account Information
                </p>

                <h2>
                  Profile Details
                </h2>

              </div>

              {!editing && (
                <button
                  type="button"
                  className="profile-secondary-button"
                  onClick={() =>
                    setEditing(true)
                  }
                >
                  Edit Profile
                </button>
              )}

            </div>

            {editing ? (
              <div className="profile-edit-form">

                <div className="profile-field">

                  <label htmlFor="profile-name">
                    Full Name
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(
                      event
                    ) =>
                      setName(
                        event.target.value
                      )
                    }
                  />

                </div>

                <div className="profile-field">

                  <label>
                    Email Address
                  </label>

                  <div className="profile-readonly-value">
                    {user.email}
                  </div>

                </div>

                {error && (
                  <p className="profile-form-error">
                    {error}
                  </p>
                )}

                <div className="profile-edit-actions">

                  <button
                    type="button"
                    className="profile-primary-button"
                    onClick={
                      handleSave
                    }
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={
                      handleCancel
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>
            ) : (
              <div className="profile-information-grid">

                <div className="profile-information-item">

                  <span>
                    Full Name
                  </span>

                  <strong>
                    {user.name}
                  </strong>

                </div>

                <div className="profile-information-item">

                  <span>
                    Email Address
                  </span>

                  <strong>
                    {user.email}
                  </strong>

                </div>

              </div>
            )}

          </section>

          {/* =================================
              QUICK ACTIONS
          ================================= */}

          <section className="profile-section">

            <div className="profile-section-header">

              <div>

                <p className="profile-section-label">
                  Quick Actions
                </p>

                <h2>
                  Your Netflix Experience
                </h2>

              </div>

            </div>

            <div className="profile-actions-grid">

              <button
                type="button"
                className="profile-action-card"
                onClick={() =>
                  navigate(
                    "/my-list"
                  )
                }
              >

                <span className="profile-action-icon">
                  ♡
                </span>

                <strong>
                  My List
                </strong>

                <span>
                  View your saved movies
                </span>

              </button>

              <button
                type="button"
                className="profile-action-card"
                onClick={() =>
                  navigate("/")
                }
              >

                <span className="profile-action-icon">
                  ▶
                </span>

                <strong>
                  Browse Movies
                </strong>

                <span>
                  Explore recommendations
                </span>

              </button>

              <button
                type="button"
                className="profile-action-card"
                onClick={() =>
                  navigate(
                    "/search"
                  )
                }
              >

                <span className="profile-action-icon">
                  🔎
                </span>

                <strong>
                  Search
                </strong>

                <span>
                  Find movies on TMDB
                </span>

              </button>

            </div>

          </section>

          {/* =================================
              SIGN OUT
          ================================= */}

          <section className="profile-signout-section">

            <div>

              <h2>
                Sign Out
              </h2>

              <p>
                Sign out of this frontend
                demo profile on this device.
              </p>

            </div>

            <button
              type="button"
              className="profile-signout-button"
              onClick={
                handleSignOut
              }
            >
              Sign Out
            </button>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Profile;