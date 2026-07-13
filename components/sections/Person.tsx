"use client";

// 8. THE PERSON BEHIND IT — a warm, first-person note.
// Motion: portrait scales up from a clipped frame, paragraphs stagger in,
// a lime rule draws across under the heading.

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ABOUT, SITE, PORTRAIT } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export default function Person() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="bg-slate section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <Reveal dir="left">
              <div className="relative">
                {/* Accent frame offset behind the photo */}
                <div
                  aria-hidden
                  className="absolute -bottom-3 -left-3 h-full w-full border border-lime/30 sm:-bottom-4 sm:-left-4"
                />

                <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                  <motion.div
                    initial={reduced ? false : { scale: 1.14 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={PORTRAIT.src}
                      alt={PORTRAIT.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover object-top"
                    />
                  </motion.div>

                  {/* Grade the photo into the palette */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-multiply bg-lime/5"
                  />

                  {/* Name plate */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-display text-xl text-chalk sm:text-2xl">
                      {SITE.owner}
                    </p>
                    <p className="mt-1 text-[12.5px] text-ash">
                      {SITE.role} · {SITE.location}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pt-6">
            <Reveal>
              <p className="kicker">{ABOUT.kicker}</p>
            </Reveal>

            <LineReveal className="mt-5 font-display text-[34px] leading-[1.05] tracking-tight text-chalk sm:text-5xl lg:text-[56px]">
              {ABOUT.title}
            </LineReveal>

            {/* Lime rule draws in */}
            <motion.div
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-7 h-px w-24 bg-lime"
            />

            <div className="mt-8 space-y-5">
              {ABOUT.body.map((para, i) => (
                <motion.p
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="max-w-xl text-[15.5px] leading-[1.75] text-ash sm:text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <Reveal delay={0.35}>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-2 border border-lime/40 bg-lime/[0.06] px-5 py-3 text-[14px] font-medium text-lime-deep transition-all duration-300 hover:border-lime hover:bg-lime/[0.12]"
              >
                {ABOUT.signoff}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
