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
        <div className="flex items-center justify-center gap-3 border-b-2 border-[var(--yellow)] bg-[var(--yellow)] px-4 py-2 text-center font-mono text-xs font-black uppercase tracking-widest text-[var(--ink)]">
          <span>FOUNDING 30 OPEN — £39/MO LOCKS FOREVER — CANCEL ANYTIME</span>
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
