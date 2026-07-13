"use client";

// 4. WHAT I DO — three offers, priced honestly, with what each includes.

import { Check, ArrowUpRight } from "lucide-react";
import { SERVICES, SITE } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LineReveal } from "@/components/motion/LineReveal";
import { cn } from "@/lib/utils";

export default function Services() {
  return (
    <section id="services" className="bg-coal section">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker">What I do</p>
          </Reveal>
          <h2 className="mt-7 font-display text-giant text-chalk">
            <LineReveal>Three ways</LineReveal>
            <LineReveal delay={0.1}>
              <span className="text-lime-deep">to work together.</span>
            </LineReveal>
          </h2>
        </div>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3" gap={0.1}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <div
                className={cn(
                  "card lift group flex h-full flex-col p-8 lg:p-10",
                  s.featured && "border-lime/40 bg-lime/[0.03]"
                )}
              >
                {s.featured && (
                  <span className="mb-6 inline-flex w-fit rounded-full bg-lime px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-white">
                    Most asked for
                  </span>
                )}

                <h3 className="font-display text-3xl text-chalk">{s.title}</h3>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-2xl text-lime-deep">
                    {s.price}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ash">
                    {s.time}
                  </span>
                </div>

                <p className="mt-5 text-[14.5px] leading-relaxed text-ash text-pretty">
                  {s.body}
                </p>

                <ul className="mt-8 space-y-3 border-t border-edge pt-6">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-lime-deep" strokeWidth={3} />
                      <span className="text-[13.5px] leading-relaxed text-ash">
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={s.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="focusable mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-lime transition-colors duration-300 hover:text-lime-deep"
                >
                  Talk it through
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
