"use client";

// 7. THE TOOLBOX — icon grid. Logos load from simpleicons CDN; if one fails
// it falls back to the tool's initial rather than leaving a hole.

import { useState } from "react";
import { STACK } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LineReveal } from "@/components/motion/LineReveal";

function StackIcon({ slug, color, name }: { slug: string; color: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="flex size-8 items-center justify-center rounded-md bg-edge font-display text-sm text-ash">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-8 transition-transform duration-500 group-hover:scale-110"
    />
  );
}

export default function Stack() {
  return (
    <section id="stack" className="bg-coal section">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker">The toolbox</p>
          </Reveal>
          <h2 className="mt-7 font-display text-giant text-chalk">
            <LineReveal>What I build</LineReveal>
            <LineReveal delay={0.1}>
              <span className="text-lime-deep">everything with.</span>
            </LineReveal>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ash text-pretty">
              Chosen because they are fast and they last, not because they are
              fashionable. No page builders, no plugin stacks, no WordPress.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-3 lg:grid-cols-4"
          gap={0.04}
        >
          {STACK.map((tool) => (
            <StaggerItem key={tool.name}>
              <div className="group flex h-full items-center gap-4 bg-coal p-6 transition-colors duration-500 hover:bg-slate">
                <StackIcon slug={tool.slug} color={tool.color} name={tool.name} />
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] text-chalk">
                    {tool.name}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-ash">
                    {tool.role}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
