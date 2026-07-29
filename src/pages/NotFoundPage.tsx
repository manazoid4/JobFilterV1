"use client";
import Link from 'next/link';


export function NotFoundPage() {
  return (
    <main className="page-shell py-16">
      <section className="jf-box bg-[var(--yellow)] p-8 text-center">
        <p className="micro-label text-[var(--ink)]">PAGE NOT FOUND</p>
        <h1
          className="headline mt-4 text-8xl leading-none text-[var(--navy)]"
          style={{ fontSize: 'clamp(72px, 12vw, 140px)' }}
        >
          404
        </h1>
        <p className="mt-4 text-2xl font-black text-[var(--ink)]">
          This page doesn't exist.
        </p>
        <p className="mt-2 text-lg font-black text-[var(--ink)]">
          Here's where you can go instead:
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
          <Link href="/" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--orange)]">HOME</p>
            <p className="mt-2 font-black text-[var(--navy)]">See what JobFilter does</p>
          </Link>
          <Link href="/find-jobs" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--orange)]">FIND JOBS</p>
            <p className="mt-2 font-black text-[var(--navy)]">Scan your area for live leads</p>
          </Link>
          <Link href="/pricing" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--orange)]">PRICING</p>
            <p className="mt-2 font-black text-[var(--navy)]">Founder £39/month. Standard £79/month.</p>
          </Link>
          <Link href="/dashboard" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--orange)]">PIPELINE</p>
            <p className="mt-2 font-black text-[var(--navy)]">Track your leads and results</p>
          </Link>
          <Link href="/methodology" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
            <p className="mt-2 font-black text-[var(--navy)]">How JobFilter qualifies public works opportunities</p>
          </Link>
          <Link href="/trust" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--orange)]">TRUST</p>
            <p className="mt-2 font-black text-[var(--navy)]">Data source, scoring and privacy</p>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/" className="jf-button bg-[var(--navy)] text-white text-lg px-8 py-4">
            BACK TO HOME →
          </Link>
        </div>
      </section>
    </main>
  );
}
