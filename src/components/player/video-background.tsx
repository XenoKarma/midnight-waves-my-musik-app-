"use client";

import { usePlayerStore } from "@/stores/player-store";

export default function VideoBackground() {
  const currentSong = usePlayerStore((state) => state.currentSong);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {currentSong && (
        <video
          key={currentSong.id}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full animate-[fade-in_0.5s_ease-in-out] object-cover"
        >
          <source src={currentSong.video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
