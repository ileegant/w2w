import { useState } from "react";
import "./App.css";
import { TmdbService } from "./api/tmdb-service";
import MovieCarousel from "./components/MovieCarousel";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMovieApi } from "./hooks/useMovieApi";
import type { Movie } from "./types";
import { MovieDetailsModal } from "./components/MovieDetailsModal";

function App() {
  const { data: trendingMovies, loading } = useMovieApi(
    TmdbService.getTrending
  );
  const [favorites, setFavorites] = useLocalStorage<Movie[]>("favorites", []);
  const [watched, setWatched] = useLocalStorage<Movie[]>("watched", []);

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const openDetails = (id: number) => setSelectedMovieId(id);

  const toggleMovieInList = (
    movie: Movie,
    list: Movie[],
    setList: (newList: Movie[]) => void
  ) => {
    const isInList = list.some((item) => item.id === movie.id);

    if (isInList) {
      setList(list.filter((item) => item.id !== movie.id));
    } else {
      setList([...list, movie]);
    }
  };

  const toggleFavorite = (movie: Movie) =>
    toggleMovieInList(movie, favorites, setFavorites);
  const toggleWatched = (movie: Movie) =>
    toggleMovieInList(movie, watched, setWatched);

  return (
    <>
      <MovieCarousel
        movies={trendingMovies}
        loading={loading}
        title="trending now"
        onToggleFavorite={toggleFavorite}
        onToggleWatched={toggleWatched}
        favorites={favorites}
        watched={watched}
        onOpenDetails={openDetails}
      />

      <MovieCarousel
        movies={favorites}
        loading={loading}
        title="watch later"
        onToggleFavorite={toggleFavorite}
        onToggleWatched={toggleWatched}
        favorites={favorites}
        watched={watched}
        onOpenDetails={openDetails}
      />

      <MovieCarousel
        movies={watched}
        loading={loading}
        title="watched"
        onToggleFavorite={toggleFavorite}
        onToggleWatched={toggleWatched}
        favorites={favorites}
        watched={watched}
        onOpenDetails={openDetails}
      />
      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </>
  );
}

export default App;
