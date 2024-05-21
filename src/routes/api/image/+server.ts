/// src/routes/api/movie-image.ts

import { json, type RequestHandler } from "@sveltejs/kit";
import { TMDB_API_KEY } from "$env/static/private";

export const GET: RequestHandler = async ({ url }) => {
  const movieId = url.searchParams.get("movieId");

  if (!movieId) {
    return json({ error: "Missing movieId parameter" }, { status: 400 });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) {
    const error = await response.json();
    return json({ error: error.status_message }, { status: response.status });
  }
  const movie = await response.json();

  if (!movie.poster_path) {
    return json(
      { error: "Movie not found or no poster available" },
      { status: 404 }
    );
  }

  return json({
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  });
};
