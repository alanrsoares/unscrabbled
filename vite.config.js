import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["@sveltestack/svelte-query"],
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});