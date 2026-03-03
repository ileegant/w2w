import { Eye, Bookmark, Star, Calendar, Image } from "lucide-react";
import type { Movie } from "../types";

interface MovieCarouselProps {
  movies: Movie[] | null;
  loading?: boolean;
  title: string;
  onToggleFavorite: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  favorites?: Movie[];
  watched?: Movie[];
}

export default function MovieCarousel({
  movies,
  loading,
  title,
  onToggleFavorite,
  onToggleWatched,
  favorites = [],
  watched = [],
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
            <div
              key={movie.id}
              className="group flex flex-col bg-neutral-900/50 border border-neutral-800 text-neutral-50 rounded-2xl p-3 gap-3 shrink-0 snap-start hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 w-40"
            >
              <div className="relative aspect-2/3 overflow-hidden rounded-xl">
                <img
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="flex items-center gap-1 absolute top-1 right-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-amber-400 border border-white/10 shadow-xl">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {movie.vote_average.toFixed(1)}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => onToggleFavorite(movie)}
                    className={`p-3 rounded-full transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer ${
                      isFav
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onToggleWatched(movie)}
                    className={`p-3 rounded-full transition-colors cursor-pointer ${
                      isWatched
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        : "bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
                    }`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 px-1">
                <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {movie.release_date?.slice(0, 4) || "N/A"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
