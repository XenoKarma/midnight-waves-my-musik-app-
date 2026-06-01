"use client";

import { usePlayerStore } from "@/stores/player-store";

export default function BottomPlayer() {
  const currentSong =
    usePlayerStore(
      (state) => state.currentSong
    );

  if (!currentSong) {
    return (
      <div className="h-24 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex h-full items-center justify-center text-zinc-500">
          Select a song
        </div>
      </div>
    );
  }

  return (
    <div className="h-24 border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="flex h-full items-center px-6">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="h-14 w-14 rounded-lg object-cover"
        />

        <div className="ml-4">
          <h3 className="font-medium">
            {currentSong.title}
          </h3>

          <p className="text-sm text-zinc-400">
            {currentSong.artist}
          </p>
        </div>
      </div>
    </div>
  );
}