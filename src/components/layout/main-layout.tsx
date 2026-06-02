"use client";

import { usePlayerStore } from "@/stores/player-store";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: "flex" | "fixed";
}

export default function MainLayout({ children, as = "flex" }: Props) {
  const isFullscreen = usePlayerStore((state) => state.isFullscreen);

  const className = `transition-opacity duration-300 ${isFullscreen ? "pointer-events-none opacity-0" : ""}`;

  if (as === "fixed") {
    return <div className={className}>{children}</div>;
  }

  return <div className={`flex flex-1 overflow-hidden ${className}`}>{children}</div>;
}
