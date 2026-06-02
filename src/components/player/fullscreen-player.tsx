"use client";

import { usePlayerStore } from "@/stores/player-store";
import { useShallow } from "zustand/react/shallow";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";

export default function FullscreenPlayer() {
  const {
    currentSong,
    isPlaying,
    isFullscreen,
    currentTime,
    duration,
    togglePlay,
    nextSong,
    previousSong,
    setFullscreen,
  } = usePlayerStore(
    useShallow((state) => ({
      currentSong: state.currentSong,
      isPlaying: state.isPlaying,
      isFullscreen: state.isFullscreen,
      currentTime: state.currentTime,
      duration: state.duration,
      togglePlay: state.togglePlay,
      nextSong: state.nextSong,
      previousSong: state.previousSong,
      setFullscreen: state.setFullscreen,
    }))
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!currentSong || !isFullscreen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl animate-[fade-in_0.3s_ease-in-out]">
      <button
        onClick={() => setFullscreen(false)}
        className="absolute top-6 right-6 rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
      >
        <X size={24} />
      </button>

      <div className="flex w-full max-w-md flex-col items-center gap-8 px-6">
        <div className="h-64 w-64 overflow-hidden rounded-2xl shadow-2xl sm:h-72 sm:w-72">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-white">
            {currentSong.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            {currentSong.artist}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="group relative w-full cursor-pointer">
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-white shadow-lg" />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between text-xs text-zinc-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={previousSong}
            className="rounded-full p-2 text-zinc-300 transition hover:text-white active:scale-90"
          >
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-xl transition hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
          </button>
          <button
            onClick={nextSong}
            className="rounded-full p-2 text-zinc-300 transition hover:text-white active:scale-90"
          >
            <SkipForward size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
