/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#5A189A',
          700: '#4C1D95',
          800: '#3B185F',
        }
      }
    },
  },
  plugins: [],
} 