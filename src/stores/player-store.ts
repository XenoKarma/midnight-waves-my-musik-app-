import { create } from "zustand";
import { Song } from "@/types/song";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;

  currentTime: number;
  duration: number;

  setCurrentSong: (song: Song) => void;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

export const usePlayerStore =
  create<PlayerState>((set) => ({
    currentSong: null,
    isPlaying: false,

    currentTime: 0,
    duration: 0,

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

    setCurrentTime: (time) =>
      set({
        currentTime: time,
      }),

    setDuration: (duration) =>
      set({
        duration,
      }),
  }));