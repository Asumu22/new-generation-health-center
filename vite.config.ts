import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    port: 5173,
    strictPort: true, // Forces an error if 5173 is busy instead of jumping to 5174
    host: true, // Better for local network resolving in Buea
  },
});