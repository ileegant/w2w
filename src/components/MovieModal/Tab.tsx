import { AlignLeft, Film, UsersRound } from "lucide-react";
import type { TabType } from "../../types";

interface TabProps {
  activeTab: string;
  handleTab: (tab: TabType) => void;
}

export default function Tab({ activeTab, handleTab }: TabProps) {
  return (
    <div className="flex border-b border-neutral-800">
      <button
        onClick={() => handleTab("info")}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 ${
          activeTab === "info"
            ? "border-amber-500 text-white"
            : "border-transparent text-neutral-500 hover:text-neutral-300 cursor-pointer"
        }`}
      >
        <AlignLeft size={14} /> Опис
      </button>
      <button
        onClick={() => handleTab("trailer")}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 ${
          activeTab === "trailer"
            ? "border-amber-500 text-white"
            : "border-transparent text-neutral-500 hover:text-neutral-300 cursor-pointer"
        }`}
      >
        <Film size={14} /> Трейлер
      </button>
      <button
        onClick={() => handleTab("actors")}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 ${
          activeTab === "actors"
            ? "border-amber-500 text-white"
            : "border-transparent text-neutral-500 hover:text-neutral-300 cursor-pointer"
        }`}
      >
        <UsersRound size={14} /> Актори
      </button>
    </div>
  );
}
