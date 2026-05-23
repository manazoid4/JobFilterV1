'use client';

import { Suspense } from 'react';
import { ActivationPendingPage } from '../../src/pages/ActivationPendingPage';

export default function Page(props: any) {
  return (
    <Suspense fallback={<main className="page-shell py-10" />}>
      <ActivationPendingPage {...props} />
    </Suspense>
  );
}
