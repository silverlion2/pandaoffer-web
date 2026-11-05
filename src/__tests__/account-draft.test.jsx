import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import AccountProfilePage from '@/app/account/page';

const auth = vi.hoisted(() => ({ user: null, profile: null, loading: false }));
vi.mock('@/components/providers/AuthProvider', () => ({ useAuth: () => auth }));
vi.mock('@/lib/supabase/client', () => ({ createClient: () => ({}) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
afterEach(cleanup);

it('loads a delayed profile, preserves unsaved edits on refresh and separates accounts', () => {
  auth.user = { id: 'synthetic-one' };
  auth.profile = null;
  const view = render(<AccountProfilePage />);
  auth.profile = { user_profiles: { first_name: 'First synthetic profile' } };
  view.rerender(<AccountProfilePage />);
  fireEvent.change(screen.getByDisplayValue('First synthetic profile'), { target: { value: 'Unsaved synthetic edit' } });
  auth.profile = { user_profiles: { first_name: 'Refreshed server value' } };
  view.rerender(<AccountProfilePage />);
  expect(screen.getByDisplayValue('Unsaved synthetic edit')).toBeInTheDocument();
  auth.user = { id: 'synthetic-two' };
  auth.profile = { user_profiles: { first_name: 'Second synthetic profile' } };
  view.rerender(<AccountProfilePage />);
  expect(screen.getByDisplayValue('Second synthetic profile')).toBeInTheDocument();
  expect(screen.queryByDisplayValue('Unsaved synthetic edit')).not.toBeInTheDocument();
});
