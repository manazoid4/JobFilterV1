"use client";
import Link from 'next/link';

import { FeedbackPrompt } from './FeedbackPrompt';

export function Footer() {
  return (
    <footer className="border-t-4 border-[var(--line)] bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 md:py-14">
        {/* CTA bar */}
        <div className="mb-8 md:mb-12 grid gap-4 md:gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="micro-label text-[var(--yellow)]">READY?</p>
            <p className="headline mt-2 text-3xl sm:text-4xl">START FILTERING TODAY. FREE SCAN. NO SIGNUP.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">SCAN MY AREA FREE →</Link>
            <Link href="/pricing" className="jf-button bg-white text-[var(--ink)]">LOCK YOUR PATCH — £39/MO →</Link>
          </div>
        </div>

        <div className="mb-12">
          <FeedbackPrompt compact />
        </div>

        <div className="grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Intake Engine — the main product */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">FIND WORK</p>
            <div className="grid gap-1.5 md:gap-2.5 text-xs md:text-sm font-black uppercase text-white/90">
              <Link href="/find-jobs" className="hover:text-[var(--yellow)]">Scan My Area</Link>
              <Link href="/signals" className="hover:text-[var(--yellow)]">Live Signals</Link>
              <Link href="/epc" className="hover:text-[var(--yellow)]">Retrofit Leads</Link>
              <Link href="/free-tools" className="hover:text-[var(--yellow)]">Free Tools</Link>
              <Link href="/for-your-trade" className="hover:text-[var(--yellow)]">By Trade</Link>
              <Link href="/blueprint" className="hover:text-[var(--yellow)]">How It Works</Link>
              <Link href="/pricing" className="hover:text-[var(--yellow)]">Pricing</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">COMPANY</p>
            <div className="grid gap-1.5 md:gap-2.5 text-xs md:text-sm font-black uppercase text-white/90">
              <Link href="/privacy" className="hover:text-[var(--yellow)]">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--yellow)]">Terms</Link>
              <Link href="/whats-new" className="hover:text-[var(--yellow)]">What&apos;s New</Link>
              <a href="mailto:hello@jobfilter.uk" className="hover:text-[var(--yellow)] normal-case">hello@jobfilter.uk</a>
            </div>
          </div>

          {/* Trust */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">BUILT IN BIRMINGHAM</p>
            <p className="text-sm font-bold text-white/90 leading-relaxed">
              Not a London startup guessing. Built by people who know how trades work.
            </p>
            <div className="mt-4 grid gap-2 text-xs font-black text-white/85">
              <p>Local knowledge baked into every signal score.</p>
              <p>Delivery setup is checked before paid activation.</p>
              <p>Pilot price: £39/month after coverage review.</p>
            </div>
            <div className="mt-4 border-2 border-[var(--green)]/40 bg-[var(--green)]/10 px-4 py-3 text-sm font-black text-[var(--green)]">
              30-DAY MONEY-BACK GUARANTEE
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-sm font-black uppercase text-white/85">© 2026 UK Construction Intelligence. All rights reserved.</p>
          <p className="text-sm font-black uppercase text-white/85">PROTECT YOUR TIME.</p>
        </div>
      </div>
    </footer>
  );
}
