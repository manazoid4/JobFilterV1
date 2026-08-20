import type { Metadata } from 'next';
import Link from 'next/link';
import '../src/index.css';
import { AuthProvider } from '../src/components/AuthProvider';
import { TopNav } from '../src/components/TopNav';
import { Footer } from '../src/components/Footer';
import { LaunchWaitlistModal } from '../src/components/LaunchWaitlistModal';
import { ToastWrapper } from '../src/components/ToastWrapper';
import { RefCapture } from '../src/components/RefCapture';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'JobFilter | Public-works opportunity qualification',
  description: 'Firm-aware qualification for 5–25-person contractors deciding whether to BID, WATCH, pursue a SUBCONTRACT route, or SKIP public works opportunities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
        <AuthProvider>
          {/* ── Site-wide announcement bar ── */}
          <Link href="/find-jobs" className="flex items-center justify-center gap-2 border-b-2 border-[var(--yellow)] bg-[var(--ink)] px-4 py-2 text-center text-xs font-black text-white hover:bg-[var(--yellow)] hover:text-[var(--ink)] transition-colors group">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--yellow)] group-hover:bg-[var(--ink)] shrink-0" aria-hidden="true" />
            <span>FTS LIVE · Public contracts for your trade — <span className="text-[var(--yellow)] group-hover:text-[var(--ink)]">60-second check. No card. No signup.</span></span>
          </Link>
          <TopNav />
          {children}
          <Footer />
          <LaunchWaitlistModal />
          <ToastWrapper />
          <RefCapture />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
