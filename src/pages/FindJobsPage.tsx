import { FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Wrench, Zap, Home, Paintbrush, Hammer, Thermometer, TreePine, FileText, Building2, ArrowRight, Clock, TrendingUp, ShieldCheck } from 'lucide-react';
import { ScoreBadge } from '../components/ScoreBadge';
import { Tag } from '../components/Tag';
import { KeywordSearch, KeywordSearchResults } from '../components/KeywordSearch';
import { GhostRiskBadge } from '../components/GhostRiskBadge';
import { WinStatsBanner } from '../components/WinStatsBanner';
import type { DocumentSearchResult } from '../lib/documentSearch';
import type { Lead, LeadSearchResponse, Trade } from '../lib/types';
import { importLeadToChase, isLeadTracked } from '../lib/chaseStore';

const DEV_MODE = false;
const OPEN_ACCESS = import.meta.env.VITE_OPEN_ACCESS === 'true';

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];

const RADIUS_OPTIONS = [5, 10, 15, 25, 50];

const WEEKLY_SCAN_LIMIT = DEV_MODE ? 999 : 3;
const SCAN_COUNT_KEY = 'jf-weekly-scans-used';
const SCAN_WEEK_KEY = 'jf-weekly-scans-week';

function getMondayKey(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return monday.toISOString().slice(0, 10);
}

