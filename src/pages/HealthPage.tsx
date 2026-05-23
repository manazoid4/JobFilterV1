"use client";
import React from 'react';

export function HealthPage() {
  return (
    <main className="page-shell py-16">
      <section className="jf-box bg-white p-8">
        <p className="micro-label">REF. HEALTH</p>
        <h1 className="headline mt-4 text-5xl">SYSTEM ONLINE.</h1>
        <p className="mt-4 max-w-2xl text-lg font-semibold text-[var(--muted)]">
          Frontend is running. API status is available at <code>/api/health</code>.
        </p>
      </section>
    </main>
  );
}

export default HealthPage;
