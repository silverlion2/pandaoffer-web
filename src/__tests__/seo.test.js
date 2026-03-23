import { describe, it, expect } from 'vitest';

// Test the sitemap and robots utilities
describe('SEO configuration', () => {
  it('sitemap module exports a function', async () => {
    // Verify the sitemap generator exists and is callable
    const sitemapModule = await import('@/app/sitemap');
    expect(typeof sitemapModule.default).toBe('function');
  });

  it('robots module exports a function', async () => {
    const robotsModule = await import('@/app/robots');
    expect(typeof robotsModule.default).toBe('function');
  });

  it('robots returns valid config with sitemap URL', async () => {
    const robotsModule = await import('@/app/robots');
    const config = robotsModule.default();
    expect(config).toHaveProperty('rules');
    expect(config).toHaveProperty('sitemap');
    expect(config.sitemap).toContain('pandaoffer.top');
  });

  it('manifest module exports a function', async () => {
    const manifestModule = await import('@/app/manifest');
    expect(typeof manifestModule.default).toBe('function');
  });
});
