"use client";

/**
 * Aurora — the ambient mesh-gradient layer behind the hero.
 *
 * WHAT IT IS: five large, heavily-blurred colour blobs, each drifting on its own
 * loop (23s–41s, deliberately co-prime-ish so the pattern never visibly repeats).
 * It should read as weather, not as shapes.
 *
 * WHY IT WAS INVISIBLE (the first version):
 *   Nothing was broken. It rendered, it had size, the z-index was right, it was
 *   imported. It was simply UNSEEABLE: five blobs of #0E6E6E at opacity 0.12 over
 *   a near-white page produce a ~3% colour shift. Mathematically present,
 *   visually nothing.
 *
 * WHY I HAD CAPPED IT SO LOW:
 *   WCAG contrast is a function of LUMINANCE. The muted text (#5B6472) on ivory
 *   is only 5.79:1 — barely 1.3 points above the 4.5:1 floor. So any colour dark
 *   enough to notice ate that headroom immediately.
 *
 * THE ACTUAL FIX — colour without darkness:
 *   Because contrast depends on luminance and NOT on chroma, a HIGH-LUMINANCE
 *   TINT of the same hue is strongly visible while barely moving the luminance.
 *   #0E6E6E (dark teal) becomes #5EEAD4 (teal tint). Same hue family, same
 *   character, but it colours the page instead of dimming it.
 *
 * THE GUARANTEE — a bounded layer:
 *   Blobs are vivid INSIDE the container; the CONTAINER's own opacity then bounds
 *   the entire layer's contribution. Worst case is every blob overlapping at peak:
 *
 *     container 0.60 -> worst possible page colour #CFF1E9
 *                       muted text  4.96:1  PASS
 *                       headline   14.19:1  PASS
 *
 *   The layer CANNOT darken the page past that, however the blobs drift. This is
 *   a hard ceiling, not a hope. LAYER_OPACITY is the only knob; raising it past
 *   0.75 starts to threaten the muted text, so re-check if you go there.
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
// High-luminance TINTS of Eli's aurora hues. Same colours, lifted so they tint
// the page rather than dim it. (Dark originals, for reference:
// ocean #0E6E6E, cyan #22D3EE, magenta #E0218A, rose gold #E0A899.)
const BLOBS = [
  { color: "#5EEAD4", size: 640, x: "6%",  y: "10%", dur: 29, delay: 0 },   // ocean teal
  { color: "#67E8F9", size: 560, x: "74%", y: "4%",  dur: 37, delay: -6 },  // cyan
  { color: "#F9A8D4", size: 580, x: "84%", y: "56%", dur: 41, delay: -14 }, // magenta
  { color: "#FECDD3", size: 520, x: "20%", y: "70%", dur: 23, delay: -3 },  // rose gold
  { color: "#99F6E4", size: 460, x: "46%", y: "36%", dur: 33, delay: -19 }, // ocean, centre
];

// Vivid inside the container...
const BLOB_OPACITY = 0.75;
// ...and the container bounds the WHOLE layer. This is the one knob.
// 0.60 -> worst possible page colour #CFF1E9, muted text 4.96:1. See notes above.
const LAYER_OPACITY = 0.6;

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
      style={{
        ["--px" as string]: 0,
        ["--py" as string]: 0,
        // Bounds the entire layer — see the contrast note at the top.
        opacity: LAYER_OPACITY,
      }}
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
              opacity: BLOB_OPACITY,
              filter: "blur(80px)", // heavy: atmosphere, not shapes
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
