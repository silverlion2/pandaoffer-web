import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLocalMatch, normalizeGpa } from '@/lib/matcher';
import { POST } from '@/app/api/matcher/route';

const profile = {
  nationality: 'India',
  major: 'STEM',
  gpa: { scale: 'percentage', value: '84' },
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('local university matcher', () => {
  it('normalizes supported GPA scales', () => {
    expect(normalizeGpa({ scale: 'percentage', value: '80' })).toBe(80);
    expect(normalizeGpa({ scale: 'four', value: '3.2' })).toBe(80);
    expect(normalizeGpa({ scale: 'five', value: '4' })).toBe(80);
  });

  it('returns a deterministic three-school shortlist with provenance', () => {
    const first = createLocalMatch(profile);
    const second = createLocalMatch(profile);

    expect(first).toEqual(second);
    expect(first.universities).toHaveLength(3);
    expect(new Set(first.universities.map((university) => university.slug)).size).toBe(3);
    expect(first.universities.every((university) => /engineering|computer|science|technology|robotics|data|math|physics/i.test(university.program))).toBe(true);
    expect(first.meta).toMatchObject({ source: 'curated-local', isPartial: true });
  });

  it('does not inflate guidance for a very low GPA', () => {
    const result = createLocalMatch({ ...profile, gpa: { scale: 'percentage', value: '10' } });

    expect(Math.max(...result.universities.map((university) => university.matchPercent))).toBeLessThanOrEqual(30);
    expect(result.cscProbability).toBe(5);
  });
});

describe('matcher API resilience', () => {
  it('returns curated results when the AI credential is absent', async () => {
    vi.stubEnv('DEEPSEEK_KEY', '');
    const response = await POST(new Request('http://localhost/api/matcher', {
      method: 'POST',
      body: JSON.stringify(profile),
    }));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.universities).toHaveLength(3);
    expect(result.meta.source).toBe('curated-local');
  });

  it('falls back when the AI dependency fails', async () => {
    vi.stubEnv('DEEPSEEK_KEY', 'test-key');
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('dependency offline'));
    const response = await POST(new Request('http://localhost/api/matcher', {
      method: 'POST',
      body: JSON.stringify(profile),
    }));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.meta.source).toBe('curated-local');
  });

  it('rejects an invalid profile at the server boundary', async () => {
    const response = await POST(new Request('http://localhost/api/matcher', {
      method: 'POST',
      body: JSON.stringify({ ...profile, gpa: { scale: 'percentage', value: '140' } }),
    }));

    expect(response.status).toBe(400);
  });

  it('rejects oversized text before it reaches an external service', async () => {
    const response = await POST(new Request('http://localhost/api/matcher', {
      method: 'POST',
      body: JSON.stringify({ ...profile, nationality: 'x'.repeat(81) }),
    }));

    expect(response.status).toBe(400);
  });
});
