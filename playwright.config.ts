import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  webServer: {
    command: process.env.CI
      ? `pnpm run build && pnpm run start`
      : `pnpm run dev`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  testDir: './src/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Configure projects for major browsers. Only runs chrome when non-CI. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    ...(process.env.CI
      ? [
          {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
          },
          // NOTE: add as needed. Adding slows down CI runs as it has to dl
          // more dependencies and has to rerun the tests for each browser.
          // {
          //   name: 'firefox',
          //   use: { ...devices['Desktop Firefox'] },
          // },

          // NOTE: add as needed
          // {
          //   name: 'webkit',
          //   use: { ...devices['Desktop Safari'] },
          // },

          // NOTE: add as needed
          // {
          //   name: 'Mobile Safari',
          //   use: { ...devices['iPhone 15 Pro'] },
          // },
        ]
      : []),
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
