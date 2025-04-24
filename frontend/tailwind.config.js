// tailwind.config.js - Tailwind CSS configuration for LaredocMind
// ---------------------------------------------------------------
import colors from "./theme/colors.js";
import shadows from "./theme/shadows.js";
import animations from "./theme/animations.js";
import keyframes from "./theme/keyframes.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors,
      animation: animations,
      keyframes,
      boxShadow: shadows,
    },
  },
  plugins: [],
};
