'use client';

import { Suspense } from 'react';
import { ForgotPasswordPage } from '../../src/pages/ForgotPasswordPage';

export default function Page() {
  return (
    <Suspense fallback={<main className="page-shell py-16" />}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
