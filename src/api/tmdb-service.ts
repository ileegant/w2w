import axios from "axios";
import type { Movie, TMDBResponse } from "../types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "uk-UA",
  },
});

export const TmdbService = {
  async getTrending(): Promise<Movie[]> {
    const { data } = await apiClient.get<TMDBResponse>("/trending/movie/day");
    return data.results;
  },

  async getMovieDetails(id: number): Promise<Movie> {
    const { data } = await apiClient.get<Movie>(`/movie/${id}`);
    return data;
  },

  async searchMovies(query: string): Promise<Movie[]> {
    const { data } = await apiClient.get<TMDBResponse>("/search/movie", {
      params: { query },
    });
    return data.results;
  },

  async getMovieTrailer(id: number): Promise<string | null> {
    const { data } = await apiClient.get(`/movie/${id}/videos`);

    const trailer = data.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer ? trailer.key : data.results[0]?.key || null;
  },
};
