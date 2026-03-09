import { Bookmark, Calendar, Clock, Eye, Star } from "lucide-react";
import type { Movie } from "../../types";
import { useMovies } from "../../context/MovieContext";

interface HeaderProps {
  movie: Movie | null;
}

export default function Header({ movie }: HeaderProps) {
  if (!movie) return;

  const { title, tagline, vote_average, release_date, runtime } = movie;
  const { favorites, watched, toggleFavorite, toggleWatched } = useMovies();

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

  const released = (() => {
    if (!release_date) return false;
    const releaseDate = new Date(release_date);
    const today = new Date();
    return releaseDate <= today;
  })();

  return (
    <>
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-white">{title}</h2>
        <p className="text-amber-500 italic mt-1">{tagline}</p>
      </div>

      <div className="flex flex-wrap gap-1 text-sm text-neutral-400 font-medium">
        {released ? (
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg border border-amber-500/20">
            <Star size={16} className="fill-amber-500" />
            <span className="font-bold text-sm">
              {vote_average > 0 ? vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/20">
            <Clock size={16} />
            <span className="text-xs font-bold uppercase">скоро у кіно</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded-lg border border-neutral-800">
          <Calendar size={14} className="text-neutral-500" />
          <span>{release_date?.split("-").reverse().join(".")}</span>
        </div>

        {runtime && runtime > 0 && (
          <div className="flex items-center gap-1 text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded-lg border border-neutral-800">
            <Clock size={14} className="text-neutral-500" />
            <span>{runtime} хв</span>
          </div>
        )}

        <button
          onClick={handleFavorite}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border border-neutral-800 cursor-pointer ${
            isFav
              ? "bg-amber-500 text-black"
              : "text-neutral-400 bg-neutral-900/50 hover:bg-white/20"
          }`}
        >
          <Bookmark className="w-4 h-4" />
        </button>

        <button
          onClick={handleWatched}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border border-neutral-800 cursor-pointer ${
            isWatched
              ? "bg-emerald-500 text-white"
              : "text-neutral-400 bg-neutral-900/50 hover:bg-white/20"
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
