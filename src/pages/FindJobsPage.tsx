"use client";
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Search, Wrench, Zap, Home, Paintbrush, Hammer, Thermometer, TreePine, FileText, Building2, ArrowRight, Clock, TrendingUp, ShieldCheck, Lock } from 'lucide-react';
import { ScoreBadge } from '../components/ScoreBadge';
import { Tag } from '../components/Tag';
import { TrustBadges } from '../components/TrustBadges';
import { LeadValueKit } from '../components/LeadValueKit';
import { KeywordSearch, KeywordSearchResults } from '../components/KeywordSearch';
import { LeadReadinessBadge } from '../components/LeadReadinessBadge';
import { WinStatsBanner } from '../components/WinStatsBanner';
import type { DocumentSearchResult } from '../lib/documentSearch';
import type { Lead, LeadDecision, LeadSearchResponse, Trade } from '../lib/types';
import { importLeadToChase, isLeadTracked } from '../lib/chaseStore';
import { saveStoredLead } from '../lib/leadStore';
import { markWon } from '../lib/winStore';
import { QuickResponseKit } from '../components/QuickResponseKit';
import { useAuth } from '../components/AuthProvider';
import { isOwnerEmail } from '../lib/ownerAccess';

const DEV_MODE = false;
const OPEN_ACCESS = process.env.NEXT_PUBLIC_OPEN_ACCESS === 'true';
const SHOW_ADVANCED_TOOLS = false;
const SHOW_FILL_MY_WEEK = false;

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];

const RADIUS_OPTIONS = [5, 10, 15, 25, 50];
type ScanMode = 'all' | 'start_now';

const WEEKLY_SCAN_LIMIT = DEV_MODE ? 999 : 3;
const SCAN_COUNT_KEY = 'jf-weekly-scans-used';
const SCAN_WEEK_KEY = 'jf-weekly-scans-week';
const DEV_UNLOCK_KEY = 'jf-unlimited-tester';

