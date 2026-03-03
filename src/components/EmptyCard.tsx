import { Calendar, Image } from "lucide-react";

export default function EmptyCard() {
  return (
    <div className="flex flex-col gap-3 border border-dashed text-neutral-50 border-neutral-700 rounded-2xl p-3 w-40">
      <div className="flex items-center justify-center h-50 relative aspect-2/3 bg-neutral-700 font-bold overflow-hidden rounded-xl">
        <Image className="w-10 h-10" />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-bold text-sm leading-tight line-clamp-2">
          XXXX XXXX
        </h3>
        <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium uppercase tracking-wider">
          <Calendar className="w-3 h-3" />
          xxxx
        </div>
      </div>
    </div>
  );
}
