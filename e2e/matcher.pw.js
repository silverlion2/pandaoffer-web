import { test as base, expect } from '@playwright/test';

const origin = 'http://127.0.0.1:4177';
const test = base.extend({
  page: async ({ page, context }, provide, info) => {
    const errors = [];
    const forbidden = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() !== 'error') return;
      const expected = info.annotations.some(item => item.type === 'expected-matcher-status'
        && message.location().url === `${origin}/api/matcher`
        && message.text().startsWith(`Failed to load resource: the server responded with a status of ${item.description}`));
      if (!expected) errors.push(message.text());
    });
    await context.route('**/*', async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin !== origin) return route.fulfill({ status: 204, body: '' });
      if (!['GET', 'HEAD'].includes(request.method()) && !(url.pathname === '/api/matcher' && request.method() === 'POST')) {
        forbidden.push(`${request.method()} ${url.pathname}`);
        return route.abort();
      }
      await route.continue();
    });
    await context.routeWebSocket('**/*', socket => { forbidden.push('WebSocket'); socket.close(); });
    await provide(page);
    expect(forbidden).toEqual([]);
    expect(errors).toEqual([]);
  },
});

async function profile(page, country = 'India', gpa = '85') {
  await page.getByLabel('Nationality', { exact: true }).selectOption(country);
  await page.getByLabel('Target Major', { exact: true }).selectOption('STEM');
  await page.getByLabel('Current GPA / Marks', { exact: true }).fill(gpa);
}
async function submit(page) {
  await page.getByRole('button', { name: 'Build my free shortlist' }).click();
}
async function healthy(page) {
  await expect(page.locator('body')).not.toBeEmpty();
  await expect(page.locator('nextjs-portal')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}
async function shot(page, info, name) {
  await page.screenshot({ path: info.outputPath(`${name}.png`) });
}

test('real credential-free shortlist, validation, edit and retry', async ({ page }, info) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PandaOffer/i);
  await expect(page.getByRole('heading', { name: 'Find My Top 3 Universities' })).toBeVisible();
  await healthy(page);
  await shot(page, info, 'homepage');
  await submit(page);
  await expect(page.getByLabel('Nationality', { exact: true })).toBeFocused();
  await profile(page);
  const responsePromise = page.waitForResponse(response => response.url() === `${origin}/api/matcher`);
  await submit(page);
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  expect((await response.json()).meta.source).toBe('curated-local');
  await expect(page.getByText('Curated shortlist ready')).toBeVisible();
  await expect(page.getByText('Based on your India nationality and 85 GPA.')).toBeVisible();
  await page.getByRole('heading', { name: 'Three options to start your research' }).scrollIntoViewIfNeeded();
  await healthy(page);
  await shot(page, info, 'curated-results');
  await page.getByRole('button', { name: 'Back to Search' }).click();
  await expect(page.getByLabel('Current GPA / Marks', { exact: true })).toHaveValue('85');
  await profile(page, 'Nigeria', '70');
  await submit(page);
  await expect(page.getByText('Based on your Nigeria nationality and 70 GPA.')).toBeVisible();
});

