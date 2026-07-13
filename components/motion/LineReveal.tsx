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
//
// ALSO FIXED — WORD FUSION. Each line is a block element, and JSX strips the
// whitespace between sibling elements. So two stacked lines produced:
//
//   <h1><span>Your website is</span><span>the first thing</span></h1>
//   textContent -> "Your website isthe first thing"
//
// The words visually looked separated (they are on different lines) but had no
// separator in the text. That broke screen readers, copy-paste, and how search
// engines read the heading. Each line now emits a trailing space. Inside a
// block element a trailing space collapses, so nothing moves visually — but the
// word boundary is back in textContent.

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
    return (
      <span className={className}>
        {children}{" "}
      </span>
    );
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
        {children}{" "}
      </motion.span>
    </span>
  );
}
