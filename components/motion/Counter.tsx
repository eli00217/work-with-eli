"use client";

/**
 * Counter — counts up to a number.
 *
 * WHAT WAS BROKEN (this shipped four zeros to production):
 *
 *   const [n, setN] = useState(0);                          // ← SSR rendered "0"
 *   const inView = useInView(ref, { once: true, amount: 0.4 });
 *   useEffect(() => { if (!inView) return; ...raf... }, [inView]);
 *
 *   1. The server-rendered HTML literally contained "0". With JS disabled, or
 *      before hydration, or if the observer never fired, the visitor saw 0 —
 *      permanently. Search engines indexed "0" as well.
 *   2. The count was gated on an IntersectionObserver. The stat strip sits
 *      ABOVE THE FOLD, so it is already in view on mount — exactly the case
 *      where such a trigger is least reliable: it can resolve before hydration
 *      attaches, and `once: true` means it never fires again.
 *
 * THE FIX:
 *   - `useState(to)` — the correct number is in the DOM on first paint, is in
 *     the server-rendered HTML, and survives JS failing entirely.
 *   - No observer. The animation starts on mount, full stop.
 *   - A failsafe forces the final value even if frames are dropped or the tab
 *     is backgrounded mid-animation.
 *   - prefers-reduced-motion renders the final number with no animation.
 *
 * The count-up is now a progressive enhancement on top of an already-correct
 * value, rather than the only thing that makes the value correct.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Counter({
  to,
  duration = 1.6,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  // Seed with the FINAL value: SSR, no-JS, and pre-hydration all show it.
  const [n, setN] = useState(to);
  const ran = useRef(false);

  useEffect(() => {
    if (reduced) {
      setN(to);
      return;
    }
    if (ran.current) return;
    ran.current = true;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setN(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };

    setN(0);
    raf = requestAnimationFrame(tick);

    // Dropped frames, throttled rAF, backgrounded tab — the number still lands.
    const failsafe = window.setTimeout(() => setN(to), duration * 1000 + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [to, duration, reduced]);

  return <span className={className}>{Math.round(n)}</span>;
}
