import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { ModeProvider, useMode } from '@/components/providers/ModeProvider';

function Consumer() {
  const { mode, setMode, isMounted } = useMode();
  return <button onClick={() => setMode(mode === 'application' ? 'life' : 'application')}>{isMounted ? mode : 'loading'}</button>;
}
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it('keeps the public experience and mode switching usable when storage is denied', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
  render(<ModeProvider><Consumer /></ModeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'application' }));
  fireEvent.click(screen.getByRole('button', { name: 'life' }));
  expect(screen.getByRole('button', { name: 'application' })).toBeInTheDocument();
});
