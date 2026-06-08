'use client';

import { Suspense } from 'react';
import { DashboardPage } from '../../src/pages/DashboardPage';

export default function Page(props: any) {
  return (
    <Suspense fallback={<div />}>
      <DashboardPage {...props} />
    </Suspense>
  );
}
