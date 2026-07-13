import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // ---------- 60% BASE ----------
        void: "#FDFBF7",   // soft ivory   — page base
        coal: "#F8F9FA",   // off-white    — alternating section
        slate: "#F5F5F0",  // alabaster    — card surfaces
        edge: "#E5E3DC",   // hairline borders
        deep: "#1A2530",   // rich navy    — the two inverted sections

        // ---------- 30% TEXT ----------
        chalk: "#0F172A",  // headlines (17.3:1 on ivory)
        ink: "#1E293B",    // body      (14.2:1)
        ash: "#5B6472",    // muted     (5.8:1)

        // ---------- 10% ACCENT — OCEAN TEAL (primary) ----------
        // Assigned BY ROLE. Every value below is WCAG AA verified.
        //   DEFAULT — links/text on light (5.18:1); button bg w/ white text (5.36:1)
        //   soft    — DARK sections only (8.6:1 on navy); would fail on cream
        //   deep    — hover / pressed
        lime: {
          DEFAULT: "#0E7490",
          soft: "#22D3EE",
          deep: "#155E75",
        },

        // ---------- MAGENTA (secondary accent) ----------
        //   DEFAULT — text on light (6.12:1); button bg w/ white text (6.32:1)
        //   soft    — DARK sections only (6.32:1 on navy)
        molten: {
          DEFAULT: "#A21CAF",
          soft: "#E879F9",
          deep: "#86198F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Oversized editorial display scale
        mega: ["clamp(2.75rem, 9vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        giant: ["clamp(2.25rem, 6.5vw, 5.5rem)", { lineHeight: "0.96", letterSpacing: "-0.035em" }],
        huge: ["clamp(1.875rem, 4.5vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      letterSpacing: { ultra: "0.3em" },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