test('second request failure clears old results and retry preserves new inputs', async ({ page }, info) => {
  info.annotations.push({ type: 'expected-matcher-status', description: '503' });
  await page.goto('/');
  await profile(page);
  await submit(page);
  await expect(page.getByText('Curated shortlist ready')).toBeVisible();
  await page.getByRole('button', { name: 'Back to Search' }).click();
  await page.route('**/api/matcher', route => route.fulfill({ status: 503, json: { error: 'synthetic outage' } }));
  await profile(page, 'Nigeria', '70');
  await submit(page);
  await expect(page.getByRole('heading', { name: 'Matching Unavailable' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Matching Unavailable' })).toBeInViewport();
  await expect(page.getByText('Curated shortlist ready')).toHaveCount(0);
  await healthy(page);
  await shot(page, info, 'recoverable-error');
  await page.getByRole('button', { name: 'Try Again' }).click();
  await expect(page.getByLabel('Nationality', { exact: true })).toHaveValue('Nigeria');
  await expect(page.getByLabel('Current GPA / Marks', { exact: true })).toHaveValue('70');
});

test('cancel pending work then complete a newer attempt', async ({ page }, info) => {
  let pending;
  await page.route('**/api/matcher', route => { pending = route; });
  await page.goto('/');
  await profile(page);
  await submit(page);
  const cancel = page.getByRole('button', { name: 'Cancel matching' });
  await expect(cancel).toBeVisible();
  await expect(cancel).toBeInViewport();
  expect((await cancel.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await shot(page, info, 'pending');
  await cancel.click();
  await page.unroute('**/api/matcher');
  await profile(page, 'Nigeria', '70');
  await submit(page);
  await expect(page.getByText('Based on your Nigeria nationality and 70 GPA.')).toBeVisible();
  await pending.fulfill({ json: { universities: [{ name: 'obsolete' }] } }).catch(() => {});
  await expect(page.getByText('Curated shortlist ready')).toBeVisible();
});

test('malformed payload is recoverable without a React crash', async ({ page }) => {
  await page.route('**/api/matcher', route => route.fulfill({ json: { universities: [{ name: {}, program: 'STEM' }] } }));
  await page.goto('/');
  await profile(page);
  await submit(page);
  await expect(page.getByRole('heading', { name: 'Matching Unavailable' })).toBeVisible();
  await healthy(page);
});

test('storage denial keeps the public matcher usable', async ({ page }) => {
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) Storage.prototype[method] = () => { throw new DOMException('Synthetic storage denial', 'SecurityError'); };
  });
  await page.goto('/');
  await profile(page);
  await submit(page);
  await expect(page.getByText('Curated shortlist ready')).toBeVisible();
  await healthy(page);
});

test('server rejects invalid profiles and protected routes require login', async ({ page }, info) => {
  info.annotations.push({ type: 'expected-matcher-status', description: '400' });
  await page.goto('/');
  const status = await page.evaluate(async () => (await fetch('/api/matcher', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nationality: 'India', major: 'STEM', gpa: { scale: 'percentage', value: '150' } }),
  })).status);
  expect(status).toBe(400);
  await page.goto('/account');
  await expect(page).toHaveURL(/\/auth\/login/);
});

test('homepage city links retain their public addresses and load real guides', async ({ page }) => {
  for (const city of ['Shanghai', 'Beijing', 'Hangzhou', 'Wuhan']) {
    await page.goto('/');
    await page.locator('footer').getByRole('link', { name: `Study in ${city}`, exact: true }).click();
    await expect(page).toHaveURL(`${origin}/study-in-${city.toLowerCase()}`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(city);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.pandaoffer.top/study-in-${city.toLowerCase()}`);
  }
});

test('a stalled request reaches a retry state at the client deadline', async ({ page }) => {
  await page.clock.install();
  let pending;
  await page.route('**/api/matcher', route => { pending = route; });
  await page.goto('/');
  await profile(page);
  await submit(page);
  await expect(page.getByRole('button', { name: 'Cancel matching' })).toBeVisible();
  await page.clock.fastForward(20001);
  await expect(page.getByRole('heading', { name: 'Matching Unavailable' })).toBeVisible();
  await pending.abort().catch(() => {});
});

test('an empty shortlist explains the outcome and offers profile editing', async ({ page }) => {
  await page.route('**/api/matcher', async route => {
    const response = await route.fetch();
    const result = await response.json();
    await route.fulfill({ json: { ...result, universities: [] } });
  });
  await page.goto('/');
  await profile(page);
  await submit(page);
  await expect(page.getByRole('heading', { name: 'No matches yet' })).toBeVisible();
  await page.getByRole('button', { name: 'Adjust profile' }).click();
  await expect(page.getByLabel('Nationality', { exact: true })).toHaveValue('India');
});

test('sitemap city and major URLs serve their existing content and unknown slugs stay 404', async ({ page }) => {
  const sitemap = await page.request.get(`${origin}/sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(match => new URL(match[1]).pathname).filter(path => path.startsWith('/study-'));
  expect(paths.length).toBeGreaterThan(20);
  for (const path of paths) {
    const response = await page.request.get(`${origin}${path}`);
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toContain(`href="https://www.pandaoffer.top${path}"`);
  }
  const major = paths.find(path => !path.startsWith('/study-in-'));
  await page.goto(major);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Study');
  expect((await page.request.get(`${origin}/study-in-synthetic-unknown`)).status()).toBe(404);
  expect((await page.request.get(`${origin}/study-synthetic-unknown-in-china`)).status()).toBe(404);
});
