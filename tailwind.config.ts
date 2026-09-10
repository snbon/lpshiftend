import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#6366f1', foreground: '#ffffff' },
        /*
         * The brand palette, previously only hand-written utilities in
         * index.css. Tailwind never knew these names, so every opacity variant
         * the design used — text-ink-2/60, bg-paper/90, text-paper/80 — matched
         * no class and silently produced nothing. Muted text fell back to full
         * ink everywhere, and the beta banner rendered ink on ink: invisible.
         * Sourced from the same CSS variables so there is one set of values.
         */
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
          2: 'rgb(var(--ink-2-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
};

export default config;
