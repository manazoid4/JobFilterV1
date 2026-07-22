import type { Metadata } from 'next';
import Link from 'next/link';
import '../src/index.css';
import { AuthProvider } from '../src/components/AuthProvider';
import { TopNav } from '../src/components/TopNav';
import { Footer } from '../src/components/Footer';
import { LaunchWaitlistModal } from '../src/components/LaunchWaitlistModal';
import { ToastWrapper } from '../src/components/ToastWrapper';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'UK Construction Intelligence | High-intent UK construction leads',
  description: 'AI-filtered UK construction lead intelligence for trades who want better jobs with less chasing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
        <AuthProvider>
          {/* ── Site-wide announcement bar ── */}
          <Link href="/find-jobs" className="flex items-center justify-center gap-2 border-b-2 border-[var(--yellow)] bg-[var(--ink)] px-4 py-2 text-center text-xs font-black text-white hover:bg-[var(--yellow)] hover:text-[var(--ink)] transition-colors group">
            <span className="h-2 w-2 rounded-full bg-[var(--yellow)] group-hover:bg-[var(--ink)] shrink-0" aria-hidden="true" />
            <span>Find local jobs before Checkatrade sees them · <span className="text-[var(--yellow)] group-hover:text-[var(--ink)]">Free scan, no card needed</span> · 1 job pays for a year at £39/mo</span>
          </Link>
          <TopNav />
          {children}
          <Footer />
          <LaunchWaitlistModal />
          <ToastWrapper />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
