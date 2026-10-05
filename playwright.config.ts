import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for QAForge E2E tests.
 *
 * Tests live in tests/e2e/
 * Run with: npm run test:e2e
 *
 * The dev server is started automatically when running tests locally.
 */

export default defineConfig({
  testDir: "./tests/e2e",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left in source */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter */
  reporter: process.env.CI ? "line" : "html",

  /* Shared settings for all projects */
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Test against Chromium by default — extend in CI */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Start dev server automatically for local runs */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
