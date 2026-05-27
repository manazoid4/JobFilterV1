import type { Metadata } from 'next';
import '../src/index.css';
import { TopNav } from '../src/components/TopNav';
import { Footer } from '../src/components/Footer';
import { LaunchWaitlistModal } from '../src/components/LaunchWaitlistModal';
import { ToastWrapper } from '../src/components/ToastWrapper';

export const metadata: Metadata = {
  title: 'JobFilter | High-intent UK construction leads',
  description: 'AI-filtered UK construction lead intelligence for trades who want better jobs with less chasing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
        {/* ── Site-wide announcement bar ── */}
        <div className="flex items-center justify-center gap-2 border-b border-[var(--line)] bg-[var(--ink)] px-4 py-1.5 text-center text-[11px] font-black text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]" aria-hidden="true" />
          <span>Founder price — £39/mo locks forever while active · 30-day money-back guarantee · No shared leads</span>
        </div>
        <TopNav />
        {children}
        <Footer />
        <LaunchWaitlistModal />
        <ToastWrapper />
      </body>
    </html>
  );
}
