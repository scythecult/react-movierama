import { defineConfig, devices } from '@playwright/test';
import { Config } from './src/common/env';

const testUrl = Config.ssrUrl;

export default defineConfig({
  testDir: './src',
  testMatch: /.*\.e2e\.test\.(ts|tsx)/,
  // Tests in a file share one page, and the mock API store is process-wide.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  preserveOutput: 'failures-only',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: testUrl,
    testIdAttribute: 'data-test-id',
    headless: !Config.isE2eTestDebugMode,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run serve:test',
    url: testUrl,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
  },
});
