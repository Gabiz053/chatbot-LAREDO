import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import * as path from "path";

// Get the current directory name for ESM compatibility
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
});
