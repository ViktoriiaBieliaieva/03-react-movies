import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
}

export default async function fetchMovies(value: string): Promise<Movie[]> {
  const response = await axios.get<MovieHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: value,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
}
