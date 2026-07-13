"use client";

/**
 * ImageDeck — a stack of photos, dealt like cards.
 *
 * How it reads: the top card sits square; the ones behind it are scaled down,
 * pushed back and rotated slightly, so you see a physical deck. Every 3.2s the
 * top card lifts, tilts and slides away, and the one behind rises to take its
 * place. Drag or click the top card to deal it early.
 *
 * Only `transform` and `opacity` animate — no layout thrash, so it stays smooth
 * on a phone. Respects prefers-reduced-motion (renders a static top card).
 *
 * Images can 404 upstream, so each card degrades to a labelled placeholder
 * rather than a blank hole.
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { DECK } from "@/lib/constants";

const VISIBLE = 4; // cards rendered in the stack (the rest wait their turn)
const INTERVAL = 3200;

export function ImageDeck() {
  const reduced = useReducedMotion();
  const [top, setTop] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const deal = useCallback(() => {
    setTop((t) => (t + 1) % DECK.length);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(deal, INTERVAL);
    return () => clearInterval(id);
  }, [deal, reduced, paused]);

  // The cards currently in the stack, front to back.
  const stack = Array.from({ length: VISIBLE }, (_, i) => {
    const index = (top + i) % DECK.length;
    return { ...DECK[index], index, depth: i };
  });

  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft ground shadow so the deck sits on the page rather than floating */}
      <div
        aria-hidden
        className="absolute inset-x-8 bottom-2 h-8 rounded-[50%] bg-chalk/10 blur-2xl"
      />

      <AnimatePresence initial={false} mode="popLayout">
        {stack
          .slice()
          .reverse() // paint back-to-front so the top card lands last
          .map(({ src, alt, index, depth }) => {
            const isTop = depth === 0;
            return (
              <motion.div
                key={index}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.86,
                  y: 34,
                  rotate: 0,
                }}
                animate={{
                  opacity: 1,
                  // each card behind sits smaller, lower and slightly turned
                  scale: 1 - depth * 0.055,
                  y: depth * 16,
                  x: depth * 10,
                  rotate: depth === 0 ? 0 : depth % 2 === 0 ? depth * 1.6 : -depth * 1.9,
                  zIndex: VISIBLE - depth,
                }}
                exit={{
                  // the dealt card lifts, tilts and slides off
                  opacity: 0,
                  scale: 1.04,
                  x: -70,
                  y: -26,
                  rotate: -8,
                  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                }}
                transition={{
                  type: "spring",
                  stiffness: 210,
                  damping: 26,
                  mass: 0.85,
                }}
                drag={isTop && !reduced ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 90) deal();
                }}
                onClick={isTop ? deal : undefined}
                style={{ willChange: "transform" }}
                className={[
                  "absolute inset-0 overflow-hidden rounded-2xl border border-edge bg-coal shadow-xl",
                  isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
                ].join(" ")}
              >
                {failed[index] ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate">
                    <ImageOff className="size-5 text-ash" strokeWidth={1.5} />
                    <span className="px-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                      {alt}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={depth < 2}
                    sizes="(min-width: 1024px) 44vw, (min-width: 640px) 480px, 92vw"
                    className="object-cover"
                    onError={() =>
                      setFailed((f) => ({ ...f, [index]: true }))
                    }
                  />
                )}

                {/* Grade the photo into the palette */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chalk/35 via-transparent to-transparent"
                />
                {!isTop && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-void/45"
                  />
                )}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Counter + progress pips */}
      <div className="absolute -bottom-11 left-0 right-0 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ash">
          {String(top + 1).padStart(2, "0")}
          <span className="text-ash/45"> / {DECK.length}</span>
        </span>

        <div className="flex gap-1.5">
          {DECK.map((_, i) => (
            <button
              key={i}
              onClick={() => setTop(i)}
              aria-label={`Show image ${i + 1}`}
              className="group py-2"
            >
              <span
                className={[
                  "block h-[3px] rounded-full transition-all duration-500",
                  i === top
                    ? "w-6 bg-lime"
                    : "w-2 bg-edge group-hover:bg-ash/60",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
