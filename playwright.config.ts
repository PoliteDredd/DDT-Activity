import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3001',
    headless: false,
    screenshot: 'on',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'node airtime-app/server.js',
    url: 'http://localhost:3001/airtime',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});