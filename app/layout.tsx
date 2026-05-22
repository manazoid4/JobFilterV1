import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'JobFilter | High-intent UK construction leads',
  description: 'AI-filtered UK construction lead intelligence for trades who want better jobs with less chasing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
