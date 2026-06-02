"use client";

import { useState } from "react";
import { Home, Heart, MicVocal, Menu, X } from "lucide-react";
import { usePlayerStore } from "@/stores/player-store";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const currentSong = usePlayerStore((state) => state.currentSong);
  const currentView = usePlayerStore((state) => state.currentView);
  const setView = usePlayerStore((state) => state.setView);

  const navigate = (view: "songs" | "lyrics") => {
    setView(view);
    setOpen(false);
  };

  const sidebar = (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-black/60 backdrop-blur-xl md:bg-black/30">
      <div className="p-6">
        <h1 className="text-xl font-bold md:text-2xl">Midnight Waves</h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-6">
        <button
          onClick={() => navigate("songs")}
          className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
            currentView === "songs"
              ? "bg-white/15 text-white"
              : "text-zinc-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Home size={20} />
          Home
        </button>

        <section className="border-t border-white/10 pt-4">
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase text-zinc-400">
            Playlists
          </h2>
          <button
            onClick={() => currentSong && navigate("lyrics")}
            disabled={!currentSong}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
              currentView === "lyrics" && currentSong
                ? "bg-white/15 text-white"
                : currentSong
                  ? "text-zinc-400 hover:bg-white/10 hover:text-white"
                  : "cursor-not-allowed text-zinc-600"
            }`}
          >
            <MicVocal size={20} className={currentSong ? "" : "opacity-40"} />
            Lyrics
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg p-3 text-zinc-400 transition hover:bg-white/10 hover:text-white">
            <Heart size={20} />
            Favorites
          </button>
        </section>
      </nav>
    </aside>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed top-4 left-4 z-40 rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white md:hidden ${open ? "hidden" : ""}`}
        >
        <Menu size={22} />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden w-64 flex-shrink-0 md:block">{sidebar}</div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-64 animate-[slide-in_0.2s_ease-out]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-lg p-1 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
}
