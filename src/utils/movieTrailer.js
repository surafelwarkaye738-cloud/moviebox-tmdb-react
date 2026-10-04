export const findBestTrailer = (
  videos = []
) => {
  /*
    Only use YouTube videos with
    a valid video key.
  */
  const youtubeVideos =
    videos.filter(
      (video) =>
        video.site === "YouTube" &&
        Boolean(video.key)
    );

  /*
    Prefer an official YouTube trailer.
  */
  const officialTrailer =
    youtubeVideos.find(
      (video) =>
        video.type === "Trailer" &&
        video.official === true
    );

  if (officialTrailer) {
    return officialTrailer;
  }

  /*
    Otherwise use any YouTube trailer.
  */
  const trailer =
    youtubeVideos.find(
      (video) =>
        video.type === "Trailer"
    );

  if (trailer) {
    return trailer;
  }

  /*
    If there is no trailer,
    use a teaser.
  */
  const teaser =
    youtubeVideos.find(
      (video) =>
        video.type === "Teaser"
    );

  if (teaser) {
    return teaser;
  }

  /*
    Last fallback:
    use the first YouTube video.
  */
  return (
    youtubeVideos[0] ||
    null
  );
};