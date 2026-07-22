'use client';

import { Suspense } from 'react';
import { PricingPage } from '../../src/pages/PricingPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PricingPage />
    </Suspense>
  );
}
