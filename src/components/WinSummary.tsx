import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMonthlyStats } from '../lib/winStore';

export function WinSummary() {
  const [stats, setStats] = useState<{ count: number; totalValue: number } | null>(null);

  useEffect(() => {
    setStats(getMonthlyStats());
  }, []);

  if (!stats || stats.count === 0) return null;

  return (
    <section className="jf-box bg-[var(--yellow)] p-5 text-[var(--ink)]">
      <p className="micro-label text-[var(--ink)]">MONTHLY WIN SUMMARY</p>
      <h2 className="headline mt-2 text-3xl leading-none">YOU'RE EARNING.</h2>
      <p className="mt-2 text-xl font-black">
        You've won {stats.count} job{stats.count !== 1 ? 's' : ''} worth ~£{stats.totalValue.toLocaleString()} this month via JobFilter.
      </p>
      <Link className="jf-button mt-4 inline-block bg-[var(--ink)] text-white" to="/win">VIEW SCOREBOARD</Link>
    </section>
  );
}
