"use client";

// 1. THE THESIS — oversized display type with masked line reveals,
// counters, and a marquee strip that anchors the fold.

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HERO, STATS, MARQUEE } from "@/lib/constants";
import { LineReveal } from "@/components/motion/LineReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { ImageDeck } from "@/components/motion/ImageDeck";

const BASE = 0.1; // no preloader — content paints immediately

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between pt-28 sm:pt-32 lg:pt-36">
      {/* Lime bloom, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-lime/[0.10] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 size-[420px] rounded-full bg-molten/[0.07] blur-[120px]"
      />

      <div className="container relative flex-1">
        {/* Two columns: the thesis on the left, the deck of work on the right. */}
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------- LEFT: the thesis ---------- */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: BASE, duration: 0.6 }}
              className="kicker"
            >
              {HERO.kicker}
            </motion.p>

            {/* Headline — deliberate three-beat break */}
            <h1 className="mt-7 font-display text-[clamp(2.5rem,5.4vw,5rem)] leading-[0.98] tracking-[-0.035em] text-chalk">
              <LineReveal delay={BASE + 0.05}>{HERO.line1}</LineReveal>
              <LineReveal delay={BASE + 0.15}>{HERO.line2}</LineReveal>
              <LineReveal delay={BASE + 0.25}>
                <span className="text-lime">{HERO.line3}</span>
              </LineReveal>
            </h1>

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: BASE + 0.5, duration: 0.8 }}
              className="mt-8 max-w-xl text-[16px] leading-relaxed text-ash text-pretty sm:text-[17px]"
            >
              {HERO.lead}
            </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 0.62, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={HERO.ctaPrimary.href}
              className="focusable group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {HERO.ctaPrimary.label}
              <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href={HERO.ctaSecondary.href}
              className="focusable group inline-flex items-center gap-2 rounded-full border border-edge px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk transition-all duration-300 hover:-translate-y-0.5 hover:border-molten hover:text-molten"
            >
              {HERO.ctaSecondary.label}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
          </div>

          {/* ---------- RIGHT: the deck ---------- */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: BASE + 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <ImageDeck />
          </motion.div>
        </div>

        {/* Counters */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: BASE + 0.8, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-edge pt-10 sm:grid-cols-4 lg:mt-28"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-4xl text-chalk sm:text-5xl">
                {/* A range like "3–5 days" is text, not a quantity. It must not
                    pass through Counter — doing so rendered "0–5 days" live. */}
                {s.kind === "count" ? <Counter to={s.value} /> : s.text}
              </dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-ultra text-ash">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE + 1, duration: 0.8 }}
        className="mt-16 border-y border-edge py-5"
      >
        <Marquee>
          {MARQUEE.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="flex items-center whitespace-nowrap font-display text-2xl text-ash/60 sm:text-3xl"
            >
              {word}
              <span className="mx-6 text-lime-deep sm:mx-10">/</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
