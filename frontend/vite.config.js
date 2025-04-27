import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  // Dev server configuration
  server: {
    port: 21000,
    host: true,
  },
  // Path alias for cleaner imports
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src") + "/",
    },
  },
  // Plugins array (add more plugins as needed)
  plugins: [
    react(),
    // Add more plugins here
  ],

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
