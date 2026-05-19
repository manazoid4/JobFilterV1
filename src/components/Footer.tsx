import { Link } from 'react-router-dom';
import { FeedbackPrompt } from './FeedbackPrompt';

export function Footer() {
  return (
    <footer className="border-t-4 border-[var(--line)] bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14">
        {/* CTA bar */}
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="micro-label text-[var(--yellow)]">READY?</p>
            <p className="headline mt-2 text-3xl sm:text-4xl">START FILTERING TODAY. FREE SCAN. NO SIGNUP.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">SCAN MY AREA FREE</Link>
            <Link to="/pricing" className="jf-button bg-white text-[var(--ink)]">SEE PRICING</Link>
          </div>
        </div>

        <div className="mb-12">
          <FeedbackPrompt compact />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">PRODUCT</p>
            <div className="grid gap-2.5 text-sm font-black uppercase text-white/90">
              <Link to="/find-jobs" className="hover:text-[var(--yellow)]">Find Jobs</Link>
              <Link to="/signals" className="hover:text-[var(--yellow)]">Signals</Link>
              <Link to="/epc" className="hover:text-[var(--yellow)]">Retrofit Leads</Link>
              <Link to="/pricing" className="hover:text-[var(--yellow)]">Pricing</Link>
              <Link to="/free-tools" className="hover:text-[var(--yellow)]">Free Tools</Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">TOOLS</p>
            <div className="grid gap-2.5 text-sm font-black uppercase text-white/90">
              <Link to="/vantage" className="hover:text-[var(--yellow)]">Vantage</Link>
              <Link to="/vicinity" className="hover:text-[var(--yellow)]">Vicinity</Link>
              <Link to="/tradiestack" className="hover:text-[var(--yellow)]">TradieStack</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">COMPANY</p>
            <div className="grid gap-2.5 text-sm font-black uppercase text-white/90">
              <Link to="/privacy" className="hover:text-[var(--yellow)]">Privacy</Link>
              <Link to="/terms" className="hover:text-[var(--yellow)]">Terms</Link>
            </div>
          </div>

          {/* Trust */}
          <div>
            <p className="micro-label text-[var(--yellow)] mb-4">BUILT IN BIRMINGHAM</p>
            <p className="text-sm font-black text-white/90 leading-relaxed">
              Not a London startup guessing. Built by people who know how trades work.
            </p>
            <div className="mt-4 grid gap-2 text-xs font-black text-white/85">
              <p>Local knowledge baked into every signal score.</p>
              <p>WhatsApp-first because that's where you actually work.</p>
              <p>Founder £39/month. Standard £79/month. Direct letters included.</p>
            </div>
            <div className="mt-4 border-2 border-[var(--green)]/40 bg-[var(--green)]/10 px-4 py-3 text-sm font-black text-[var(--green)]">
              30-DAY MONEY-BACK GUARANTEE
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-sm font-black uppercase text-white/85">© 2026 JobFilter. All rights reserved.</p>
          <p className="text-sm font-black uppercase text-white/85">PROTECT YOUR TIME.</p>
        </div>
      </div>
    </footer>
  );
}
