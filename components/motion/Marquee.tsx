"use client";

// Seamless marquee. The track is duplicated and translated -50%, so the
// second copy lands exactly where the first began. CSS animation (compositor
// thread) rather than JS, and it pauses on hover.

import type { ReactNode } from "react";

export function Marquee({
  children,
  slow = false,
  className,
}: {
  children: ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      <div
        className={`flex w-max shrink-0 items-center ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
