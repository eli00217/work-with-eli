"use client";

// Scroll reveal. Transform + opacity only (no layout thrash).
// amount:0.2 rather than a negative rootMargin — negative margins fire
// unreliably on short viewports, which is how images end up invisible on mobile.

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Dir = "up" | "down" | "left" | "right" | "none";
const offset: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  dir = "up",
  delay = 0,
  duration = 0.75,
  className,
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { x, y } = offset[dir];

  // Failsafe: if the observer never fires, reveal anyway. Content must never be
  // left permanently invisible because a scroll trigger was missed.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [failsafe, setFailsafe] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 1400);
    return () => clearTimeout(t);
  }, []);
  const open = inView || failsafe;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        open
          ? { opacity: 1, x: 0, y: 0 }
          : reduced
            ? { opacity: 0 }
            : { opacity: 0, x, y }
      }
      transition={
        reduced
          ? { duration: 0.01 }
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
