"use client";

// 3. THE PROOF — the five builds. This is the loudest section on the page:
// it's the only thing here that's actual evidence rather than a claim.
// Filter by industry; each card previews the build's own palette and links live.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WORK, INDUSTRIES } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { cn } from "@/lib/utils";

export default function Work() {
  const [filter, setFilter] = useState<string>("All");
  const reduced = useReducedMotion();

  const shown =
    filter === "All" ? WORK : WORK.filter((w) => w.industry === filter);

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="kicker">The work</p>
            </Reveal>
            <h2 className="mt-7 font-display text-giant text-chalk">
              <LineReveal>Five builds.</LineReveal>
              <LineReveal delay={0.1}>
                <span className="text-lime-deep">Open every one.</span>
              </LineReveal>
            </h2>
          </div>

          <Reveal delay={0.2} className="max-w-md">
            <p className="text-[15px] leading-relaxed text-ash text-pretty">
              I designed and built all five myself, end to end, to show what I
              can do. They are demos, not client work — and they are live, so
              you can click into any of them and judge for yourself.
            </p>
          </Reveal>
        </div>

        {/* Filter */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => {
              const on = filter === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  aria-pressed={on}
                  className={cn(
                    "focusable relative rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300",
                    on
                      ? "border-lime text-chalk"
                      : "border-edge text-ash hover:border-ash/50 hover:text-chalk"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{ind}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Wall */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((w, i) => (
              <motion.article
                key={w.id}
                layout
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.55,
                  delay: reduced ? 0 : i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "card group lift",
                  // first card spans full width when showing everything
                  filter === "All" && i === 0 && "md:col-span-2"
                )}
              >
                <a
                  href={w.live}
                  target="_blank"
                  rel="noreferrer"
                  className="focusable block"
                  aria-label={`${w.name} — open live demo`}
                >
                  {/* Palette preview — each demo rendered in its own colours */}
                  <div
                    className="relative overflow-hidden"
                    style={{ backgroundColor: w.palette.bg }}
                  >
                    <div
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-4 px-6 transition-transform duration-700 group-hover:scale-[1.03]",
                        filter === "All" && i === 0
                          ? "aspect-[16/7]"
                          : "aspect-[16/10]"
                      )}
                    >
                      <div
                        aria-hidden
                        className="absolute -right-10 -top-10 size-40 rounded-full opacity-40 blur-3xl"
                        style={{ background: w.palette.accent }}
                      />
                      <p
                        className="relative font-mono text-[10px] uppercase tracking-ultra"
                        style={{ color: w.palette.accent }}
                      >
                        {w.industry}
                      </p>
                      <p
                        className="relative text-center font-display text-3xl tracking-tight sm:text-4xl md:text-5xl"
                        style={{ color: w.palette.ink }}
                      >
                        {w.name}
                      </p>
                      <span
                        className="relative h-px w-14"
                        style={{ background: w.palette.accent }}
                      />
                    </div>

                    {/* Hover veil */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-void/70 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white">
                        Open live site
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="font-display text-2xl text-chalk transition-colors duration-300 group-hover:text-lime-deep sm:text-3xl">
                          {w.name}
                        </h3>
                        <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-ash text-pretty">
                          {w.blurb}
                        </p>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-edge text-ash transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-white">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-edge pt-5">
                      {w.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
