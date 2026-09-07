import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('proxy without Supabase configuration', () => {
  it('allows the public matcher journey to load', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');

    const response = await proxy(new NextRequest('http://localhost/'));

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('keeps protected routes closed', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');

    const response = await proxy(new NextRequest('http://localhost/account/saved'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/auth/login?redirect=%2Faccount%2Fsaved');
  });
});
