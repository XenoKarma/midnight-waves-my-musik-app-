import Sidebar from "@/components/layout/sidebar";
import BottomPlayer from "@/components/player/bottom-player";
import AudioProvider from "@/components/player/audio-provider";
import VideoBackground from "@/components/player/video-background";
import FullscreenPlayer from "@/components/player/fullscreen-player";
import MainLayout from "@/components/layout/main-layout";
import ViewRouter from "@/components/layout/view-router";

export default function Home() {
  return (
    <main className="flex h-screen flex-col text-white">
      <VideoBackground />
      <AudioProvider />
      <FullscreenPlayer />

      <MainLayout>
        <Sidebar />
        <ViewRouter />
      </MainLayout>

      <MainLayout as="fixed">
        <BottomPlayer />
      </MainLayout>
    </main>
  );
}