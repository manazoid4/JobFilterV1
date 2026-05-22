'use client';

import dynamic from 'next/dynamic';

const LegacyApp = dynamic(() => import('./legacy-app').then((mod) => mod.LegacyApp), {
  ssr: false,
  loading: () => (
    <main className="page-shell py-16">
      <section className="jf-box bg-white p-8 text-center">
        <p className="font-black text-[var(--navy)] text-lg">Loading...</p>
      </section>
    </main>
  ),
});

export function ClientApp() {
  return <LegacyApp />;
}
