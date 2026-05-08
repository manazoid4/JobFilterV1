import { Link } from 'react-router-dom';
import { useState } from 'react';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const REGIONS = [
  'North West', 'West Midlands', 'London', 'Yorkshire',
  'South East', 'East Midlands', 'South West', 'East of England',
  'North East', 'Wales', 'Scotland', 'Northern Ireland',
] as const;

type Region = typeof REGIONS[number];

const TRADES = [
  'Builder', 'Electrician', 'Plumber', 'Roofer',
  'HVAC', 'Landscaper', 'Carpenter', 'Painter',
] as const;

type Trade = typeof TRADES[number];

interface SignalType {
  key: string;
  label: string;
  thisWeek: number;
  lastWeek: number;
  gold: number;
  silver: number;
  bin: number;
  topRegions: { region: string; count: number }[];
  topTrades: { trade: string; count: number }[];
}

interface WeekData {
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  signals: SignalType[];
  regionBreakdown: { region: string; total: number; gold: number }[];
  totalSignals: number;
  totalGold: number;
  totalSilver: number;
  totalBin: number;
}

const CURRENT_WEEK: WeekData = {
  weekLabel: 'Week 19 — 5–11 May 2026',
  weekStart: '5 May 2026',
  weekEnd: '11 May 2026',
  totalSignals: 1847,
  totalGold: 143,
  totalSilver: 412,
  totalBin: 1292,
  signals: [
    {
      key: 'planning',
      label: 'Planning Applications',
      thisWeek: 347,
      lastWeek: 312,
      gold: 42,
      silver: 98,
      bin: 207,
      topRegions: [
        { region: 'North West', count: 68 },
        { region: 'London', count: 54 },
        { region: 'South East', count: 47 },
      ],
      topTrades: [
        { trade: 'Builder', count: 187 },
        { trade: 'Electrician', count: 112 },
        { trade: 'Plumber', count: 98 },
      ],
    },
    {
      key: 'epc',
      label: 'EPC Ratings (F/G)',
      thisWeek: 218,
      lastWeek: 241,
      gold: 31,
      silver: 76,
      bin: 111,
      topRegions: [
        { region: 'West Midlands', count: 41 },
        { region: 'Yorkshire', count: 35 },
        { region: 'North West', count: 32 },
      ],
      topTrades: [
        { trade: 'HVAC', count: 89 },
        { trade: 'Electrician', count: 72 },
        { trade: 'Builder', count: 57 },
      ],
    },
    {
      key: 'contracts',
      label: 'Council Contracts',
      thisWeek: 89,
      lastWeek: 76,
      gold: 28,
      silver: 34,
      bin: 27,
      topRegions: [
        { region: 'London', count: 22 },
        { region: 'South East', count: 18 },
        { region: 'West Midlands', count: 14 },
      ],
      topTrades: [
        { trade: 'Builder', count: 47 },
        { trade: 'Electrician', count: 23 },
        { trade: 'Landscaper', count: 12 },
      ],
    },
    {
      key: 'property',
      label: 'Property Sales',
      thisWeek: 892,
      lastWeek: 834,
      gold: 24,
      silver: 134,
      bin: 734,
      topRegions: [
        { region: 'South East', count: 156 },
        { region: 'London', count: 132 },
        { region: 'North West', count: 98 },
      ],
      topTrades: [
        { trade: 'Builder', count: 312 },
        { trade: 'Plumber', count: 198 },
        { trade: 'Electrician', count: 176 },
      ],
    },
    {
      key: 'businesses',
      label: 'New Businesses',
      thisWeek: 301,
      lastWeek: 287,
      gold: 18,
      silver: 70,
      bin: 213,
      topRegions: [
        { region: 'London', count: 72 },
        { region: 'South East', count: 48 },
        { region: 'West Midlands', count: 34 },
      ],
      topTrades: [
        { trade: 'Builder', count: 134 },
        { trade: 'Electrician', count: 87 },
        { trade: 'Plumber', count: 56 },
      ],
    },
  ],
  regionBreakdown: [
    { region: 'North West', total: 287, gold: 28 },
    { region: 'West Midlands', total: 234, gold: 22 },
    { region: 'London', total: 312, gold: 31 },
    { region: 'Yorkshire', total: 156, gold: 14 },
    { region: 'South East', total: 298, gold: 24 },
    { region: 'East Midlands', total: 112, gold: 8 },
    { region: 'South West', total: 134, gold: 11 },
    { region: 'East of England', total: 98, gold: 7 },
    { region: 'North East', total: 76, gold: 5 },
    { region: 'Wales', total: 67, gold: 4 },
    { region: 'Scotland', total: 54, gold: 3 },
    { region: 'Northern Ireland', total: 19, gold: 1 },
  ],
};

