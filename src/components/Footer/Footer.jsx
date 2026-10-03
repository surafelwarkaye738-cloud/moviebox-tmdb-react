import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="netflix-footer">

      <div className="footer-container">


        {/* =================================
            CONTACT
        ================================= */}

        <div className="footer-contact">

          <p>
            Questions? Contact us.
          </p>

        </div>


        {/* =================================
            FOOTER LINKS
        ================================= */}

        <div className="footer-links">


          {/* Column 1 */}

          <div className="footer-column">

            <a href="#faq">
              FAQ
            </a>

            <a href="#investor-relations">
              Investor Relations
            </a>

            <a href="#privacy">
              Privacy
            </a>

            <a href="#speed-test">
              Speed Test
            </a>

          </div>


          {/* Column 2 */}

          <div className="footer-column">

            <a href="#help-center">
              Help Center
            </a>

            <a href="#jobs">
              Jobs
            </a>

            <a href="#cookie-preferences">
              Cookie Preferences
            </a>

            <a href="#legal-notices">
              Legal Notices
            </a>

          </div>


          {/* Column 3 */}

          <div className="footer-column">

            <a href="#account">
              Account
            </a>

            <a href="#ways-to-watch">
              Ways to Watch
            </a>

            <a href="#corporate-information">
              Corporate Information
            </a>

            <a href="#only-on-netflix">
              Only on Netflix
            </a>

          </div>


          {/* Column 4 */}

          <div className="footer-column">

            <a href="#media-center">
              Media Center
            </a>

            <a href="#terms">
              Terms of Use
            </a>

            <a href="#contact-us">
              Contact Us
            </a>

            <a href="#accessibility">
              Accessibility
            </a>

          </div>

        </div>


        {/* =================================
            LANGUAGE
        ================================= */}

        <div className="footer-language">

          <select
            className="language-select"
            defaultValue="English"
            aria-label="Select language"
          >

            <option value="English">
              English
            </option>

            <option value="Amharic">
              Amharic
            </option>

          </select>

        </div>


        {/* =================================
            BRAND
        ================================= */}

        <div className="footer-brand">

          <p className="footer-logo">
            NETFLIX
          </p>

          <p className="footer-country">
            Netflix Clone
          </p>

          <p className="footer-description">
            A React educational streaming project.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;