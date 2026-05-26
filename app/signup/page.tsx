'use client';

import { Suspense } from 'react';
import { SignupPage } from '../../src/pages/SignupPage';

export default function Page() {
  return (
    <Suspense fallback={<main className="page-shell py-10" />}>
      <SignupPage />
    </Suspense>
  );
}
