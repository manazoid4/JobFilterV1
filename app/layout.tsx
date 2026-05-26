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
        <TopNav />
        {children}
        <Footer />
        <LaunchWaitlistModal />
        <ToastWrapper />
      </body>
    </html>
  );
}
