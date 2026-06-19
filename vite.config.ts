import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// User site (kazuork.github.io) is served from the domain root, so base = "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
