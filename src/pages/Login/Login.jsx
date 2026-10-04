import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Header from "../../components/Header/Header";

import {
  useAuth,
} from "../../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    isAuthenticated,
    login,
  } = useAuth();

  /*
    Form state.
  */
  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
  });

  /*
    Validation error.
  */
  const [error, setError] =
    useState("");

  /*
    If the user is already
    authenticated, go to Profile.
  */
  useEffect(() => {
    if (isAuthenticated) {
      navigate(
        "/profile",
        {
          replace: true,
        }
      );
    }
  }, [
    isAuthenticated,
    navigate,
  ]);

  /*
    Update form fields.
  */
  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  /*
    Submit login.
  */
  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const cleanName =
      formData.name.trim();

    const cleanEmail =
      formData.email
        .trim()
        .toLowerCase();

    if (!cleanName) {
      setError(
        "Please enter your name."
      );

      return;
    }

    if (!cleanEmail) {
      setError(
        "Please enter your email."
      );

      return;
    }

    if (
      !cleanEmail.includes("@")
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    setError("");

    const success =
      login({
        name: cleanName,
        email: cleanEmail,
      });

    if (!success) {
      setError(
        "Unable to sign in. Please try again."
      );

      return;
    }

    /*
      Return to the requested
      page when possible.
    */
    const previousPath =
      location.state?.from ||
      "/";

    navigate(
      previousPath
    );
  };

  /*
    Demo account button.
  */
  const handleDemoLogin = () => {
    setFormData({
      name: "Netflix Demo User",
      email: "demo@example.com",
    });
  };

  return (
    <div className="login-page">

      <Header />

      <main className="login-main">

        <section className="login-card">

          <div className="login-logo">
            NETFLIX
          </div>

          <p className="login-eyebrow">
            Personal Profile
          </p>

          <h1>
            Sign In
          </h1>

          <p className="login-description">
            Create a frontend demo profile
            to personalize your Netflix
            clone experience.
          </p>

          <div className="login-demo-note">

            <strong>
              Demo only
            </strong>

            <span>
              This project does not send
              your credentials to a server.
            </span>

          </div>

          <form
            className="login-form"
            onSubmit={
              handleSubmit
            }
          >

            <div className="login-field">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your name"
                autoComplete="name"
              />

            </div>

            <div className="login-field">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                autoComplete="email"
              />

            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-submit-button"
            >
              Sign In
            </button>

          </form>

          <button
            type="button"
            className="demo-account-button"
            onClick={
              handleDemoLogin
            }
          >
            Use Demo Account
          </button>

          <button
            type="button"
            className="login-back-button"
            onClick={() =>
              navigate("/")
            }
          >
            ← Back to Home
          </button>

        </section>

      </main>

    </div>
  );
}

export default Login;