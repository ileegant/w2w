import { X, Star, Calendar, Clock, AlignLeft, Film } from "lucide-react";
import { TmdbService } from "../api/tmdb-service";
import { useMovieApi } from "../hooks/useMovieApi";
import { useState } from "react";
import { TrailerPlayer } from "./TrailerPlayer";
import { useMovies } from "../context/MovieContext";

export const MovieDetailsModal = () => {
  const { selectedMovieId, closeDetails } = useMovies();

  const { data: movie, loading } = useMovieApi(() =>
    selectedMovieId
      ? TmdbService.getMovieDetails(selectedMovieId)
      : Promise.resolve(null)
  );

  if (!selectedMovieId) return null;

  const [activeTab, setActiveTab] = useState<"info" | "trailer">("info");

  const trailerKey = useMovieApi(() =>
    TmdbService.getMovieTrailer(selectedMovieId)
  );

  if (!selectedMovieId) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={closeDetails}
      />

      <div className="relative bg-neutral-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={closeDetails}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {loading ? (
          <div className="h-100 flex items-center justify-center text-white">
            Завантаження...
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                className="w-full h-full object-cover"
                alt={movie?.title}
              />
            </div>

            <div className="px-6 py-4 flex flex-col gap-4 md:w-2/3">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {movie?.title}
                </h2>
                <p className="text-amber-500 italic mt-1">{movie?.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-400 font-medium">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-500 text-amber-500" />
                  <span className="text-white">
                    {movie?.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} /> {movie?.release_date.slice(0, 4)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} /> {movie?.runtime} хв
                </div>
              </div>

              <div className="flex border-b border-neutral-800">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 ${
                    activeTab === "info"
                      ? "border-amber-500 text-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  }`}
                >
                  <AlignLeft size={14} /> Опис
                </button>
                <button
                  onClick={() => setActiveTab("trailer")}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 ${
                    activeTab === "trailer"
                      ? "border-amber-500 text-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  }`}
                >
                  <Film size={14} /> Трейлер
                </button>
              </div>

              <div className="flex-1 min-h-77.5">
                {activeTab === "info" ? (
                  <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex flex-wrap gap-2">
                      {movie?.genres?.map((g: any) => (
                        <span
                          key={g.id}
                          className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300 border border-neutral-700"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-neutral-500 text-[10px] uppercase font-black mb-2">
                        Сюжет
                      </h4>
                      <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                        {movie?.overview || "Відсутній."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    {trailerKey.data ? (
                      <TrailerPlayer videoKey={trailerKey.data} />
                    ) : (
                      <div className="w-full aspect-video bg-neutral-800/50 flex items-center justify-center rounded-2xl border border-dashed border-neutral-700">
                        <p className="text-neutral-500 font-medium uppercase">
                          Трейлер не знайдено 😢
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
