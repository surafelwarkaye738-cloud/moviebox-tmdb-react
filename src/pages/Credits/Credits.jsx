import React from "react";

import {
  Link,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./Credits.css";

function Credits() {
  return (
    <div className="credits-page">

      <Header />

      <main className="credits-main">

        <div className="credits-container">

          {/* =====================================
              PAGE HEADER
          ===================================== */}

          <section className="credits-hero">

            <p className="credits-eyebrow">
              About This Project
            </p>

            <h1>
              Credits & Attribution
            </h1>

            <p className="credits-introduction">
              This project is a React-based
              educational and portfolio
              application built to demonstrate
              modern frontend development,
              API integration, responsive
              design, routing, reusable
              components, and state management.
            </p>

          </section>

          {/* =====================================
              PROJECT INFORMATION
          ===================================== */}

          <section className="credits-section">

            <div className="credits-section-heading">

              <p>
                PROJECT
              </p>

              <h2>
                Netflix Clone
              </h2>

            </div>

            <div className="credits-information-grid">

              <div className="credits-information-card">

                <span>
                  Frontend
                </span>

                <strong>
                  React.js
                </strong>

              </div>

              <div className="credits-information-card">

                <span>
                  API
                </span>

                <strong>
                  TMDB API
                </strong>

              </div>

              <div className="credits-information-card">

                <span>
                  Routing
                </span>

                <strong>
                  React Router
                </strong>

              </div>

              <div className="credits-information-card">

                <span>
                  State
                </span>

                <strong>
                  React Context
                </strong>

              </div>

              <div className="credits-information-card">

                <span>
                  Storage
                </span>

                <strong>
                  Browser localStorage
                </strong>

              </div>

              <div className="credits-information-card">

                <span>
                  Styling
                </span>

                <strong>
                  CSS3
                </strong>

              </div>

            </div>

          </section>

          {/* =====================================
              TMDB ATTRIBUTION
          ===================================== */}

          <section className="credits-section tmdb-credits-section">

            <div className="credits-section-heading">

              <p>
                DATA & IMAGES
              </p>

              <h2>
                The Movie Database
              </h2>

            </div>

            <div className="tmdb-credit-card">

              {/* =================================
                  TMDB LOGO
              ================================= */}

              <div className="tmdb-logo-wrapper">

                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit The Movie Database"
                >
                  <img
                    src="/tmdb-logo.svg"
                    alt="The Movie Database"
                    className="tmdb-logo"
                  />
                </a>

              </div>

              {/* =================================
                  NOTICE
              ================================= */}

              <div className="tmdb-credit-content">

                <h3>
                  The Movie Database
                </h3>

                <p>
                  Movie information, images,
                  ratings, descriptions, credits,
                  and video metadata displayed
                  throughout this application
                  are powered by TMDB.
                </p>

                <p className="tmdb-required-notice">
                  This product uses the TMDB API
                  but is not endorsed or certified
                  by TMDB.
                </p>

                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="tmdb-website-link"
                >
                  Visit TMDB
                  →
                </a>

              </div>

            </div>

          </section>

          {/* =====================================
              DISCLAIMER
          ===================================== */}

          <section className="credits-section">

            <div className="credits-disclaimer">

              <h2>
                Project Disclaimer
              </h2>

              <p>
                This application is an
                independent educational and
                portfolio project. It is not an
                official Netflix product and is
                not affiliated with or endorsed
                by Netflix.
              </p>

              <p>
                The application uses publicly
                available TMDB API data and
                services according to the
                applicable TMDB terms and
                attribution requirements.
              </p>

            </div>

          </section>

          {/* =====================================
              NAVIGATION
          ===================================== */}

          <section className="credits-navigation">

            <Link
              to="/"
              className="credits-primary-button"
            >
              ← Back to Home
            </Link>

            <Link
              to="/my-list"
              className="credits-secondary-button"
            >
              Open My List
            </Link>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Credits;