"use client";
import { Song } from "@/types/song";
import { usePlayerStore } from "@/stores/player-store";

interface SongCardProps {
  song: Song;
}

export default function SongCard({
  song,
}: SongCardProps) {
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);

  return (
    <div onClick={() => setCurrentSong(song)} className="group cursor-pointer rounded-xl bg-white/5 p-4 transition hover:bg-white/10">
      <div className="aspect-square overflow-hidden rounded-lg bg-zinc-800">
        <img
          src={song.cover}
          alt={song.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">
          {song.title}
        </h3>

        <p className="text-sm text-zinc-400">
          {song.artist}
        </p>
      </div>
    </div>
  );
}