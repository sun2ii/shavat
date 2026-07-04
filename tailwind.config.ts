import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Reading / display voice
        serif: ["Cardo", "Georgia", "serif"],
        // UI voice: labels, nav, pills, counts
        sans: ['"Public Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        // Semantic tokens driven by the CSS variables in globals.css.
        // Use like: text-ink, bg-paper, border-hairline, text-gold, bg-brand ...
        paper: "rgb(var(--bg-primary) / <alpha-value>)",
        "paper-2": "rgb(var(--bg-secondary) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--text-primary) / <alpha-value>)",
        muted: "rgb(var(--text-secondary) / <alpha-value>)",
        faint: "rgb(var(--text-tertiary) / <alpha-value>)",
        hairline: "rgb(var(--border) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        "gold-ink": "rgb(var(--gold-ink) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "blue-ref": "rgb(var(--blue-ref) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
