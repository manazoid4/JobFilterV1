"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAuth } from '../components/AuthProvider';
import { addNudgeEvent, getChaseLeads, snoozeChaseLead, updateChaseStage } from '../lib/chaseStore';
import { getStoredLeads } from '../lib/leadStore';
import { MESSAGE_TEMPLATES, fillTemplate } from '../lib/chaseTemplates';
import { ROITracker } from '../components/ROITracker';
import { generateReviewMessage, getLostReasonBreakdown, getMonthlyStats, getValueAccuracy, getWinBreakdown, getWinData, markReviewSent } from '../lib/winStore';
import type { ChaseLead, LostReason, WinJob } from '../lib/types';

const TRADES = [
  { value: 'electrical', label: 'Electrician' },
  { value: 'plumbing', label: 'Plumber / Gas' },
  { value: 'roofing', label: 'Roofer' },
  { value: 'building', label: 'Builder / General' },
  { value: 'carpentry', label: 'Carpenter / Joiner' },
  { value: 'painting', label: 'Decorator / Painter' },
  { value: 'hvac', label: 'Heating Engineer' },
  { value: 'landscaping', label: 'Landscaper' },
];
const FREQ_OPTIONS = [
  { value: 'weekly', label: 'WEEKLY' },
  { value: 'daily', label: 'DAILY' },
  { value: 'instant', label: 'HOURLY SOURCE CHECK' },
];

type ActiveAlert = { id: string; trade: string; postcode_outward: string; radius_miles: number; frequency: string; active: boolean };

