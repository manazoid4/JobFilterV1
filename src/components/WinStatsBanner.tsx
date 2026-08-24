import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface WinStats {
  wonCount: number;
  totalValueFormatted: string;
  message: string;
}

export function WinStatsBanner({ postcode }: { postcode: string }) {
  const [stats, setStats] = useState<WinStats | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!postcode.trim()) return;
    const outward = postcode.trim().split(' ')[0].toUpperCase();
    const controller = new AbortController();
    fetch(`/api/wins/stats?postcode=${encodeURIComponent(outward)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setStats(data);
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== 'AbortError') setLoaded(true);
      });
    return () => controller.abort();
  }, [postcode]);

  if (!loaded || !stats) return null;

  if (stats.wonCount === 0) {
    return (
      <div className="flex items-center gap-3 border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-3">
        <TrendingUp className="w-5 h-5 shrink-0 text-[var(--muted)]" />
        <p className="text-sm font-black text-[var(--muted)]">No wins logged in your area yet — be the first to track a job won.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 border-2 border-[var(--green)] bg-[var(--green)]/10 px-4 py-3">
      <TrendingUp className="w-5 h-5 shrink-0 text-[var(--green)]" />
      <p className="text-sm font-black text-[var(--ink)]">{stats.message}</p>
    </div>
  );
}
