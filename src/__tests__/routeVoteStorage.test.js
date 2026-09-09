import { describe, expect, it } from 'vitest';
import { countRouteVotes, toggleRouteVote } from '@/lib/routeVoteStorage';

function createSupabaseStub({
  countResult = { count: 0, error: null },
  existingVoteResult = { data: null, error: null },
  mutationResult = { error: null },
} = {}) {
  const calls = [];

  const createBuilder = () => {
    let result = mutationResult;
    const builder = {
      select(columns, options) {
        calls.push(['select', columns, options]);
        result = options?.count ? countResult : existingVoteResult;
        return builder;
      },
      eq(column, value) {
        calls.push(['eq', column, value]);
        return builder;
      },
      maybeSingle() {
        calls.push(['maybeSingle']);
        return Promise.resolve(existingVoteResult);
      },
      insert(payload) {
        calls.push(['insert', payload]);
        return Promise.resolve(mutationResult);
      },
      delete() {
        calls.push(['delete']);
        result = mutationResult;
        return builder;
      },
      then(resolve) {
        return Promise.resolve(result).then(resolve);
      },
    };
    return builder;
  };

  return {
    calls,
    supabase: {
      from(table) {
        calls.push(['from', table]);
        return createBuilder();
      },
    },
  };
}

describe('route vote storage', () => {
  it('counts real votes with a normalized route path', async () => {
    const { supabase, calls } = createSupabaseStub({
      countResult: { count: 12, error: null },
    });

    await expect(countRouteVotes(supabase, '/tools/roi/?utm=1')).resolves.toBe(12);

    expect(calls).toContainEqual(['from', 'route_votes']);
    expect(calls).toContainEqual(['select', 'id', { count: 'exact', head: true }]);
    expect(calls).toContainEqual(['eq', 'route_path', '/tools/roi']);
  });

  it('adds a vote when this visitor has not voted on the route yet', async () => {
    const { supabase, calls } = createSupabaseStub({
      existingVoteResult: { data: null, error: null },
    });

    await expect(
      toggleRouteVote(supabase, {
        routePath: '/tools/city/',
        voterKey: 'visitor-hash',
        userId: null,
        userAgent: 'vitest',
      })
    ).resolves.toEqual({ action: 'added', userHasVoted: true });

    expect(calls).toContainEqual([
      'insert',
      {
        route_path: '/tools/city',
        voter_key: 'visitor-hash',
        user_id: null,
        user_agent: 'vitest',
      },
    ]);
  });

  it('removes an existing vote when the visitor clicks again', async () => {
    const { supabase, calls } = createSupabaseStub({
      existingVoteResult: { data: { id: 'vote-1' }, error: null },
    });

    await expect(
      toggleRouteVote(supabase, {
        routePath: '/tools/city',
        voterKey: 'visitor-hash',
      })
    ).resolves.toEqual({ action: 'removed', userHasVoted: false });

    expect(calls).toContainEqual(['delete']);
    expect(calls).toContainEqual(['eq', 'route_path', '/tools/city']);
    expect(calls).toContainEqual(['eq', 'voter_key', 'visitor-hash']);
  });

  it('does not mark a visitor as voted when storage is unavailable', async () => {
    const { supabase } = createSupabaseStub({
      existingVoteResult: { data: null, error: null },
      mutationResult: { error: new Error('table missing') },
    });

    await expect(
      toggleRouteVote(supabase, {
        routePath: '/tools/city',
        voterKey: 'visitor-hash',
      })
    ).resolves.toEqual({ action: 'unavailable', userHasVoted: false });
  });
});
