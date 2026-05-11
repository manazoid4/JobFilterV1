import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import {
  generateWeekData,
  generateArchiveWeeks,
  generateEmailSummary,
  generateRSSFeed,
  generateEmbedCode,
  calcTrend,
  type WeekData,
} from '../lib/signalGenerator';

// ─── Generate Data ───────────────────────────────────────────────────────────

const CURRENT_WEEK = generateWeekData();
const ARCHIVE_WEEKS = generateArchiveWeeks(4);

// ─── Components ──────────────────────────────────────────────────────────────

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

function TrendIndicator({ thisWeek, lastWeek }: { thisWeek: number; lastWeek: number }) {
  const t = calcTrend(thisWeek, lastWeek);
  const color = t.up === true ? 'text-[var(--green)]' : t.up === false ? 'text-[var(--orange)]' : 'text-[var(--muted)]';
  const arrow = t.up === true ? '▲' : t.up === false ? '▼' : '—';
  return (
    <span className={`flex items-center gap-1 text-sm font-black ${color}`}>
      {arrow} {t.label}
    </span>
  );
}

function ShareModal({ week, onClose }: { week: WeekData; onClose: () => void }) {
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [showRSS, setShowRSS] = useState(false);

  const planning = week.signals.find(s => s.key === 'planning');
  const shareText = planning
    ? `This week: ${planning.thisWeek} planning applications across the UK. ${week.totalGold} GOLD leads. ${week.totalSilver} SILVER.\nDon't chase jobs. Let them find you.`
    : `JobFilter Signals — ${week.weekLabel}\n${week.totalSignals} signals detected. ${week.totalGold} GOLD leads across the UK.`;
  const url = 'https://jobfilter.uk/signals/weekly';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + url)}`;
  const embedCode = generateEmbedCode(week);
  const rssFeed = generateRSSFeed(week);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText + '\n' + url);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleCopyRSS = () => {
    navigator.clipboard.writeText(rssFeed);
    setTimeout(() => {}, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-white border-2 border-[var(--line)] shadow-[8px_8px_0_var(--yellow)] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b-4 border-[var(--line)] bg-[var(--yellow)] p-5 sticky top-0 z-10">
          <p className="micro-label text-[var(--ink)]">SHARE THIS WEEK'S SIGNALS</p>
          <button onClick={onClose} className="text-2xl font-black leading-none text-[var(--ink)]">&times;</button>
        </div>
        <div className="p-5 grid gap-3">
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
            <p className="micro-label text-[var(--orange)]">{copiedText ? 'COPIED' : 'COPY TEXT'}</p>
            <p className="mt-1 font-black text-sm">{copiedText ? 'Text copied to clipboard' : 'Pre-filled summary + link to clipboard'}</p>
          </button>

          <button onClick={() => setShowEmbed(!showEmbed)} className="jf-box bg-white p-4 text-left hover:bg-[var(--bg-main)]">
            <p className="micro-label text-[var(--orange)]">EMBED THIS FEED</p>
            <p className="mt-1 font-black text-sm">Copy iframe code for your website</p>
          </button>

          {showEmbed && (
            <div className="jf-box bg-[var(--bg-main)] p-4">
              <p className="micro-label text-[var(--muted)] mb-2">IFRAME CODE</p>
              <pre className="text-xs font-mono bg-white p-3 border border-[var(--line)] overflow-x-auto whitespace-pre-wrap break-all">{embedCode}</pre>
              <button onClick={handleCopyEmbed} className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-xs mt-3 w-full">
                {copiedEmbed ? 'COPIED' : 'COPY EMBED CODE'}
              </button>
            </div>
          )}

          <button onClick={() => setShowRSS(!showRSS)} className="jf-box bg-white p-4 text-left hover:bg-[var(--bg-main)]">
            <p className="micro-label text-[var(--orange)]">RSS FEED</p>
            <p className="mt-1 font-black text-sm">Subscribe to signals in your reader</p>
          </button>

          {showRSS && (
            <div className="jf-box bg-[var(--bg-main)] p-4">
              <p className="micro-label text-[var(--muted)] mb-2">RSS FEED URL</p>
              <p className="font-mono text-sm bg-white p-3 border border-[var(--line)] break-all">https://jobfilter.co.uk/signals/weekly/feed.xml</p>
              <button onClick={handleCopyRSS} className="jf-button bg-[var(--navy)] text-white text-xs mt-3 w-full">
                COPY RSS XML
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertSubscribeModal({ week, onClose }: { week: WeekData; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const planning = week.signals.find(s => s.key === 'planning');
  const previewText = planning
    ? `This week: ${planning.thisWeek} planning applications across the UK. ${week.totalGold} GOLD leads. See what matches your trade.`
    : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Enter a proper email address');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
        <div className="w-full max-w-lg bg-white border-2 border-[var(--line)] shadow-[8px_8px_0_var(--yellow)]" onClick={e => e.stopPropagation()}>
          <div className="border-b-4 border-[var(--line)] bg-[var(--green)] p-5">
            <p className="micro-label text-white">YOU'RE IN</p>
          </div>
          <div className="p-5 grid gap-4">
            <p className="headline text-3xl leading-none">WEEKLY SIGNALS ARE YOURS.</p>
            <p className="font-black text-[var(--muted)]">
              Every Monday morning. {planning ? `${planning.thisWeek} planning applications. ${week.totalGold} GOLD leads.` : ''} Straight to your inbox.
            </p>
            <p className="text-xs font-black text-[var(--muted)]">
              Unsubscribe anytime. One click. No faff.
            </p>
            <button onClick={onClose} className="jf-button bg-[var(--ink)] text-white w-full">
              DONE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-white border-2 border-[var(--line)] shadow-[8px_8px_0_var(--yellow)]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b-4 border-[var(--line)] bg-[var(--yellow)] p-5">
          <p className="micro-label text-[var(--ink)]">WEEKLY SIGNALS EMAIL</p>
          <button onClick={onClose} className="text-2xl font-black leading-none text-[var(--ink)]">&times;</button>
        </div>
        <div className="p-5 grid gap-4">
          <p className="headline text-3xl leading-none">GET THE SIGNALS EVERY MONDAY.</p>
          <p className="font-black text-[var(--muted)] text-sm">
            {previewText}
          </p>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <div>
              <label className="micro-label text-[var(--muted)]">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                className="field-input mt-1"
                required
              />
            </div>
            <div>
              <label className="micro-label text-[var(--muted)]">YOUR TRADE (OPTIONAL)</label>
              <select
                value={trade}
                onChange={e => setTrade(e.target.value)}
                className="field-input mt-1"
              >
                <option value="">All trades</option>
                <option value="Builder">Builder</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Roofer">Roofer</option>
                <option value="HVAC">HVAC</option>
                <option value="Landscaper">Landscaper</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
              </select>
            </div>
            {error && <p className="text-sm font-black text-[var(--orange)]">{error}</p>}
            <button type="submit" className="jf-button bg-[var(--yellow)] text-[var(--ink)] w-full">
              SUBSCRIBE — FREE
            </button>
          </form>

          <p className="text-xs font-black text-[var(--muted)] text-center">
            Unsubscribe anytime. No spam. Just signals.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function WeeklySignalsPage() {
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const week = selectedWeek || CURRENT_WEEK;
  const isCurrentWeek = !selectedWeek;

  const maxRegionTotal = Math.max(...CURRENT_WEEK.regionBreakdown.map(r => r.total));

  const wowTrend = useMemo(() => calcTrend(CURRENT_WEEK.totalSignals, ARCHIVE_WEEKS[0]?.totalSignals || CURRENT_WEEK.totalSignals), []);

  return (
    <main className="pb-8">

      {/* 1. Hero — Data Feed Header */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <p className="micro-label text-[var(--yellow)]">
              {isCurrentWeek ? 'LIVE THIS WEEK' : `ARCHIVE — ${week.weekLabel}`}
            </p>
            {isCurrentWeek && (
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_var(--green)] animate-pulse" />
            )}
          </div>
          <h1 className="headline text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] text-[var(--yellow)]">
            SIGNALS THIS WEEK.
          </h1>
          <p className="mt-5 max-w-3xl text-xl font-black text-white/80">
            {week.totalSignals} signals detected across the UK. {week.totalGold} are GOLD. {week.totalSilver} are SILVER. The rest is noise.
          </p>
          {isCurrentWeek && (
            <p className="mt-2 text-base font-black text-[var(--green)]">
              {wowTrend.up === true ? '▲' : wowTrend.up === false ? '▼' : '—'} {wowTrend.label} vs last week
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setShowShare(true)} className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
              SHARE THIS WEEK →
            </button>
            <button onClick={() => setShowSubscribe(true)} className="jf-button bg-[var(--green)] text-white">
              SUBSCRIBE TO WEEKLY →
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
                const t = calcTrend(n, v);
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
              {CURRENT_WEEK.signals.map(s => {
                const t = calcTrend(s.thisWeek, s.lastWeek);
                return (
                  <div key={s.key} className="flex items-baseline gap-2">
                    <span className="micro-label text-[var(--muted)]">{s.label.split(' ')[0]}</span>
                    <span className="headline text-2xl">{s.thisWeek}</span>
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
              const trend = calcTrend(s.thisWeek, s.lastWeek);
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

                  <div className="flex gap-2 flex-wrap">
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
              return (
                <button
                  key={r.region}
                  type="button"
                  className={`jf-box p-4 transition-all cursor-pointer text-left w-full ${
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
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Trend Summary */}
      {isCurrentWeek && (
        <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
          <div className="page-shell section-pad">
            <p className="micro-label text-[var(--orange)]">4-WEEK TREND</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">SEE THE PATTERN.</h2>
            <p className="mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
              Signals over the last month. Spot the trend before your competition does.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {[CURRENT_WEEK, ...ARCHIVE_WEEKS.slice(0, 3)].reverse().map((w, i) => {
                const prev = i > 0 ? [CURRENT_WEEK, ...ARCHIVE_WEEKS.slice(0, 3)].reverse()[i - 1] : null;
                const trend = prev ? calcTrend(w.totalSignals, prev.totalSignals) : null;
                return (
                  <button
                    key={w.weekLabel}
                    onClick={() => setSelectedWeek(selectedWeek === w ? null : w)}
                    className={`jf-box p-5 text-left transition-all ${
                      selectedWeek === w ? 'bg-[var(--yellow)] border-[var(--yellow)]' : 'bg-white hover:bg-[var(--yellow)]/10'
                    }`}
                  >
                    <p className="micro-label text-[var(--muted)]">Wk {w.weekNumber}</p>
                    <p className="headline text-4xl mt-2">{w.totalSignals}</p>
                    <p className="text-sm font-black text-[var(--muted)] mt-1">
                      {w.totalGold} GOLD · {w.totalSilver} SILVER
                    </p>
                    {trend && (
                      <p className={`text-xs font-black mt-2 ${trend.up === true ? 'text-[var(--green)]' : 'text-[var(--orange)]'}`}>
                        {trend.up === true ? '▲' : '▼'} {trend.label}
                      </p>
                    )}
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
      )}

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
            <button onClick={() => setShowSubscribe(true)} className="jf-button bg-[var(--green)] text-white">
              GET WEEKLY EMAILS →
            </button>
            <button onClick={() => setShowShare(true)} className="jf-button bg-white text-[var(--ink)]">
              SHARE THIS FEED →
            </button>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]/80">
            3 free scans every week. Founding 30: £39/mo while active.
          </p>
          <p className="mt-2 text-xs font-black text-[var(--ink)]/40">
            Data shown is illustrative based on UK construction statistics. Live scans show real leads in your area.
          </p>
        </div>
      </section>

      {/* Modals */}
      {showShare && <ShareModal week={week} onClose={() => setShowShare(false)} />}
      {showSubscribe && <AlertSubscribeModal week={CURRENT_WEEK} onClose={() => setShowSubscribe(false)} />}

    </main>
  );
}


