import { Calendar, Clock, Star } from "lucide-react";
import type { Movie } from "../../types";

interface HeaderProps {
  movie: Movie | null;
}

export default function Header({ movie }: HeaderProps) {
  if (!movie) return;

  const { title, tagline, vote_average, release_date, runtime } = movie;

  return (
    <>
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-white">{title}</h2>
        <p className="text-amber-500 italic mt-1">{tagline}</p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-neutral-400 font-medium">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-amber-500 text-amber-500" />
          <span className="text-white">{vote_average.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} /> {release_date.slice(0, 4)}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} /> {runtime} хв
        </div>
      </div>
    </>
  );
}
