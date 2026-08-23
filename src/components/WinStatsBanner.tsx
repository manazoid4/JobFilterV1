import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface WinStats {
  wonCount: number;
  totalValueFormatted: string;
  message: string;
}

export function WinStatsBanner({ postcode }: { postcode: string }) {
  const [stats, setStats] = useState<WinStats | null>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    // Reset before length guard so short/cleared postcodes don't leave stale state visible
    setStats(null);
    setFetched(false);

    const outward = postcode.trim().split(' ')[0].toUpperCase();
    if (outward.length < 2) return;

    const controller = new AbortController();
    fetch(`/api/wins/stats?postcode=${encodeURIComponent(outward)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) return; // server-side error — don't show placeholder
        if (data.wonCount > 0) setStats(data);
        setFetched(true);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return; // obsolete request — ignore
        /* other network failures: leave fetched false, don't claim zero wins */
      });
    return () => controller.abort();
  }, [postcode]);

  const outward = postcode.trim().split(' ')[0].toUpperCase();

  if (stats) {
    return (
      <div className="flex items-center gap-3 border-2 border-[var(--green)] bg-[var(--green)]/10 px-4 py-3">
        <TrendingUp className="w-5 h-5 shrink-0 text-[var(--green)]" />
        <p className="text-sm font-black text-[var(--ink)]">{stats.message}</p>
      </div>
    );
  }

  if (fetched && outward.length >= 2) {
    return (
      <div className="flex items-center gap-3 border-2 border-[var(--line)] bg-white px-4 py-3">
        <TrendingUp className="w-5 h-5 shrink-0 text-[var(--muted)]" />
        <p className="text-sm font-black text-[var(--muted)]">No wins logged near {outward} yet — be the first to log a job you landed.</p>
      </div>
    );
  }

  return null;
}
