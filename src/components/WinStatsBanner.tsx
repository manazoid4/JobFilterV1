import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface WinStats {
  wonCount: number;
  totalValueFormatted: string;
  message: string;
}

export function WinStatsBanner({ postcode }: { postcode: string }) {
  const [stats, setStats] = useState<WinStats | null>(null);

  useEffect(() => {
    const outward = postcode.trim().split(' ')[0].toUpperCase();
    const controller = new AbortController();
    setStats(null);
    fetch(`/api/wins/stats?postcode=${encodeURIComponent(outward)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.wonCount > 0) setStats(data);
        else setStats(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStats(null);
      });
    return () => controller.abort();
  }, [postcode]);

  if (!stats) return null;

  return (
    <div className="flex items-center gap-3 border-2 border-[var(--green)] bg-[var(--green)]/10 px-4 py-3">
      <TrendingUp className="w-5 h-5 shrink-0 text-[var(--green)]" />
      <p className="text-sm font-black text-[var(--ink)]">{stats.message}</p>
    </div>
  );
}
