import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "bun run dev --port 5179",
    port: 5179,
    reuseExistingServer: false,
  },
  use: {
    baseURL: "http://localhost:5179",
  },
  testDir: "tests",
};

export default config;
