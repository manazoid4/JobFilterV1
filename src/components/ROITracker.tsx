"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * ROITracker — displays pipeline and win stats for paid users.
 * Fetches from /api/leads/roi-stats (Next.js route that reads lead_outcomes).
 * Shows upgrade prompt for free users.
 */

type ROIStats = {
  totalContacted: number;
  totalQuoted: number;
  totalQuotedValue: number;
  totalWon: number;
  totalWonValue: number;
  winRate: number;
  avgLeadToQuoteHours: number | null;
};

function formatGbp(value: number) {
  if (value === 0) return '£0';
  if (value >= 1_000_000) return `£${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `£${(value / 1_000).toFixed(0)}k`;
  return `£${value}`;
}

function formatHours(hours: number) {
  if (hours < 24) return `${Math.round(hours)}h`;
  const days = hours / 24;
  return `${Math.round(days)}d`;
}

type Props = {
  /** Whether the current user has a paid subscription */
  isPaid: boolean;
};

export function ROITracker({ isPaid }: Props) {
  const [stats, setStats] = useState<ROIStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPaid) {
      setLoading(false);
      return;
    }

    fetch('/api/leads/roi-stats', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setStats(data.stats);
        else setError(data.error ?? 'Could not load stats');
      })
      .catch(() => setError('Could not load outcome data'))
      .finally(() => setLoading(false));
  }, [isPaid]);

  if (!isPaid) {
    return (
      <div className="jf-box bg-[var(--bg-main)] p-5 border-2 border-[var(--line)]">
        <p className="micro-label text-[var(--muted)]">ROI TRACKER</p>
        <p className="mt-2 font-black text-[var(--ink)] text-lg">Track your job wins and pipeline value</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          See total contacted, quoted, won values, win rate, and lead-to-quote speed.
        </p>
        <Link href="/pricing" className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)] text-sm">
          UPGRADE TO UNLOCK
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="jf-box bg-[var(--bg-main)] p-5 border-2 border-[var(--line)] animate-pulse">
        <div className="h-3 w-24 bg-[var(--line)] rounded mb-4" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-14 bg-[var(--line)] rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jf-box bg-[var(--bg-main)] p-5 border-2 border-[var(--line)]">
        <p className="micro-label text-[var(--muted)]">ROI TRACKER</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{error}</p>
      </div>
    );
  }

  if (!stats || stats.totalContacted === 0) {
    return (
      <div className="jf-box bg-[var(--bg-main)] p-5 border-2 border-[var(--line)]">
        <p className="micro-label text-[var(--muted)]">ROI TRACKER</p>
        <p className="mt-3 font-black text-[var(--ink)] text-base">Start tracking outcomes to see your ROI</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Mark leads as Contacted, Quoted, or Won on the lead cards.
          Your pipeline value and win rate will appear here automatically.
        </p>
      </div>
    );
  }

  const statItems: { label: string; value: string; highlight?: boolean }[] = [
    { label: 'Leads Contacted', value: String(stats.totalContacted) },
    { label: 'Quotes Sent', value: String(stats.totalQuoted) },
    { label: 'Total Quoted', value: formatGbp(stats.totalQuotedValue) },
    { label: 'Won Value', value: formatGbp(stats.totalWonValue), highlight: true },
    { label: 'Jobs Won', value: String(stats.totalWon) },
    { label: 'Win Rate', value: `${stats.winRate.toFixed(0)}%`, highlight: stats.winRate >= 30 },
    ...(stats.avgLeadToQuoteHours !== null
      ? [{ label: 'Avg Lead → Quote', value: formatHours(stats.avgLeadToQuoteHours) }]
      : []),
  ];

  return (
    <div className="jf-box bg-[var(--bg-main)] p-5 border-2 border-[var(--line)]">
      <p className="micro-label text-[var(--muted)]">ROI TRACKER</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {statItems.map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`border-2 p-3 ${highlight ? 'border-[var(--green)] bg-[var(--green)]/5' : 'border-[var(--line)] bg-[var(--paper)]'}`}
          >
            <p className="text-[10px] font-black uppercase text-[var(--muted)]">{label}</p>
            <p className={`mt-1 text-xl font-black leading-none ${highlight ? 'text-[var(--green)]' : 'text-[var(--ink)]'}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
