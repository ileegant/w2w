import { TmdbService } from "../api/tmdb-service";
import { useMovieApi } from "../hooks/useMovieApi";
import MovieCarousel from "./MovieCarousel";

export default function TrandingNow() {
  const { data: movies, loading } = useMovieApi(TmdbService.getTrending);

  return (
    <MovieCarousel movies={movies} loading={loading} title="trending now" />
  );
}
