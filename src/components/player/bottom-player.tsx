"use client";

import { usePlayerStore } from "@/stores/player-store";
import { useShallow } from "zustand/react/shallow";
import {Play, Pause} from "lucide-react";
import { formatTime } from "@/utils/format-time";

export default function BottomPlayer() {
  const { 
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
  } = usePlayerStore(
    useShallow((state) => ({
      currentSong: state.currentSong,
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      currentTime: state.currentTime,
      duration: state.duration,
    }))
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
          <button
  onClick={togglePlay}
  className="rounded-full bg-white p-3 text-black"
>
  {isPlaying ? (
    <Pause size={18} />
  ) : (
    <Play size={18} />
  )}
</button>
<div className="ml-10 flex-1">
  <input
    type="range"
    min={0}
    max={duration || 0}
    value={currentTime}
    readOnly
    className="w-full"
  />

  <div className="flex justify-between text-xs text-zinc-400">
    <span>
      {formatTime(currentTime)}
    </span>

    <span>
      {formatTime(duration)}
    </span>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}