import { describe, expect, it } from 'vitest';
import {
  ROUTE_VOTER_COOKIE,
  buildVoterKey,
  isValidVoterId,
  routeVoterCookieOptions,
} from '@/lib/routeVoteIdentity';

describe('route vote visitor identity', () => {
  it('accepts only generated UUID-style visitor ids', () => {
    expect(isValidVoterId('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(isValidVoterId('visitor-hash')).toBe(false);
    expect(isValidVoterId('')).toBe(false);
  });

  it('hashes visitor ids before storing them as voter keys', () => {
    const first = buildVoterKey('550e8400-e29b-41d4-a716-446655440000');
    const second = buildVoterKey('550e8400-e29b-41d4-a716-446655440000');

    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
    expect(first).not.toContain('550e8400');
  });

  it('uses a persistent same-site cookie for route vote dedupe', () => {
    expect(ROUTE_VOTER_COOKIE).toBe('po_route_voter');
    expect(routeVoterCookieOptions).toMatchObject({
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  });
});
