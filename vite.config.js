import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ["@sveltestack/svelte-query"],
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
