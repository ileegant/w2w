import { X } from "lucide-react";
import { TmdbService } from "../../api/tmdb-service";
import { useMovieApi } from "../../hooks/useMovieApi";
import { useState } from "react";
import { useMovies } from "../../context/MovieContext";
import MovieModalSkeleton from "../MovieModalSkeleton";
import Tab from "./Tab";
import type { TabType } from "../../types";
import Info from "./Info";
import Trailer from "./Trailer";
import Cast from "./Cast";
import Header from "./Header";

export const DetailCard = () => {
  const { selectedMovieId, closeDetails } = useMovies();

  const { data: movie, loading } = useMovieApi(() =>
    selectedMovieId
      ? TmdbService.getMovieDetails(selectedMovieId)
      : Promise.resolve(null)
  );

  if (!selectedMovieId) return null;

  const [activeTab, setActiveTab] = useState<TabType>("info");

  const handleTab = (tab: TabType) => {
    setActiveTab(tab);
  };

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
          <MovieModalSkeleton />
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
              <Header movie={movie} />

              <Tab activeTab={activeTab} handleTab={handleTab} />

              <div className="flex-1 min-h-77.5">
                {activeTab === "info" ? (
                  <Info movie={movie} />
                ) : activeTab === "trailer" ? (
                  <Trailer trailerKey={trailerKey.data} />
                ) : (
                  <Cast movie={movie} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
