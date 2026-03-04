import { createContext, useContext, useState, type ReactNode } from "react";
import { type Movie } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMovieApi } from "../hooks/useMovieApi";
import { TmdbService } from "../api/tmdb-service";

interface MovieContextType {
  trendingMovies: Movie[] | null;
  loading: boolean;
  favorites: Movie[];
  watched: Movie[];
  toggleFavorite: (movie: Movie) => void;
  toggleWatched: (movie: Movie) => void;
  selectedMovieId: number | null;
  openDetails: (id: number) => void;
  closeDetails: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const { data: trendingMovies, loading } = useMovieApi(
    TmdbService.getTrending
  );
  const [favorites, setFavorites] = useLocalStorage<Movie[]>("favorites", []);
  const [watched, setWatched] = useLocalStorage<Movie[]>("watched", []);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const toggleMovieInList = (
    movie: Movie,
    list: Movie[],
    setList: (newList: Movie[]) => void
  ) => {
    const isInList = list.some((item) => item.id === movie.id);
    setList(
      isInList ? list.filter((item) => item.id !== movie.id) : [...list, movie]
    );
  };

  const toggleFavorite = (movie: Movie) =>
    toggleMovieInList(movie, favorites, setFavorites);
  const toggleWatched = (movie: Movie) =>
    toggleMovieInList(movie, watched, setWatched);
  const openDetails = (id: number) => setSelectedMovieId(id);
  const closeDetails = () => setSelectedMovieId(null);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        loading,
        favorites,
        watched,
        toggleFavorite,
        toggleWatched,
        selectedMovieId,
        openDetails,
        closeDetails,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMovies must be used within a MovieProvider");
  return context;
};
