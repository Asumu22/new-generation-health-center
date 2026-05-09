import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Forces an error if 5173 is busy instead of jumping to 5174
    host: true, // Better for local network resolving in Buea
  },
});
