import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 15 * 1000,
  expect: {
    timeout: 3000,
  },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  use: {
    actionTimeout: 500,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'vite dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'iPhone SE',
      use: {
        browserName: 'webkit',
        ...devices['iPhone SE'],
      },
    },
    {
      name: 'Desktop',
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
      },
    },
  ],
}

export default config
