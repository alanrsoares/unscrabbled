import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["@sveltestack/svelte-query"],
  },
  resolve: {
    alias: {
      "~": path.resolve("./src/"),
    },
  },
});
