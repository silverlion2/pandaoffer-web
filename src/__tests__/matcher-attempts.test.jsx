import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HomeClientManager from '@/components/home/HomeClientManager';
import { createLocalMatch } from '@/lib/matcher';

vi.mock('next/link', () => ({ default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a> }));
vi.mock('@/components/providers/ModeProvider', () => ({ useMode: () => ({ mode: 'application', isMounted: true }) }));
vi.mock('@/components/providers/AuthProvider', () => ({ useAuth: () => ({ user: null }) }));
vi.mock('@/lib/supabase/client', () => ({ createClient: () => ({ from: () => ({ insert: () => Promise.resolve({ error: null }) }) }) }));
vi.mock('@/app/actions/leads', () => ({ submitLead: vi.fn() }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/components/home/MedicalTourismBanner', () => ({ default: () => null }));
vi.mock('@/components/home/LifeHeroHeader', () => ({ default: () => null }));
vi.mock('@/components/home/LifeDiscoverGrid', () => ({ default: () => null }));
vi.mock('@/components/home/LifeServicesPromo', () => ({ default: () => null }));
vi.mock('@/components/home/EmergencyContacts', () => ({ default: () => null }));

const first = { nationality: 'India', major: 'STEM', gpa: { scale: 'percentage', value: '85' } };
const second = { nationality: 'Nigeria', major: 'Business', gpa: { scale: 'percentage', value: '70' } };
function submit(profile) {
  fireEvent.change(screen.getByLabelText('Nationality'), { target: { value: profile.nationality } });
  fireEvent.change(screen.getByLabelText('Target Major'), { target: { value: profile.major } });
  fireEvent.change(screen.getByLabelText('Current GPA / Marks'), { target: { value: profile.gpa.value } });
  fireEvent.submit(screen.getByLabelText('Nationality').closest('form'));
}
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.useRealTimers(); });

describe('matcher attempt ownership', () => {
  it('does not start an asynchronously validated submission after unmount', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json(createLocalMatch(first)));
    vi.stubGlobal('fetch', fetchMock);
    const view = render(<HomeClientManager />);
    submit(first);
    view.unmount();
    await act(async () => {});
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('starts only one request for repeated submissions before React changes the screen', async () => {
    const fetchMock = vi.fn(() => new Promise(() => {}));
    vi.stubGlobal('fetch', fetchMock);
    render(<HomeClientManager />);
    submit(first);
    fireEvent.submit(screen.getByLabelText('Nationality').closest('form'));
    await screen.findByText('Building your university shortlist...');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('bounds a non-cooperative request and rejects its response after timeout', async () => {
    let resolveRequest;
    const fetchMock = vi.fn(() => new Promise(resolve => { resolveRequest = resolve; }));
    vi.stubGlobal('fetch', fetchMock);
    render(<HomeClientManager />);
    submit(first);
    await screen.findByText('Building your university shortlist...');
    vi.useFakeTimers();
    // The request timer was created using real timers; keep this test on a
    // fresh attempt so fake time owns its deadline.
    fireEvent.click(screen.getByRole('button', { name: 'Cancel matching' }));
    await act(async () => submit(second));
    await act(async () => vi.advanceTimersByTimeAsync(20000));
    expect(screen.getByRole('heading', { name: 'Matching Unavailable' })).toBeInTheDocument();
    expect(fetchMock.mock.calls[1][1].signal.aborted).toBe(true);
    await act(async () => resolveRequest(Response.json(createLocalMatch(second))));
    expect(screen.queryByText('Curated shortlist ready')).not.toBeInTheDocument();
  });

  it('aborts the owned request when the component unmounts', async () => {
    const fetchMock = vi.fn(() => new Promise(() => {}));
    vi.stubGlobal('fetch', fetchMock);
    const view = render(<HomeClientManager />);
    submit(first);
    await screen.findByText('Building your university shortlist...');
    view.unmount();
    expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true);
  });

  it('does not relabel an old shortlist after a new profile fails and preserves inputs for retry', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(Response.json(createLocalMatch(first))).mockRejectedValueOnce(new Error('offline')));
    render(<HomeClientManager />);
    submit(first);
    await screen.findByText('Curated shortlist ready');
    fireEvent.click(screen.getByRole('button', { name: 'Back to Search' }));
    submit(second);
    await screen.findByRole('heading', { name: 'Matching Unavailable' });
    expect(screen.queryByText('Curated shortlist ready')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(screen.getByLabelText('Nationality')).toHaveValue('Nigeria');
    expect(screen.getByLabelText('Current GPA / Marks')).toHaveValue('70');
  });

  it('ignores a late response from a cancelled attempt when a new profile has completed', async () => {
    let resolveFirst;
    const fetchMock = vi.fn().mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }))
      .mockResolvedValueOnce(Response.json(createLocalMatch(second)));
    vi.stubGlobal('fetch', fetchMock);
    render(<HomeClientManager />);
    submit(first);
    await screen.findByText('Building your university shortlist...');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel matching' }));
    expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true);
    submit(second);
    await screen.findByText('Curated shortlist ready');
    await act(async () => resolveFirst(Response.json(createLocalMatch(first))));
    expect(screen.getByText('Based on your Nigeria nationality and 70 GPA.')).toBeInTheDocument();
    expect(screen.queryByText('Based on your India nationality and 85 GPA.')).not.toBeInTheDocument();
  });

  it('turns malformed result fields into a recoverable error instead of rendering objects', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ universities: [{ name: {}, program: 'STEM' }] })));
    render(<HomeClientManager />);
    submit(first);
    await screen.findByRole('heading', { name: 'Matching Unavailable' });
  });
});
