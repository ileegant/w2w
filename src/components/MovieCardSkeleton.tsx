export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col bg-neutral-900/50 border border-neutral-800 rounded-2xl p-3 gap-3 shrink-0 w-40 animate-pulse">
      <div className="relative aspect-2/3 bg-neutral-800 rounded-xl overflow-hidden">
        <div className="absolute top-1 right-1 w-10 h-6 bg-neutral-700 rounded-lg"></div>
      </div>

      <div className="flex flex-col gap-2 px-1">
        <div className="space-y-1">
          <div className="h-3 w-full bg-neutral-800 rounded"></div>
          <div className="h-3 w-2/3 bg-neutral-800 rounded"></div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="w-3 h-3 bg-neutral-800 rounded-full"></div>
          <div className="h-2 w-10 bg-neutral-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}
