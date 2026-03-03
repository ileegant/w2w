import { X, Star, Calendar, Clock, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { TmdbService } from "../api/tmdb-service";

interface Props {
  movieId: number;
  onClose: () => void;
}

export const MovieDetailsModal = ({ movieId, onClose }: Props) => {
  const [movie, setMovie] = useState<any>(null); // Можна розширити інтерфейс Movie
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await TmdbService.getMovieDetails(movieId);
        setMovie(data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-neutral-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center text-white">
            Завантаження...
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Poster Section */}
            <div className="w-full md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-full h-full object-cover"
                alt={movie.title}
              />
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 flex flex-col gap-6 md:w-2/3">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {movie.title}
                </h2>
                <p className="text-amber-500 italic mt-1">{movie.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-400 font-medium">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-500 text-amber-500" />
                  <span className="text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} /> {movie.release_date.slice(0, 4)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} /> {movie.runtime} хв
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g: any) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300 border border-neutral-700"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">
                  Опис
                </h4>
                <p className="text-neutral-400 leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              <div className="flex gap-4 pt-4 mt-auto">
                <button className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-amber-500 transition-colors">
                  Дивитися зараз
                </button>
                <button className="p-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors">
                  <Globe size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
