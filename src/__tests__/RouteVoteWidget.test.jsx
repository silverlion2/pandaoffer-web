import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RouteVoteWidget from '@/components/engagement/RouteVoteWidget';
import { getRouteVoteBaseCount } from '@/lib/routeVoting';

vi.mock('next/navigation', () => ({
  usePathname: () => '/tools/roi',
}));

describe('RouteVoteWidget', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the seeded route count before backend totals load', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        routePath: '/tools/roi',
        baseCount: getRouteVoteBaseCount('/tools/roi'),
        realCount: 4,
        displayCount: getRouteVoteBaseCount('/tools/roi') + 4,
        userHasVoted: false,
      }),
    });

    render(<RouteVoteWidget />);

    expect(screen.getByText(String(getRouteVoteBaseCount('/tools/roi')))).toBeInTheDocument();
  });

  it('uses a compact mobile layout so it does not cover page content', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<RouteVoteWidget />);

    expect(screen.getByLabelText('Page popularity')).toHaveClass('right-4', 'sm:left-4');
    expect(screen.getByRole('button', { name: /vote for this page/i })).toHaveClass('h-12', 'w-12', 'sm:w-auto');
    expect(screen.getByText('Popular')).toHaveClass('hidden', 'sm:block');
  });

  it('loads real vote totals and posts a route vote', async () => {
    const baseCount = getRouteVoteBaseCount('/tools/roi');
    const fetchMock = vi.spyOn(global, 'fetch');

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          routePath: '/tools/roi',
          baseCount,
          realCount: 4,
          displayCount: baseCount + 4,
          userHasVoted: false,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          routePath: '/tools/roi',
          baseCount,
          realCount: 5,
          displayCount: baseCount + 5,
          userHasVoted: true,
        }),
      });

    render(<RouteVoteWidget />);

    expect(await screen.findByText(String(baseCount + 4))).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /vote for this page/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        '/api/route-votes',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ path: '/tools/roi' }),
        })
      );
      expect(screen.getByText(String(baseCount + 5))).toBeInTheDocument();
    });
  });
});
