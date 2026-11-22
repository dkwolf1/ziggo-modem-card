import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  use: { channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
});
