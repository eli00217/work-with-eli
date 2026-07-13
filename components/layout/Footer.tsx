"use client";

import { ArrowUp } from "lucide-react";
import { SITE, NAV, MARQUEE } from "@/lib/constants";
import { Marquee } from "@/components/motion/Marquee";

export function Footer() {
  const year = new Date().getFullYear();

  const elsewhere = [
    { label: "GitHub", href: SITE.github },
    { label: "Upwork", href: SITE.upwork },
    { label: "Instagram", href: SITE.instagram },
    { label: "Facebook", href: SITE.facebook },
  ];

  return (
    <footer className="on-dark relative">
      {/* Marquee strip */}
      <div className="border-b border-white/10 py-6">
        <Marquee slow>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="flex items-center whitespace-nowrap px-6 font-display text-lg text-slate/60/60 sm:text-xl"
            >
              {item}
              <span className="ml-6 text-lime-soft">·</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="font-display text-2xl tracking-tight text-slate"
            >
              Work With <span className="text-lime-soft">Eli</span>
            </a>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-slate/60">
              Websites designed and built by one person, in the Philippines, for
              businesses anywhere.
            </p>

            <div className="mt-6 space-y-1.5 text-[14px]">
              <a
                href={`mailto:${SITE.email}`}
                className="block text-slate/60 transition-colors hover:text-lime-soft"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate/60 transition-colors hover:text-lime-soft"
              >
                WhatsApp · {SITE.whatsappNumber}
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <p className="kicker">Sections</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14px] text-slate/60 transition-colors hover:text-lime-soft"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="lg:col-span-4">
            <p className="kicker">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((e) => (
                <li key={e.label}>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-slate/60 transition-colors hover:text-lime-soft"
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-lime/40 bg-lime/[0.06] px-4 py-2.5 text-[13px] font-medium text-lime-soft transition-colors hover:border-lime hover:bg-lime/[0.12]"
            >
              Book a call
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-slate/60/70">
            © {year} {SITE.owner}. Designed and built by me.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[12.5px] text-slate/60/70">
              The five builds here are my own demos, not client work.
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              className="group flex size-9 shrink-0 items-center justify-center border border-white/10 text-slate/60 transition-colors hover:border-lime hover:text-lime-soft"
            >
              <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
