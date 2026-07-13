"use client";

// 2. THE TENSION — name the problem. Numbered points, staggered in.

import { TENSION } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { DotField } from "@/components/ambient/DotField";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LineReveal } from "@/components/motion/LineReveal";

export default function Tension() {
  return (
    <section className="on-dark section relative overflow-hidden">
      <DotField tone="dark" />
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker">{TENSION.kicker}</p>
            </Reveal>
            <h2 className="mt-7 font-display text-giant text-slate">
              <LineReveal>{TENSION.title}</LineReveal>
              <LineReveal delay={0.1}>
                <span className="text-molten-soft">{TENSION.titleAccent}</span>
              </LineReveal>
            </h2>
          </div>

          <div className="lg:col-span-7">
            <Stagger className="space-y-6">
              {TENSION.body.map((p) => (
                <StaggerItem key={p}>
                  <p className="text-[16px] leading-[1.75] text-slate/60 text-pretty sm:text-[17px]">
                    {p}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <Stagger className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-edge sm:grid-cols-3">
          {TENSION.points.map((pt) => (
            <StaggerItem key={pt.n} className="group bg-coal p-8 transition-colors duration-500 hover:bg-slate lg:p-10">
              <span className="font-mono text-[11px] text-molten">{pt.n}</span>
              <h3 className="mt-6 font-display text-2xl text-chalk">{pt.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ash text-pretty">
                {pt.body}
              </p>
              <div className="mt-8 h-px w-0 bg-molten transition-all duration-700 group-hover:w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
