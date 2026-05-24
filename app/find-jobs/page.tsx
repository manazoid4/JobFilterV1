"use client";
import { FindJobsPage } from '../../src/views/FindJobsPage';
import { Suspense } from 'react';

export default function Page(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindJobsPage {...props} />
    </Suspense>
  );
}