function AlertSetupWidget({ scanTrade, scanPostcode }: { scanTrade: string | null; scanPostcode: string | null }) {
  const [trade, setTrade] = useState(scanTrade ?? 'electrical');
  const [postcode, setPostcode] = useState(scanPostcode?.split(' ')[0] ?? '');
  const [frequency, setFrequency] = useState<'weekly' | 'daily' | 'instant'>('weekly');
  const [radiusMiles, setRadiusMiles] = useState(25);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);
  const [loaded, setLoaded] = useState(false);
  const mountedRef = React.useRef(true);

  React.useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  // Sync pre-fill from parent once props resolve from localStorage
  useEffect(() => {
    if (scanPostcode && !postcode) setPostcode(scanPostcode.split(' ')[0]);
  }, [scanPostcode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scanTrade) setTrade(scanTrade);
  }, [scanTrade]);

  function loadAlerts() {
    const controller = new AbortController();
    fetch('/api/alerts', { credentials: 'include', signal: controller.signal })
      .then(r => r.ok ? r.json() : { alerts: [] })
      .then(d => { if (mountedRef.current) { setActiveAlerts(d.alerts ?? []); setLoaded(true); } })
      .catch(() => { if (mountedRef.current) setLoaded(true); });
    return controller;
  }

  useEffect(() => {
    const ctrl = loadAlerts();
    return () => ctrl.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!postcode.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ trade, location: postcode.trim().toUpperCase(), postcode_outward: postcode.trim().toUpperCase(), frequency, radius_miles: radiusMiles }),
      });
      const data = await res.json();
      if (!mountedRef.current) return;
      if (data.ok) {
        setStatus('done');
        loadAlerts();
        setTimeout(() => { if (mountedRef.current) setStatus('idle'); }, 3000);
      } else {
        if (mountedRef.current) setErrorMsg(data.error || '');
        setStatus('error');
      }
    } catch {
      if (mountedRef.current) { setErrorMsg(''); setStatus('error'); }
    }
  }

  async function updateAlert(id: string, update: Record<string, unknown>) {
    setStatus('sending');
    const response = await fetch('/api/alerts', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ id, ...update }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setErrorMsg(payload.error || 'Could not update alert');
      setStatus('error');
      return;
    }
    setStatus('done');
    loadAlerts();
  }

  async function deleteAlert(id: string) {
    setStatus('sending');
    const response = await fetch(`/api/alerts?id=${encodeURIComponent(id)}`, { method: 'DELETE', credentials: 'include' });
    if (!response.ok) {
      setStatus('error');
      setErrorMsg('Could not delete alert');
      return;
    }
    setStatus('done');
    loadAlerts();
  }

  return (
    <section className="jf-box bg-white p-5">
      <p className="micro-label text-[var(--muted)]">OPPORTUNITY ALERTS</p>
      <h2 className="headline mt-1 text-2xl leading-none">WATCH FOR MATCHING PUBLIC OPPORTUNITIES</h2>
      <p className="mt-2 text-sm font-bold text-[var(--muted)]">
        Save a trade, outward postcode, radius and preferred check frequency. Alerts report matching public notices when configured; availability and delivery depend on the current source and account setup.
      </p>

      <form onSubmit={e => void create(e)} className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto] md:items-end">
        <label className="field-label">
          Trade
          <select value={trade} onChange={e => setTrade(e.target.value)} className="field-input">
            {TRADES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
        <label className="field-label">
          Radius
          <select value={radiusMiles} onChange={e => setRadiusMiles(Number(e.target.value))} className="field-input">
            {[5, 10, 15, 25, 50, 100].map(radius => <option key={radius} value={radius}>{radius} miles</option>)}
          </select>
        </label>
        <label className="field-label">
          Your area
          <input value={postcode} onChange={e => setPostcode(e.target.value.toUpperCase())} placeholder="B14" className="field-input" maxLength={6} />
        </label>
        <label className="field-label">
          Frequency
          <select value={frequency} onChange={e => setFrequency(e.target.value as typeof frequency)} className="field-input">
            {FREQ_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <button disabled={status === 'sending'} className="jf-button bg-[var(--yellow)] text-[var(--ink)] self-end disabled:opacity-50">
          {status === 'sending' ? 'SAVING…' : status === 'done' ? 'SAVED ✓' : 'SET ALERT'}
        </button>
      </form>

      {status === 'error' && (
        <p role="alert" className="mt-2 text-xs font-black text-[var(--orange)]">{errorMsg || 'Failed — check you are logged in and try again'}</p>
      )}
      <p aria-live="polite" className="sr-only">{status === 'done' ? 'Alert settings saved' : status === 'sending' ? 'Saving alert settings' : ''}</p>

      {loaded && activeAlerts.length > 0 && (
        <div className="mt-4 border-t-2 border-[var(--line)] pt-3">
          <p className="micro-label text-[var(--muted)] text-[10px] mb-2">YOUR ALERTS</p>
          <div className="grid gap-2">
            {activeAlerts.map(a => (
              <div key={a.id} className={`flex flex-wrap items-center justify-between gap-2 border-2 border-[var(--line)] p-2 text-xs font-black uppercase ${a.active ? 'bg-[var(--bg-main)]' : 'bg-white text-[var(--muted)]'}`}>
                <span>
                  {a.active ? 'Active' : 'Paused'} · {TRADES.find(t => t.value === a.trade)?.label ?? a.trade} · {a.postcode_outward} · {a.radius_miles ?? 25}mi · {a.frequency === 'instant' ? 'Hourly check' : a.frequency}
                </span>
                <span className="flex gap-2">
                  <button type="button" onClick={() => void updateAlert(a.id, { active: !a.active })} className="underline underline-offset-2" aria-label={`${a.active ? 'Pause' : 'Resume'} ${a.trade} alert for ${a.postcode_outward}`}>
                    {a.active ? 'Pause' : 'Resume'}
                  </button>
                  <button type="button" onClick={() => void deleteAlert(a.id)} className="text-[var(--orange)] underline underline-offset-2" aria-label={`Delete ${a.trade} alert for ${a.postcode_outward}`}>
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const LOST_REASON_TIPS: Record<LostReason, string> = {
  price: 'Review the award criteria and the pricing evidence you had before deciding whether a similar opportunity deserves another bid.',
  timing: 'Record whether the deadline or delivery capacity made this opportunity unsuitable so future qualification can flag the same constraint.',
  competition: 'Use published award information and incumbent history, where available, to sharpen the next decision.',
  not_interested: 'Record why the opportunity stopped fitting your firm so similar notices can be qualified more accurately.',
  went_elsewhere: 'Review the award notice or buyer feedback when available, then record what changed the outcome.',
  other: 'Keep logging the reason behind each outcome — more decision evidence makes the next review more useful.',
};

export function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const isWelcome = searchParams?.get('welcome') === '1';

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [authLoading, user, router]);
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0 });
  const [winData, setWinData] = useState({ wins: 0, losses: 0 });
  const [totalValueAllTime, setTotalValueAllTime] = useState(0);
  const [breakdown, setBreakdown] = useState<ReturnType<typeof getWinBreakdown>>({ byTrade: [], byLocation: [], bySource: [] });
  const [lostBreakdown, setLostBreakdown] = useState<ReturnType<typeof getLostReasonBreakdown>>([]);
  const [valueAccuracy, setValueAccuracy] = useState<ReturnType<typeof getValueAccuracy>>(null);
  const [scanTrade, setScanTrade] = useState<string | null>(null);
  const [scanPostcode, setScanPostcode] = useState<string | null>(null);
  const [scansUsed, setScansUsed] = useState(0);
  const [trackedLeadCount, setTrackedLeadCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const [reviewNudges, setReviewNudges] = useState<WinJob[]>([]);
  const [dismissedReviews, setDismissedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const cl = getChaseLeads();
    setChaseLeads(cl);
    const ms = getMonthlyStats();
    setMonthlyStats(ms);
    const wd = getWinData();
    setWinData({ wins: wd.wins.length, losses: wd.losses.length });
    setTotalValueAllTime(wd.wins.reduce((s, w) => s + w.value, 0));
    setBreakdown(getWinBreakdown());
    setLostBreakdown(getLostReasonBreakdown());
    setValueAccuracy(getValueAccuracy());
    setScanTrade((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.trade'));
    setScanPostcode((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.postcode'));
    setScansUsed(Number((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jf-weekly-scans-used')) || 0);
    const tracked = JSON.parse((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.find.tracked') || '[]') as string[];
    setTrackedLeadCount(tracked.length);
    // Check paid status for ROI Tracker gating
    fetch('/api/leads/roi-stats', { credentials: 'include' })
      .then((r) => { if (r.status === 200 || r.status === 503) setIsPaid(true); })
      .catch(() => {});
    setWelcomeDismissed((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jf-welcome-seen') === '1');
    const now = Date.now();
    const nudges = wd.wins.filter((w) => {
      if (w.reviewMessageSent) return false;
      const age = now - new Date(w.wonAt).getTime();
      return age >= 24 * 60 * 60 * 1000 && age <= 7 * 24 * 60 * 60 * 1000;
    }).slice(0, 2);
    setReviewNudges(nudges);
  }, []);

  const activeChase = chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length;
  const chaseWons = chaseLeads.filter((l) => l.stage === 'won').length;
  const chaseLosts = chaseLeads.filter((l) => l.stage === 'lost').length;
  const winRate = chaseWons + chaseLosts > 0
    ? Math.round((chaseWons / (chaseWons + chaseLosts)) * 100)
    : null;
  const overdueLeads = chaseLeads.filter((l) => l.nextNudgeAt && new Date(l.nextNudgeAt).getTime() < Date.now() && l.stage !== 'won' && l.stage !== 'lost');
  const overdueCount = overdueLeads.length;
  const notContacted = chaseLeads.filter((l) => l.stage === 'not_contacted').length;
  const isEmpty = activeChase === 0 && monthlyStats.count === 0 && winData.wins === 0;

  function handleSnooze(leadId: string) {
    snoozeChaseLead(leadId);
    setChaseLeads(getChaseLeads());
  }

  function handleSendNudge(lead: ChaseLead) {
    const templateKey = lead.stage === 'not_contacted' && lead.nudges.length === 0
      ? 'first_touch_2h'
      : lead.nudges.length >= 2
      ? 'final_nudge_48h'
      : 'follow_up_24h';
    const template = MESSAGE_TEMPLATES.find((t) => t.key === templateKey)!;
    const message = fillTemplate(template, { job_type: lead.trade, area: lead.location });

    const storedLead = getStoredLeads().find((l) => l.id === lead.leadId);
    const phone = storedLead?.phone
      ? storedLead.phone.replace(/\D/g, '').replace(/^0/, '44').replace(/^\+/, '')
      : '';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

    if (lead.stage === 'not_contacted') {
      updateChaseStage(lead.leadId, 'contacted');
    }
    addNudgeEvent(lead.leadId, {
      id: `nudge-${Date.now()}`,
      stage: lead.stage,
      templateKey: template.key,
      message,
      sentAt: new Date().toISOString(),
      channel: 'whatsapp',
    });
    setChaseLeads(getChaseLeads());
  }

  if (authLoading || !user) return <main className="page-shell py-16" />;

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      {/* Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">PUBLIC-WORKS DECISION TRACKER</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">YOUR OPPORTUNITIES. YOUR DECISIONS.</h1>
        <p className="mt-3 max-w-2xl font-bold text-white/90">
          Review current public Find a Tender notices against your firm. Track BID, WATCH, SUBCONTRACT or SKIP decisions, the evidence behind them, and eventual outcomes.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 border-2 border-white/20 bg-white/10 px-3 py-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--green)]" />
            <span className="font-mono text-xs font-black uppercase text-white/80">
              FIND A TENDER: FREE + PUBLIC
            </span>
          </div>
          <p className="text-sm font-bold text-[var(--yellow)]">
            JobFilter adds firm-aware qualification and workflow. It does not provide exclusive or early access to public notices.
          </p>
        </div>
      </section>

      {/* Welcome banner — shown once after successful checkout */}
      {isWelcome && !welcomeDismissed && (
        <section className="jf-box border-2 border-[var(--yellow)] bg-[var(--yellow)] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="micro-label text-[var(--ink)]">SUBSCRIPTION ACTIVE — YOU&apos;RE IN</p>
              <h2 className="headline mt-1 text-2xl leading-none text-[var(--ink)] sm:text-3xl">HERE&apos;S WHAT TO DO NOW.</h2>
            </div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") localStorage.setItem('jf-welcome-seen', '1');
                setWelcomeDismissed(true);
              }}
              className="shrink-0 text-xs font-black text-[var(--ink)]/50 underline underline-offset-2 mt-1"
            >
              DISMISS
            </button>
          </div>
          <ol className="mt-4 grid gap-3">
            <li className="flex items-start gap-3 border-2 border-[var(--ink)] bg-white p-3">
              <span className="shrink-0 font-mono text-xs font-black bg-[var(--ink)] text-white px-1.5 py-0.5">01</span>
              <div className="min-w-0">
                <p className="font-black text-[var(--ink)] text-sm">CHECK CURRENT COVERAGE</p>
                <p className="text-xs font-black text-[var(--ink)]/60 mt-0.5">Enter your service and area to review current Find a Tender notices. Sparse or empty results are valid.</p>
                <Link href="/find-jobs" className="mt-2 inline-block jf-button bg-[var(--ink)] text-white text-xs py-1 px-2">SCAN NOW →</Link>
              </div>
            </li>
            <li className="flex items-start gap-3 border-2 border-[var(--ink)] bg-white p-3">
              <span className="shrink-0 font-mono text-xs font-black bg-[var(--ink)] text-white px-1.5 py-0.5">02</span>
              <div className="min-w-0">
                <p className="font-black text-[var(--ink)] text-sm">TRACK A DECISION</p>
                <p className="text-xs font-black text-[var(--ink)]/60 mt-0.5">Record BID, WATCH, SUBCONTRACT or SKIP with the fit evidence and requirement gaps.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 border-2 border-[var(--ink)] bg-white p-3">
              <span className="shrink-0 font-mono text-xs font-black bg-[var(--ink)] text-white px-1.5 py-0.5">03</span>
              <div className="min-w-0">
                <p className="font-black text-[var(--ink)] text-sm">VERIFY THE OFFICIAL ROUTE</p>
                <p className="text-xs font-black text-[var(--ink)]/60 mt-0.5">Open the public notice and confirm requirements, deadline and response route before acting.</p>
              </div>
            </li>
          </ol>
        </section>
      )}

      {isEmpty && (
        <div className="jf-box border-2 border-[var(--orange)] bg-[var(--orange)]/5 p-8 text-center">
          <p className="micro-label text-[var(--orange)]">NO OPPORTUNITIES TRACKED YET</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">CHECK THE CURRENT PUBLIC FEED.</h2>
          <p className="mt-3 max-w-lg mx-auto font-bold text-[var(--ink)]/80 text-sm">
            Find a Tender is free and public. JobFilter helps you qualify what fits; it does not promise opportunity volume, awards or early access.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">CHECK FIND A TENDER →</Link>
            <Link href="/methodology" className="jf-button bg-[var(--navy)] text-white">SEE THE METHOD →</Link>
            <Link href="/pricing" className="jf-button bg-white text-[var(--ink)] border-2 border-[var(--ink)]">SEE PILOT PRICING →</Link>
          </div>
          <p className="mt-3 text-xs font-black text-[var(--ink)]/50">No card required for the current-coverage check.</p>
        </div>
      )}

      {/* Pipeline Visual */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {isEmpty ? (
            <Link href="/find-jobs" className="block border-2 border-[var(--ink)] bg-white p-5 hover:bg-[var(--yellow)] transition shadow-[4px_4px_0_var(--ink)]">
              <p className="micro-label text-[var(--ink)]">SCAN NOW →</p>
              <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">SCAN</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Current Find a Tender notices</p>
            </Link>
          ) : (
            <div className="border-2 border-[var(--ink)] bg-white p-5">
              <p className="micro-label text-[var(--ink)]">LAST SCAN</p>
              <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">
                {scansUsed > 0 ? scansUsed : '—'}
              </p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]">
                {scanTrade && scanPostcode ? `${TRADES.find(t => t.value === scanTrade)?.label ?? scanTrade} · ${scanPostcode}` : 'scans this week'}
              </p>
              <Link href="/find-jobs" className="mt-2 block text-xs font-black text-[var(--ink)] underline underline-offset-2">
                SCAN AGAIN →
              </Link>
            </div>
          )}
          <Link href="/leads" className="block border-2 border-[var(--ink)] bg-white p-5 relative hover:bg-[var(--offwhite)] transition" style={{ borderLeftColor: 'var(--orange)', borderLeftWidth: '4px' }}>
            <p className="micro-label text-[var(--muted)]">TRACKING</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">{activeChase}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {activeChase === 0 ? 'Scan first, then tap TRACK THIS LEAD to start your job list' : 'jobs you are tracking'}
            </p>
            <p className="mt-2 text-xs font-black text-[var(--navy)] underline underline-offset-2">View your jobs →</p>
            {overdueCount > 0 && (
              <span className="absolute top-3 right-3 badge bg-[var(--orange)] text-white text-[10px] font-black">{overdueCount} OVERDUE</span>
            )}
          </Link>
          <Link href="/leads" className="block border-2 border-[var(--ink)] bg-white p-5 relative hover:bg-[var(--offwhite)] transition" style={{ borderLeftColor: 'var(--green)', borderLeftWidth: '4px' }}>
            <p className="micro-label text-[var(--muted)]">RESULTS</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">{monthlyStats.count}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {monthlyStats.count === 0 ? 'Your wins this month — chase a lead and mark it WON' : `won this month · £${monthlyStats.totalValue.toLocaleString()}`}
            </p>
            <p className="mt-2 text-xs font-black text-[var(--navy)] underline underline-offset-2">Review leads →</p>
          </Link>
        </div>
      </section>

      {/* Overdue leads */}
      {overdueLeads.length > 0 && (
        <section className="jf-box bg-white p-5">
          <div className="flex items-center gap-3 border-b-2 border-[var(--orange)] pb-3">
            <span className="bg-[var(--orange)] px-2 py-1 text-xs font-black text-white uppercase">OVERDUE</span>
            <p className="font-black text-[var(--ink)]">
              {overdueLeads.length} lead{overdueLeads.length === 1 ? '' : 's'} need chasing — snooze 24h or open to act now
            </p>
          </div>
          <div className="mt-3 grid gap-2">
            {overdueLeads.map((l) => {
              const hasPhone = !!getStoredLeads().find((sl) => sl.id === l.leadId)?.phone;
              return (
              <div key={l.leadId} className="flex items-center justify-between gap-4 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
                <div className="min-w-0">
                  <p className="truncate font-black text-[var(--ink)]">{l.leadTitle}</p>
                  <p className="text-xs font-black text-[var(--muted)]">{l.location} · {l.stage.replace('_', ' ')}</p>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    onClick={() => handleSendNudge(l)}
                    className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm"
                  >
                    {hasPhone ? 'SEND NUDGE →' : 'SEND VIA WHATSAPP →'}
                  </button>
                  <button
                    onClick={() => handleSnooze(l.leadId)}
                    className="jf-button bg-white text-[var(--ink)] text-sm"
                  >
                    SNOOZE 24H
                  </button>
                  <Link href={`/leads/${l.leadId}`} className="jf-button bg-[var(--navy)] text-white text-sm">
                    VIEW →
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ROI Tracker */}
      <ROITracker isPaid={isPaid} />

      {/* Lead Alerts Setup */}
      <AlertSetupWidget scanTrade={scanTrade} scanPostcode={scanPostcode} />

      {/* Review Nudge — wins 24h–7d old, no review sent yet */}
      {reviewNudges.filter((w) => !dismissedReviews.has(w.id)).map((win) => {
        const msg = generateReviewMessage(win, 'google');
        return (
          <section key={win.id} className="jf-box border-2 border-[var(--green)] bg-[var(--green)]/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="micro-label text-[var(--green)]">YOU WON — ASK FOR A REVIEW</p>
                <h2 className="headline mt-1 text-xl leading-tight">{win.title} · {win.location}</h2>
                <p className="mt-2 text-sm font-bold text-[var(--muted)]">
                  Job was won yesterday. Ask now — trades who ask within 48h get 3× more reviews.
                </p>
              </div>
              <button
                onClick={() => setDismissedReviews((prev) => new Set([...prev, win.id]))}
                className="shrink-0 text-xs font-black text-[var(--muted)] underline underline-offset-2"
              >
                dismiss
              </button>
            </div>
            <div className="mt-4 border-2 border-[var(--line)] bg-white p-3 text-xs font-bold text-[var(--ink)] select-all leading-relaxed">
              {msg}
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noreferrer"
                className="jf-button bg-[var(--yellow)] text-[var(--ink)]"
              >
                SEND ON WHATSAPP →
              </a>
              <button
                onClick={() => {
                  markReviewSent(win.id);
                  setDismissedReviews((prev) => new Set([...prev, win.id]));
                }}
                className="jf-button bg-white text-[var(--ink)]"
              >
                MARK SENT
              </button>
            </div>
          </section>
        );
      })}

      {/* Detailed Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Find Summary */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--navy)', borderLeftWidth: '4px' }}>
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--navy)]">SCAN</p>
            <Link href="/find-jobs" className="text-xs font-black text-[var(--navy)] underline underline-offset-2">OPEN →</Link>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR SCAN SETUP</p>
          <div className="mt-4 grid gap-3 text-sm">
            {scanTrade
              ? <Row label="Trade" value={scanTrade.charAt(0).toUpperCase() + scanTrade.slice(1)} />
              : <RowLink label="Trade" href="/find-jobs" cta="Pick your trade →" />}
            {scanPostcode
              ? <Row label="Postcode" value={scanPostcode} />
              : <RowLink label="Postcode" href="/find-jobs" cta="Set your area →" />}
            <Row label="Scans this week" value={scansUsed === 0 ? 'None yet' : isPaid ? `${scansUsed} this week (unlimited)` : `${scansUsed} of 3 used · resets Mon`} />
            {!isPaid && scansUsed >= 3 && <RowLink label="Scan limit reached" href="/pricing" cta="Upgrade for unlimited →" />}
            <Row label="Opportunities tracked" value={trackedLeadCount === 0 ? 'None tracked yet' : `${trackedLeadCount} in your list`} />
          </div>
        </section>

        {/* Chase Summary */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--orange)', borderLeftWidth: '4px' }}>
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--orange)]">TRACKING</p>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR ACTIVE OPPORTUNITIES</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Row label="Active" value={`${activeChase} decisions`} />
            <Row label="Not actioned" value={`${notContacted} need review`} />
            <Row label="Won" value={`${chaseWons} closed`} />
            {overdueCount > 0 && <Row label="Overdue" value={`${overdueCount} need attention`} />}
          </div>
          {activeChase === 0 && (
            <p className="mt-3 border-t border-[var(--line)] pt-3 text-xs font-black text-[var(--muted)]">
              Track an opportunity from Find Opportunities so its decision evidence and next action stay visible here.
            </p>
          )}
        </section>

        {/* Win Summary */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--green)', borderLeftWidth: '4px' }}>
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--green)]">RESULTS</p>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR SCOREBOARD</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Row label="This month" value={`${monthlyStats.count} wins`} />
            <Row label="This month value" value={`£${monthlyStats.totalValue.toLocaleString()}`} />
            <Row label="All time" value={`${winData.wins} wins · £${totalValueAllTime.toLocaleString()}`} />
            {winData.wins > 0 && (
              <Row label="Avg per win" value={`£${Math.round(totalValueAllTime / winData.wins).toLocaleString()}`} />
            )}
            {valueAccuracy && (
              <Row
                label="Quoted vs landed"
                value={
                  valueAccuracy.deltaPct === 0
                    ? `Spot on quote · ${valueAccuracy.count} jobs`
                    : `${valueAccuracy.deltaPct > 0 ? '+' : ''}${valueAccuracy.deltaPct}% vs quote · ${valueAccuracy.count} jobs`
                }
              />
            )}
            {winRate !== null && (
              <Row label="Win rate" value={`${winRate}%`} />
            )}
            <Row label="Losses" value={`${winData.losses} logged`} />
          </div>
          {winData.wins === 0 && (
            <p className="mt-3 border-t border-[var(--line)] pt-3 text-xs font-black text-[var(--muted)]">
              Record WON only after a real outcome. Your wins, contract values and loss reasons track here.
            </p>
          )}
          <Link href="/leads" className="mt-4 block text-xs font-black text-[var(--navy)] underline underline-offset-2">Review all leads →</Link>
        </section>

        {/* Quick Actions */}
        <section className="jf-box bg-[var(--navy)] p-5 text-white" id="quick-actions">
          <p className="micro-label text-[var(--yellow)]">QUICK ACTIONS</p>
          <div className="mt-4 grid gap-3">
            <Link href="/find-jobs" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center text-sm">
              CHECK CURRENT FTS OPPORTUNITIES →
            </Link>
            {isEmpty ? (
              <Link href="/pricing" className="jf-button w-full bg-white text-[var(--ink)] text-center">
                REVIEW PILOT FIT →
              </Link>
            ) : (
              <Link href="/leads" className="jf-button w-full bg-white text-[var(--ink)] text-center">
                REVIEW DECISIONS →
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* Win Breakdown — drill down by trade, location, source */}
      {winData.wins > 0 && (
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between border-b-2 border-[var(--line)] pb-3">
            <p className="micro-label text-[var(--muted)]">WIN BREAKDOWN</p>
            <span className="text-xs font-black text-[var(--muted)]">Where your money comes from</span>
          </div>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <BreakdownBlock title="By trade" rows={breakdown.byTrade.slice(0, 5)} />
            <BreakdownBlock title="By location" rows={breakdown.byLocation.slice(0, 5)} />
            <BreakdownBlock title="By source" rows={breakdown.bySource.slice(0, 5)} />
          </div>
        </section>
      )}

      {/* Lost Reason Breakdown — close the loop on why jobs slip away */}
      {lostBreakdown.length > 0 && (
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between border-b-2 border-[var(--line)] pb-3">
            <p className="micro-label text-[var(--muted)]">WHY YOU LOSE JOBS</p>
            <span className="text-xs font-black text-[var(--muted)]">{winData.losses} logged</span>
          </div>
          <div className="mt-4 grid gap-2 max-w-md">
            {lostBreakdown.slice(0, 6).map((r) => {
              const max = lostBreakdown[0].count;
              return (
                <div key={r.reason}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-black text-[var(--ink)]">{r.label}</span>
                    <span className="text-xs font-black text-[var(--muted)]">{r.count}</span>
                  </div>
                  <div className="mt-1 h-2 bg-[var(--bg-main)] border border-[var(--line)]">
                    <div
                      className="h-full bg-[var(--orange)]"
                      style={{ width: `${Math.max(4, (r.count / max) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 border-t-2 border-[var(--line)] pt-3 text-sm font-black text-[var(--ink)]">
            {LOST_REASON_TIPS[lostBreakdown[0].reason]}
          </p>
        </section>
      )}
    </main>
  );
}

function BreakdownBlock({ title, rows }: { title: string; rows: { key: string; count: number; value: number }[] }) {
  if (rows.length === 0) {
    return (
      <div>
        <p className="text-xs font-black uppercase text-[var(--muted)]">{title}</p>
        <p className="mt-2 text-sm font-black text-[var(--muted)]">No data yet</p>
      </div>
    );
  }
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div>
      <p className="text-xs font-black uppercase text-[var(--muted)]">{title}</p>
      <div className="mt-2 grid gap-2">
        {rows.map((r) => (
          <div key={r.key}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-sm font-black text-[var(--ink)] capitalize">{r.key}</span>
              <span className="text-xs font-black text-[var(--muted)]">
                {r.count} · £{r.value.toLocaleString()}
              </span>
            </div>
            <div className="mt-1 h-2 bg-[var(--bg-main)] border border-[var(--line)]">
              <div
                className="h-full bg-[var(--yellow)]"
                style={{ width: `${Math.max(4, (r.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
      <span className="font-black text-[var(--muted)]">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

function RowLink({ label, href, cta }: { label: string; href: string; cta: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
      <span className="font-black text-[var(--muted)]">{label}</span>
      <Link href={href} className="text-right font-black text-[var(--navy)] underline underline-offset-2">{cta}</Link>
    </div>
  );
}
