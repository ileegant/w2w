export default function MovieModalSkeleton() {
  return (
    <div className="flex flex-col md:flex-row animate-pulse">
      <div className="w-full md:w-1/3 aspect-2/3 bg-neutral-800 rounded-lg"></div>

      <div className="px-6 py-4 flex flex-col gap-6 md:w-2/3">
        <div className="space-y-3">
          <div className="h-10 w-3/4 bg-neutral-800 rounded-md"></div>
          <div className="h-4 w-1/2 bg-neutral-800 rounded-md"></div>
        </div>

        <div className="flex gap-4">
          <div className="h-5 w-16 bg-neutral-800 rounded-md"></div>
          <div className="h-5 w-16 bg-neutral-800 rounded-md"></div>
          <div className="h-5 w-16 bg-neutral-800 rounded-md"></div>
        </div>

        <div className="flex border-b border-neutral-800 gap-6">
          <div className="h-8 w-20 bg-neutral-800 rounded-t-md"></div>
          <div className="h-8 w-20 bg-neutral-800 rounded-t-md"></div>
        </div>

        <div className="flex-1 min-h-77.5 space-y-4 pt-2">
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-neutral-800 rounded-full"></div>
            <div className="h-6 w-20 bg-neutral-800 rounded-full"></div>
            <div className="h-6 w-14 bg-neutral-800 rounded-full"></div>
          </div>

          <div className="space-y-3">
            <div className="h-3 w-20 bg-neutral-800 rounded"></div>
            <div className="h-4 w-full bg-neutral-800 rounded"></div>
            <div className="h-4 w-full bg-neutral-800 rounded"></div>
            <div className="h-4 w-2/3 bg-neutral-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
