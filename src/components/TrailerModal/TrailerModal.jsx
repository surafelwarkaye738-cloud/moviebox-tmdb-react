import React, {
  useEffect,
} from "react";

import "./TrailerModal.css";

function TrailerModal({
  isOpen,
  video,
  title,
  loading,
  error,
  onClose,
}) {
  /*
    Close the modal when the user
    presses the Escape key.
  */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    /*
      Prevent the background page
      from scrolling while modal
      is open.
    */
    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    /*
      Cleanup.
    */
    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        originalOverflow;
    };
  }, [isOpen, onClose]);

  /*
    Don't render anything when
    the modal is closed.
  */
  if (!isOpen) {
    return null;
  }

  /*
    Build the YouTube embed URL.
  */
  const videoUrl = video?.key
    ? `https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1&rel=0&modestbranding=1`
    : "";

  /*
    Close when the user clicks
    the dark background.
  */
  const handleBackdropClick = (
    event
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="trailer-modal-overlay"
      onMouseDown={
        handleBackdropClick
      }
      role="presentation"
    >
      <div
        className="trailer-modal"
        role="dialog"
        aria-modal="true"
        aria-label={
          title
            ? `${title} trailer`
            : "Movie trailer"
        }
      >

        {/* =================================
            HEADER
        ================================= */}

        <div className="trailer-modal-header">

          <div>
            <p className="trailer-modal-label">
              Official Trailer
            </p>

            <h2>
              {title ||
                "Movie Trailer"}
            </h2>
          </div>

          <button
            type="button"
            className="trailer-modal-close"
            onClick={onClose}
            aria-label="Close trailer"
          >
            ×
          </button>

        </div>

        {/* =================================
            CONTENT
        ================================= */}

        <div className="trailer-modal-content">

          {loading && (
            <div className="trailer-modal-loading">

              <div className="trailer-spinner"></div>

              <p>
                Loading trailer...
              </p>

            </div>
          )}

          {!loading &&
            error && (
              <div className="trailer-modal-error">

                <div className="trailer-error-icon">
                  ⚠
                </div>

                <h3>
                  Trailer unavailable
                </h3>

                <p>
                  {error}
                </p>

                <button
                  type="button"
                  className="trailer-error-close"
                  onClick={onClose}
                >
                  Close
                </button>

              </div>
            )}

          {!loading &&
            !error &&
            videoUrl && (
              <div className="trailer-video-wrapper">

                <iframe
                  src={videoUrl}
                  title={
                    title
                      ? `${title} official trailer`
                      : "Movie trailer"
                  }
                  className="trailer-video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />

              </div>
            )}

        </div>

      </div>
    </div>
  );
}

export default TrailerModal;