import Sidebar from "@/components/layout/sidebar";
import BottomPlayer from "@/components/player/bottom-player";
import SongGrid from "@/components/songs/song-grid";
import AudioProvider from "@/components/player/audio-provider";
import VideoBackground from "@/components/player/video-background";

export default function Home() {
  return (
    <main className="flex h-screen flex-col text-white">
      <VideoBackground />
      <AudioProvider />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <section className="flex-1 overflow-y-auto p-8 pb-28">
          <SongGrid />
        </section>
      </div>

      <BottomPlayer />
    </main>
  );
}