import { fetchFromTMDB } from "../servives/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