function getWeeklyScansUsed(): number {
  try {
    const storedWeek = localStorage.getItem(SCAN_WEEK_KEY);
    const thisWeek = getMondayKey();
    if (storedWeek !== thisWeek) {
      localStorage.setItem(SCAN_WEEK_KEY, thisWeek);
      localStorage.setItem(SCAN_COUNT_KEY, '0');
      return 0;
    }
    return Number(localStorage.getItem(SCAN_COUNT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function recordWeeklyScan(): number {
  const next = getWeeklyScansUsed() + 1;
  try {
    localStorage.setItem(SCAN_COUNT_KEY, String(next));
  } catch { /* ignore */ }
  return next;
}

const TRADE_PRESETS: { label: string; trade: Trade; icon: React.ReactNode }[] = [
  { label: 'ELECTRICAL', trade: 'electrical', icon: <Zap className="w-4 h-4" /> },
  { label: 'PLUMBING', trade: 'plumbing', icon: <Wrench className="w-4 h-4" /> },
  { label: 'BUILDING', trade: 'building', icon: <Hammer className="w-4 h-4" /> },
  { label: 'ROOFING', trade: 'roofing', icon: <Home className="w-4 h-4" /> },
  { label: 'LANDSCAPING', trade: 'landscaping', icon: <TreePine className="w-4 h-4" /> },
  { label: 'CARPENTRY', trade: 'carpentry', icon: <Hammer className="w-4 h-4" /> },
  { label: 'PAINTING', trade: 'painting', icon: <Paintbrush className="w-4 h-4" /> },
  { label: 'HVAC', trade: 'hvac', icon: <Thermometer className="w-4 h-4" /> },
];

const RECENT_SEARCHES = ['B14 7QH', 'SW1A 1AA', 'M1 1AE', 'EH1 1AA', 'CF10 1DN'];

function getSavedRadius(): number {
  const saved = localStorage.getItem('jobfilter.radius');
  if (saved) {
    const n = Number(saved);
    if (RADIUS_OPTIONS.includes(n)) return n;
  }
  return 25;
}

function getSavedPostcode(): string {
  return localStorage.getItem('jobfilter.postcode') || 'B14 7QH';
}

function getSavedTrade(): Trade {
  const saved = localStorage.getItem('jobfilter.trade');
  if (saved && trades.includes(saved as Trade)) return saved as Trade;
  return 'electrical';
}

function isNewLead(publishedAt: string): boolean {
  const published = new Date(publishedAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  return hoursDiff < 24;
}

function getSourceIcon(source: string): React.ReactNode {
  const src = source.toLowerCase();
  if (src.includes('planning') || src.includes('planning_application')) return <FileText className="w-3.5 h-3.5" />;
  if (src.includes('epc') || src.includes('energy')) return <Home className="w-3.5 h-3.5" />;
  if (src.includes('companies') || src.includes('ch')) return <Building2 className="w-3.5 h-3.5" />;
  if (src.includes('contract')) return <ShieldCheck className="w-3.5 h-3.5" />;
  return <TrendingUp className="w-3.5 h-3.5" />;
}

export function FindJobsPage() {
  const [searchParams] = useSearchParams();
  const [postcode, setPostcode] = useState(getSavedPostcode);
  const [trade, setTrade] = useState<Trade>(getSavedTrade);
  const [radiusMiles, setRadiusMiles] = useState(getSavedRadius);
  const [result, setResult] = useState<LeadSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [whatsappSent, setWhatsappSent] = useState<Record<string, boolean>>({});
  const [hasScanned, setHasScanned] = useState(false);
  const [weeklyScansUsed, setWeeklyScansUsed] = useState(getWeeklyScansUsed);
  const [trackedLeads, setTrackedLeads] = useState<Set<string>>(() => {
    const leads = JSON.parse(localStorage.getItem('jobfilter.find.tracked') || '[]') as string[];
    return new Set(leads);
  });
  const [docSearchResults, setDocSearchResults] = useState<DocumentSearchResult[]>([]);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [showDocSearch, setShowDocSearch] = useState(false);

  const [fillWeekLoading, setFillWeekLoading] = useState(false);
  const [fillWeekResult, setFillWeekResult] = useState<LeadSearchResponse | null>(null);
  const [fillWeekPhase, setFillWeekPhase] = useState('');
  const [commercialOnly, setCommercialOnly] = useState(false);

  const weeklyScansRemaining = Math.max(0, WEEKLY_SCAN_LIMIT - weeklyScansUsed);
  const commercialCount = result?.leads.filter((l) => l.isCommercial).length ?? 0;
  const displayedLeads = commercialOnly ? (result?.leads.filter((l) => l.isCommercial) ?? []) : (result?.leads ?? []);

  useEffect(() => {
    const tradeParam = searchParams.get('trade');
    const areaParam = searchParams.get('area');
    if (tradeParam && trades.includes(tradeParam as Trade)) {
      setTrade(tradeParam as Trade);
    }
    if (areaParam) {
      setPostcode(areaParam);
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('jobfilter.radius', String(radiusMiles));
  }, [radiusMiles]);

  useEffect(() => {
    localStorage.setItem('jobfilter.postcode', postcode);
  }, [postcode]);

  useEffect(() => {
    localStorage.setItem('jobfilter.trade', trade);
  }, [trade]);

  useEffect(() => {
    setWeeklyScansUsed(getWeeklyScansUsed());
  }, []);

  const trackLead = (lead: Lead) => {
    if (trackedLeads.has(lead.id)) return;
    importLeadToChase({
      id: lead.id,
      title: lead.title,
      trade: String(lead.trade || lead.tradeMatch || 'general'),
      location: lead.location || lead.postcodeOutward || 'Unknown',
      estimatedValue: lead.estimatedValue || 'TBC',
      score: lead.score,
    });
    const next = new Set(trackedLeads);
    next.add(lead.id);
    setTrackedLeads(next);
    localStorage.setItem('jobfilter.find.tracked', JSON.stringify([...next]));
  };

  async function submit(event?: FormEvent, overrides?: { radiusMiles?: number; trade?: Trade }) {
    event?.preventDefault();
    setErrorText('');
    setLoading(true);
    setResult(null);
    setHasScanned(true);
    setCommercialOnly(false);
    const used = recordWeeklyScan();
    setWeeklyScansUsed(used);
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode,
          trade: overrides?.trade ?? trade,
          radiusMiles: overrides?.radiusMiles ?? radiusMiles,
        }),
      });
      const data = await response.json() as LeadSearchResponse;
      setResult(data);
      if (!response.ok || !data.ok) {
        setErrorText(data.errors?.[0] ?? 'Scan failed. Retry the scan.');
      }
      setLastUpdated(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      setErrorText('Network error. Retry the scan.');
      setResult({
        ok: false,
        source: 'lead_engine',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: ['Network error. Retry the scan.'],
      });
    } finally {
      setLoading(false);
    }
  }

  function widenAndScan(nextRadius: number) {
    setRadiusMiles(nextRadius);
    void submit(undefined, { radiusMiles: nextRadius });
  }

  async function sendWhatsApp(lead: Lead) {
    setWhatsappSent((prev) => ({ ...prev, [lead.id]: true }));
    try {
      await fetch('/api/leads/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: 'user',
          leadData: {
            trade: lead.trade,
            area: lead.location,
            value: lead.estimatedValue,
            score: lead.score,
            source: lead.source,
            planningRef: lead.url,
          },
        }),
      });
    } catch {
      setWhatsappSent((prev) => ({ ...prev, [lead.id]: false }));
    }
  }

  async function fillMyWeek() {
    setFillWeekLoading(true);
    setFillWeekResult(null);
    setCommercialOnly(false);
    setFillWeekPhase('Checking verified job signals across your patch...');
    await new Promise(r => setTimeout(r, 800));
    setFillWeekPhase('Matching leads to your trade — scoring every signal...');
    await new Promise(r => setTimeout(r, 600));
    setFillWeekPhase('Ranking the best jobs near you...');
    await new Promise(r => setTimeout(r, 400));
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode,
          trade,
          radiusMiles: Math.max(radiusMiles, 25),
        }),
      });
      const data = await response.json() as LeadSearchResponse;
      setFillWeekResult(data);
    } catch {
      setFillWeekResult({
        ok: false,
        source: 'lead_engine',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: ['Scan failed. Retry.'],
      });
    } finally {
      setFillWeekLoading(false);
      setFillWeekPhase('');
    }
  }

  const goldCount = result?.leads.filter(l => l.score >= 80).length ?? 0;
  const silverCount = result?.leads.filter(l => l.score >= 50 && l.score < 80).length ?? 0;
  const epcCount = result?.leads.filter(l => l.source?.toLowerCase().includes('epc')).length ?? 0;
  const planningCount = result?.leads.filter(l => l.source?.toLowerCase().includes('planning')).length ?? 0;
  const contractCount = result?.leads.filter(l => l.source?.toLowerCase().includes('contract') || l.source?.toLowerCase().includes('companies')).length ?? 0;

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-2 border-[var(--line)] bg-[var(--ink)] p-7 md:p-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M0 40L40 0\' stroke=\'%23E3B72A\' stroke-width=\'0.5\' opacity=\'0.15\'/%3E%3C/svg%3E")' }}>
        <div className="relative z-10">
          <p className="micro-label text-[var(--yellow)]">LIVE LEAD SCANNER</p>
          <h1 className="headline mt-3 text-5xl leading-[0.9] sm:text-6xl md:text-8xl text-white">
            FIND JOBS<br />WORTH PRICING
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-black text-white/70">
            Pick your trade. Enter your postcode. See what's live near you right now.
          </p>
          <p className="mt-2 text-sm font-black text-[var(--yellow)]">
            No Checkatrade membership. No Bark credits. No card needed — free first scan.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Link to="/dashboard" className="text-sm font-black text-[var(--yellow)] underline underline-offset-4 hover:text-white transition-colors">
              VIEW PIPELINE →
            </Link>
          </div>

          {/* SVG illustration: magnifying glass over UK map with pins */}
          <div className="mt-6 hidden md:block">
            <svg viewBox="0 0 320 180" className="w-64 h-auto opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* UK outline */}
              <path d="M140 20 C130 25, 115 40, 110 55 C105 70, 100 80, 105 95 C108 105, 115 115, 120 130 C125 140, 130 150, 140 155 C148 158, 155 155, 160 148 C165 140, 170 130, 175 120 C180 110, 185 100, 190 90 C195 80, 200 70, 195 55 C190 40, 175 30, 160 22 C150 18, 145 18, 140 20Z" stroke="var(--yellow)" strokeWidth="1.5" opacity="0.6" />
              {/* Pins */}
              <circle cx="135" cy="50" r="4" fill="#E3B72A" />
              <circle cx="155" cy="75" r="4" fill="#E3B72A" />
              <circle cx="145" cy="110" r="4" fill="#E3B72A" />
              <circle cx="170" cy="95" r="4" fill="#E3B72A" />
              {/* Magnifying glass */}
              <circle cx="200" cy="60" r="25" stroke="#E3B72A" strokeWidth="2.5" fill="none" />
              <line x1="218" y1="78" x2="240" y2="100" stroke="#E3B72A" strokeWidth="3" strokeLinecap="round" />
              {/* Search lines inside glass */}
              <line x1="192" y1="52" x2="208" y2="68" stroke="#E3B72A" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="208" y1="52" x2="192" y2="68" stroke="#E3B72A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── SCANNER ──────────────────────────────────────────────── */}
      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">LIVE LEAD SCANNER</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">SCAN YOUR AREA</h2>

        {/* Trade presets — one tap to scan */}
        <div className="mt-4">
          <p className="micro-label text-[var(--muted)]">TAP YOUR TRADE — INSTANT SCAN</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {TRADE_PRESETS.map((preset) => (
              <button
                key={preset.trade}
                type="button"
                disabled={loading || fillWeekLoading}
                onClick={() => { setTrade(preset.trade); void submit(undefined, { trade: preset.trade }); }}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-black disabled:opacity-60 border-2 border-[var(--navy)] transition ${
                  trade === preset.trade
                    ? 'bg-[var(--yellow)] text-[var(--ink)]'
                    : 'bg-[var(--ink)] text-white hover:bg-[var(--yellow)] hover:text-[var(--ink)]'
                }`}
              >
                {preset.icon}
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form — postcode + radius */}
        <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <label className="field-label">
            Postcode
            <input value={postcode} onChange={(event) => setPostcode(event.target.value.toUpperCase())} className="field-input" placeholder="B14 7QH" />
          </label>
          <label className="field-label">
            Radius
            <select value={radiusMiles} onChange={(event) => setRadiusMiles(Number(event.target.value))} className="field-input">
              {RADIUS_OPTIONS.map((miles) => <option key={miles} value={miles}>{miles} miles</option>)}
            </select>
          </label>
          <button disabled={loading || fillWeekLoading} className="jf-button self-end bg-[var(--navy)] text-white disabled:opacity-60">
            <Search className="w-4 h-4 mr-2 inline-block" />
            {loading ? 'SCANNING...' : 'SCAN NOW'}
          </button>
        </form>

        {/* Recent Searches */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="micro-label text-[var(--muted)] text-[10px]">TRY:</span>
          {RECENT_SEARCHES.map((pc) => (
            <button
              key={pc}
              type="button"
              onClick={() => setPostcode(pc)}
              className="border-2 border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-xs font-bold text-[var(--muted)] hover:bg-[var(--yellow)] hover:text-[var(--ink)] transition-colors"
            >
              {pc}
            </button>
          ))}
        </div>
      </section>

      {/* ── WIN STATS + SCAN COUNTER ────────────────────────────────── */}
      <WinStatsBanner postcode={postcode} />
      {!OPEN_ACCESS && weeklyScansUsed > 0 && (
        <div className={`jf-box flex items-center gap-3 px-4 py-3 ${weeklyScansRemaining === 0 ? 'border-[var(--orange)] bg-[var(--orange)]/10' : weeklyScansRemaining === 1 ? 'border-[var(--orange)] bg-[var(--orange)]/5' : 'border-[var(--green)] bg-[var(--green)]/10'}`}>
          <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${weeklyScansRemaining === 0 ? 'bg-[var(--orange)]' : weeklyScansRemaining === 1 ? 'bg-[var(--orange)]' : 'bg-[var(--green)]'}`} />
          <p className="text-sm font-black text-[var(--ink)]">
            {weeklyScansRemaining > 0 ? `${weeklyScansRemaining} free scan${weeklyScansRemaining === 1 ? '' : 's'} left this week` : 'Weekly free scans used. Upgrade for unlimited.'}
          </p>
          {weeklyScansRemaining === 0 && (
            <Link to="/pricing" className="ml-auto text-xs font-black text-[var(--navy)] underline whitespace-nowrap">UNLOCK →</Link>
          )}
        </div>
      )}

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      {result && result.count > 0 && (
        <section className="grid grid-cols-3 gap-0 border-2 border-[var(--line)] bg-[var(--ink)]">
          <div className="border-r-2 border-[var(--line)] p-3 sm:p-4 text-center">
            <p className="headline text-2xl sm:text-4xl text-[var(--yellow)]">{planningCount}</p>
            <p className="micro-label text-[9px] sm:text-[10px] text-white/60 mt-1">PLANNING</p>
          </div>
          <div className="border-r-2 border-[var(--line)] p-3 sm:p-4 text-center">
            <p className="headline text-2xl sm:text-4xl text-[var(--yellow)]">{epcCount}</p>
            <p className="micro-label text-[9px] sm:text-[10px] text-white/60 mt-1">ENERGY</p>
          </div>
          <div className="p-3 sm:p-4 text-center">
            <p className="headline text-2xl sm:text-4xl text-[var(--yellow)]">{contractCount}</p>
            <p className="micro-label text-[9px] sm:text-[10px] text-white/60 mt-1">CONTRACTS</p>
          </div>
        </section>
      )}

      {/* ── DOCUMENT SEARCH ──────────────────────────────────────────── */}
      <section className="jf-box bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="micro-label text-[var(--orange)]">DOCUMENT SEARCH</p>
            <h2 className="headline mt-2 text-2xl leading-none sm:text-3xl">SEARCH PLANNING DOCS BY KEYWORD</h2>
            <p className="mt-2 max-w-2xl font-black text-[var(--muted)]">
              Type a keyword. We scan planning documents for matches. Find jobs that fit your exact capability.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDocSearch(!showDocSearch)}
            className="jf-button bg-[var(--navy)] text-white text-sm shrink-0 sm:ml-4"
          >
            {showDocSearch ? 'HIDE' : 'OPEN SEARCH'}
          </button>
        </div>

        {showDocSearch && (
          <div className="mt-5">
            <KeywordSearch
              onSearch={(results, query) => {
                setDocSearchResults(results);
                setDocSearchQuery(query);
              }}
              searchesRemaining={3}
              isPro={OPEN_ACCESS}
            />
          </div>
        )}
      </section>

      {/* ── DOCUMENT SEARCH RESULTS ──────────────────────────────────────── */}
      {docSearchResults.length > 0 && (
        <KeywordSearchResults results={docSearchResults} query={docSearchQuery || 'keyword'} />
      )}

      {/* ── LOADING ─────────────────────────────────────────────────── */}
      {loading && !fillWeekLoading && (
        <section className="jf-box bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">SCANNING</p>
          <p className="mt-2 text-xl font-black">Checking verified signals. Running the Money Filter.</p>
        </section>
      )}

      {/* ── RESULTS ─────────────────────────────────────────────────── */}
      {result && !fillWeekResult && (
        <section className="grid gap-5">
          {errorText && (
            <div className="jf-box bg-[var(--orange)] p-5 text-white">
              <p className="font-black">Scan failed.</p>
              <p className="mt-1 font-semibold">{errorText}</p>
              <button onClick={() => void submit()} className="jf-button mt-4 bg-white text-[var(--ink)]">RETRY</button>
            </div>
          )}

          <div className="jf-box grid gap-3 bg-white p-4 md:grid-cols-5">
            <Stat label="Engine" value={result.source === 'lead_engine' ? 'JobFilter' : 'Verified'} />
            <Stat label="Matches" value={String(result.count)} />
            <Stat label="Radius" value={`${radiusMiles} miles`} />
            <Stat label="Region" value={result.region || 'Unknown'} />
            <Stat label="Updated" value={lastUpdated || 'N/A'} />
          </div>

          {result.count === 0 ? (
            <EmptyScanReport
              trade={trade}
              radiusMiles={radiusMiles}
              result={result}
              lastUpdated={lastUpdated}
              onWiden={widenAndScan}
            />
          ) : (
            <div className="grid gap-4">
              {/* Preview banner */}
              {DEV_MODE ? (
                <section className="jf-box bg-[var(--green)] p-5">
                  <p className="micro-label text-white">DEV MODE — ALL FEATURES UNLOCKED</p>
                  <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl text-white">FULL ACCESS — TEST EVERYTHING</h2>
                  <p className="mt-2 max-w-2xl font-black text-white/80">
                    DEV_MODE is active. All locked fields, WhatsApp alerts, and paid features are fully unlocked for testing.
                  </p>
                </section>
              ) : OPEN_ACCESS ? (
                <section className="jf-box bg-[var(--green)] p-5">
                  <p className="micro-label text-white">PRE-LAUNCH — OPEN ACCESS</p>
                  <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl text-white">SCAN, TRACK, AND TEST EVERYTHING</h2>
                  <p className="mt-2 max-w-2xl font-black text-white/80">
                    Launch gates are off until the product is ready. Set VITE_OPEN_ACCESS=true to enable open access for pre-launch testing.
                  </p>
                </section>
              ) : (
                <section className="jf-box bg-[var(--yellow)] p-5">
                  <p className="micro-label text-[var(--ink)]">FREE PREVIEW — THIS IS A SAMPLE</p>
                  <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">THE SIGNAL IS REAL. THE DETAIL IS LOCKED.</h2>
                  <p className="mt-2 max-w-2xl font-black text-[var(--ink)]/75">
                    Free view proves the signal exists. Unlock from £39/month for buyer detail, deadline, verification proof, WhatsApp alerts, letters, and the full Money Filter breakdown.
                  </p>
                </section>
              )}

              {/* COMMERCIAL FILTER TOGGLE */}
              {commercialCount > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setCommercialOnly(false)}
                    className={`border-2 border-[var(--line)] px-3 py-1.5 text-xs font-black uppercase transition-colors ${!commercialOnly ? 'bg-[var(--ink)] text-white' : 'bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'}`}
                  >
                    ALL LEADS ({result.leads.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommercialOnly(true)}
                    className={`border-2 border-[var(--ink)] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-colors ${commercialOnly ? 'bg-[var(--ink)] text-[var(--yellow)]' : 'bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'}`}
                  >
                    <Building2 className="w-3 h-3" />
                    COMMERCIAL ONLY ({commercialCount})
                  </button>
                </div>
              )}

              {displayedLeads.map((lead) => (
                <LeadResultCard key={lead.id} lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} isTracked={trackedLeads.has(lead.id)} onTrack={() => trackLead(lead)} />
              ))}

              {/* Results footer */}
              {displayedLeads.length > 0 && (
                <div className="jf-box bg-[var(--bg-main)] p-5 text-center">
                  <p className="text-sm font-black text-[var(--muted)]">
                    Showing {displayedLeads.length} lead{displayedLeads.length > 1 ? 's' : ''}{commercialOnly ? ' — COMMERCIAL ONLY' : ''} in your area. Results update daily.
                  </p>
                </div>
              )}

              {!OPEN_ACCESS && (
                <div className="jf-box bg-[var(--ink)] p-5 text-center">
                  <p className="font-black text-[var(--yellow)]">READY TO UNLOCK?</p>
                  <p className="mt-1 font-black text-white/75">
                    Founder price is £39/mo — cheaper than one lead on Bark. Locks forever while active.
                  </p>
                  <Link to="/pricing" className="jf-button mt-3 bg-[var(--yellow)] text-[var(--ink)] inline-block">
                    LOCK £39/mo — NO CARD NEEDED
                  </Link>
                  <p className="mt-2 text-xs font-black text-white/50">
                    30-day money-back guarantee. No quibbles, no hoops.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ── FILL MY WEEK ───────────────────────────────────────────── */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="micro-label text-[var(--ink)]">QUIET WEEK? FIX IT.</p>
            <h2 className="headline mt-2 text-2xl leading-none sm:text-4xl text-[var(--ink)]">FILL MY WEEK</h2>
            <p className="mt-2 max-w-xl font-black text-[var(--ink)]/70">
              One tap. Full scan — planning approvals, energy upgrades, public contracts. Top {trade} jobs within {radiusMiles} miles, ranked by score, ready to chase.
            </p>
          </div>
          <button
            type="button"
            disabled={fillWeekLoading || loading}
            onClick={fillMyWeek}
            className="jf-button bg-[var(--ink)] text-white text-lg px-8 py-4 disabled:opacity-60 shrink-0"
          >
            {fillWeekLoading ? 'SCANNING...' : 'FILL MY WEEK →'}
          </button>
        </div>

        {fillWeekLoading && (
          <div className="mt-5 bg-[var(--ink)] text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-[var(--yellow)] border-t-transparent rounded-full animate-spin" />
              <p className="font-black">{fillWeekPhase}</p>
            </div>
          </div>
        )}

        {fillWeekResult && fillWeekResult.count > 0 && (
          <div className="mt-5 grid gap-4">
            <div className="bg-[var(--ink)] text-white p-5">
              <p className="text-3xl font-black text-[var(--yellow)]">
                {fillWeekResult.count} JOBS FOUND NEAR YOU
              </p>
              <p className="mt-1 font-black text-white/70">
                {fillWeekResult.leads.filter(l => l.score >= 80).length} are GOLD — scored for {titleCase(trade)} within {Math.max(radiusMiles, 25)} miles
              </p>
              <p className="mt-1 text-sm font-black text-white/75">
                Your quiet week isn&apos;t a skills problem. It&apos;s a pipeline problem.
              </p>
            </div>
            {fillWeekResult.leads.map((lead) => (
              <LeadResultCard key={`fw-${lead.id}`} lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} isTracked={trackedLeads.has(lead.id)} onTrack={() => trackLead(lead)} />
            ))}
          </div>
        )}

        {fillWeekResult && fillWeekResult.count === 0 && (
          <div className="mt-5 bg-white p-5">
            <p className="font-black text-[var(--ink)]">No matches right now. Try widening your radius or switching trade.</p>
          </div>
        )}
      </section>

      {/* ── NO SCAN YET — PROMPT ───────────────────────────────────── */}
      {!hasScanned && !loading && !fillWeekLoading && (
        <section className="jf-box bg-[var(--navy)] p-6 text-center text-white" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1.5\' fill=\'%23E3B72A\' opacity=\'0.2\'/%3E%3C/svg%3E")' }}>
          {/* Empty map illustration */}
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 200 120" className="w-40 h-24 opacity-40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="180" height="100" rx="4" stroke="#E3B72A" strokeWidth="1.5" strokeDasharray="6 4" />
              <circle cx="60" cy="45" r="3" fill="#E3B72A" opacity="0.3" />
              <circle cx="100" cy="60" r="3" fill="#E3B72A" opacity="0.3" />
              <circle cx="140" cy="40" r="3" fill="#E3B72A" opacity="0.3" />
              <line x1="60" y1="48" x2="60" y2="70" stroke="#E3B72A" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="63" x2="100" y2="85" stroke="#E3B72A" strokeWidth="1" opacity="0.3" />
              <line x1="140" y1="43" x2="140" y2="65" stroke="#E3B72A" strokeWidth="1" opacity="0.3" />
              <text x="100" y="105" textAnchor="middle" fill="#E3B72A" fontSize="10" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" opacity="0.5">NO SIGNALS YET</text>
            </svg>
          </div>
          <p className="micro-label text-[var(--yellow)]">READY?</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">YOUR AREA HAS LIVE SIGNALS RIGHT NOW.</h2>
          <p className="mt-3 font-black text-white/70">
            Tap a trade above or enter your postcode. Takes 10 seconds. No signup needed.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button onClick={() => void submit()} className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
              TRY A DIFFERENT POSTCODE
            </button>
            <button onClick={() => { setTrade('building'); void submit(undefined, { trade: 'building' }); }} className="jf-button bg-white text-[var(--ink)]">
              WIDEN YOUR TRADE SEARCH
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function parseTradeReasons(raw: string[]): Array<{ label: string; highlight: boolean }> {
  const out: Array<{ label: string; highlight: boolean }> = [];
  for (const r of raw) {
    const tradeMatch = r.match(/^Trade match: (.+?) \(/);
    if (tradeMatch) {
      tradeMatch[1].split(',').map(k => k.trim().toUpperCase()).slice(0, 3).forEach(k => out.push({ label: `${k} — YOUR TRADE`, highlight: true }));
      continue;
    }
    const related = r.match(/^Related: (.+?) \(/);
    if (related) {
      related[1].split(',').map(k => k.trim().toUpperCase()).slice(0, 2).forEach(k => out.push({ label: k, highlight: false }));
      continue;
    }
    if (r.startsWith('Not your trade')) continue;
    if (r.match(/^Source (confidence|class)/)) continue;
    if (r.match(/^Proximity fit/)) continue;
    if (r.startsWith('Urgent timeline')) { out.push({ label: 'URGENT', highlight: false }); continue; }
    if (r.startsWith('Medium urgency')) { out.push({ label: 'THIS WEEK', highlight: false }); continue; }
    if (r.includes('pay-worthy range')) { out.push({ label: 'GOOD VALUE', highlight: false }); continue; }
    if (r.includes('value acceptable')) { out.push({ label: 'DECENT VALUE', highlight: false }); continue; }
    if (r.startsWith('Fresh lead')) { out.push({ label: 'JUST POSTED', highlight: false }); continue; }
    if (r.startsWith('Strong contact')) { out.push({ label: 'CONTACT READY', highlight: false }); continue; }
    const intent = r.match(/^High intent keywords: (.+?) \(/);
    if (intent) {
      intent[1].split(',').map(k => k.trim().toUpperCase()).slice(0, 2).forEach(k => out.push({ label: k, highlight: false }));
      continue;
    }
  }
  return out.length > 0 ? out.slice(0, 5) : [{ label: 'Verified signal', highlight: false }];
}

function LeadResultCard({ lead, onWhatsapp, whatsappSent, isTracked, onTrack }: { key?: string; lead: Lead; onWhatsapp: () => void; whatsappSent: boolean; isTracked: boolean; onTrack: () => void }) {
  const rawReasons = lead.reasons?.length ? lead.reasons : [];
  const parsedReasons = parseTradeReasons(rawReasons);
  const outward = lead.postcodeOutward || 'Unknown';
  const dist = lead.distanceMiles;
  const distLabel = dist !== undefined && dist > 0 ? `${Math.round(dist)} miles from ${outward}` : `In ${outward}`;

  const fields = [
    ['Trade', titleCase(String(lead.trade || lead.tradeMatch || 'trade'))],
    ['Location', lead.location || outward],
    ['Distance', distLabel],
    ['Value', safePreviewValue(lead.estimatedValue)],
    ['Urgency', lead.urgency || 'Unknown'],
  ];

  const isGold = lead.score >= 80;
  const isSilver = lead.score >= 50 && lead.score < 80;
  const isCompaniesHouse = lead.source === 'CompaniesHouse';
  const isNew = lead.publishedAt && isNewLead(lead.publishedAt);

  // Color-coded score badge
  const scoreBadgeClass = isGold
    ? 'bg-[var(--yellow)] text-[var(--ink)]'
    : isSilver
      ? 'bg-white text-[var(--ink)]'
      : 'bg-[var(--muted)]/15 text-[var(--muted)]';

  return (
    <article className="jf-box grid gap-4 bg-white p-4 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_260px]">
      {/* Enhanced score badge with color coding */}
      <div className={`grid place-items-center border-2 border-[var(--line)] ${scoreBadgeClass} h-20 w-20`}>
        <div className="flex flex-col items-center">
          <span className="headline leading-none text-3xl">{lead.score}</span>
          <span className="text-[10px] font-black uppercase">
            {isGold ? 'GOLD' : isSilver ? 'SILVER' : 'BRONZE'}
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {isCompaniesHouse ? <CompaniesHouseSourceBadge title={lead.title} /> : <Tag label={tierLabel(lead.score)} />}
          {lead.source && !isCompaniesHouse && (
            <span className="inline-flex items-center gap-1 border-2 border-[var(--line)] bg-white px-2 py-1 text-xs font-black uppercase">
              {getSourceIcon(lead.source)}
              {lead.source}
            </span>
          )}
          {lead.urgency && <Tag label={lead.urgency} />}
          {isNew && (
            <span className="inline-flex items-center gap-1 bg-[var(--orange)] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              NEW
            </span>
          )}
          {isTracked && <span className="badge bg-[var(--navy)] text-white text-[10px] font-black">TRACKING</span>}
          {lead.isCommercial && (
            <span className="inline-flex items-center gap-1 border-2 border-[var(--ink)] bg-[var(--ink)] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--yellow)]">
              <Building2 className="w-3 h-3" />
              COMMERCIAL
            </span>
          )}
          <GhostRiskBadge level={lead.score >= 85 ? 'READY' : lead.score >= 60 ? 'MAYBE' : 'WASTE'} size="sm" />
        </div>
        {isCompaniesHouse && (
          <p className="mt-2 text-sm font-black text-[var(--green)]">
            New business nearby — commercial fit-out likely
          </p>
        )}
        <h2 className="mt-3 text-2xl font-black leading-tight">{lead.title}</h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(([label, value]) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {parsedReasons.map((r) => (
            <span
              key={r.label}
              className={`badge font-black ${r.highlight ? 'bg-[var(--yellow)] text-[var(--ink)] border border-[var(--ink)]' : 'bg-[var(--bg-main)] text-[var(--ink)]'}`}
            >
              {r.label}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:self-start">
        <LockedValue label="Buyer" value={lead.buyer} />
        <LockedValue label="Deadline" value={lead.deadlineAt ? new Date(lead.deadlineAt).toLocaleDateString('en-GB') : undefined} />
        <LockedValue label="Source URL" value={lead.url || undefined} isLink href={lead.url} />
        {OPEN_ACCESS ? (
          <>
            {isTracked ? (
              <button className="jf-button w-full bg-[var(--navy)] text-white opacity-70 cursor-default" disabled>
                TRACKING IN CHASE
              </button>
            ) : (
              <button className="jf-button w-full bg-[var(--ink)] text-white text-xs" onClick={onTrack}>
                TRACK THIS LEAD
              </button>
            )}
            {isGold ? (
              <button className="jf-button w-full bg-[var(--green)] text-white" onClick={onWhatsapp} disabled={whatsappSent}>
                {whatsappSent ? 'SENT TO WHATSAPP' : 'SEND TO WHATSAPP'}
              </button>
            ) : (
              <button className="jf-button w-full bg-[var(--navy)] text-white" onClick={onWhatsapp} disabled={whatsappSent}>{whatsappSent ? 'SENT' : 'SEND TO WHATSAPP'}</button>
            )}
          </>
        ) : (
          <Link to="/pricing" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)]">
            UNLOCK FULL LEAD
          </Link>
        )}
      </div>
    </article>
  );
}

const EPC_RATING_COLOURS: Record<string, string> = {
  A: 'bg-[#008054] text-white',
  B: 'bg-[#19b459] text-white',
  C: 'bg-[#8dce46] text-[#1a1a1a]',
  D: 'bg-[#ffd500] text-[#1a1a1a]',
  E: 'bg-[#fcaa65] text-[#1a1a1a]',
  F: 'bg-[#ef8023] text-white',
  G: 'bg-[#e9153b] text-white',
};

function EpcSourceBadge({ title }: { title: string }) {
  const match = title.match(/Rating\s+([A-G])/i);
  const rating = match ? match[1].toUpperCase() : null;
  const ratingColour = rating ? (EPC_RATING_COLOURS[rating] ?? 'bg-gray-400 text-white') : '';
  return (
    <span className="flex items-center gap-1">
      <span className="badge bg-[#2d7a4f] text-white font-black text-xs px-2 py-1">EPC</span>
      {rating && (
        <span className={`badge font-black text-xs px-2 py-1 ${ratingColour}`}>{rating}</span>
      )}
    </span>
  );
}

function CompaniesHouseSourceBadge({ title }: { title: string }) {
  const isFitOut = /restaurant|hotel|retail|tech company|office|fit.out|opening/i.test(title);
  const isContractor = /contractor|plumbing|electrical|building|carpentry|painting|roofing|hvac/i.test(title);
  const label = isFitOut ? 'NEW BUSINESS' : isContractor ? 'NEW FIRM' : 'COMPANIES HOUSE';

  return (
    <span className="flex items-center gap-1">
      <span className="badge bg-[var(--green)] text-white font-black text-xs px-2 py-1">{label}</span>
      <span className="badge bg-[var(--navy)] text-white font-black text-xs px-2 py-1">CH</span>
    </span>
  );
}

function EmptyScanReport({ trade, radiusMiles, result, lastUpdated, onWiden }: {
  trade: Trade;
  radiusMiles: number;
  result: LeadSearchResponse;
  lastUpdated: string;
  onWiden: (radius: number) => void;
}) {
  const nextRadius = radiusMiles < 50 ? 50 : 100;
  const adjacentTrade = trade === 'building' ? 'roofing' : 'building';

  return (
    <section className="jf-box bg-white p-6">
      {/* Empty state illustration */}
      <div className="flex justify-center mb-4">
        <svg viewBox="0 0 240 140" className="w-48 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="220" height="120" rx="4" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 4" />
          {/* Empty map pins */}
          <circle cx="70" cy="55" r="6" fill="var(--muted)" opacity="0.15" />
          <circle cx="120" cy="70" r="6" fill="var(--muted)" opacity="0.15" />
          <circle cx="170" cy="50" r="6" fill="var(--muted)" opacity="0.15" />
          {/* Pin stems */}
          <line x1="70" y1="61" x2="70" y2="85" stroke="var(--muted)" strokeWidth="1" opacity="0.15" />
          <line x1="120" y1="76" x2="120" y2="100" stroke="var(--muted)" strokeWidth="1" opacity="0.15" />
          <line x1="170" y1="56" x2="170" y2="80" stroke="var(--muted)" strokeWidth="1" opacity="0.15" />
          {/* Magnifying glass with X */}
          <circle cx="190" cy="35" r="14" stroke="var(--muted)" strokeWidth="2" opacity="0.3" />
          <line x1="183" y1="28" x2="197" y2="42" stroke="var(--muted)" strokeWidth="2" opacity="0.3" />
          <line x1="197" y1="28" x2="183" y2="42" stroke="var(--muted)" strokeWidth="2" opacity="0.3" />
          <line x1="200" y1="45" x2="215" y2="60" stroke="var(--muted)" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
        </svg>
      </div>
      <p className="micro-label text-[var(--orange)]">SCAN REPORT</p>
      <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">NO LIVE MATCHES. NO FAKE LEADS.</h2>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Engine checked" value={result.source === 'lead_engine' ? 'JobFilter' : 'Verified'} />
        <Stat label="Trade" value={titleCase(trade)} />
        <Stat label="Radius" value={`${radiusMiles} miles`} />
        <Stat label="Checked" value={lastUpdated || 'N/A'} />
      </div>
      <div className="mt-6 border-2 border-[var(--navy)] bg-[var(--navy)]/5 p-4">
        <p className="font-black text-[var(--navy)] text-sm">Pro users get WhatsApp alerts the moment a matching signal appears in their patch — no need to re-scan manually.</p>
        <Link className="jf-button mt-3 inline-block bg-[var(--navy)] text-white text-sm" to="/pricing">
          GET WHATSAPP ALERTS — FROM £39/MO
        </Link>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => onWiden(nextRadius)}>
          WIDEN TO {nextRadius} MILES
        </button>
        <button className="jf-button bg-white text-[var(--ink)]" onClick={() => onWiden(100)}>
          INCLUDE REGIONAL JOBS
        </button>
      </div>
      <p className="mt-5 font-black text-[var(--muted)]">
        Next best move: watch this trade automatically, widen the radius, or scan adjacent {adjacentTrade} work.
      </p>
    </section>
  );
}

function LockedValue({ label, value, isLink, href }: { label: string; value: string | undefined; isLink?: boolean; href?: string }) {
  if (!value) {
    return (
      <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
        <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
        <p className="mt-1 font-black text-[var(--muted)] text-sm">—</p>
      </div>
    );
  }
  if (isLink && href) {
    return (
      <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
        <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
        <a href={href} target="_blank" rel="noreferrer" className="mt-1 block font-black text-[var(--navy)] underline underline-offset-2 truncate text-sm">VIEW PROOF</a>
      </div>
    );
  }
  return (
    <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { key?: string; label: string; value: string }) {
  return (
    <div>
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function safePreviewValue(value: string) {
  if (!value) return 'Unlock exact value';
  return value;
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function tierLabel(score: number) {
  if (score >= 80) return 'GOLD';
  if (score >= 50) return 'SILVER';
  return 'BRONZE';
}
