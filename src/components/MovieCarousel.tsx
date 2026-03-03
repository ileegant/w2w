import { Calendar, Image } from "lucide-react";
import type { Movie } from "../types";
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
        {!movies?.length && (
          <div className="flex flex-col gap-3 border border-dashed text-neutral-50 border-neutral-700 rounded-2xl p-3 w-40">
            <div className="flex items-center justify-center h-50 relative aspect-2/3 bg-neutral-700 font-bold overflow-hidden rounded-xl">
              <Image className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-1 px-1">
              <h3 className="font-bold text-sm leading-tight line-clamp-2">
                XXXX XXXX
              </h3>
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                xxxx
              </div>
            </div>
          </div>
        )}

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
