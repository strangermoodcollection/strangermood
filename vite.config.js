import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        boutique: fileURLToPath(new URL("./index.html", import.meta.url)),
        client: fileURLToPath(new URL("./client.html", import.meta.url)),
      },
    },
  },
});
