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
            <p className="headline mt-2 text-3xl sm:text-4xl">FREE SCAN. NO SIGNUP. SEE CURRENT PUBLIC WORKS NOTICES.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">SCAN FREE →</Link>
            <Link href="/pricing" className="jf-button bg-white text-[var(--ink)]">CHECK PRICING →</Link>
          </div>
        </div>

        <div className="mb-12">
          <FeedbackPrompt compact />
        </div>

        <div className="grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Qualification product */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">FIND WORK</p>
            <div className="grid gap-1.5 md:gap-2.5 text-xs md:text-sm font-black uppercase text-white/90">
              <Link href="/find-jobs" className="hover:text-[var(--yellow)]">Scan Current Notices</Link>
              <Link href="/methodology" className="hover:text-[var(--yellow)]">How It Works</Link>
              <Link href="/pricing" className="hover:text-[var(--yellow)]">Pricing</Link>
              <Link href="/trust" className="hover:text-[var(--yellow)]">Trust</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">COMPANY</p>
            <div className="grid gap-1.5 md:gap-2.5 text-xs md:text-sm font-black uppercase text-white/90">
              <Link href="/privacy" className="hover:text-[var(--yellow)]">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--yellow)]">Terms</Link>
              <a href="mailto:hello@jobfilter.uk" className="hover:text-[var(--yellow)] normal-case">hello@jobfilter.uk</a>
            </div>
          </div>

          {/* Trust */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">DATA SOURCE</p>
            <p className="text-sm font-bold text-white/90 leading-relaxed">
              Find a Tender — the UK government&apos;s official public procurement register. Notices are free and public. JobFilter charges for qualification and workflow.
            </p>
            <div className="mt-4 grid gap-2 text-xs font-black text-white/85">
              <p>Coverage varies by trade, region and timing.</p>
              <p>Coverage check before paid activation.</p>
              <p>Pilot: £39/month after coverage review.</p>
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
