"use client";

import { usePlayerStore } from "@/stores/player-store";
import { useShallow } from "zustand/react/shallow";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";

const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

export default function FullscreenPlayer() {
  const {
    currentSong,
    isPlaying,
    isFullscreen,
    currentTime,
    duration,
    togglePlay,
    nextSong,
    previousSong,
    setFullscreen,
  } = usePlayerStore(
    useShallow((state) => ({
      currentSong: state.currentSong,
      isPlaying: state.isPlaying,
      isFullscreen: state.isFullscreen,
      currentTime: state.currentTime,
      duration: state.duration,
      togglePlay: state.togglePlay,
      nextSong: state.nextSong,
      previousSong: state.previousSong,
      setFullscreen: state.setFullscreen,
    }))
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {currentSong && isFullscreen && (
        <motion.div
          key="fullscreen"
          variants={stagger}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[60] flex select-none flex-col items-center justify-center bg-black/40"
        >
          <motion.button
            variants={fadeIn}
            onClick={() => setFullscreen(false)}
            className="absolute top-6 right-6 z-10 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <X size={24} />
          </motion.button>

          <motion.div
              variants={stagger}
              className="flex w-full max-w-md flex-col items-center gap-6 px-6 sm:gap-8"
            >
              <motion.div
                variants={scaleIn}
                className="h-48 w-48 overflow-hidden rounded-2xl shadow-2xl sm:h-72 sm:w-72"
              >
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="w-full text-center">
                <h2 className="text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
                  {currentSong.title}
                </h2>
                <p className="mt-1 text-sm text-white/60 drop-shadow">
                  {currentSong.artist}
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex w-full flex-col gap-2"
              >
                <div className="group relative w-full cursor-pointer">
                  <div className="h-1 w-full rounded-full bg-white/10 sm:h-1.5">
                    <div
                      className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-white shadow-lg" />
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between text-xs text-white/40">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-4 sm:gap-6"
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={previousSong}
                  className="rounded-full p-2 text-white/70 transition hover:text-white"
                >
                  <SkipBack size={28} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl transition hover:scale-105 sm:h-14 sm:w-14"
                >
                  {isPlaying ? (
                    <Pause size={22} />
                  ) : (
                    <Play size={22} className="ml-1" />
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSong}
                  className="rounded-full p-2 text-white/70 transition hover:text-white"
                >
                  <SkipForward size={28} />
                </motion.button>
              </motion.div>
            </motion.div>

          <motion.div
            variants={fadeIn}
            className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
