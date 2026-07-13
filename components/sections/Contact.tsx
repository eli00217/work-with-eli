"use client";

// 9. THE CLOSE — availability, three steps, and every real way to reach me.
// Motion: heading line-reveals, steps stagger, cards lift on hover, the
// availability dot pulses. Email button copies to clipboard AND fires mailto,
// because a bare mailto: silently fails on machines with no mail client set.

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  MessageCircle,
  Mail,
  Briefcase,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { DotField } from "@/components/ambient/DotField";
import { LineReveal } from "@/components/motion/LineReveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export default function Contact() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the mailto below still runs */
    }
    window.location.href = `mailto:${SITE.email}`;
  };

  const channels = [
    {
      icon: CalendarCheck,
      label: "Book a call",
      detail: "30 minutes, no pitch",
      href: SITE.calendly,
      accent: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      detail: SITE.whatsappNumber,
      href: SITE.whatsapp,
      accent: false,
    },
    {
      icon: Briefcase,
      label: "Upwork",
      detail: "Hire me there",
      href: SITE.upwork,
      accent: false,
    },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      <DotField />
      {/* Molten wash — the only place the second accent runs hot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,rgba(245,158,11,0.13),transparent_65%)]"
      />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — the ask */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="kicker">{CONTACT.kicker}</p>
            </Reveal>

            <h2 className="mt-5 font-display text-[38px] leading-[1.03] tracking-tight text-chalk sm:text-6xl lg:text-[68px]">
              <LineReveal>{CONTACT.title}</LineReveal>
              <LineReveal delay={0.12} className="text-lime-deep">
                {CONTACT.titleAccent}
              </LineReveal>
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-lg text-[16px] leading-[1.7] text-ash">
                {CONTACT.lead}
              </p>
            </Reveal>

            {/* Availability */}
            <Reveal delay={0.3}>
              <div className="mt-8 inline-flex items-center gap-2.5 border border-edge bg-coal/60 px-4 py-2">
                <span className="relative flex size-2">
                  {!reduced && (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
                  )}
                  <span className="relative inline-flex size-2 rounded-full bg-lime" />
                </span>
                <span className="text-[12.5px] font-medium text-chalk">
                  {CONTACT.availability}
                </span>
              </div>
            </Reveal>

            {/* Three steps */}
            <Stagger className="mt-12 space-y-0" delay={0.15}>
              {CONTACT.steps.map((step) => (
                <StaggerItem key={step.n}>
                  <div className="group flex gap-5 border-t border-edge py-5 transition-colors hover:border-lime/40">
                    <span className="font-mono text-[12px] text-lime-deep">
                      {step.n}
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-ash transition-colors group-hover:text-chalk">
                      {step.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Right — the channels */}
          <div className="lg:col-span-6">
            <Reveal dir="right" delay={0.15}>
              <div className="space-y-3">
                {channels.map(({ icon: Icon, label, detail, href, accent }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "group relative flex items-center gap-4 border p-5 transition-all duration-300 sm:p-6",
                      accent
                        ? "border-lime/40 bg-lime/[0.06] hover:border-lime hover:bg-lime/[0.11]"
                        : "border-edge bg-coal/40 hover:border-lime/40 hover:bg-coal",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex size-11 shrink-0 items-center justify-center transition-colors duration-300",
                        accent
                          ? "bg-lime text-white"
                          : "bg-slate text-lime-deep group-hover:bg-lime group-hover:text-white",
                      ].join(" ")}
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[17px] text-chalk">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-ash">
                        {detail}
                      </span>
                    </span>

                    <ArrowUpRight className="size-5 shrink-0 text-ash transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime-deep" />
                  </a>
                ))}

                {/* Email — copy + mailto */}
                <button
                  onClick={copyEmail}
                  className="group relative flex w-full items-center gap-4 border border-edge bg-coal/40 p-5 text-left transition-all duration-300 hover:border-lime/40 hover:bg-coal sm:p-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center bg-slate text-lime-deep transition-colors duration-300 group-hover:bg-lime group-hover:text-white">
                    {copied ? (
                      <Check className="size-5" strokeWidth={2} />
                    ) : (
                      <Mail className="size-5" strokeWidth={1.75} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[17px] text-chalk">
                      {copied ? "Copied to clipboard" : "Email"}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-ash">
                      {SITE.email}
                    </span>
                  </span>

                  <ArrowUpRight className="size-5 shrink-0 text-ash transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime-deep" />
                </button>
              </div>

              {/* Honest note about response time */}
              <p className="mt-6 text-[12.5px] leading-relaxed text-ash/70">
                I reply within one business day. If a project is not a fit, I
                will say so rather than take it on.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
