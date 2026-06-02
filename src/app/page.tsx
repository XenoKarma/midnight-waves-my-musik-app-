import Sidebar from "@/components/layout/sidebar";
import BottomPlayer from "@/components/player/bottom-player";
import SongGrid from "@/components/songs/song-grid";
import AudioProvider from "@/components/player/audio-provider";
import VideoBackground from "@/components/player/video-background";
import FullscreenPlayer from "@/components/player/fullscreen-player";
import MainLayout from "@/components/layout/main-layout";

export default function Home() {
  return (
    <main className="flex h-screen flex-col text-white">
      <VideoBackground />
      <AudioProvider />
      <FullscreenPlayer />

      <MainLayout>
        <Sidebar />
        <section className="flex-1 overflow-y-auto p-8 pb-28">
          <SongGrid />
        </section>
      </MainLayout>

      <MainLayout as="fixed">
        <BottomPlayer />
      </MainLayout>
    </main>
  );
}