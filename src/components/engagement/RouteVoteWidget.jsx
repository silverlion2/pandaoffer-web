"use client";

import { useEffect, useMemo, useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { buildRouteVoteStats, normalizeRoutePath } from '@/lib/routeVoting';

export default function RouteVoteWidget() {
  const pathname = usePathname() || '/';
  const routePath = useMemo(() => normalizeRoutePath(pathname), [pathname]);
  const [stats, setStats] = useState(() => buildRouteVoteStats(routePath));
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    let isActive = true;

    setStats(buildRouteVoteStats(routePath));

    async function loadVotes() {
      try {
        const response = await fetch(`/api/route-votes?path=${encodeURIComponent(routePath)}`, {
          cache: 'no-store',
        });

        if (!response.ok) return;
        const nextStats = await response.json();
        if (isActive) setStats(nextStats);
      } catch {
        // Keep the seeded count if analytics is unavailable.
      }
    }

    loadVotes();

    return () => {
      isActive = false;
    };
  }, [routePath]);

  async function handleVote() {
    if (isVoting) return;

    setIsVoting(true);

    try {
      const response = await fetch('/api/route-votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: routePath }),
      });

      if (!response.ok) return;
      setStats(await response.json());
    } catch {
      // Voting should never block page usage.
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <aside
      aria-label="Page popularity"
      className="fixed bottom-3 left-3 z-40 sm:bottom-4 sm:left-4"
    >
      <button
        type="button"
        onClick={handleVote}
        disabled={isVoting}
        aria-pressed={stats.userHasVoted}
        aria-label={stats.userHasVoted ? 'Remove vote for this page' : 'Vote for this page'}
        className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-left shadow-lg shadow-slate-900/10 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-wait disabled:opacity-70 sm:gap-3 sm:px-4 sm:py-3 ${
          stats.userHasVoted
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : 'border-slate-200 bg-white/95 text-slate-700 hover:border-emerald-300 hover:text-emerald-700'
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
            stats.userHasVoted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'
          }`}
        >
          <ThumbsUp size={18} fill={stats.userHasVoted ? 'currentColor' : 'none'} />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Popular
          </span>
          <span className="mt-1 flex items-baseline gap-1">
            <strong className="text-base font-extrabold text-slate-900">{stats.displayCount}</strong>
            <span className="text-xs font-semibold text-slate-500">votes</span>
          </span>
        </span>
      </button>
    </aside>
  );
}
