'use client';

import { Suspense } from 'react';
import { LoginPage } from '../../src/pages/LoginPage';

export default function Page() {
  return (
    <Suspense fallback={<main className="page-shell py-16" />}>
      <LoginPage />
    </Suspense>
  );
}
