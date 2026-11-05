import { defineConfig } from '@playwright/test';
import { join } from 'node:path';

if (process.env.PANDA_BROWSER_GATE !== '1' || !process.env.PANDA_BROWSER_OUTPUT) {
  throw new Error('Use npm run test:e2e:prod to own a credential-free build and preview.');
}
const output = process.env.PANDA_BROWSER_OUTPUT;
export default defineConfig({
  testDir: './e2e', testMatch: '*.pw.js', timeout: 30000,
  fullyParallel: false, workers: 1, retries: 0,
  outputDir: join(output, 'results'),
  reporter: [['list'], ['html', { outputFolder: join(output, 'report'), open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4177', serviceWorkers: 'block', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1280, height: 900 } } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
