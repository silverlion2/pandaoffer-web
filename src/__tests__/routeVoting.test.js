import { describe, expect, it } from 'vitest';
import {
  buildRouteVoteStats,
  getRouteVoteBaseCount,
  normalizeRoutePath,
} from '@/lib/routeVoting';

describe('route voting helpers', () => {
  it('normalizes routes before using them as vote keys', () => {
    expect(normalizeRoutePath('https://www.pandaoffer.top/tools/roi/?utm=test#pricing')).toBe('/tools/roi');
    expect(normalizeRoutePath('/china-study-tours#request-route')).toBe('/china-study-tours');
    expect(normalizeRoutePath('')).toBe('/');
  });

  it('generates stable seeded baseline counts per route', () => {
    const first = getRouteVoteBaseCount('/tools/roi');
    const second = getRouteVoteBaseCount('/tools/roi/');
    const otherRoute = getRouteVoteBaseCount('/tools/city');

    expect(first).toBe(second);
    expect(first).toBeGreaterThanOrEqual(86);
    expect(first).toBeLessThanOrEqual(486);
    expect(otherRoute).not.toBe(first);
  });

  it('adds real backend votes on top of seeded baseline display counts', () => {
    const stats = buildRouteVoteStats('/tools/roi', 7, true);

    expect(stats.routePath).toBe('/tools/roi');
    expect(stats.realCount).toBe(7);
    expect(stats.displayCount).toBe(stats.baseCount + 7);
    expect(stats.userHasVoted).toBe(true);
  });
});
