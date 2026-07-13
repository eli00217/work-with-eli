"use client";

/**
 * DotField — a faint canvas grid of dots that push away from the cursor and
 * ease back. Sits behind the "problem" and contact sections.
 *
 * WHY IT IS DESKTOP-ONLY:
 *   The entire behaviour is a response to a cursor. A phone has no cursor, so
 *   on touch this canvas would render, run rAF every frame, and do absolutely
 *   nothing a visitor could perceive — pure battery and main-thread cost for
 *   zero effect. It is therefore gated behind `(pointer: fine)` and never even
 *   mounts on a phone or tablet. That is the single biggest thing keeping this
 *   layer off the mobile frame budget.
 *
 * COST CONTROL:
 *   - Dot count is derived from area and HARD CAPPED at 220. A 4K monitor does
 *     not get a denser field than a laptop; it gets the same one, spaced wider.
 *   - devicePixelRatio is capped at 2. Rendering a canvas at 3x on a high-DPR
 *     screen triples the fill cost for no visible gain.
 *   - Dots are drawn as squares (fillRect), not arcs. `arc()` + `fill()` per dot
 *     is markedly more expensive than a 2x2 fillRect, and at this size and
 *     opacity the difference is not perceivable.
 *   - rAF halts entirely when the section is off-screen (IntersectionObserver)
 *     or the tab is hidden. When you are not looking at it, it costs nothing.
 *
 * REDUCED MOTION: renders nothing.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const MAX_DOTS = 220;
const SPACING = 34;
const RADIUS = 110; // cursor influence radius, px
const PUSH = 26; // max displacement, px

export function DotField({
  className,
  tone = "light",
}: {
  className?: string;
  /** "light" = dark dots on a cream section. "dark" = light dots on the navy section. */
  tone?: "light" | "dark";
}) {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    // No cursor => nothing to react to => do not run at all.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dots: { ox: number; oy: number; x: number; y: number }[] = [];
    let dpr = 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let hidden = document.hidden;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap: 3x is wasted fill
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Space the grid out until the count fits under the cap.
      let step = SPACING;
      let cols = Math.ceil(w / step);
      let rows = Math.ceil(h / step);
      while (cols * rows > MAX_DOTS) {
        step += 4;
        cols = Math.ceil(w / step);
        rows = Math.ceil(h / step);
      }

      dots = [];
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * step;
          const y = r * step;
          dots.push({ ox: x, oy: y, x, y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // On the navy section a grey dot is invisible; it needs to be light.
      ctx.fillStyle =
        tone === "dark"
          ? "rgba(226,232,240,0.20)"
          : "rgba(91,100,114,0.22)";

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        let tx = d.ox;
        let ty = d.oy;
        if (dist < RADIUS && dist > 0.01) {
          // Push away, strongest at the centre, easing to nothing at the edge.
          const force = (1 - dist / RADIUS) ** 2;
          tx = d.ox + (dx / dist) * PUSH * force;
          ty = d.oy + (dy / dist) * PUSH * force;
        }

        // Ease toward the target — this is what makes them settle back.
        d.x += (tx - d.x) * 0.12;
        d.y += (ty - d.y) * 0.12;

        // fillRect, not arc(): far cheaper, indistinguishable at 2px.
        ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
      }
    };

    const tick = () => {
      if (visible && !hidden) draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVis = () => {
      hidden = document.hidden;
    };

    build();

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced, tone]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-ambient
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className ?? ""}`}
    />
  );
}
