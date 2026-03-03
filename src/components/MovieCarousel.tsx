import { Eye, Bookmark, Star, Calendar } from "lucide-react";
import type { Movie } from "../types";

interface MovieCarouselProps {
  movies: Movie[] | null;
  loading: boolean;
  title: string;
}

export default function MovieCarousel({ movies, title }: MovieCarouselProps) {
  return (
    <div className="flex flex-col gap-2 uppercase bg-neutral-800 py-4 w-full px-40">
      <h3 className="text-2xl text-neutral-50 font-black">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-2">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="group flex flex-col bg-neutral-900/50 border border-neutral-800 text-neutral-50 rounded-2xl p-3 gap-3 shrink-0 snap-start hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 w-40"
          >
            <div className="relative aspect-2/3 overflow-hidden rounded-xl shadow-lg">
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
                <button className="p-3 bg-white/20 backdrop-blur-md hover:bg-amber-500 rounded-full transition-colors text-white cursor-pointer">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full transition-colors text-white cursor-pointer">
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
        ))}
      </div>
    </div>
  );
}
