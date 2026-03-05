import { TrailerPlayer } from "./TrailerPlayer";

interface TrailerProps {
  trailerKey: string | null;
}

export default function Trailer({ trailerKey }: TrailerProps) {
  return (
    <div className="h-full">
      {trailerKey ? (
        <TrailerPlayer videoKey={trailerKey} />
      ) : (
        <div className="w-full aspect-video bg-neutral-800/50 flex items-center justify-center rounded-2xl border border-dashed border-neutral-700">
          <p className="text-neutral-500 font-medium uppercase">
            Трейлер не знайдено
          </p>
        </div>
      )}
    </div>
  );
}
