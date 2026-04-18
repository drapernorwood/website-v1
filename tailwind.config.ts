import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0C0E",
          soft: "#16181C",
          muted: "#3A3F47",
        },
        paper: {
          DEFAULT: "#FAFAF7",
          soft: "#F2F1EC",
          line: "#E6E4DD",
        },
        accent: {
          DEFAULT: "#2E5D4B",
          hover: "#244B3C",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter2: "-0.022em",
        tightserif: "-0.02em",
        wideCaption: "0.22em",
      },
      maxWidth: {
        container: "1240px",
        prose2: "68ch",
      },
      fontSize: {
        display: ["clamp(2.75rem, 6.5vw, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        displayXl: ["clamp(3.25rem, 8vw, 7.5rem)", { lineHeight: "0.96", letterSpacing: "-0.04em" }],
        h1: ["clamp(2.25rem, 4.8vw, 3.875rem)", { lineHeight: "1.05", letterSpacing: "-0.028em" }],
        h2: ["clamp(1.875rem, 3.4vw, 2.875rem)", { lineHeight: "1.08", letterSpacing: "-0.022em" }],
        h3: ["clamp(1.25rem, 1.6vw, 1.5rem)", { lineHeight: "1.22", letterSpacing: "-0.012em" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.2em" }],
      },
      boxShadow: {
        hair: "0 0 0 1px rgba(11,12,14,0.06)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
