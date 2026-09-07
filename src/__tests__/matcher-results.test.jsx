import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import UnlockResults from '@/components/home/UnlockResults';
import { createLocalMatch } from '@/lib/matcher';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('@/components/providers/AuthProvider', () => ({ useAuth: () => ({ user: null }) }));
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ from: () => ({ insert: () => Promise.resolve({ error: null }) }) }),
}));
vi.mock('@/app/actions/leads', () => ({ submitLead: vi.fn() }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('matcher result states', () => {
  it('labels curated fallback results and their limitations', () => {
    const formData = {
      nationality: 'India',
      major: 'STEM',
      gpa: { scale: 'percentage', value: '84' },
    };

    render(
      <UnlockResults
        step="results"
        setStep={vi.fn()}
        formData={formData}
        matchResults={createLocalMatch(formData)}
        matchError={null}
      />,
    );

    expect(screen.getByText('Curated shortlist ready')).toBeInTheDocument();
    expect(screen.getByText('Curated-data fallback')).toBeInTheDocument();
    expect(screen.getByText(/not admission guarantees/i)).toBeInTheDocument();
    expect(screen.getByText('CSC Planning Range')).toBeInTheDocument();
    expect(screen.getByText('Critical Application Data').parentElement).toHaveClass('hidden', 'md:block');
  });

  it('offers recovery when no usable results exist', () => {
    render(
      <UnlockResults
        step="results"
        setStep={vi.fn()}
        formData={{ nationality: 'India', gpa: { value: '84' } }}
        matchResults={{ universities: [] }}
        matchError={null}
      />,
    );

    expect(screen.getByRole('heading', { name: 'No matches yet' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adjust profile/i })).toBeInTheDocument();
  });
});
