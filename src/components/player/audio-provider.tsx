"use client";

import { useEffect, useRef } from "react";

import { usePlayerStore } from "@/stores/player-store";

export default function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { currentSong, isPlaying, volume, setCurrentTime, setDuration, nextSong } =
    usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audio;
    audio.play();
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  return (
    <audio
      ref={audioRef}
      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      onEnded={nextSong}
    />
  );
}