"use client";

// Sticky nav. Transparent and tall at the top; on scroll it condenses,
// gains a solid backdrop and a border. Active section tracked by observer.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(
      (el): el is HTMLElement => !!el
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-edge bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20 sm:h-24"
          )}
        >
          <a
            href="#top"
            className="focusable font-display text-[17px] tracking-tight text-chalk"
          >
            Work With <span className="text-lime-deep">Eli</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const on = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "focusable relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                    on ? "text-white" : "text-ash hover:text-chalk"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              className="focusable group inline-flex items-center gap-2 rounded-full bg-molten px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a call
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="focusable flex size-10 items-center justify-center rounded-full border border-edge text-chalk lg:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-void lg:hidden"
          >
            <div className="container flex h-20 items-center justify-between">
              <span className="font-display text-[17px] text-chalk">
                Work With <span className="text-lime-deep">Eli</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="focusable flex size-10 items-center justify-center rounded-full border border-edge text-chalk"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="container mt-10 flex flex-col">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="focusable border-b border-edge py-5 font-display text-3xl text-chalk transition-colors hover:text-lime-deep sm:text-4xl"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="container mt-10 flex flex-col gap-3">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noreferrer"
                className="focusable flex items-center justify-center rounded-full bg-molten px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white"
              >
                Book a call
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="focusable flex items-center justify-center rounded-full border border-edge px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
