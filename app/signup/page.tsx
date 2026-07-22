'use client';

import { Suspense } from 'react';
import { SignupPage } from '../../src/pages/SignupPage';

export default function Page() {
  return (
    <Suspense fallback={<main className="page-shell py-10"><p role="status" aria-live="polite">Loading account creation…</p></main>}>
      <SignupPage />
    </Suspense>
  );
}
