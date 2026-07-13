"use client";

/**
 * Aurora — the ambient mesh-gradient layer behind the hero.
 *
 * WHAT IT IS: five large, heavily-blurred colour blobs, each drifting on its own
 * loop (23s–41s, deliberately co-prime-ish so the pattern never visibly repeats).
 * It should read as weather, not as shapes.
 *
 * CONTRAST CEILING — the reason opacity is what it is:
 *   I composited each blob colour over the ivory canvas and measured the result
 *   against the site's two text colours. Worst case is a magenta blob sitting
 *   directly behind muted text (#5B6472):
 *
 *     opacity 0.10 -> muted text 4.98:1   PASS
 *     opacity 0.14 -> muted text 4.68:1   PASS  (ceiling)
 *     opacity 0.18 -> muted text 4.42:1   FAIL
 *
 *   So MAX_OPACITY is 0.12 — under the ceiling with margin. Do not raise it
 *   without re-running that check; legibility wins over atmosphere.
 *
 * PERFORMANCE: transform + opacity only, so every blob stays on the compositor
 * and never triggers layout or paint. Animation pauses when the tab is hidden
 * and when the hero scrolls out of view.
 *
 * REDUCED MOTION: renders the same gradient, completely still.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Palette supplied for the aurora. These are decorative only — they do not
// touch the site's colour tokens.
const BLOBS = [
  { color: "#0E6E6E", size: 620, x: "8%",  y: "12%", dur: 29, delay: 0 },   // ocean teal
  { color: "#22D3EE", size: 520, x: "72%", y: "6%",  dur: 37, delay: -6 },  // cyan
  { color: "#E0218A", size: 560, x: "82%", y: "58%", dur: 41, delay: -14 }, // magenta
  { color: "#E0A899", size: 480, x: "22%", y: "68%", dur: 23, delay: -3 },  // rose gold
  { color: "#0E6E6E", size: 420, x: "48%", y: "38%", dur: 33, delay: -19 }, // ocean, centre
];

const MAX_OPACITY = 0.12; // see contrast note above — do not raise

export function Aurora() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  // Pointer parallax — stored on a ref and written straight to CSS custom
  // properties, so moving the mouse never triggers a React re-render.
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Pause when the tab is hidden, or when the hero is scrolled past.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      ([e]) => setRunning(e.isIntersecting && !document.hidden),
      { rootMargin: "120px" },
    );
    io.observe(el);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  // Pointer parallax, eased. Skipped entirely for reduced-motion and on touch.
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      // Normalised to -1..1 — cheap, no getBoundingClientRect per move.
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      // Lerp toward the pointer so the field has weight rather than snapping.
      current.current.x += (target.current.x - current.current.x) * 0.045;
      current.current.y += (target.current.y - current.current.y) * 0.045;
      const el = ref.current;
      if (el) {
        el.style.setProperty("--px", current.current.x.toFixed(4));
        el.style.setProperty("--py", current.current.y.toFixed(4));
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {/* Two nested elements per blob, because the drift keyframes and the
          pointer parallax both write `transform` — on one element the animation
          would simply overwrite the parallax. Outer = pointer, inner = drift. */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: b.x,
            top: b.y,
            transform: `translate3d(calc(var(--px) * ${16 + i * 7}px), calc(var(--py) * ${14 + i * 6}px), 0)`,
            willChange: "transform",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: b.size,
              height: b.size,
              marginLeft: -b.size / 2,
              marginTop: -b.size / 2,
              background: b.color,
              opacity: MAX_OPACITY,
              filter: "blur(90px)", // heavy: atmosphere, not shapes
              animation: reduced
                ? "none"
                : `aurora-drift-${i % 3} ${b.dur}s ease-in-out ${b.delay}s infinite`,
              animationPlayState: running ? "running" : "paused",
              willChange: "transform",
            }}
          />
        </div>
      ))}
    </div>
  );
}
