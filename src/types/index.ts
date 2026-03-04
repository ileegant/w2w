export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  tagline?: string;
  runtime?: number;
  genres?: Genre[];
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
