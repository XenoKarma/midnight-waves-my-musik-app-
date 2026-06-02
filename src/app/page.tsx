import dynamic from "next/dynamic";
import Sidebar from "@/components/layout/sidebar";
import BottomPlayer from "@/components/player/bottom-player";
import AudioProvider from "@/components/player/audio-provider";
import VideoBackground from "@/components/player/video-background";
import MainLayout from "@/components/layout/main-layout";

const FullscreenPlayer = dynamic(
  () => import("@/components/player/fullscreen-player")
);

const ViewRouter = dynamic(
  () => import("@/components/layout/view-router")
);

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