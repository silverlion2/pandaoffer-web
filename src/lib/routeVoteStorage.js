import { normalizeRoutePath } from '@/lib/routeVoting';

export async function countRouteVotes(supabase, routePath) {
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from('route_votes')
    .select('id', { count: 'exact', head: true })
    .eq('route_path', normalizeRoutePath(routePath));

  if (error) return 0;
  return Number.isFinite(Number(count)) ? Number(count) : 0;
}

export async function hasRouteVote(supabase, routePath, voterKey) {
  if (!supabase || !voterKey) return false;

  const { data, error } = await supabase
    .from('route_votes')
    .select('id')
    .eq('route_path', normalizeRoutePath(routePath))
    .eq('voter_key', voterKey)
    .maybeSingle();

  if (error) return false;
  return Boolean(data?.id);
}

export async function addRouteVote(supabase, { routePath, voterKey, userId = null, userAgent = null }) {
  if (!supabase || !voterKey) return false;

  const { error } = await supabase.from('route_votes').insert({
    route_path: normalizeRoutePath(routePath),
    voter_key: voterKey,
    user_id: userId,
    user_agent: userAgent,
  });

  return !error;
}

export async function removeRouteVote(supabase, { routePath, voterKey }) {
  if (!supabase || !voterKey) return false;

  const { error } = await supabase
    .from('route_votes')
    .delete()
    .eq('route_path', normalizeRoutePath(routePath))
    .eq('voter_key', voterKey);

  return !error;
}

export async function toggleRouteVote(supabase, { routePath, voterKey, userId = null, userAgent = null }) {
  const routePathKey = normalizeRoutePath(routePath);
  const alreadyVoted = await hasRouteVote(supabase, routePathKey, voterKey);

  if (alreadyVoted) {
    const removed = await removeRouteVote(supabase, { routePath: routePathKey, voterKey });
    return removed
      ? { action: 'removed', userHasVoted: false }
      : { action: 'unavailable', userHasVoted: true };
  }

  const added = await addRouteVote(supabase, { routePath: routePathKey, voterKey, userId, userAgent });
  return added
    ? { action: 'added', userHasVoted: true }
    : { action: 'unavailable', userHasVoted: false };
}
