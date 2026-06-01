import { Home, Library, Heart } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-black/30 backdrop-blur-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Midnight Waves
        </h1>
      </div>

      <nav className="space-y-2 px-4">
        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-white/10">
          <Home size={20} />
          Home
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-white/10">
          <Library size={20} />
          Library
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-white/10">
          <Heart size={20} />
          Favorites
        </button>
      </nav>
    </aside>
  );
}