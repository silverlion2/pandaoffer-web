import { afterEach, expect, it, vi } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { POST } from '@/app/api/matcher/route';
import { createLocalMatch } from '@/lib/matcher';
import { isUsableAiMatch } from '@/lib/matcher-response';

vi.mock('@supabase/supabase-js', () => ({ createClient: vi.fn() }));
const profile = { nationality: 'India', major: 'STEM', gpa: { scale: 'percentage', value: '84' } };
const request = () => new Request('http://localhost/api/matcher', { method: 'POST', body: JSON.stringify(profile) });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.useRealTimers(); });

it('does not initialize optional reference storage when AI is unavailable', async () => {
  vi.stubEnv('DEEPSEEK_KEY', '');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://synthetic.invalid');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'synthetic');
  createClient.mockImplementation(() => { throw new Error('must not connect'); });
  const response = await POST(request());
  expect((await response.json()).meta.source).toBe('curated-local');
  expect(createClient).not.toHaveBeenCalled();
});

it('bounds stalled reference retrieval before attempting AI and aborts all queries', async () => {
  vi.useFakeTimers();
  vi.stubEnv('DEEPSEEK_KEY', 'synthetic');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://synthetic.invalid');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'synthetic');
  const signals = [];
  const query = {};
  for (const method of ['select', 'eq', 'order', 'limit']) query[method] = () => query;
  query.abortSignal = signal => { signals.push(signal); return new Promise(() => {}); };
  createClient.mockReturnValue({ from: () => query });
  const fetchMock = vi.fn().mockResolvedValue(Response.json({ choices: [{ message: { content: JSON.stringify(createLocalMatch(profile)) } }] }));
  vi.stubGlobal('fetch', fetchMock);
  const responsePromise = POST(request());
  await vi.advanceTimersByTimeAsync(2999);
  expect(fetchMock).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(1);
  expect((await (await responsePromise).json()).meta.source).toBe('ai');
  expect(signals).toHaveLength(3);
  expect(signals.every(signal => signal.aborted)).toBe(true);
});

it.each(['name', 'program', 'code', 'city', 'tier', 'cscAgency', 'whyMatch', 'insiderTip', 'tuitionUSD', 'matchPercent'])('rejects malformed rendered university field %s', field => {
  const result = createLocalMatch(profile);
  result.universities[0][field] = {};
  expect(isUsableAiMatch(result)).toBe(false);
});

it.each(['cscProbability', 'cscTip', 'overallAdvice'])('rejects malformed summary field %s', field => {
  const result = createLocalMatch(profile);
  result[field] = {};
  expect(isUsableAiMatch(result)).toBe(false);
});
