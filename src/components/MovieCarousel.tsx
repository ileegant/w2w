import type { Movie } from "../types";
import EmptyCard from "./EmptyCard";
import MovieCard from "./MovieCard";

interface MovieCarouselProps {
  movies: Movie[] | null;
  loading?: boolean;
  title: string;
  onToggleFavorite: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  favorites?: Movie[];
  watched?: Movie[];
  onOpenDetails: (id: number) => void;
}

export default function MovieCarousel({
  movies,
  loading,
  title,
  onToggleFavorite,
  onToggleWatched,
  favorites = [],
  watched = [],
  onOpenDetails,
}: MovieCarouselProps) {
  const isMovieFavorite = (movieId: number) =>
    favorites.some((f) => f.id === movieId);
  const isMovieWatched = (movieId: number) =>
    watched.some((f) => f.id === movieId);

  return (
    <div className="flex flex-col gap-2 uppercase bg-neutral-800 py-4 w-full px-40">
      <h3 className="text-2xl text-neutral-50 font-black">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-2">
        {!movies?.length && <EmptyCard />}

        {movies?.map((movie) => {
          const isFav = isMovieFavorite(movie.id);
          const isWatched = isMovieWatched(movie.id);

          return (
            <MovieCard
              movie={movie}
              isFav={isFav}
              isWatched={isWatched}
              onOpenDetails={onOpenDetails}
              onToggleFavorite={onToggleFavorite}
              onToggleWatched={onToggleWatched}
            />
          );
        })}
      </div>
    </div>
  );
}
