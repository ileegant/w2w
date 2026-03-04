import { useMovies } from "../context/MovieContext";
import type { Movie } from "../types";
import { Eye, Bookmark, Star, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, watched, toggleFavorite, toggleWatched, openDetails } =
    useMovies();

  const isFav = favorites.some((fav) => fav.id === movie.id);
  const isWatched = watched.some((w) => w.id === movie.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const handleWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatched(movie);
  };

  return (
    <div
      onClick={() => openDetails(movie.id)}
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
            onClick={handleFavorite}
            className={`p-3 rounded-full transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer ${
              isFav
                ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button
            onClick={handleWatched}
            className={`p-3 rounded-full transition-colors cursor-pointer ${
              isWatched
                ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110"
                : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10"
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
}
