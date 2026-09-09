import crypto from 'node:crypto';

export const ROUTE_VOTER_COOKIE = 'po_route_voter';

export const routeVoterCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
};

export function isValidVoterId(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value || '');
}

export function createVoterId() {
  return crypto.randomUUID();
}

export function buildVoterKey(voterId) {
  return crypto.createHash('sha256').update(String(voterId)).digest('hex');
}
