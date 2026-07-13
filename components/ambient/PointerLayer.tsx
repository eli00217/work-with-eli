"use client";

/**
 * PointerLayer — the site-wide cursor glow and the click/tap ripples.
 *
 * CURSOR GLOW
 *   A single soft radial, spring-eased so it lags behind the pointer and reads
 *   as having weight rather than being welded to the cursor.
 *   DESKTOP ONLY. A phone has no cursor, so on touch this layer is never
 *   mounted at all — it would be pure cost for zero effect.
 *
 * RIPPLES
 *   Fire on click AND tap (pointerdown covers both). Several can coexist.
 *   Each is one div animating transform + opacity, then it removes itself.
 *   ~750ms, ease-out — a disturbance in the field, not a splash.
 *
 * PERFORMANCE
 *   - The glow is written via a ref straight to `transform`. Pointer movement
 *     never triggers a React render.
 *   - The pointermove handler is passive and does no work beyond storing two
 *     numbers; the interpolation happens once per frame in rAF.
 *   - Everything pauses when the tab is hidden.
 *   - `pointer-events: none` throughout: it can never block a click or a scroll.
 *   - Fixed positioning + isolate, so it can never affect layout.
 *
 * REDUCED MOTION: the whole component returns null. No glow, no ripples.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

type Ripple = { id: number; x: number; y: number; color: string };

// Accent tints, used at low alpha.
const RIPPLE_COLORS = ["#22D3EE", "#E0218A", "#0E6E6E", "#E0A899"];

export function PointerLayer() {
  const reduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [fine, setFine] = useState(false);

  const target = useRef({ x: -9999, y: -9999 });
  const pos = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);
  const nextId = useRef(0);

  // Is there an actual cursor? (No = phone/tablet: skip the glow entirely.)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const set = () => setFine(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // --- cursor glow: spring follow, desktop only ---
  useEffect(() => {
    if (reduced || !fine) return;

    let paused = document.hidden;
    const onVis = () => {
      paused = document.hidden;
    };
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      if (!paused) {
        // Lerp = the lag. Lower factor = heavier, more trailing.
        pos.current.x += (target.current.x - pos.current.x) * 0.085;
        pos.current.y += (target.current.y - pos.current.y) * 0.085;
        const el = glowRef.current;
        if (el) {
          el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, fine]);

  // --- ripples: click AND tap ---
  const spawn = useCallback((e: PointerEvent) => {
    const id = nextId.current++;
    const color = RIPPLE_COLORS[id % RIPPLE_COLORS.length];
    setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY, color }]);
    // Self-clean once the animation has finished.
    window.setTimeout(
      () => setRipples((r) => r.filter((p) => p.id !== id)),
      800,
    );
  }, []);

  useEffect(() => {
    if (reduced) return;
    window.addEventListener("pointerdown", spawn, { passive: true });
    return () => window.removeEventListener("pointerdown", spawn);
  }, [reduced, spawn]);

  // Reduced motion: nothing at all.
  if (reduced) return null;

  return (
    <div
      aria-hidden
      data-ambient
      className="pointer-events-none fixed inset-0 z-0 isolate overflow-hidden"
    >
      {/* Cursor glow — desktop only */}
      {fine && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(224,33,138,0.05) 45%, transparent 70%)",
            filter: "blur(40px)",
            willChange: "transform",
          }}
        />
      )}

      {/* Ripples — click and tap */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 460,
            height: 460,
            background: `radial-gradient(circle, ${r.color}22 0%, ${r.color}0D 40%, transparent 68%)`,
            animation: "ripple-out 750ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
