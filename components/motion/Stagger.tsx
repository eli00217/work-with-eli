"use client";

// Stagger container + item. Children animate in sequence as the group enters view.

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [failsafe, setFailsafe] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 1400);
    return () => clearTimeout(t);
  }, []);
  const open = inView || failsafe;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={open ? "show" : "hidden"}
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduced ? 0 : gap,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: reduced
            ? { duration: 0.01 }
            : { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
