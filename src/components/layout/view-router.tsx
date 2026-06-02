"use client";

import { usePlayerStore } from "@/stores/player-store";
import SongGrid from "@/components/songs/song-grid";
import LyricsView from "@/components/lyrics/lyrics-view";

export default function ViewRouter() {
  const currentView = usePlayerStore((state) => state.currentView);

  return (
    <section className="flex-1 overflow-y-auto p-4 pt-14 pb-32 sm:p-8 sm:pb-36">
      {currentView === "songs" ? <SongGrid /> : <LyricsView />}
    </section>
  );
}
