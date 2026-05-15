/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        uic: {
          // Primary palette — official UIC brand colors (May 2026 guidelines)
          red: "#D50032",        // Fire Engine Red — Pantone 199 C (dominant)
          navy: "#001E62",       // Navy Pier Blue — Pantone 2758 C (anchor)
          "navy-dark": "#001244",
          "navy-light": "#002a8a",
          // Neutrals — official UIC brand
          "expo-white": "#F6F3EC",   // Expo White — warm off-white
          "beach": "#FEF8E0",        // North Avenue Beach — warm cream
          "steel": "#343333",        // Steel Gray — body text
          // Secondary
          "brick": "#B10000",        // Chicago Brick — darker red accent
          "slate": "#A6C5D7",        // Second City Slate — light blue accent
        },
      },
      fontFamily: {
        display: ["Barlow Condensed", "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
