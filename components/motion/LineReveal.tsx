"use client";

// Headline line reveal — each line slides up from behind a mask.
//
// FIXED: this previously gated visibility entirely on `whileInView`:
//
//   initial={{ y: "110%" }}          // pushed out of an overflow-hidden mask
//   whileInView={{ y: "0%" }}        // the ONLY thing that brings it back
//   viewport={{ once, amount: 0.4 }}
//
// If that observer never fired, the text stayed outside its mask — permanently
// invisible. That is what emptied the hero. `amount: 0.4` is especially fragile
// on a very tall clamp()-sized headline, where 40% of a 130px line must clear
// the trigger zone before anything appears.
//
// Now: a 1.4s failsafe force-reveals regardless of the observer, so the failure
// mode is "visible" rather than "invisible". Desktop animation is unchanged.

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function LineReveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 1400);
    return () => clearTimeout(t);
  }, []);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const open = inView || failsafe;

  return (
    <span ref={ref} className="block overflow-hidden pb-[0.12em]">
      <motion.span
        initial={false}
        animate={{ y: open ? "0%" : "110%" }}
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
