"use client";

// 5. WHAT EVERY BUILD SHIPS WITH — the non-negotiables, as a checklist.
// Rows reveal in sequence; the check marks in last.

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { SHIPS_WITH } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export default function ShipsWith() {
  const reduced = useReducedMotion();

  return (
    <section id="ships" className="bg-slate section">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="kicker">Every build</p>
              </Reveal>
              <h2 className="mt-7 font-display text-giant text-chalk">
                <LineReveal>The floor,</LineReveal>
                <LineReveal delay={0.1}>
                  <span className="text-lime-deep">not the ceiling.</span>
                </LineReveal>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-ash text-pretty">
                  These are not upgrades or add-ons. Every site I build meets all
                  five, or it does not go live.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {SHIPS_WITH.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: reduced ? 0 : i * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-start gap-5 border-t border-edge py-7 transition-colors duration-500 last:border-b hover:border-lime/40 sm:gap-7 sm:py-8"
                >
                  <motion.span
                    initial={reduced ? { scale: 1 } : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.45,
                      delay: reduced ? 0 : 0.2 + i * 0.09,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-lime/10 text-lime-deep transition-colors duration-500 group-hover:bg-lime group-hover:text-white"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </motion.span>

                  <div>
                    <h3 className="font-display text-xl text-chalk sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ash text-pretty">
                      {item.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
