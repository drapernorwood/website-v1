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
        tightest: "-0.03em",
        tighter2: "-0.02em",
      },
      maxWidth: {
        container: "1200px",
        prose2: "68ch",
      },
      fontSize: {
        display: ["clamp(2.5rem, 6.2vw, 5.25rem)", { lineHeight: "1.03", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.25rem, 4.8vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.875rem, 3.4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.25rem, 1.6vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        eyebrow: ["0.78rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
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
