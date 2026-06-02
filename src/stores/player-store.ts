import { create } from "zustand";
import { Song } from "@/types/song";
import { songs } from "@/data/songs";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;

  currentTime: number;
  duration: number;

  volume: number;
  isFullscreen: boolean;

  setCurrentSong: (song: Song) => void;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  nextSong: () => void;
  previousSong: () => void;

  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setFullscreen: (fullscreen: boolean) => void;
}

export const usePlayerStore =
  create<PlayerState>((set, get) => ({
    currentSong: null,
    isPlaying: false,

    currentTime: 0,
    duration: 0,

    volume: 0.7,
    isFullscreen: false,

    setCurrentSong: (song) =>
      set({
        currentSong: song,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      }),

    play: () =>
      set({
        isPlaying: true,
      }),

    pause: () =>
      set({
        isPlaying: false,
      }),

    togglePlay: () =>
      set((state) => ({
        isPlaying: !state.isPlaying,
      })),

    nextSong: () => {
      const { currentSong } = get();
      if (!currentSong) return;
      const idx = songs.findIndex((s) => s.id === currentSong.id);
      if (idx === -1) return;
      const nextIdx = idx >= songs.length - 1 ? 0 : idx + 1;
      set({
        currentSong: songs[nextIdx],
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
    },

    previousSong: () => {
      const { currentSong } = get();
      if (!currentSong) return;
      const idx = songs.findIndex((s) => s.id === currentSong.id);
      if (idx === -1) return;
      const prevIdx = idx <= 0 ? songs.length - 1 : idx - 1;
      set({
        currentSong: songs[prevIdx],
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
    },

    setCurrentTime: (time) =>
      set({
        currentTime: time,
      }),

    setDuration: (duration) =>
      set({
        duration,
      }),

    setVolume: (volume) =>
      set({
        volume,
      }),

    setFullscreen: (fullscreen) =>
      set({
        isFullscreen: fullscreen,
      }),
  }));