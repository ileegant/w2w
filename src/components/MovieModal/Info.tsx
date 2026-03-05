import type { Movie } from "../../types";

interface InfoProps {
  movie: Movie | null;
}

export default function Info({ movie }: InfoProps) {
  if (!movie) return;

  const { genres, overview } = movie;

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-wrap gap-2">
        {genres?.map((genre) => (
          <span
            key={genre.id}
            className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300 border border-neutral-700"
          >
            {genre.name}
          </span>
        ))}
      </div>
      <div>
        <h4 className="text-neutral-500 text-[10px] uppercase font-black mb-2">
          Сюжет
        </h4>
        <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
          {overview || "Відсутній."}
        </p>
      </div>
    </div>
  );
}
