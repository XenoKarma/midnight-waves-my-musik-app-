"use client";

import { usePlayerStore } from "@/stores/player-store";
import { useShallow } from "zustand/react/shallow";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export default function BottomPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    setFullscreen,
  } = usePlayerStore(
    useShallow((state) => ({
      currentSong: state.currentSong,
      isPlaying: state.isPlaying,
      currentTime: state.currentTime,
      duration: state.duration,
      volume: state.volume,
      togglePlay: state.togglePlay,
      nextSong: state.nextSong,
      previousSong: state.previousSong,
      setVolume: state.setVolume,
      setFullscreen: state.setFullscreen,
    }))
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const heightClass = "h-20 sm:h-24";

  if (!currentSong) {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${heightClass} border-t border-white/5 bg-black/60 backdrop-blur-xl`}>
        <div className="flex h-full items-center justify-center">
          <div className="flex items-center gap-3 text-zinc-500">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-zinc-600" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase">
              Select a song
            </span>
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-zinc-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setFullscreen(true)}
      className={`fixed bottom-0 left-0 right-0 z-50 ${heightClass} cursor-pointer border-t border-white/5 bg-black/60 backdrop-blur-xl`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto grid h-full max-w-7xl grid-cols-2 items-center gap-2 px-3 sm:grid-cols-3 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800 shadow-lg sm:h-14 sm:w-14 sm:rounded-xl">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              {currentSong.title}
            </h3>
            <p className="truncate text-xs text-zinc-400">
              {currentSong.artist}
            </p>
          </div>
        </div>

        <div className="hidden flex-col items-center gap-1.5 sm:flex">
          <div className="group relative w-full max-w-lg cursor-pointer">
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-1.5 -top-1.5 h-4 w-4 scale-0 rounded-full bg-white shadow-lg transition group-hover:scale-100" />
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-lg justify-between text-[11px] text-zinc-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-1 sm:gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); previousSong(); }}
            className="rounded-full p-1.5 text-zinc-400 transition hover:text-white active:scale-90 sm:p-2"
          >
            <SkipBack size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition hover:bg-white/20 active:scale-95 sm:h-10 sm:w-10"
          >
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSong(); }}
            className="rounded-full p-1.5 text-zinc-400 transition hover:text-white active:scale-90 sm:p-2"
          >
            <SkipForward size={18} />
          </button>

          <div className="ml-2 hidden items-center gap-1.5 lg:flex">
            <button
              onClick={(e) => { e.stopPropagation(); setVolume(volume === 0 ? 0.7 : 0); }}
              className="text-zinc-400 transition hover:text-white"
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/10 accent-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
