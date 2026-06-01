"use client";

import { useEffect, useRef } from "react";

import { usePlayerStore } from "@/stores/player-store";

export default function AudioProvider() {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const {
    currentSong,
    isPlaying,

    currentTime,
    setCurrentTime,

    setDuration,
  } = usePlayerStore();

  useEffect(() => {
    if (!audioRef.current) return;

    if (currentSong) {
      audioRef.current.src =
        currentSong.audio;

      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      onLoadedMetadata={(e) =>
        setDuration(
          e.currentTarget.duration
        )
      }
      onTimeUpdate={(e) =>
        setCurrentTime(
          e.currentTarget.currentTime
        )
      }
    />
  );
}