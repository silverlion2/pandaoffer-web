import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  ROUTE_VOTER_COOKIE,
  buildVoterKey,
  createVoterId,
  isValidVoterId,
  routeVoterCookieOptions,
} from '@/lib/routeVoteIdentity';
import { countRouteVotes, hasRouteVote, toggleRouteVote } from '@/lib/routeVoteStorage';
import { buildRouteVoteStats, normalizeRoutePath } from '@/lib/routeVoting';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let supabaseAdmin = null;

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!supabaseAdmin) {
    supabaseAdmin = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseAdmin;
}

async function getVoterIdentity() {
  const cookieStore = await cookies();
  const existingVoterId = cookieStore.get(ROUTE_VOTER_COOKIE)?.value;
  const voterId = isValidVoterId(existingVoterId) ? existingVoterId : createVoterId();

  return {
    voterId,
    voterKey: buildVoterKey(voterId),
    shouldSetCookie: voterId !== existingVoterId,
  };
}

function jsonWithVoterCookie(payload, identity, init) {
  const response = NextResponse.json(payload, init);

  if (identity.shouldSetCookie) {
    response.cookies.set(ROUTE_VOTER_COOKIE, identity.voterId, routeVoterCookieOptions);
  }

  return response;
}

export async function GET(request) {
  const identity = await getVoterIdentity();
  const routePath = normalizeRoutePath(new URL(request.url).searchParams.get('path') || '/');
  const supabase = getSupabaseAdmin();
  const realCount = await countRouteVotes(supabase, routePath);
  const userHasVoted = await hasRouteVote(supabase, routePath, identity.voterKey);

  return jsonWithVoterCookie(
    buildRouteVoteStats(routePath, realCount, userHasVoted),
    identity
  );
}

export async function POST(request) {
  const identity = await getVoterIdentity();
  const body = await request.json().catch(() => ({}));
  const routePath = normalizeRoutePath(body.path || request.headers.get('referer') || '/');
  const supabase = getSupabaseAdmin();

  const voteResult = await toggleRouteVote(supabase, {
    routePath,
    voterKey: identity.voterKey,
    userId: null,
    userAgent: request.headers.get('user-agent')?.slice(0, 256) || null,
  });
  const realCount = await countRouteVotes(supabase, routePath);

  return jsonWithVoterCookie(
    {
      ...buildRouteVoteStats(routePath, realCount, voteResult.userHasVoted),
      action: voteResult.action,
    },
    identity
  );
}
