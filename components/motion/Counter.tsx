"use client";

// Animated number counter. Eases to the target when it enters view.

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function Counter({
  to,
  duration = 1.6,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setN(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {Math.round(n)}
      {suffix}
    </span>
  );
}