const ARCHIVE_WEEKS: WeekData[] = [
  {
    weekLabel: 'Week 18 — 28 Apr–4 May 2026',
    weekStart: '28 Apr 2026',
    weekEnd: '4 May 2026',
    totalSignals: 1750,
    totalGold: 128,
    totalSilver: 389,
    totalBin: 1233,
    signals: [
      { key: 'planning', label: 'Planning Applications', thisWeek: 312, lastWeek: 298, gold: 38, silver: 89, bin: 185, topRegions: [{ region: 'North West', count: 61 }, { region: 'London', count: 49 }, { region: 'South East', count: 43 }], topTrades: [{ trade: 'Builder', count: 168 }, { trade: 'Electrician', count: 104 }, { trade: 'Plumber', count: 89 }] },
      { key: 'epc', label: 'EPC Ratings (F/G)', thisWeek: 241, lastWeek: 256, gold: 29, silver: 71, bin: 141, topRegions: [{ region: 'West Midlands', count: 44 }, { region: 'Yorkshire', count: 38 }, { region: 'North West', count: 31 }], topTrades: [{ trade: 'HVAC', count: 94 }, { trade: 'Electrician', count: 78 }, { trade: 'Builder', count: 52 }] },
      { key: 'contracts', label: 'Council Contracts', thisWeek: 76, lastWeek: 82, gold: 22, silver: 29, bin: 25, topRegions: [{ region: 'London', count: 19 }, { region: 'South East', count: 15 }, { region: 'West Midlands', count: 12 }], topTrades: [{ trade: 'Builder', count: 41 }, { trade: 'Electrician', count: 19 }, { trade: 'Landscaper', count: 10 }] },
      { key: 'property', label: 'Property Sales', thisWeek: 834, lastWeek: 798, gold: 21, silver: 124, bin: 689, topRegions: [{ region: 'South East', count: 148 }, { region: 'London', count: 124 }, { region: 'North West', count: 91 }], topTrades: [{ trade: 'Builder', count: 294 }, { trade: 'Plumber', count: 186 }, { trade: 'Electrician', count: 164 }] },
      { key: 'businesses', label: 'New Businesses', thisWeek: 287, lastWeek: 271, gold: 18, silver: 76, bin: 193, topRegions: [{ region: 'London', count: 68 }, { region: 'South East', count: 44 }, { region: 'West Midlands', count: 31 }], topTrades: [{ trade: 'Builder', count: 126 }, { trade: 'Electrician', count: 81 }, { trade: 'Plumber', count: 52 }] },
    ],
    regionBreakdown: CURRENT_WEEK.regionBreakdown.map(r => ({ ...r, total: Math.round(r.total * 0.95), gold: Math.max(1, r.gold - 2) })),
  },
  {
    weekLabel: 'Week 17 — 21–27 Apr 2026',
    weekStart: '21 Apr 2026',
    weekEnd: '27 Apr 2026',
    totalSignals: 1623,
    totalGold: 112,
    totalSilver: 356,
    totalBin: 1155,
    signals: [
      { key: 'planning', label: 'Planning Applications', thisWeek: 298, lastWeek: 276, gold: 34, silver: 82, bin: 182, topRegions: [{ region: 'North West', count: 57 }, { region: 'London', count: 46 }, { region: 'South East', count: 41 }], topTrades: [{ trade: 'Builder', count: 159 }, { trade: 'Electrician', count: 98 }, { trade: 'Plumber', count: 84 }] },
      { key: 'epc', label: 'EPC Ratings (F/G)', thisWeek: 256, lastWeek: 268, gold: 27, silver: 68, bin: 161, topRegions: [{ region: 'West Midlands', count: 48 }, { region: 'Yorkshire', count: 41 }, { region: 'North West', count: 29 }], topTrades: [{ trade: 'HVAC', count: 101 }, { trade: 'Electrician', count: 82 }, { trade: 'Builder', count: 49 }] },
      { key: 'contracts', label: 'Council Contracts', thisWeek: 82, lastWeek: 71, gold: 19, silver: 31, bin: 32, topRegions: [{ region: 'London', count: 21 }, { region: 'South East', count: 16 }, { region: 'West Midlands', count: 13 }], topTrades: [{ trade: 'Builder', count: 44 }, { trade: 'Electrician', count: 21 }, { trade: 'Landscaper', count: 11 }] },
      { key: 'property', label: 'Property Sales', thisWeek: 798, lastWeek: 756, gold: 18, silver: 112, bin: 668, topRegions: [{ region: 'South East', count: 142 }, { region: 'London', count: 118 }, { region: 'North West', count: 86 }], topTrades: [{ trade: 'Builder', count: 278 }, { trade: 'Plumber', count: 174 }, { trade: 'Electrician', count: 154 }] },
      { key: 'businesses', label: 'New Businesses', thisWeek: 271, lastWeek: 259, gold: 14, silver: 63, bin: 194, topRegions: [{ region: 'London', count: 64 }, { region: 'South East', count: 42 }, { region: 'West Midlands', count: 29 }], topTrades: [{ trade: 'Builder', count: 119 }, { trade: 'Electrician', count: 76 }, { trade: 'Plumber', count: 49 }] },
    ],
    regionBreakdown: CURRENT_WEEK.regionBreakdown.map(r => ({ ...r, total: Math.round(r.total * 0.88), gold: Math.max(1, r.gold - 5) })),
  },
  {
    weekLabel: 'Week 16 — 14–20 Apr 2026',
    weekStart: '14 Apr 2026',
    weekEnd: '20 Apr 2026',
    totalSignals: 1534,
    totalGold: 98,
    totalSilver: 334,
    totalBin: 1102,
    signals: [
      { key: 'planning', label: 'Planning Applications', thisWeek: 276, lastWeek: 261, gold: 29, silver: 76, bin: 171, topRegions: [{ region: 'North West', count: 53 }, { region: 'London', count: 42 }, { region: 'South East', count: 38 }], topTrades: [{ trade: 'Builder', count: 148 }, { trade: 'Electrician', count: 92 }, { trade: 'Plumber', count: 78 }] },
      { key: 'epc', label: 'EPC Ratings (F/G)', thisWeek: 268, lastWeek: 281, gold: 24, silver: 64, bin: 180, topRegions: [{ region: 'West Midlands', count: 51 }, { region: 'Yorkshire', count: 44 }, { region: 'North West', count: 27 }], topTrades: [{ trade: 'HVAC', count: 108 }, { trade: 'Electrician', count: 86 }, { trade: 'Builder', count: 46 }] },
      { key: 'contracts', label: 'Council Contracts', thisWeek: 71, lastWeek: 68, gold: 16, silver: 27, bin: 28, topRegions: [{ region: 'London', count: 18 }, { region: 'South East', count: 14 }, { region: 'West Midlands', count: 11 }], topTrades: [{ trade: 'Builder', count: 38 }, { trade: 'Electrician', count: 18 }, { trade: 'Landscaper', count: 9 }] },
      { key: 'property', label: 'Property Sales', thisWeek: 756, lastWeek: 712, gold: 16, silver: 104, bin: 636, topRegions: [{ region: 'South East', count: 134 }, { region: 'London', count: 112 }, { region: 'North West', count: 81 }], topTrades: [{ trade: 'Builder', count: 264 }, { trade: 'Plumber', count: 164 }, { trade: 'Electrician', count: 144 }] },
      { key: 'businesses', label: 'New Businesses', thisWeek: 259, lastWeek: 248, gold: 13, silver: 63, bin: 183, topRegions: [{ region: 'London', count: 61 }, { region: 'South East', count: 39 }, { region: 'West Midlands', count: 27 }], topTrades: [{ trade: 'Builder', count: 112 }, { trade: 'Electrician', count: 72 }, { trade: 'Plumber', count: 46 }] },
    ],
    regionBreakdown: CURRENT_WEEK.regionBreakdown.map(r => ({ ...r, total: Math.round(r.total * 0.83), gold: Math.max(1, r.gold - 8) })),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TrendArrow(thisWeek: number, lastWeek: number) {
  const diff = thisWeek - lastWeek;
  const pct = lastWeek > 0 ? Math.round((diff / lastWeek) * 100) : 0;
  if (diff > 0) {
    return { label: `+${diff} (${pct}%)`, up: true };
  }
  if (diff < 0) {
    return { label: `${diff} (${pct}%)`, up: false };
  }
  return { label: 'No change', up: null };
}

function Badge({ children, variant }: { children: string; variant: 'gold' | 'silver' | 'bin' }) {
  const cls = variant === 'gold'
    ? 'bg-[var(--yellow)] text-[var(--ink)]'
    : variant === 'silver'
      ? 'bg-[var(--navy)] text-white'
      : 'bg-[var(--muted)] text-white';
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-black uppercase tracking-wider ${cls}`}>
      {children}
    </span>
  );
}

function ShareModal({ week, onClose }: { week: WeekData; onClose: () => void }) {
  const shareText = `JobFilter Signals — ${week.weekLabel}\n${week.totalSignals} signals detected. ${week.totalGold} GOLD leads across the UK.\nSee what's live in your area:`;
  const url = 'https://jobfilter.co.uk/signals/weekly';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + url)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText + '\n' + url);
  };

  const handleEmbed = () => {
    const embedCode = `<iframe src="https://jobfilter.co.uk/signals/weekly/embed" width="100%" height="600" style="border:2px solid #0F172A;border-radius:4px;"></iframe>`;
    navigator.clipboard.writeText(embedCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-white border-2 border-[var(--line)] shadow-[8px_8px_0_var(--yellow)]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b-4 border-[var(--line)] bg-[var(--yellow)] p-5">
          <p className="micro-label text-[var(--ink)]">SHARE THIS WEEK'S SIGNALS</p>
          <button onClick={onClose} className="text-2xl font-black leading-none text-[var(--ink)]">&times;</button>
        </div>
        <div className="p-5 grid gap-4">
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="jf-box bg-[var(--navy)] text-white p-4 flex items-center gap-3 hover:bg-[var(--ink)]/90">
            <span className="text-xl font-black">X</span>
            <span className="font-black">Post on X / Twitter</span>
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="jf-box bg-[#0A66C2] text-white p-4 flex items-center gap-3 hover:bg-[#0A66C2]/90">
            <span className="text-xl font-black">in</span>
            <span className="font-black">Share on LinkedIn</span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="jf-box bg-[#25D366] text-white p-4 flex items-center gap-3 hover:bg-[#25D366]/90">
            <span className="text-xl font-black">W</span>
            <span className="font-black">Send via WhatsApp</span>
          </a>
          <button onClick={handleCopy} className="jf-box bg-white p-4 text-left hover:bg-[var(--bg-main)]">
            <p className="micro-label text-[var(--orange)]">COPY TEXT</p>
            <p className="mt-1 font-black text-sm">Copy pre-filled text + link to clipboard</p>
          </button>
          <button onClick={handleEmbed} className="jf-box bg-white p-4 text-left hover:bg-[var(--bg-main)]">
            <p className="micro-label text-[var(--orange)]">EMBED THIS FEED</p>
            <p className="mt-1 font-black text-sm">Copy iframe code for your website</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function WeeklySignalsPage() {
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const week = selectedWeek || CURRENT_WEEK;
  const isCurrentWeek = !selectedWeek;

  const maxRegionTotal = Math.max(...CURRENT_WEEK.regionBreakdown.map(r => r.total));

  return (
    <main className="pb-8">

      {/* 1. Hero — Data Feed Header */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="micro-label text-[var(--yellow)]">
              {isCurrentWeek ? 'LIVE THIS WEEK' : `ARCHIVE — ${week.weekLabel}`}
            </p>
            <span className="h-2 w-2 rounded-full bg-[var(--green)] shadow-[0_0_6px_var(--green)] animate-pulse" />
          </div>
          <h1 className="headline text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] text-[var(--yellow)]">
            SIGNALS THIS WEEK.
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-black text-white/80">
            {week.totalSignals} signals detected across the UK. {week.totalGold} are GOLD. {week.totalSilver} are SILVER. The rest is noise.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setShowShare(true)} className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
              SHARE THIS WEEK →
            </button>
            <Link to="/find-jobs" className="jf-button bg-white text-[var(--ink)]">
              SCAN YOUR AREA →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Score Strip */}
      <section className="bg-[var(--yellow)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="headline text-4xl md:text-5xl text-[var(--ink)]">{week.totalGold}</p>
              <p className="micro-label text-[var(--ink)]/70">GOLD — ACT NOW</p>
            </div>
            <div>
              <p className="headline text-4xl md:text-5xl text-[var(--ink)]">{week.totalSilver}</p>
              <p className="micro-label text-[var(--ink)]/70">SILVER — WORTH WATCHING</p>
            </div>
            <div>
              <p className="headline text-4xl md:text-5xl text-[var(--ink)]">{week.totalBin}</p>
              <p className="micro-label text-[var(--ink)]/70">BIN — SKIP IT</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. This Week vs Last Week */}
      {!isCurrentWeek && (
        <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
          <div className="page-shell py-5">
            <p className="micro-label text-[var(--orange)]">COMPARISON</p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['Total Signals', week.totalSignals, CURRENT_WEEK.totalSignals],
                ['GOLD', week.totalGold, CURRENT_WEEK.totalGold],
                ['SILVER', week.totalSilver, CURRENT_WEEK.totalSilver],
                ['BIN', week.totalBin, CURRENT_WEEK.totalBin],
              ].map(([label, val, nowVal]) => {
                const v = val as number;
                const n = nowVal as number;
                const t = TrendArrow(n, v);
                return (
                  <div key={label as string} className="jf-box bg-white p-4">
                    <p className="micro-label text-[var(--muted)]">{label}</p>
                    <p className="headline text-3xl mt-1">{v}</p>
                    <p className={`text-sm font-black mt-1 ${t.up === true ? 'text-[var(--green)]' : t.up === false ? 'text-[var(--orange)]' : 'text-[var(--muted)]'}`}>
                      {t.label} vs this week
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {isCurrentWeek && (
        <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
          <div className="page-shell py-5">
            <p className="micro-label text-[var(--orange)]">VS LAST WEEK</p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {[
                ['Total', week.totalSignals, 1750],
                ['GOLD', week.totalGold, 128],
                ['SILVER', week.totalSilver, 389],
              ].map(([label, val, prev]) => {
                const v = val as number;
                const p = prev as number;
                const t = TrendArrow(v, p);
                return (
                  <div key={label as string} className="flex items-baseline gap-2">
                    <span className="micro-label text-[var(--muted)]">{label}</span>
                    <span className="headline text-2xl">{v}</span>
                    <span className={`text-sm font-black ${t.up === true ? 'text-[var(--green)]' : 'text-[var(--orange)]'}`}>
                      {t.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Signal Cards */}
      <section className="bg-white border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">SIGNAL BREAKDOWN</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">FIVE SOURCES. ONE SCAN.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {week.signals.map((s) => {
              const trend = TrendArrow(s.thisWeek, s.lastWeek);
              return (
                <article key={s.key} className="jf-box bg-[var(--bg-main)] p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="headline text-3xl leading-none">{s.label}</h3>
                      <p className="mt-1 font-black text-[var(--muted)]">{s.thisWeek} this week</p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-black px-2 py-1 ${trend.up === true ? 'text-[var(--green)]' : trend.up === false ? 'text-[var(--orange)]' : 'text-[var(--muted)]'}`}>
                      {trend.up === true ? '▲' : trend.up === false ? '▼' : '—'}
                      {trend.label}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="gold">{`GOLD ${s.gold}`}</Badge>
                    <Badge variant="silver">{`SILVER ${s.silver}`}</Badge>
                    <Badge variant="bin">{`BIN ${s.bin}`}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="micro-label text-[var(--muted)]">TOP REGIONS</p>
                      <ul className="mt-2 space-y-1">
                        {s.topRegions.map((r) => (
                          <li key={r.region} className="flex justify-between text-sm font-black">
                            <span>{r.region}</span>
                            <span className="text-[var(--muted)]">{r.count}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="micro-label text-[var(--muted)]">TOP TRADES</p>
                      <ul className="mt-2 space-y-1">
                        {s.topTrades.map((t) => (
                          <li key={t.trade} className="flex justify-between text-sm font-black">
                            <span>{t.trade}</span>
                            <span className="text-[var(--muted)]">{t.count}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t-2 border-[var(--line)]">
                    <Link to="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
                      SCAN YOUR AREA →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Regional Breakdown */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">BY REGION</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl text-white">WHERE THE WORK IS.</h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-white/60">
            Click a region to see construction leads in that area.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CURRENT_WEEK.regionBreakdown.map((r) => {
              const barWidth = (r.total / maxRegionTotal) * 100;
              const isSelected = activeRegion === r.region;
              const citySlug = r.region.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={r.region}
                  to={`/construction-leads/${citySlug}`}
                  className={`jf-box p-4 transition-all cursor-pointer ${
                    isSelected ? 'bg-[var(--yellow)] border-[var(--yellow)]' : 'bg-white hover:bg-[var(--yellow)]/20'
                  }`}
                  onClick={() => setActiveRegion(r.region)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`headline text-xl ${isSelected ? 'text-[var(--ink)]' : ''}`}>{r.region}</span>
                    <span className={`text-2xl font-black ${isSelected ? 'text-[var(--ink)]' : ''}`}>{r.total}</span>
                  </div>
                  <div className="mt-2 h-2 bg-[var(--bg-main)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isSelected ? 'bg-[var(--ink)]' : 'bg-[var(--yellow)]'}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs font-black ${isSelected ? 'text-[var(--ink)]/70' : 'text-[var(--muted)]'}`}>
                      {r.gold} GOLD
                    </span>
                    <span className={`text-xs font-black ${isSelected ? 'text-[var(--ink)]/50' : 'text-[var(--muted)]/60'}`}>
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Archive */}
      <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">ARCHIVE</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">PREVIOUS WEEKS.</h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
            See how signals have moved. Spot the trend before your competition does.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ARCHIVE_WEEKS.map((w) => {
              const totalDiff = CURRENT_WEEK.totalSignals - w.totalSignals;
              const goldDiff = CURRENT_WEEK.totalGold - w.totalGold;
              return (
                <button
                  key={w.weekLabel}
                  onClick={() => setSelectedWeek(selectedWeek === w ? null : w)}
                  className={`jf-box p-5 text-left transition-all ${
                    selectedWeek === w ? 'bg-[var(--yellow)] border-[var(--yellow)]' : 'bg-white hover:bg-[var(--yellow)]/10'
                  }`}
                >
                  <p className="micro-label text-[var(--muted)]">{w.weekLabel}</p>
                  <p className="headline text-4xl mt-2">{w.totalSignals}</p>
                  <p className="text-sm font-black text-[var(--muted)] mt-1">
                    signals · {w.totalGold} GOLD
                  </p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-black text-[var(--green)]">
                      +{totalDiff} total vs this week
                    </p>
                    <p className="text-xs font-black text-[var(--green)]">
                      +{goldDiff} GOLD vs this week
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedWeek && (
            <div className="mt-6">
              <button
                onClick={() => setSelectedWeek(null)}
                className="text-sm font-black text-[var(--orange)] underline"
              >
                ← Back to current week
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 7. CTA */}
      <section className="bg-[var(--yellow)] border-t-4 border-[var(--line)]">
        <div className="page-shell section-pad text-center">
          <p className="micro-label text-[var(--ink)]">DON'T JUST WATCH THE DATA. USE IT.</p>
          <h2 className="headline mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] text-[var(--ink)]">
            SCAN YOUR POSTCODE. SEE WHAT'S LIVE.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            {CURRENT_WEEK.totalGold} GOLD leads are waiting somewhere in the UK. How many are in your postcode?
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">
              RUN MY FREE SCAN →
            </Link>
            <button onClick={() => setShowShare(true)} className="jf-button bg-white text-[var(--ink)]">
              SHARE THIS FEED →
            </button>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]/60">
            3 free scans every week. Founding 30: £6.99/wk (£29/mo) forever.
          </p>
        </div>
      </section>

      {/* Share Modal */}
      {showShare && <ShareModal week={week} onClose={() => setShowShare(false)} />}

    </main>
  );
}
