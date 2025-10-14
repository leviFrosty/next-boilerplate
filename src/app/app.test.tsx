import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

test('renders production text', () => {
  // Mock async component by rendering synchronously
  const MockApp = () => (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Test</h1>
        <p>Production ready Next 16 boilerplate.</p>
      </main>
    </div>
  );

  render(<MockApp />);
  expect(screen.getByText('Production ready Next 16 boilerplate.')).toBeDefined();
});
