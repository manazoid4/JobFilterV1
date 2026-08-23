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
    const outward = postcode.trim().split(' ')[0].toUpperCase();
    if (outward.length < 2) return;
    setStats(null);
    setFetched(false);
    fetch(`/api/wins/stats?postcode=${encodeURIComponent(outward)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.wonCount > 0) setStats(data);
        setFetched(true);
      })
      .catch(() => { /* leave fetched false — don't claim zero wins on a failed request */ });
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
