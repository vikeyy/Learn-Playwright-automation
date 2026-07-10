import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * PLAYWRIGHT CONFIGURATION
 * ------------------------
 * This file controls how tests run: timeouts, browsers, env vars, and artifacts.
 */

// Load variables from .env file (BASE_URL, USER_USERNAME, etc.)
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  testDir: './tests',

  // Global timeout for each test (30 seconds)
  timeout: 30_000,

  // How long to wait for expect() assertions (5 seconds)
  expect: {
    timeout: 5_000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // Base URL from .env — page.goto('/login') becomes https://qademo.com/login
    baseURL: process.env.BASE_URL || 'https://qademo.com',

    // Default timeout for actions like click() and fill() (10 seconds)
    actionTimeout: 10_000,
    navigationTimeout: 15_000,

    // ARTIFACT COLLECTION — saved when a test fails (helps debug failures)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