function hasDevUnlock(): boolean {
  try {
    return (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(DEV_UNLOCK_KEY) === 'true';
  } catch {
    return false;
  }
}

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
    const storedWeek = (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(SCAN_WEEK_KEY);
    const thisWeek = getMondayKey();
    if (storedWeek !== thisWeek) {
      (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(SCAN_WEEK_KEY, thisWeek);
      (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(SCAN_COUNT_KEY, '0');
      return 0;
    }
    return Number((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(SCAN_COUNT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function recordWeeklyScan(): number {
  const next = getWeeklyScansUsed() + 1;
  try {
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(SCAN_COUNT_KEY, String(next));
  } catch { /* ignore */ }
  return next;
}

const SCAN_HISTORY_KEY = 'jf-scan-history';
type ScanHistoryEntry = { postcode: string; trade: Trade };

function getScanHistory(): ScanHistoryEntry[] {
  try {
    const raw = localStorage.getItem(SCAN_HISTORY_KEY);
    return raw ? (JSON.parse(raw) as ScanHistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function saveScanHistory(postcode: string, trade: Trade): void {
  const history = getScanHistory().filter(
    (e) => !(e.postcode === postcode && e.trade === trade)
  );
  history.unshift({ postcode, trade });
  try {
    localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
  } catch { /* ignore */ }
}

const TRADE_PRESETS: { label: string; trade: Trade; icon: React.ReactNode }[] = [
  { label: 'ELECTRICAL', trade: 'electrical', icon: <Zap className="w-4 h-4" /> },
  { label: 'PLUMBING', trade: 'plumbing', icon: <Wrench className="w-4 h-4" /> },
  { label: 'BUILDING', trade: 'building', icon: <Hammer className="w-4 h-4" /> },
  { label: 'ROOFING', trade: 'roofing', icon: <Home className="w-4 h-4" /> },
  { label: 'LANDSCAPING', trade: 'landscaping', icon: <TreePine className="w-4 h-4" /> },
  { label: 'CARPENTRY', trade: 'carpentry', icon: <Hammer className="w-4 h-4" /> },
  { label: 'PAINTING', trade: 'painting', icon: <Paintbrush className="w-4 h-4" /> },
  { label: 'HEATING', trade: 'hvac', icon: <Thermometer className="w-4 h-4" /> },
];


function getSavedRadius(): number {
  const saved = (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.radius');
  if (saved) {
    const n = Number(saved);
    if (RADIUS_OPTIONS.includes(n)) return n;
  }
  return 25;
}

function getSavedPostcode(): string {
  return (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.postcode') || '';
}

function getSavedTrade(): Trade {
  const saved = (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.trade');
  if (saved && trades.includes(saved as Trade)) return saved as Trade;
  return 'electrical';
}

function isNewLead(publishedAt: string): boolean {
  const published = new Date(publishedAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  return hoursDiff < 24;
}

function timeAgoShort(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatSourceLabel(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('planning')) return 'Planning signal';
  if (s.includes('epc') || s.includes('energy')) return 'Energy signal';
  if (s.includes('contract') || s === 'fts' || s.includes('pcs') || s.includes('sell2wales')) return 'Contract signal';
  if (s.includes('companies') || s === 'ch') return 'Business signal';
  if (s.includes('landregistry') || s.includes('land_registry')) return 'Property signal';
  if (s.includes('charity')) return 'Activity signal';
  if (s.includes('forestry')) return 'Land signal';
  if (s.includes('directory')) return 'Local signal';
  return 'Verified signal';
}

function getSourceIcon(source: string): React.ReactNode {
  const src = source.toLowerCase();
  if (src.includes('planning') || src.includes('planning_application')) return <FileText className="w-3.5 h-3.5" />;
  if (src.includes('epc') || src.includes('energy')) return <Home className="w-3.5 h-3.5" />;
  if (src.includes('companies') || src.includes('ch')) return <Building2 className="w-3.5 h-3.5" />;
  if (src.includes('contract') || src === 'fts') return <ShieldCheck className="w-3.5 h-3.5" />;
  return <TrendingUp className="w-3.5 h-3.5" />;
}

export function FindJobsPage() {
  const searchParams = useSearchParams();
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
    const leads = JSON.parse((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.find.tracked') || '[]') as string[];
    return new Set(leads);
  });
  const [docSearchResults, setDocSearchResults] = useState<DocumentSearchResult[]>([]);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [showDocSearch, setShowDocSearch] = useState(false);
  const { user } = useAuth();
  const isOwner = isOwnerEmail(user?.email);
  const [devUnlocked] = useState(() => OPEN_ACCESS || hasDevUnlock());
  const unlimitedTester = devUnlocked || isOwner;
  const [scanHistory, setScanHistory] = useState<ScanHistoryEntry[]>(getScanHistory);
  const [scanMode, setScanMode] = useState<ScanMode>('all');
  const [submittedTrade, setSubmittedTrade] = useState<Trade | null>(null);

  const [fillWeekLoading, setFillWeekLoading] = useState(false);
  const [fillWeekResult, setFillWeekResult] = useState<LeadSearchResponse | null>(null);
  const [fillWeekPhase, setFillWeekPhase] = useState('');
  const [commercialOnly, setCommercialOnly] = useState(false);
  const [postcodeRequired, setPostcodeRequired] = useState(false);
  const postcodeRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const weeklyLimit = unlimitedTester ? 999 : WEEKLY_SCAN_LIMIT;
  const weeklyScansRemaining = Math.max(0, weeklyLimit - weeklyScansUsed);
  const commercialCount = result?.leads.filter((l) => l.isCommercial).length ?? 0;
  const displayedLeads = commercialOnly ? (result?.leads.filter((l) => l.isCommercial) ?? []) : (result?.leads ?? []);

  useEffect(() => {
    const tradeParam = searchParams?.get('trade');
    const areaParam = searchParams?.get('area');
    if (tradeParam && trades.includes(tradeParam as Trade)) {
      setTrade(tradeParam as Trade);
    }
    if (areaParam) {
      setPostcode(areaParam);
    }
    if (searchParams?.get('mode') === 'start_now') {
      setScanMode('start_now');
    }
  }, [searchParams]);

  useEffect(() => {
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem('jobfilter.radius', String(radiusMiles));
  }, [radiusMiles]);

  useEffect(() => {
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem('jobfilter.postcode', postcode);
  }, [postcode]);

  useEffect(() => {
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem('jobfilter.trade', trade);
  }, [trade]);

  useEffect(() => {
    setWeeklyScansUsed(getWeeklyScansUsed());
  }, []);

  useEffect(() => {
    if (!loading && result) resultsRef.current?.focus();
  }, [loading, result]);

  const trackLead = (lead: Lead) => {
    if (trackedLeads.has(lead.id) || isLeadTracked(lead.id)) return;
    importLeadToChase({
      id: lead.id,
      title: lead.title,
      trade: String(lead.trade || lead.tradeMatch || 'general'),
      location: lead.location || lead.postcodeOutward || 'Unknown',
      estimatedValue: lead.estimatedValue || 'TBC',
      score: lead.score,
    });
    const urgencyMap: Record<string, LeadDecision['urgency']> = { high: 'Emergency', medium: 'This week', low: 'Later' };
    saveStoredLead({
      id: lead.id,
      title: lead.title,
      score: lead.score,
      jobType: String(lead.trade || lead.tradeMatch || 'Job'),
      urgency: urgencyMap[lead.urgency] ?? 'This week',
      postcode: lead.postcodeOutward,
      area: lead.location || lead.postcodeOutward,
      flags: [],
      details: lead.title,
      phone: lead.buyerPhone,
      status: 'new',
      createdAt: new Date().toISOString(),
      qualityLabel: lead.qualityLabel,
      decision: lead.decision,
      scoringPolicyVersion: lead.scoringPolicyVersion,
      scoreFactors: lead.scoreFactors,
      recommendedAction: lead.recommendedAction,
      signalStack: lead.signalStack,
      signalClass: lead.signalClass,
      quoteFloor: lead.quoteFloor,
      evidenceBadges: lead.evidenceBadges,
      scoreReasons: lead.reasons ?? [],
      source: lead.source,
      description: lead.description,
      isCommercial: lead.isCommercial,
      projectScale: lead.projectScale,
      sourceUrl: lead.url || lead.sourceUrls?.[0],
    });
    const next = new Set(trackedLeads);
    next.add(lead.id);
    setTrackedLeads(next);
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem('jobfilter.find.tracked', JSON.stringify([...next]));
  };

  async function submit(event?: FormEvent, overrides?: { radiusMiles?: number; trade?: Trade; postcode?: string }) {
    event?.preventDefault();
    setErrorText('');
    setLoading(true);
    setResult(null);
    setFillWeekResult(null);
    setSubmittedTrade(null);
    setHasScanned(true);
    setCommercialOnly(false);
    const effectivePostcode = overrides?.postcode ?? postcode;
    const effectiveTrade = overrides?.trade ?? trade;
    try {
      const endpoint = '/api/leads/search';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode: effectivePostcode,
          trade: effectiveTrade,
          radiusMiles: overrides?.radiusMiles ?? radiusMiles,
          mode: scanMode,
        }),
      });
      const data = await response.json() as LeadSearchResponse;
      setResult(data);
      setSubmittedTrade(effectiveTrade);
      if (!response.ok || !data.ok) {
        setErrorText(data.errors?.[0] ?? 'Scan failed. Retry the scan.');
      } else {
        const used = recordWeeklyScan();
        setWeeklyScansUsed(used);
        saveScanHistory(effectivePostcode, effectiveTrade);
        setScanHistory(getScanHistory());
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
            id: lead.id,
            leadReadiness: lead.leadReadiness,
            qualityLabel: lead.qualityLabel,
            postcodeOutward: lead.postcodeOutward,
            recommendedAction: lead.recommendedAction,
            contactPath: lead.contactPath,
            scoreReasons: lead.reasons,
          },
        }),
      });
    } catch {
      setWhatsappSent((prev) => ({ ...prev, [lead.id]: false }));
    }
  }

  async function fillMyWeek() {
    const capturedTrade = trade;
    setFillWeekLoading(true);
    setFillWeekResult(null);
    setCommercialOnly(false);
    setFillWeekPhase('Checking verified job signals across your patch...');
    await new Promise(r => setTimeout(r, 800));
    setFillWeekPhase('Matching leads to your trade — scoring every signal...');
    await new Promise(r => setTimeout(r, 600));
    setFillWeekPhase('Ranking the best jobs in your postcode...');
    await new Promise(r => setTimeout(r, 400));
    try {
      const endpoint = '/api/leads/search';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode,
          trade: capturedTrade,
          radiusMiles: Math.max(radiusMiles, 25),
          mode: scanMode,
        }),
      });
      const data = await response.json() as LeadSearchResponse;
      setFillWeekResult(data);
      setSubmittedTrade(capturedTrade);
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
  const firstGoldIdx = (!unlimitedTester && !DEV_MODE) ? displayedLeads.findIndex(l => l.score >= 80) : -1;
  const silverCount = result?.leads.filter(l => l.score >= 50 && l.score < 80).length ?? 0;
  const epcCount = result?.leads.filter(l => l.source?.toLowerCase().includes('epc')).length ?? 0;
  const planningCount = result?.leads.filter(l => l.source?.toLowerCase().includes('planning')).length ?? 0;
  const contractCount = result?.leads.filter(l => {
    const source = l.source?.toLowerCase() ?? '';
    return source.includes('contract') || source.includes('companies') || source === 'fts' || source === 'pcs' || source.includes('sell2wales');
  }).length ?? 0;
  const startReadyCount = result?.leads.filter(l => l.leadReadiness === 'READY' || l.readiness === 'READY' || l.signalClass === 'active_site').length ?? 0;
  const bestSource = getBestSource(result?.sources);
  const sourceMix = getSourceMix(result?.sources);
  const topJobTypes = extractTopJobTypes(displayedLeads);

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">

      {/* ── SCANNER ──────────────────────────────────────────────── */}
      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">LIVE SCANNER — 3 FREE SCANS, NO CARD</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-4xl">FIND JOBS WORTH PRICING</h1>

        {!unlimitedTester && (
          <div className={`mt-3 flex items-center gap-3 border-2 px-4 py-2.5 ${weeklyScansRemaining === 0 ? 'border-[var(--orange)] bg-[var(--orange)]/10' : weeklyScansRemaining === 1 ? 'border-[var(--orange)] bg-[var(--orange)]/5' : 'border-[var(--green)] bg-[var(--green)]/10'}`}>
            <span className={`h-2 w-2 rounded-full shrink-0 ${weeklyScansRemaining === 0 ? 'bg-[var(--orange)]' : weeklyScansRemaining === 1 ? 'bg-[var(--orange)]' : 'bg-[var(--green)]'}`} />
            <p className="text-sm font-black text-[var(--ink)]">
              {weeklyScansRemaining > 0
                ? weeklyScansUsed === 0
                  ? `3 free scans this week — no credit card required`
                  : `${weeklyScansRemaining} free scan${weeklyScansRemaining === 1 ? '' : 's'} left this week`
                : '3 scans complete — scanning remains free. Buyer name and official response route locked — upgrade to act on these leads.'}
            </p>
            {weeklyScansRemaining === 0 ? (
              <Link href="/pricing" className="ml-auto shrink-0 border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-1 text-xs font-black uppercase text-[var(--ink)] hover:opacity-90 transition whitespace-nowrap">SEE WHO TO CALL — £39/MO →</Link>
            ) : weeklyScansUsed > 0 ? (
              <span className="ml-auto text-xs font-black text-[var(--muted)] whitespace-nowrap">Resets Monday</span>
            ) : null}
          </div>
        )}

        {SHOW_ADVANCED_TOOLS && <div className="mt-5 grid gap-2 sm:grid-cols-2" role="tablist" aria-label="Lead scan mode">
          <button
            type="button"
            onClick={() => setScanMode('all')}
            className={`border-2 border-[var(--line)] px-4 py-3 text-left font-black uppercase transition ${
              scanMode === 'all'
                ? 'bg-[var(--ink)] text-white'
                : 'bg-white text-[var(--ink)] hover:bg-[var(--paper)]'
            }`}
          >
            <span className="block text-sm">All signals</span>
            <span className={`block text-xs ${scanMode === 'all' ? 'text-white/80' : 'text-[var(--muted)]'}`}>
              Experimental multi-source mode; hidden until each adapter is verified.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setScanMode('start_now')}
            className={`border-2 border-[var(--line)] px-4 py-3 text-left font-black uppercase transition ${
              scanMode === 'start_now'
                ? 'bg-[var(--yellow)] text-[var(--ink)] shadow-[4px_4px_0_var(--line)]'
                : 'bg-white text-[var(--ink)] hover:bg-[var(--paper)]'
            }`}
          >
            <span className="block text-sm">Works Starting Now</span>
            <span className={`block text-xs ${scanMode === 'start_now' ? 'text-[var(--ink)]/75' : 'text-[var(--muted)]'}`}>
              Experimental timing mode; a tender deadline does not prove a start date.
            </span>
          </button>
        </div>}

        {scanMode === 'start_now' && (
          <div className="mt-3 border-2 border-[var(--line)] bg-[var(--yellow)] p-3 text-sm font-black text-[var(--ink)]">
            Experimental timing view. It remains hidden because published procurement dates do not prove when work will start.
          </div>
        )}

        {/* Form — postcode + trade + radius so users always see their trade before scanning */}
        <form onSubmit={submit} aria-busy={loading || fillWeekLoading} className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <label htmlFor="scan-postcode" className="field-label">
            Postcode
            <input id="scan-postcode" name="postal-code" autoComplete="postal-code" ref={postcodeRef} value={postcode} onChange={(event) => { setPostcode(event.target.value.toUpperCase()); setPostcodeRequired(false); }} aria-invalid={postcodeRequired} aria-describedby={postcodeRequired ? 'scan-postcode-error' : undefined} className={`field-input ${postcodeRequired ? 'border-[var(--orange)] ring-2 ring-[var(--orange)]/30' : ''}`} placeholder="e.g. B14 7QH" required />
          </label>
          <label htmlFor="scan-trade" className="field-label">
            Trade
            <select id="scan-trade" name="trade" value={trade} onChange={(event) => setTrade(event.target.value as Trade)} className="field-input">
              {TRADE_PRESETS.map((p) => (
                <option key={p.trade} value={p.trade}>{p.label}</option>
              ))}
            </select>
          </label>
          <label htmlFor="scan-radius" className="field-label">
            Radius
            <select id="scan-radius" name="radius" value={radiusMiles} onChange={(event) => setRadiusMiles(Number(event.target.value))} className="field-input">
              {RADIUS_OPTIONS.map((miles) => <option key={miles} value={miles}>{miles} miles</option>)}
            </select>
          </label>
          <button type="submit" disabled={loading || fillWeekLoading} className="jf-button self-end bg-[var(--yellow)] text-[var(--ink)] disabled:opacity-60">
            <Search aria-hidden="true" focusable="false" className="w-4 h-4 mr-2 inline-block" />
            {loading ? 'SCANNING...' : 'SCAN NOW →'}
          </button>
        </form>

        {/* Recent Scans */}
        {scanHistory.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="micro-label text-[var(--muted)] text-[10px]">YOUR RECENT SCANS:</span>
            {scanHistory.map((entry) => (
              <button
                key={`${entry.postcode}-${entry.trade}`}
                type="button"
                onClick={() => {
                  setPostcode(entry.postcode);
                  setTrade(entry.trade);
                  void submit(undefined, { postcode: entry.postcode, trade: entry.trade });
                }}
                className="border-2 border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-xs font-black text-[var(--ink)] uppercase hover:bg-[var(--yellow)] hover:border-[var(--ink)] transition-colors"
              >
                {entry.postcode} · {entry.trade.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Trade presets — tap to scan by trade once postcode is entered */}
        <div className="mt-4">
          <p className="micro-label text-[var(--muted)]">TAP A TRADE TO SCAN INSTANTLY</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {TRADE_PRESETS.map((preset) => (
              <button
                key={preset.trade}
                type="button"
                aria-pressed={trade === preset.trade}
                disabled={loading || fillWeekLoading}
                onClick={() => {
                  if (!postcode.trim()) {
                    setPostcodeRequired(true);
                    postcodeRef.current?.focus();
                    postcodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                  }
                  setPostcodeRequired(false);
                  setTrade(preset.trade);
                  void submit(undefined, { trade: preset.trade });
                }}
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
          {postcodeRequired && (
            <p id="scan-postcode-error" role="alert" aria-live="assertive" className="mt-2 border-2 border-[var(--orange)] bg-[var(--orange)]/10 px-3 py-2 text-sm font-black text-[var(--orange)]">
              ↑ Enter your postcode above — then tap your trade to scan
            </p>
          )}
        </div>
      </section>

      {/* ── WIN STATS ──────────────────────────────────────────────── */}
      <WinStatsBanner postcode={postcode} />

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      {result && result.count > 0 && (
        <section className="grid grid-cols-3 gap-0 border-2 border-[var(--line)] bg-[var(--ink)]">
          <div className="border-r-2 border-[var(--line)] p-3 sm:p-4 text-center">
            <p className="headline text-2xl sm:text-4xl text-[var(--yellow)]">{result.count}</p>
            <p className="micro-label text-[9px] sm:text-[10px] text-white/80 mt-1">MATCHES</p>
          </div>
          <div className="border-r-2 border-[var(--line)] p-3 sm:p-4 text-center">
            <p className="headline text-2xl sm:text-4xl text-[var(--yellow)]">{goldCount}</p>
            <p className="micro-label text-[9px] sm:text-[10px] text-white/80 mt-1">GOLD</p>
          </div>
          <div className="p-3 sm:p-4 text-center">
            <p className="headline text-2xl sm:text-4xl text-[var(--yellow)]">{contractCount}</p>
            <p className="micro-label text-[9px] sm:text-[10px] text-white/80 mt-1">CONTRACTS</p>
          </div>
        </section>
      )}

      {/* ── DOCUMENT SEARCH ──────────────────────────────────────────── */}
      {SHOW_ADVANCED_TOOLS && hasScanned && <section className="jf-box bg-white p-6">
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
              isPro={unlimitedTester}
            />
          </div>
        )}
      </section>}

      {/* ── DOCUMENT SEARCH RESULTS ──────────────────────────────────────── */}
      {SHOW_ADVANCED_TOOLS && hasScanned && docSearchResults.length > 0 && (
        <KeywordSearchResults results={docSearchResults} query={docSearchQuery || 'keyword'} />
      )}

      {/* ── LOADING ─────────────────────────────────────────────────── */}
      {loading && !fillWeekLoading && (
        <section role="status" aria-live="polite" aria-atomic="true" className="jf-box bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">SCANNING</p>
          <p className="mt-2 text-xl font-black">Checking verified signals. Running the Money Filter.</p>
        </section>
      )}

      {/* ── RESULTS ─────────────────────────────────────────────────── */}
      {result && !fillWeekResult && (
        <section ref={resultsRef} tabIndex={-1} aria-label="Scan results" aria-live="polite" className="grid gap-5 rounded-sm">
          {errorText && (
            <div role="alert" aria-live="assertive" className="jf-box bg-[var(--orange)] p-5 text-white">
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

          <SourceHealthStrip sources={result.sources} />
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
              {/* Access banners — dev/unlimited only (not paywall; paywall shown after leads) */}
              {DEV_MODE ? (
                <section className="jf-box bg-[var(--green)] p-5">
                  <p className="micro-label text-white">DEV MODE — ALL FEATURES UNLOCKED</p>
                  <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl text-white">FULL ACCESS — TEST EVERYTHING</h2>
                  <p className="mt-2 max-w-2xl font-black text-white/80">
                    DEV_MODE is active. All locked fields, WhatsApp alerts, and paid features are fully unlocked for testing.
                  </p>
                </section>
              ) : unlimitedTester ? (
                <section className="jf-box bg-[var(--green)] p-5">
                  <p className="micro-label text-white">UNLIMITED ACCESS</p>
                  <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl text-white">FULL SCAN — ALL SIGNALS UNLOCKED</h2>
                  <p className="mt-2 max-w-2xl font-black text-white/80">
                    All scored signals for your patch are visible. Gold leads include buyer detail, quote floor, and follow-up cadence.
                  </p>
                </section>
              ) : null}

              {/* COMMERCIAL FILTER TOGGLE */}
              {commercialCount > 0 && (
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      aria-pressed={!commercialOnly}
                      onClick={() => setCommercialOnly(false)}
                      className={`border-2 border-[var(--line)] px-3 py-1.5 text-xs font-black uppercase transition-colors ${!commercialOnly ? 'bg-[var(--ink)] text-white' : 'bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'}`}
                    >
                      ALL LEADS ({result.leads.length})
                    </button>
                    <button
                      type="button"
                      aria-pressed={commercialOnly}
                      onClick={() => setCommercialOnly(true)}
                      className={`border-2 border-[var(--ink)] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-colors ${commercialOnly ? 'bg-[var(--ink)] text-[var(--yellow)]' : 'bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'}`}
                    >
                      <Building2 className="w-3 h-3" />
                      COMMERCIAL ONLY ({commercialCount})
                    </button>
                  </div>
                  {commercialOnly && !OPEN_ACCESS && (
                    <div className="border-2 border-[var(--ink)] bg-[var(--ink)] p-3 text-white">
                      <p className="text-xs font-black text-[var(--yellow)] uppercase">Commercial signals — buyer details in Full Access</p>
                      <p className="mt-1 text-sm font-black text-white/90">
                        These {commercialCount} public opportunit{commercialCount === 1 ? 'y has' : 'ies have'} buyer evidence. Full access shows the buyer, published value where available, deadline and official response route. Other suppliers may pursue the same notice.
                      </p>
                      <Link href="/pricing" className="mt-3 inline-block border-2 border-[var(--yellow)] bg-[var(--yellow)] px-4 py-2 text-xs font-black uppercase text-[var(--ink)] hover:opacity-90 transition">
                        SEE WHO TO CALL — £39/MO →
                      </Link>
                      <p className="mt-1.5 text-xs font-black text-white/70">No credit card required to browse</p>
                      <p className="mt-0.5 text-xs font-black text-[var(--yellow)]/80">PUBLIC NOTICE — ACCESS IS NOT EXCLUSIVE</p>
                    </div>
                  )}
                </div>
              )}

              {displayedLeads.map((lead, idx) => (
                <React.Fragment key={lead.id}>
                  <LeadResultCard lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} isTracked={trackedLeads.has(lead.id)} onTrack={() => trackLead(lead)} isOwner={isOwner} scanTrade={submittedTrade ?? trade} />
                  {idx === firstGoldIdx && (
                    <div className="border-2 border-[var(--ink)] bg-[var(--ink)] p-4">
                      <p className="micro-label text-[10px] text-[var(--yellow)]">THIS JOB HAS A BUYER — MEMBERS ONLY</p>
                      <p className="mt-2 font-bold text-white">
                        {lead.estimatedValue ? `Published value: ${lead.estimatedValue}. ` : ''}Review the buyer, deadline and official submission route before deciding whether to bid.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Link href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">SEE WHO TO CALL — £39/MO →</Link>
                        <span className="text-xs font-black text-white/50">No credit card required · public tender</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}


              {/* Patch Pulse */}
              {displayedLeads.length > 0 && (
                <div className="border-2 border-[var(--navy)] bg-[var(--navy)] p-4 text-white mt-2">
                  <p className="micro-label text-[var(--yellow)]">PATCH PULSE</p>
                  <p className="mt-1 font-black text-white">
                    {(result.outward || postcode).toUpperCase()} — {trade}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    <span className="font-black text-[var(--yellow)]">{goldCount} GOLD <span className="font-normal text-white/70">— worth quoting now</span></span>
                    <span className="font-black text-white">{silverCount} SILVER <span className="font-normal text-white/70">— worth watching</span></span>
                    {(result.lockedCount ?? 0) > 0 && (
                      <span className="font-black text-white/50">{result.lockedCount} MORE LEADS <span className="font-normal">— full access at £39/mo</span></span>
                    )}
                  </div>
                  {sourceMix && (
                    <p className="mt-2 text-xs font-black text-white/70">Source mix: {sourceMix}</p>
                  )}
                  {bestSource && (
                    <p className="mt-0.5 text-xs font-black text-white/70">Best source this scan: {bestSource}</p>
                  )}
                  {topJobTypes.length > 0 && (
                    <p className="mt-2 text-xs font-black text-[var(--yellow)]">IN DEMAND: {topJobTypes.join(' · ')}</p>
                  )}
                </div>
              )}

              {/* Alert quick-setup CTA */}
              {displayedLeads.length > 0 && (
                <AlertQuickSetup trade={trade} postcode={postcode} />
              )}

              {/* Free tier upgrade nudge — shown after leads so users see value before the ask */}
              {!DEV_MODE && !unlimitedTester && displayedLeads.length > 0 && (
                <section className="jf-box bg-[var(--yellow)] p-5">
                  <p className="micro-label text-[var(--ink)]">REAL JOBS. BUYER DETAILS IN FULL ACCESS.</p>
                  <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">
                    {goldCount > 0
                      ? `${goldCount} GOLD LEAD${goldCount !== 1 ? 'S' : ''} NEAR ${result?.outward || postcode.trim().split(' ')[0].toUpperCase()} — SEE WHO TO CALL.`
                      : 'SEE BUYER DETAILS ON EVERY LEAD.'}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Link href="/pricing" className="jf-button bg-[var(--ink)] text-white">SEE WHO TO CALL — £39/MO →</Link>
                    <span className="text-xs font-black text-[var(--ink)]/60">No credit card required to browse</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-[var(--ink)]/60">
                    Shows the official submission route for every lead, plus buyer name, contact and published value where the source includes them. Verified official sources — no shared auction, no five-trade blast. Public opportunities that other suppliers may also pursue.
                  </p>
                </section>
              )}

              {/* Results footer */}
              {displayedLeads.length > 0 && (
                <div className="jf-box bg-[var(--bg-main)] p-5 text-center">
                  <p className="text-sm font-black text-[var(--muted)]">
                    Showing {displayedLeads.length} lead{displayedLeads.length > 1 ? 's' : ''}{commercialOnly ? ' — COMMERCIAL ONLY' : ''} in your area. Results update daily.
                  </p>
                </div>
              )}

            </div>
          )}
        </section>
      )}

      {/* ── FILL MY WEEK ───────────────────────────────────────────── */}
      {SHOW_FILL_MY_WEEK && hasScanned && <section className="jf-box bg-white border-2 border-[var(--line)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
          <p className="micro-label text-[var(--ink)]">QUIET WEEK? FIX IT.</p>
          <h2 className="headline mt-2 text-2xl leading-none sm:text-4xl text-[var(--ink)]">FILL MY WEEK</h2>
          <p className="mt-2 max-w-xl font-bold text-[var(--ink)]/70">
              Experimental wider search. It remains hidden until its current-source behaviour and customer value are verified.
          </p>
          </div>
          <button
            type="button"
            disabled={fillWeekLoading || loading}
            onClick={fillMyWeek}
            className="jf-button bg-[var(--ink)] text-white disabled:opacity-60 shrink-0"
          >
            {fillWeekLoading ? 'SCANNING...' : `EXPAND SCAN — ${Math.max(radiusMiles, 25)}MI →`}
          </button>
        </div>

        {fillWeekLoading && (
          <div className="mt-5 bg-[var(--ink)] text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-[var(--yellow)] border-t-transparent rounded-full animate-spin shrink-0" />
              <div className="min-w-0">
                <p className="font-black">{fillWeekPhase}</p>
                <p className="text-xs font-black text-white/50 mt-0.5">Takes about 5 seconds — checking all sources</p>
              </div>
            </div>
            <div className="mt-3 flex gap-1">
              {['Checking signals', 'Scoring leads', 'Ranking results'].map((step, i) => {
                const stepIdx = fillWeekPhase.includes('Matching') ? 1 : fillWeekPhase.includes('Ranking') ? 2 : 0;
                return (
                  <div key={step} className={`h-1 flex-1 transition-colors ${i <= stepIdx ? 'bg-[var(--yellow)]' : 'bg-white/20'}`} />
                );
              })}
            </div>
          </div>
        )}

        {fillWeekResult && fillWeekResult.count > 0 && (
          <div className="mt-5 grid gap-4">
            <div className="bg-[var(--ink)] text-white p-5">
              <p className="text-3xl font-black text-[var(--yellow)]">
                {fillWeekResult.count} JOBS FOUND IN {(result?.outward || postcode).toUpperCase()}
              </p>
              <p className="mt-1 font-black text-white/70">
                {fillWeekResult.leads.filter(l => l.score >= 80).length} are GOLD — scored for {titleCase(submittedTrade ?? trade)} within {Math.max(radiusMiles, 25)} miles
              </p>
              <p className="mt-1 text-sm font-black text-white/75">
                Your quiet week isn&apos;t a skills problem. It&apos;s a leads problem.
              </p>
            </div>
            {fillWeekResult.leads.map((lead) => (
              <LeadResultCard key={`fw-${lead.id}`} lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} isTracked={trackedLeads.has(lead.id)} onTrack={() => trackLead(lead)} isOwner={isOwner} scanTrade={submittedTrade ?? trade} />
            ))}
          </div>
        )}

        {fillWeekResult && fillWeekResult.count === 0 && (
          <div className="mt-5 bg-white p-5">
            <p className="font-black text-[var(--ink)]">No matches right now. Try widening your radius or switching trade.</p>
          </div>
        )}
      </section>}

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
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">CHECK THE CURRENT PUBLIC-TENDER FEED.</h2>
          <p className="mt-3 font-black text-white/70">
            Tap a trade above or enter your postcode. Takes 10 seconds. No credit card required.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button onClick={() => {
              if (!postcode.trim()) { setPostcodeRequired(true); postcodeRef.current?.focus(); postcodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
              void submit();
            }} className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
              SCAN MY AREA →
            </button>
            <button onClick={() => {
              if (!postcode.trim()) { setPostcodeRequired(true); postcodeRef.current?.focus(); postcodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
              setTrade('building'); void submit(undefined, { trade: 'building' });
            }} className="jf-button bg-white text-[var(--ink)]">
              SCAN BUILDING WORK
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

// Per-trade title keywords → specific label shown in the WHY popup
const TRADE_TITLE_SIGNALS: Partial<Record<string, Array<[string, string]>>> = {
  electrical: [
    ['EV CHARGER', 'EV CHARGER'],
    ['EV CHARGING', 'EV CHARGER'],
    ['REWIR', 'REWIRE'],
    ['CONSUMER UNIT', 'CONSUMER UNIT'],
    ['FUSE BOARD', 'CONSUMER UNIT'],
    ['EICR', 'EICR'],
    ['SOLAR PV', 'SOLAR PV'],
    ['SOLAR', 'SOLAR'],
    ['HEAT PUMP', 'HEAT PUMP ELEC'],
  ],
  plumbing: [
    ['BOILER', 'BOILER WORK'],
    ['BATHROOM', 'BATHROOM WORK'],
    ['WET ROOM', 'WET ROOM'],
    ['EN SUITE', 'EN SUITE'],
    ['UNDERFLOOR HEAT', 'UNDERFLOOR HEAT'],
    ['HOT WATER', 'HOT WATER'],
  ],
  hvac: [
    ['AIR SOURCE HEAT', 'AIR SOURCE HP'],
    ['HEAT PUMP', 'HEAT PUMP'],
    ['AIR CONDITIONING', 'AIR CON'],
    ['VENTILATION', 'VENTILATION'],
    ['DUCTING', 'DUCTWORK'],
  ],
  roofing: [
    ['FLAT ROOF', 'FLAT ROOF'],
    ['GUTTER', 'GUTTER WORK'],
    ['FASCIA', 'FASCIA / SOFFIT'],
    ['SOFFIT', 'FASCIA / SOFFIT'],
    ['CHIMNEY', 'CHIMNEY'],
    ['SKYLIGHT', 'SKYLIGHT'],
  ],
  building: [
    ['EXTENSION', 'EXTENSION'],
    ['LOFT CONVERSION', 'LOFT CONVERSION'],
    ['GARAGE CONVERSION', 'GARAGE CONVERSION'],
    ['NEW BUILD', 'NEW BUILD'],
    ['REFURB', 'REFURBISHMENT'],
    ['CONSERVATORY', 'CONSERVATORY'],
  ],
  landscaping: [
    ['DRIVEWAY', 'DRIVEWAY'],
    ['FENCING', 'FENCING'],
    ['DECKING', 'DECKING'],
    ['PATIO', 'PATIO'],
    ['BLOCK PAVING', 'BLOCK PAVING'],
    ['TURFING', 'TURFING'],
  ],
  carpentry: [
    ['KITCHEN', 'KITCHEN WORK'],
    ['STAIRCASE', 'STAIRCASE'],
    ['FLOORING', 'FLOORING'],
    ['WINDOW', 'WINDOW WORK'],
  ],
  painting: [
    ['DECORATING', 'DECORATING'],
    ['PLASTERING', 'PLASTERING'],
    ['RENDER', 'RENDER / COAT'],
    ['EXTERIOR', 'EXTERIOR PAINT'],
  ],
};

// Per-trade generic labels (from bare trade-name scorer keywords) that title enrichment can swap for something specific.
// Keyed by trade; values are the exact "KEYWORD — YOUR TRADE" strings the scorer produces from its generic high-tier keywords.
const GENERIC_TRADE_LABELS: Partial<Record<string, Set<string>>> = {
  electrical: new Set(['ELECTRICAL — YOUR TRADE', 'WIRING — YOUR TRADE']),
  plumbing: new Set(['PLUMB — YOUR TRADE']),
  roofing: new Set(['ROOF — YOUR TRADE', 'ROOFING — YOUR TRADE']),
  building: new Set(['BUILDING WORK — YOUR TRADE', 'CONSTRUCTION — YOUR TRADE', 'STRUCTURAL — YOUR TRADE', 'REFURBISHMENT — YOUR TRADE', 'RENOVATION — YOUR TRADE']),
  carpentry: new Set(['CARPENTRY — YOUR TRADE', 'JOINERY — YOUR TRADE']),
  painting: new Set(['PAINT — YOUR TRADE', 'DECORAT — YOUR TRADE', 'PLASTER — YOUR TRADE']),
  hvac: new Set(['HVAC — YOUR TRADE', 'MECHANICAL — YOUR TRADE', 'VENTILATION — YOUR TRADE', 'HEAT PUMP — YOUR TRADE', 'AIR SOURCE — YOUR TRADE']),
  landscaping: new Set(['LANDSCAPE — YOUR TRADE', 'GROUNDS — YOUR TRADE', 'GARDEN — YOUR TRADE', 'TURF — YOUR TRADE']),
};

function parseTradeReasons(raw: string[], title?: string, trade?: string): Array<{ label: string; highlight: boolean }> {
  const out: Array<{ label: string; highlight: boolean }> = [];
  for (const r of raw) {
    const tradeMatch = r.match(/^Trade match: (.+?) \(/);
    if (tradeMatch) {
      tradeMatch[1].split(',').map(k => k.trim().toUpperCase()).slice(0, 3).forEach(k => out.push({ label: `${k} — YOUR TRADE`, highlight: true }));
      continue;
    }
    const tradeTeaser = r.match(/^Trade teaser: (.+)/);
    if (tradeTeaser) {
      out.push({ label: tradeTeaser[1].toUpperCase(), highlight: false });
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

  // Enrich: replace generic "ELECTRICAL — YOUR TRADE" (paid) or "ELECTRICAL" teaser (preview) with specific job-type label
  if (title && trade) {
    const signals = TRADE_TITLE_SIGNALS[trade];
    if (signals) {
      const titleUpper = title.toUpperCase();
      const tradeGenerics = GENERIC_TRADE_LABELS[trade];
      // Teaser labels are the stem of each generic (e.g. "ELECTRICAL" from "ELECTRICAL — YOUR TRADE")
      const teaserGenerics = tradeGenerics ? new Set([...tradeGenerics].map(l => l.replace(' — YOUR TRADE', ''))) : undefined;
      for (const [keyword, specific] of signals) {
        if (!titleUpper.includes(keyword)) continue;
        const fullLabel = `${specific} — YOUR TRADE`;
        const genericIdx = out.findIndex(r =>
          (r.highlight && (tradeGenerics?.has(r.label) ?? false)) ||
          (!r.highlight && (teaserGenerics?.has(r.label) ?? false))
        );
        // When the mapping rewrites the keyword label (e.g. BOILER→BOILER WORK), we need to
        // remove the keyword's own scored/teaser entry so it doesn't coexist with fullLabel.
        const keywordFullLabel = `${keyword} — YOUR TRADE`;
        const removeKeywordLabel = keywordFullLabel !== fullLabel
          ? () => {
              for (let i = out.length - 1; i >= 0; i--) {
                if (out[i].label === keywordFullLabel || (!out[i].highlight && out[i].label === keyword)) out.splice(i, 1);
              }
            }
          : null;

        if (out.some(r => r.label === fullLabel)) {
          // Full "SPECIFIC — YOUR TRADE" already present — remove ALL remaining generics (scorer can emit several)
          for (let i = out.length - 1; i >= 0; i--) {
            if (out[i].label === fullLabel) continue;
            if (
              (out[i].highlight && (tradeGenerics?.has(out[i].label) ?? false)) ||
              (!out[i].highlight && (teaserGenerics?.has(out[i].label) ?? false))
            ) out.splice(i, 1);
          }
          const stemIdx = out.findIndex(r => !r.highlight && r.label === specific);
          if (stemIdx !== -1) out.splice(stemIdx, 1);
          removeKeywordLabel?.();
        } else if (genericIdx !== -1) {
          // Swap the first generic for the specific — only when scorer confirmed a trade match
          out[genericIdx] = { label: fullLabel, highlight: true };
          // Remove any remaining generic entries beyond the one already swapped
          for (let i = out.length - 1; i >= 0; i--) {
            if (out[i].label === fullLabel) continue;
            if (
              (out[i].highlight && (tradeGenerics?.has(out[i].label) ?? false)) ||
              (!out[i].highlight && (teaserGenerics?.has(out[i].label) ?? false))
            ) out.splice(i, 1);
          }
          const stemIdx = out.findIndex(r => !r.highlight && r.label === specific);
          if (stemIdx !== -1) out.splice(stemIdx, 1);
          removeKeywordLabel?.();
        }
        break;
      }
    }
  }

  return out.length > 0 ? out.slice(0, 5) : [{ label: 'Verified signal', highlight: false }];
}

const TITLE_KEYWORDS = [
  'EV CHARGER', 'EV CHARGING', 'REWIRE', 'CONSUMER UNIT', 'EICR',
  'BOILER', 'HEAT PUMP', 'BATHROOM', 'KITCHEN', 'EXTENSION',
  'LOFT CONVERSION', 'FLAT ROOF', 'SOLAR', 'SOLAR PV',
  'DAMP', 'PLASTERING', 'DECORATING', 'FENCING', 'CONSERVATORY',
  'DRAINAGE', 'GUTTERING', 'FLOORING', 'TILING', 'RETROFIT',
  'INSULATION', 'REWIRING', 'VENTILATION', 'GARAGE CONVERSION',
  'GARAGE', 'ROOFING', 'SCAFFOLDING', 'GROUNDWORK',
];

function extractTopJobTypes(leads: Lead[]): string[] {
  const counts: Record<string, number> = {};

  for (const lead of leads) {
    for (const r of lead.reasons ?? []) {
      const tradeMatch = r.match(/^Trade match: (.+?) \(/);
      if (tradeMatch) {
        tradeMatch[1].split(',').forEach(k => {
          const kw = k.trim().toUpperCase();
          if (kw) counts[kw] = (counts[kw] || 0) + 1;
        });
        continue;
      }
      const teaser = r.match(/^Trade teaser: (.+)/);
      if (teaser) {
        const kw = teaser[1].trim().toUpperCase();
        if (kw && kw !== 'URGENT TIMELINE' && kw !== 'COMMERCIAL JOB') {
          counts[kw] = (counts[kw] || 0) + 1;
        }
      }
    }
  }

  // If reasons gave us keywords, use them
  if (Object.keys(counts).length > 0) {
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .filter(([, count]) => count >= 1)
      .map(([kw, count]) => count > 1 ? `${kw} ×${count}` : kw);
  }

  // Fallback: extract from lead titles (free-tier users with generic reasons)
  for (const lead of leads) {
    const title = (lead.title ?? '').toUpperCase();
    for (const kw of TITLE_KEYWORDS) {
      if (title.includes(kw)) {
        counts[kw] = (counts[kw] || 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .filter(([, count]) => count >= 1)
    .map(([kw, count]) => count > 1 ? `${kw} ×${count}` : kw);
}

function deadlineCountdown(deadlineAt: string | undefined): { label: string; className: string } | null {
  if (!deadlineAt) return null;
  const ms = new Date(deadlineAt).getTime();
  if (isNaN(ms)) return null;
  const days = Math.floor((ms - Date.now()) / 86_400_000);
  if (days < 0 || days > 21) return null;
  if (days === 0) return { label: 'CLOSES TODAY', className: 'bg-[var(--orange)] text-white' };
  if (days <= 2) return { label: `CLOSES IN ${days}D`, className: 'bg-[var(--orange)] text-white' };
  if (days <= 7) return { label: `CLOSES IN ${days}D`, className: 'border-2 border-[var(--orange)] text-[var(--orange)]' };
  return { label: `CLOSES IN ${days}D`, className: 'bg-[var(--ink)] text-white' };
}

const TRADE_FRIENDLY: Record<string, string> = {
  electrical: 'Electrician',
  plumbing: 'Plumber / Gas',
  roofing: 'Roofer',
  building: 'Builder / General',
  carpentry: 'Carpenter / Joiner',
  painting: 'Decorator / Painter',
  hvac: 'Heating Engineer',
  landscaping: 'Landscaper',
};

function AlertQuickSetup({ trade, postcode }: { trade: Trade; postcode: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const outward = postcode.trim().split(' ')[0].toUpperCase();
  const tradeLabel = TRADE_FRIENDLY[trade] ?? trade;
  const mountedRef = React.useRef(true);
  React.useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  async function setup() {
    setState('sending');
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ trade, location: outward, postcode_outward: outward, frequency: 'weekly' }),
      });
      const data = await res.json();
      if (mountedRef.current) setState(data.ok ? 'done' : 'error');
    } catch {
      if (mountedRef.current) setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="border-2 border-[var(--green)] bg-[var(--green)]/10 p-3 text-sm font-black text-[var(--green)]">
        ✓ WEEKLY ALERT SET — we&apos;ll email when new {tradeLabel} leads appear near {outward}
      </div>
    );
  }

  return (
    <div className="border-2 border-[var(--navy)] bg-[var(--navy)] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-black text-[var(--yellow)] uppercase">Don&apos;t miss next week&apos;s leads</p>
        <p className="mt-0.5 text-sm font-black text-white">
          Get weekly email alerts for {tradeLabel} jobs near {outward} — free, no credit card
        </p>
        {state === 'error' && <p className="mt-1 text-xs font-black text-[var(--orange)]">Failed — sign in first or try again</p>}
      </div>
      <button
        type="button"
        disabled={state === 'sending'}
        onClick={() => void setup()}
        className="shrink-0 border-2 border-[var(--yellow)] bg-[var(--yellow)] px-4 py-2 text-xs font-black uppercase text-[var(--ink)] hover:opacity-90 transition disabled:opacity-50"
      >
        {state === 'sending' ? 'SETTING UP…' : 'GET WEEKLY ALERTS →'}
      </button>
    </div>
  );
}

function SourceHealthStrip({ sources }: { sources?: LeadSearchResponse['sources'] }) {
  if (!sources) return null;
  const HIDE = new Set(['LandRegistry', 'CharityCommission', 'ForestryCommission']);
  const filtered = Object.entries(sources).filter(([name]) => !HIDE.has(name));
  if (filtered.length === 0) return null;
  return (
    <div className="jf-box bg-white p-3">
      <p className="micro-label text-[var(--muted)] text-[10px] mb-2">SOURCES THIS SCAN</p>
      <div className="flex flex-wrap gap-2">
        {filtered.map(([name, stats]) => {
          const live = (stats.passed ?? 0) > 0;
          const failed = stats.failed;
          const icon = failed ? '✗' : live ? '✓' : '—';
          const cls = failed
            ? 'border-[var(--orange)] bg-[var(--orange)]/10 text-[var(--orange)]'
            : live
              ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]'
              : 'border-[var(--line)] bg-[var(--bg-main)] text-[var(--muted)]';
          return (
            <span key={name} className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-black uppercase ${cls}`}>
              <span>{icon}</span>
              {formatSourceLabel(name)}
              {live && <span className="opacity-60">×{stats.passed}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function getBestSource(sources?: LeadSearchResponse['sources']): string {
  if (!sources) return '';
  let best = '';
  let bestPassed = -1;
  for (const [source, stats] of Object.entries(sources)) {
    const passed = stats.passed ?? 0;
    if (passed > bestPassed) {
      best = source;
      bestPassed = passed;
    }
  }
  return bestPassed > 0 ? `${formatSourceLabel(best)} (${bestPassed})` : '';
}

function getSourceMix(sources?: LeadSearchResponse['sources']): string {
  if (!sources) return '';
  return Object.entries(sources)
    .map(([source, stats]) => [source, stats.passed ?? 0] as const)
    .filter(([, passed]) => passed > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([source, passed]) => `${formatSourceLabel(source)} ×${passed}`)
    .join(' · ');
}

function LeadResultCard({ lead, onWhatsapp, whatsappSent, isTracked, onTrack, isOwner, scanTrade }: { key?: string; lead: Lead; onWhatsapp: () => void; whatsappSent: boolean; isTracked: boolean; onTrack: () => void; isOwner?: boolean; scanTrade?: string }) {
  const rawReasons = lead.reasons?.length ? lead.reasons : [];
  // Use the user's requested scan trade rather than lead.trade — the engine can tag a lead with a
  // related trade (e.g. hvac) while still scoring it against the electrical scan trade.
  const parsedReasons = parseTradeReasons(rawReasons, lead.title, scanTrade ?? lead.trade as string);
  const cardOpenAccess = OPEN_ACCESS || hasDevUnlock() || !!isOwner;
  const [showScoreReasons, setShowScoreReasons] = useState(false);
  const deadline = deadlineCountdown(lead.deadlineAt);
  const rawOutward = lead.postcodeOutward || 'Unknown';
  // Some sources store NUTS region codes (e.g. "UKM") instead of postcode outward codes — not useful to show.
  const isNutsCode = /^UK[A-Z0-9]{0,3}$/.test(rawOutward);
  const outward = isNutsCode ? (lead.location || 'Unknown') : rawOutward;
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
  const decision = lead.decision ?? (isGold ? 'BID' : isSilver ? 'WATCH' : lead.score >= 30 ? 'WATCH' : 'SKIP');
  const isCompaniesHouse = lead.source === 'CompaniesHouse';
  const isNew = lead.publishedAt && isNewLead(lead.publishedAt);

  // Color-coded score badge
  const scoreBadgeClass = isGold
    ? 'bg-[var(--yellow)] text-[var(--ink)]'
    : isSilver
      ? 'bg-white text-[var(--ink)]'
      : 'bg-[var(--muted)]/15 text-[var(--muted)]';

  return (
    <article className="jf-box bg-white overflow-hidden">
      {/* ── Deadline countdown bar (any lead with close date) ── */}
      {deadline && (
        <div className={`flex items-center gap-2 border-b-2 border-[var(--line)] px-4 py-2 ${deadline.className}`}>
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider">{deadline.label}</span>
        </div>
      )}
      {/* ── First-mover urgency bar (GOLD only) ── */}
      {isGold && lead.publishedAt && (
        <div className="flex items-center justify-between border-b-2 border-[var(--yellow)] bg-[var(--yellow)]/10 px-4 py-2">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[var(--ink)]" />
            <span className="text-xs font-black uppercase tracking-wider text-[var(--ink)]">
              Detected {timeAgoShort(lead.publishedAt)} — first mover window open
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-[var(--orange)]">GOLD LEAD</span>
        </div>
      )}
      <div className="grid gap-4 p-4 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_260px]">
      {/* Enhanced score badge with color coding */}
      <div className="flex flex-col items-center gap-1">
        <div className={`grid place-items-center border-2 border-[var(--line)] ${scoreBadgeClass} h-20 w-20`}>
          <div className="flex flex-col items-center">
            <span className="headline leading-none text-xl">{decision}</span>
            <span className="text-[10px] font-black uppercase">SCORE {lead.score}</span>
          </div>
        </div>
        {lead.qualityLabel && (
          <span className="px-2 py-0.5 text-[10px] font-black border border-[var(--navy)] bg-[var(--ink)] text-[var(--yellow)]">{lead.qualityLabel} · {lead.scoringPolicyVersion ?? 'CURRENT'}</span>
        )}
        {rawReasons.length > 0 && (
          <button
            type="button"
            onClick={() => setShowScoreReasons(v => !v)}
            className="mt-1 px-1.5 py-0.5 text-[9px] font-black uppercase border border-[var(--line)] bg-[var(--bg-main)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
          >
            {showScoreReasons ? 'HIDE' : 'WHY?'}
          </button>
        )}
        {showScoreReasons && (
          <div className="mt-2 w-36 border border-[var(--line)] bg-[var(--bg-main)] p-2">
            <ul className="grid gap-0.5">
              {parsedReasons.map((r, i) => (
                <li key={i} className={`text-[9px] font-black leading-tight ${r.highlight ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{r.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {isCompaniesHouse ? <CompaniesHouseSourceBadge title={lead.title} /> : <Tag label={tierLabel(lead.score)} />}
          {lead.source && !isCompaniesHouse && (
            <span className="inline-flex items-center gap-1 border-2 border-[var(--line)] bg-white px-2 py-1 text-xs font-black uppercase">
              {getSourceIcon(lead.source)}
              {formatSourceLabel(lead.source)}
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
          {lead.isCommercial && lead.projectScale === 'large' && (
            <span className="inline-flex items-center gap-1 border-2 border-[var(--ink)] bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--ink)]">
              LARGE PROJECT
            </span>
          )}
          <LeadReadinessBadge level={lead.leadReadiness ?? lead.readiness ?? (lead.score >= 85 ? 'READY' : lead.score >= 60 ? 'MAYBE' : 'WASTE')} size="sm" />
        </div>
        {isCompaniesHouse && (
          <p className="mt-2 text-sm font-black text-[var(--green)]">
            New business {distLabel} — commercial fit-out likely
          </p>
        )}
        {lead.isCommercial && lead.projectScale === 'large' && (
          <p className="mt-2 text-sm font-black text-[var(--ink)]">
            Large commercial job — likely needs multiple trades on site
          </p>
        )}
        <h2 className="mt-3 text-2xl font-black leading-tight">{lead.title}</h2>
        {!OPEN_ACCESS && (
          <div className="mt-3 lg:hidden grid gap-1">
            <Link href="/pricing" className="flex items-center justify-center gap-2 border-2 border-[var(--ink)] bg-[var(--yellow)] px-4 py-2 text-sm font-black text-[var(--ink)] uppercase hover:opacity-80 transition">
              UNLOCK FULL LEAD →
            </Link>
            <p className="text-center text-xs font-black text-[var(--muted)]">Public tender · access is not exclusive</p>
          </div>
        )}
        {(lead.whyThisIsAJob || lead.contactPath?.reason) && (
          <div className="mt-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
            {lead.whyThisIsAJob && (
              <>
                <p className="micro-label text-[var(--ink)]">WHY THIS IS A JOB</p>
                <p className="mt-1 text-sm font-black text-[var(--ink)]">{lead.whyThisIsAJob}</p>
              </>
            )}
            {lead.contactPath?.reason && (
              <p className="mt-2 text-xs font-black uppercase text-[var(--muted)]">
                Best approach: {lead.contactPath.recommendedChannel.replace(/_/g, ' ')}
              </p>
            )}
          </div>
        )}
        {typeof lead.evidenceCount === 'number' && (
          <p className="mt-2 text-xs font-black uppercase tracking-widest text-[var(--muted)]">
            {lead.evidenceCount} verified signal{lead.evidenceCount === 1 ? '' : 's'} backing this lead
          </p>
        )}
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
        {lead.evidenceBadges && lead.evidenceBadges.length > 0 && (
          <div className="mt-2">
            <TrustBadges badges={lead.evidenceBadges} max={3} />
          </div>
        )}
        <BuyerActionPack lead={lead} unlocked={cardOpenAccess} />
      </div>
      <div className="grid gap-3 md:self-start">
        <LockedValue label="Buyer" value={lead.buyer} devUnlocked={cardOpenAccess} showCta valueBand={lead.estimatedValue} />
        <LockedValue label="Deadline" value={lead.deadlineAt ? new Date(lead.deadlineAt).toLocaleDateString('en-GB') : undefined} devUnlocked={cardOpenAccess} />
        <LockedValue label="Source URL" value={lead.url || undefined} isLink href={lead.url} devUnlocked={cardOpenAccess} />
        {cardOpenAccess ? (
          <>
            {isTracked ? (
              <button className="jf-button w-full bg-[var(--navy)] text-white opacity-70 cursor-default" disabled>
                ALREADY TRACKING
              </button>
            ) : (
              <button className="jf-button w-full bg-[var(--ink)] text-white text-xs" onClick={onTrack}>
                TRACK THIS LEAD
              </button>
            )}
            {isGold ? (
              <button className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)]" onClick={onWhatsapp} disabled={whatsappSent}>
                {whatsappSent ? 'SENT TO WHATSAPP' : 'SEND TO WHATSAPP'}
              </button>
            ) : (
              <button className="jf-button w-full bg-[var(--navy)] text-white" onClick={onWhatsapp} disabled={whatsappSent}>{whatsappSent ? 'SENT' : 'SEND TO WHATSAPP'}</button>
            )}
          </>
        ) : (
          <div className="hidden lg:grid gap-1">
            <Link href="/pricing" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)]">
              UNLOCK FULL LEAD →
            </Link>
            <p className="text-center text-xs font-black text-[var(--muted)]">Public tender · access is not exclusive</p>
          </div>
        )}
        <QuickResponseKit
          leadId={lead.id}
          trade={String(lead.trade || lead.tradeMatch || 'job')}
          area={lead.location || outward}
          score={lead.score}
          publishedAt={lead.publishedAt}
          unlocked={cardOpenAccess}
          title={lead.title}
          estimatedValue={String(lead.estimatedValue || '')}
          contactSignal={lead.contactSignal}
          url={lead.url}
          phone={lead.buyerPhone}
        />
        {cardOpenAccess && <OutcomeActions lead={lead} />}
      </div>
      </div>
    </article>
  );
}

function OutcomeActions({ lead }: { lead: Lead }) {
  const [busy, setBusy] = useState('');
  const [showWonCapture, setShowWonCapture] = useState(false);
  const [wonValueInput, setWonValueInput] = useState('');
  const [done, setDone] = useState('');

  async function report(status: 'contacted' | 'no_answer' | 'quoted' | 'lost', value?: number) {
    setBusy(status);
    try {
      await fetch('/api/leads/outcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          status,
          title: lead.title,
          trade: lead.trade,
          location: lead.location,
          postcodeOutward: lead.postcodeOutward,
          source: lead.source,
          score: lead.score,
          scoreReasonsAtDelivery: lead.reasons ?? [],
          contactPathUsed: lead.contactPath?.recommendedChannel,
          ...(value !== undefined ? { wonValue: value } : {}),
        }),
      });
      setDone(status);
    } finally {
      setBusy('');
    }
  }

  async function confirmWon() {
    const parsedValue = parseInt(wonValueInput.replace(/[^0-9]/g, ''), 10) || 0;
    setBusy('won');
    markWon({
      leadId: lead.id,
      title: lead.title ?? 'Job',
      trade: String(lead.trade ?? 'building'),
      location: lead.location ?? lead.postcodeOutward ?? '',
      value: parsedValue,
      estimatedValue: lead.estimatedValue,
      source: 'chase',
    });
    try {
      await fetch('/api/leads/outcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          status: 'won',
          title: lead.title,
          trade: lead.trade,
          location: lead.location,
          postcodeOutward: lead.postcodeOutward,
          source: lead.source,
          score: lead.score,
          scoreReasonsAtDelivery: lead.reasons ?? [],
          wonValue: parsedValue > 0 ? parsedValue : undefined,
        }),
      });
    } catch {}
    setBusy('');
    setShowWonCapture(false);
    setDone('won');
  }

  if (done === 'won') {
    return (
      <div className="border-2 border-[var(--green)] bg-[var(--green)]/10 px-3 py-2 text-center">
        <p className="text-[10px] font-black uppercase text-[var(--green)]">WIN LOGGED{wonValueInput ? ` — £${parseInt(wonValueInput.replace(/[^0-9]/g, ''), 10).toLocaleString()}` : ''}</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] px-3 py-2 text-center">
        <p className="text-[10px] font-black uppercase text-[var(--muted)]">{done.replace('_', ' ')} logged</p>
      </div>
    );
  }

  if (showWonCapture) {
    return (
      <div className="border-2 border-[var(--green)] bg-[var(--green)]/5 p-3 grid gap-2">
        <p className="text-[10px] font-black uppercase text-[var(--green)]">What did you win it for?</p>
        <div className="flex items-center gap-1">
          <span className="text-sm font-black text-[var(--ink)]">£</span>
          <input
            type="number"
            placeholder="0"
            value={wonValueInput}
            onChange={e => setWonValueInput(e.target.value)}
            className="w-full border-2 border-[var(--line)] px-2 py-1 text-sm font-black focus:outline-none focus:border-[var(--green)]"
          />
        </div>
        <div className="flex gap-1">
          <button className="flex-1 border-2 border-[var(--green)] bg-[var(--green)] px-2 py-1.5 text-[10px] font-black uppercase text-white" disabled={Boolean(busy)} onClick={() => void confirmWon()}>
            {busy === 'won' ? '...' : 'LOG WIN'}
          </button>
          <button className="border-2 border-[var(--line)] bg-white px-2 py-1.5 text-[10px] font-black uppercase" onClick={() => setShowWonCapture(false)}>SKIP</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-1">
      <button className="border-2 border-[var(--line)] bg-white px-2 py-2 text-[10px] font-black uppercase" disabled={Boolean(busy)} onClick={() => void report('contacted')}>I called</button>
      <button className="border-2 border-[var(--line)] bg-white px-2 py-2 text-[10px] font-black uppercase" disabled={Boolean(busy)} onClick={() => void report('no_answer')}>No answer</button>
      <button className="border-2 border-[var(--line)] bg-white px-2 py-2 text-[10px] font-black uppercase" disabled={Boolean(busy)} onClick={() => void report('quoted')}>Quoted</button>
      <button className="border-2 border-[var(--green)] bg-[var(--green)] px-2 py-2 text-[10px] font-black uppercase text-white" disabled={Boolean(busy)} onClick={() => setShowWonCapture(true)}>Won ★</button>
      <button className="col-span-2 border-2 border-[var(--line)] bg-[var(--ink)] px-2 py-2 text-[10px] font-black uppercase text-white" disabled={Boolean(busy)} onClick={() => void report('lost')}>Lost</button>
    </div>
  );
}

function BuyerActionPack({ lead, unlocked }: { lead: Lead; unlocked: boolean }) {
  return <LeadValueKit lead={lead} unlocked={unlocked} />;
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
      <span className="badge bg-[#2d7a4f] text-white font-black text-xs px-2 py-1">ENERGY</span>
      {rating && (
        <span className={`badge font-black text-xs px-2 py-1 ${ratingColour}`}>{rating}</span>
      )}
    </span>
  );
}

function CompaniesHouseSourceBadge({ title }: { title: string }) {
  const isFitOut = /restaurant|hotel|retail|tech company|office|fit.out|opening/i.test(title);
  const isContractor = /contractor|plumbing|electrical|building|carpentry|painting|roofing|hvac/i.test(title);
  const label = isFitOut ? 'NEW BUSINESS' : isContractor ? 'NEW FIRM' : 'BUSINESS SIGNAL';

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
        <p className="font-black text-[var(--navy)] text-sm">Alert delivery is available only after the selected provider and account configuration have been verified.</p>
        <Link className="jf-button mt-3 inline-block bg-[var(--navy)] text-white text-sm" href="/pricing">
          CHECK ALERT CONFIGURATION & PRICING
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
      <Link className="jf-button mt-4 bg-[var(--ink)] text-white text-sm" href={`/find-jobs?trade=${encodeURIComponent(adjacentTrade)}`}>
        SCAN {adjacentTrade.toUpperCase()} JOBS IN THIS AREA →
      </Link>
    </section>
  );
}

function LockedValue({ label, value, isLink, href, devUnlocked = false, showCta = false, valueBand }: { label: string; value: string | undefined; isLink?: boolean; href?: string; devUnlocked?: boolean; showCta?: boolean; valueBand?: string }) {
  if (!value) {
    if (devUnlocked) {
      const placeholder = label === 'Source URL' ? 'No source URL returned in preview payload' : `${label} not returned in preview payload`;
      return (
        <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
          <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
          <p className="mt-1 font-black text-[var(--ink)] text-sm">{placeholder}</p>
        </div>
      );
    }
    return (
      <div className="border-2 border-[var(--ink)] bg-[var(--ink)] p-3">
        <div className="flex items-center gap-2">
          <Lock size={12} strokeWidth={3} className="text-[var(--yellow)] shrink-0" />
          <p className="micro-label text-[10px] text-[var(--yellow)]">{label} — FULL ACCESS</p>
        </div>
        {showCta && (
          <>
            <p className="mt-2 text-sm font-black text-white">
              {valueBand ? `This job: ${valueBand} — see buyer details to quote direct.` : 'Buyer name + contact — upgrade to call direct.'}
            </p>
            <Link href="/pricing" className="mt-2 inline-block border border-[var(--yellow)] bg-[var(--yellow)] px-3 py-1 text-xs font-black text-[var(--ink)] hover:opacity-90">
              SEE BUYER DETAILS — £39/MO →
            </Link>
          </>
        )}
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
  if (!value) return 'See quote floor →';
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
