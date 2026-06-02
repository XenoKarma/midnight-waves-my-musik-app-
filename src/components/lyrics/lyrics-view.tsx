"use client";

import { usePlayerStore } from "@/stores/player-store";
import { lyrics } from "@/data/lyrics";

export default function LyricsView() {
  const currentSong = usePlayerStore((state) => state.currentSong);

  if (!currentSong) return null;

  const songLyrics = lyrics[currentSong.id];

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-4 py-12">
      <div className="w-full max-w-lg space-y-2 text-center">
        {songLyrics?.map((line, i) => (
          <p
            key={i}
            className={`transition-all duration-300 ${
              line === ""
                ? "h-4"
                : "text-base leading-relaxed text-zinc-400 hover:text-white"
            }`}
          >
            {line}
          </p>
        )) ?? (
          <p className="text-zinc-500">No lyrics available for this song.</p>
        )}
      </div>
    </div>
  );
}
