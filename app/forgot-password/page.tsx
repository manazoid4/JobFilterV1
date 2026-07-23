'use client';

import { Suspense } from 'react';
import { ForgotPasswordPage } from '../../src/pages/ForgotPasswordPage';

export default function Page() {
  return (
    <Suspense fallback={<main className="page-shell py-16"><p role="status" aria-live="polite">Loading password recovery…</p></main>}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
