const API_KEY = "";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const trendingMovies = async ()=>{
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export async function getMovieFullDetails(id) {
  const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
    fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
    fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`)
  ]);

  const [details, credits, videos, similar] = await Promise.all([
    detailsRes.json(),
    creditsRes.json(),
    videosRes.json(),
    similarRes.json()
  ]);

  return {
    details,
    credits,
    videos,
    similar: similar.results
  };
}


