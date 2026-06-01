import { songs } from "@/data/songs";
import SongCard from "./song-card";

export default function SongGrid() {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">
        Featured Songs
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
          />
        ))}
      </div>
    </div>
  );
}