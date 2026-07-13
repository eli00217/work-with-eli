"use client";

// 6. HOW IT GOES — four steps, with a rail that draws down as you scroll.

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { PROCESS } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="section">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker">How it goes</p>
          </Reveal>
          <h2 className="mt-7 font-display text-giant text-chalk">
            <LineReveal>Idea to live,</LineReveal>
            <LineReveal delay={0.1}>
              <span className="text-lime-deep">in a straight line.</span>
            </LineReveal>
          </h2>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Rail */}
          <div className="absolute left-[15px] top-2 h-full w-px bg-edge sm:left-[19px]" />
          {!reduced && (
            <motion.div
              style={{ scaleY }}
              className="absolute left-[15px] top-2 h-full w-px origin-top bg-lime sm:left-[19px]"
            />
          )}

          <ol className="space-y-14 sm:space-y-16">
            {PROCESS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.7,
                  delay: reduced ? 0 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex gap-7 sm:gap-10"
              >
                {/* Node */}
                <span className="relative z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-edge bg-void font-mono text-[10px] text-ash transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-white sm:size-10 sm:text-[11px]">
                  {step.n}
                </span>

                <div className="pb-2">
                  <h3 className="font-display text-3xl text-chalk transition-colors duration-300 group-hover:text-lime-deep sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ash text-pretty">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
