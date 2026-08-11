import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // section color classes (bg-*/border-*) live in data, not source
    "./data/sections/**/*.json",
    // class strings extracted into lib (copy-glow's text-shadow utilities,
    // highlight colors) must stay in the scan or Tailwind never emits them
    "./lib/**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Reading / display voice
        serif: ["Cardo", "Georgia", "serif"],
        // UI voice: labels, nav, pills, counts
        sans: ['"Public Sans"', "system-ui", "sans-serif"],
        // shavat2 fonts
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
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
        // Primary greens
        'shavat-darkest': '#1F2E24',
        'shavat-dark': '#3A4A3C',
        'shavat-mid': '#6B7F69',
        'shavat-light': '#A6B39E',
        'shavat-cream': '#F7F5F1',
        // Secondary accent colors
        'shavat-gold': '#C8A248',
        'shavat-sand': '#D9D1B5',
        'shavat-rose': '#E56E7D',
        'shavat-purple': '#8E7CC3',
        'shavat-slate': '#6B7D8F',
        // Neutrals
        'shavat-black': '#1C1C1C',
        'shavat-charcoal': '#4A4A45',
        'shavat-gray': '#7A7A74',
        'shavat-silver': '#B7B6AF',
        'shavat-pale': '#EEEBE6',
        // Aliases for backward compatibility
        'shavat-sidebar': '#3A4A3C',
        'shavat-band-dark': '#1C1C1C',
        'shavat-border-dark': '#4A4A45',
        'shavat-text-light': '#B7B6AF',
        'shavat-text-muted': '#7A7A74',
        'reader-bg': '#EEEBE6',
        'reader-surface': '#FBFAF7',
        'reader-card': '#FFFFFF',
        'reader-card-border': '#EAE5D8',
        'reader-verse-text': '#26261F',
        'reader-secondary': '#4A4A45',
        'reader-muted': '#7A7A74',
        'reader-border': '#E6E1D3',
        'reader-bg-dark': '#141613',
        'reader-surface-dark': '#1B1D19',
        'reader-card-dark': '#22241E',
        'reader-card-border-dark': '#33352E',
        'reader-control-dark': '#24261F',
        'reader-control-border-dark': '#3A3D36',
        'reader-verse-text-dark': '#DEDBD2',
        'reader-secondary-dark': '#B7B6AF',
        'reader-muted-dark': '#93928C',
        'reader-nav-inactive': '#C4CDBE',
      },
      letterSpacing: {
        'wide-1': '2px',
        'wide-2': '2.4px',
        'wide-3': '2.6px',
        'wide-4': '3.2px',
        'wide-5': '5px',
        'wide-6': '6px',
      },
    },
  },
  plugins: [],
};
export default config;
