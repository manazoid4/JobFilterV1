'use client';

import { Suspense } from 'react';
import { ResetPasswordPage } from '../../src/pages/ResetPasswordPage';

export default function Page() {
  return (
    <Suspense fallback={<main className="page-shell py-16"><p role="status" aria-live="polite">Loading password reset…</p></main>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
