"use client";

// Page-load sequence: a lime bar wipes across, the wordmark clears, curtain lifts.
// Hard 1.9s ceiling — a slow asset can never trap the visitor behind it.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Preloader() {
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex min-h-[100svh] items-center justify-center bg-void"
        >
          <div className="w-full max-w-xs px-6 sm:max-w-sm">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl tracking-tight text-chalk sm:text-3xl"
              >
                Work With <span className="text-lime-deep">Eli</span>
              </motion.p>
            </div>

            <div className="mt-5 h-px w-full overflow-hidden bg-edge">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-left bg-lime"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-3 font-mono text-[10px] uppercase tracking-ultra text-ash"
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
