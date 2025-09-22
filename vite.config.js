import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: true, // Listen on all network interfaces
    port: 3000, // Changed to port 3000 to avoid conflicts
    strictPort: true, // Don't try to find another port if 3000 is in use
    open: true, // Automatically open the browser
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname || __dirname, "./src"),
    },
  },
}));
