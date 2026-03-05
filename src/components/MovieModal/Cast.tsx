import { SquareUser } from "lucide-react";
import type { Movie } from "../../types";

interface CastProps {
  movie: Movie | null;
}

export default function Cast({ movie }: CastProps) {
  if (!movie || !movie.credits) return;

  const { credits } = movie;

  return (
    <div className="grid grid-cols-5 gap-1 text-neutral-50">
      {credits.cast.slice(0, 10).map((actor) => (
        <div
          key={actor.id}
          className="group flex flex-col bg-neutral-900/50 border border-neutral-800 text-neutral-50 rounded-2xl p-1 gap-1 shrink-0 snap-start hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 w-auto"
        >
          <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-neutral-800">
            {!actor.profile_path ? (
              <div className="flex justify-center">
                <SquareUser className="text-neutral-500" />
              </div>
            ) : (
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/400x600?text=No+Photo"
                }
                alt={actor.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-1">
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 p-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-xs leading-tight text-amber-400">
                  {actor.name}
                </h3>
                <div className="flex flex-wrap items-center gap-1 text-neutral-300 text-[9px] mt-1 leading-tight">
                  <span className="italic line-clamp-2">
                    {actor.character || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
