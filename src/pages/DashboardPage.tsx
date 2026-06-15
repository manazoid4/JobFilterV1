"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAuth } from '../components/AuthProvider';
import { addNudgeEvent, getChaseLeads, snoozeChaseLead, updateChaseStage } from '../lib/chaseStore';
import { getStoredLeads } from '../lib/leadStore';
import { MESSAGE_TEMPLATES, fillTemplate } from '../lib/chaseTemplates';
import { ROITracker } from '../components/ROITracker';
import { generateReviewMessage, getLostReasonBreakdown, getMonthlyStats, getValueAccuracy, getWinBreakdown, getWinData, markReviewSent } from '../lib/winStore';
import type { ChaseLead, LostReason, WinJob } from '../lib/types';

const LOST_REASON_TIPS: Record<LostReason, string> = {
  price: 'Most lost jobs go on price. Lead with a fast, no-obligation quote — speed often beats being cheapest.',
  timing: 'Most lost jobs slip on timing. Send your first message within 2 hours — the Quick Quote template is built for this.',
  competition: 'Most lost jobs go to another trade. First contact wins more jobs than lowest price — chase faster.',
  not_interested: "Most homeowners say they're not interested. Check your first message reads as local and low-pressure, not a sales pitch.",
  went_elsewhere: 'Most jobs go elsewhere before you reply. Faster first contact closes this gap — try the 24h follow-up template sooner.',
  other: 'Keep logging the reason when you mark a job lost — more data here means a sharper read on where you lose work.',
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
  const [territory, setTerritory] = useState<string | null>(null);
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
    setTerritory((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.territory'));
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
  const monthlyRoi = monthlyStats.totalValue > 0
    ? Math.round(monthlyStats.totalValue / 39)
    : null;
  const wonChase = chaseLeads.filter((l) => l.stage === 'won').length;
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
        <p className="micro-label text-[var(--yellow)]">JOB TRACKER</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">YOUR JOBS. TRACKED.</h1>
        <p className="mt-3 max-w-2xl font-black text-white/90">
          Find jobs before Checkatrade lists them. Chase in one tap. Log every win. No auction, no five-way blast — your work, under your control.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="inline-flex items-center gap-2 border-2 border-white/20 bg-white/10 px-3 py-1.5">
            <span className={`h-2 w-2 rounded-full shrink-0 ${territory ? 'bg-[var(--green)]' : 'bg-[var(--orange)]'}`} />
            <span className="font-mono text-xs font-black uppercase text-white/80">
              YOUR PATCH: {territory ?? 'NOT LOCKED'}
            </span>
          </div>
          {territory ? (
            <p className="text-sm font-black text-[var(--yellow)]">
              Gold leads to you first — buyer name, job value, and direct WhatsApp routing included. Your competition gets them 24h later.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-black text-white/90">
                No patch locked — leads are visible but buyer name, job value, and contact details stay hidden until you upgrade. Another trade could claim your area today.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-xs py-1.5 px-3 shrink-0">
                  UPGRADE — £39/MO →
                </Link>
                <Link href="/territories" className="inline-flex items-center justify-center border-2 border-white/30 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shrink-0 hover:bg-white/20 transition">
                  SEE OPEN TERRITORIES →
                </Link>
              </div>
              <p className="text-[10px] font-black text-white/50">Upgrade unlocks buyer details and lets you lock your patch in one step.</p>
            </div>
          )}
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
                <p className="font-black text-[var(--ink)] text-sm">SCAN YOUR AREA</p>
                <p className="text-xs font-black text-[var(--ink)]/60 mt-0.5">Enter your postcode and trade — takes 30 seconds. Gold leads come back first.</p>
                <Link href="/find-jobs" className="mt-2 inline-block jf-button bg-[var(--ink)] text-white text-xs py-1 px-2">SCAN NOW →</Link>
              </div>
            </li>
            <li className="flex items-start gap-3 border-2 border-[var(--ink)] bg-white p-3">
              <span className="shrink-0 font-mono text-xs font-black bg-[var(--ink)] text-white px-1.5 py-0.5">02</span>
              <div className="min-w-0">
                <p className="font-black text-[var(--ink)] text-sm">TRACK YOUR FIRST GOLD LEAD</p>
                <p className="text-xs font-black text-[var(--ink)]/60 mt-0.5">Tap TRACK THIS LEAD on any Gold result. It drops into your list here so you know who to contact first.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 border-2 border-[var(--ink)] bg-white p-3">
              <span className="shrink-0 font-mono text-xs font-black bg-[var(--ink)] text-white px-1.5 py-0.5">03</span>
              <div className="min-w-0">
                <p className="font-black text-[var(--ink)] text-sm">SEND THE WHATSAPP TEMPLATE</p>
                <p className="text-xs font-black text-[var(--ink)]/60 mt-0.5">One pre-written message. One tap. You&apos;re first in before the job goes to Bark or Checkatrade.</p>
              </div>
            </li>
          </ol>
        </section>
      )}

      {isEmpty && (
        <div className="jf-box border-2 border-[var(--orange)] bg-[var(--orange)]/5 p-8 text-center">
          <p className="micro-label text-[var(--orange)]">NO JOBS TRACKED YET</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">YOUR FIRST SCAN IS FREE.</h2>
          <p className="mt-3 max-w-lg mx-auto font-black text-[var(--ink)]/80 text-sm">
            Find a job before Checkatrade lists it. One £2,000 win and £39/mo pays for itself 50 times over — no shared auction, no credit burn.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/find-jobs" className="jf-button bg-[var(--ink)] text-white">RUN YOUR FIRST SCAN →</Link>
            {!territory && (
              <Link href="/territories" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">LOCK YOUR PATCH →</Link>
            )}
            <Link href="/pricing" className="jf-button bg-white text-[var(--ink)] border-2 border-[var(--ink)]">SEE PRICING</Link>
          </div>
          <p className="mt-3 text-xs font-black text-[var(--ink)]/50">No credit card required — 3 free scans every week</p>
        </div>
      )}

      {/* Pipeline Visual */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {isEmpty ? (
            <Link href="/find-jobs" className="block border-2 border-[var(--ink)] bg-[var(--yellow)] p-5 hover:opacity-90 transition shadow-[4px_4px_0_var(--ink)]">
              <p className="micro-label text-[var(--ink)]">SCAN NOW →</p>
              <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">SCAN</p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]">Before Checkatrade lists them</p>
            </Link>
          ) : (
            <div className="border-2 border-[var(--ink)] bg-[var(--yellow)] p-5">
              <p className="micro-label text-[var(--ink)]">LAST SCAN</p>
              <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">
                {scansUsed > 0 ? scansUsed : '—'}
              </p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]">
                {scanTrade && scanPostcode ? `${scanTrade} · ${scanPostcode}` : 'scans this week'}
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
                    className="jf-button bg-[var(--green)] text-white text-sm"
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

      {/* Review Nudge — wins 24h–7d old, no review sent yet */}
      {reviewNudges.filter((w) => !dismissedReviews.has(w.id)).map((win) => {
        const msg = generateReviewMessage(win, 'google');
        return (
          <section key={win.id} className="jf-box border-2 border-[var(--green)] bg-[var(--green)]/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="micro-label text-[var(--green)]">YOU WON — ASK FOR A REVIEW</p>
                <h2 className="headline mt-1 text-xl leading-tight">{win.title} · {win.location}</h2>
                <p className="mt-2 text-sm font-black text-[var(--muted)]">
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
                className="jf-button bg-[var(--green)] text-white"
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
            <Row label="Scans this week" value={scansUsed === 0 ? 'None yet' : `${scansUsed} of 3 used · resets Mon`} />
            {scansUsed >= 3 && <RowLink label="Scan limit reached" href="/pricing" cta="Upgrade for unlimited →" />}
            <Row label="Leads flagged" value={trackedLeadCount === 0 ? 'None tracked yet' : `${trackedLeadCount} in your list`} />
          </div>
        </section>

        {/* Chase Summary */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--orange)', borderLeftWidth: '4px' }}>
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--orange)]">TRACKING</p>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR ACTIVE JOBS</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Row label="Active" value={`${activeChase} leads`} />
            <Row label="Not contacted" value={`${notContacted} need first touch`} />
            <Row label="Won" value={`${wonChase} closed`} />
            {overdueCount > 0 && <Row label="Overdue" value={`${overdueCount} need attention`} />}
          </div>
          {activeChase === 0 && (
            <p className="mt-3 border-t border-[var(--line)] pt-3 text-xs font-black text-[var(--muted)]">
              Track a lead from Find Jobs — your list stays here so you know who to contact first.
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
            {monthlyRoi !== null && monthlyRoi > 1 && (
              <Row label="This month ROI" value={`${monthlyRoi}x return on £39`} />
            )}
            <Row label="Losses" value={`${winData.losses} logged`} />
          </div>
          {winData.wins === 0 && (
            <p className="mt-3 border-t border-[var(--line)] pt-3 text-xs font-black text-[var(--muted)]">
              Chase a lead and tap WON after you land the job. Your wins, earnings, and loss reasons track here.
            </p>
          )}
          <Link href="/leads" className="mt-4 block text-xs font-black text-[var(--navy)] underline underline-offset-2">Review all leads →</Link>
        </section>

        {/* Quick Actions */}
        <section className="jf-box bg-[var(--navy)] p-5 text-white" id="quick-actions">
          <p className="micro-label text-[var(--yellow)]">QUICK ACTIONS</p>
          <div className="mt-4 grid gap-3">
            {!territory && (
              <div>
                <Link href="/territories" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center text-sm">
                  LOCK YOUR PATCH NOW →
                </Link>
                <p className="mt-1.5 text-xs font-black text-white/70 text-center">
                  Founder price £39/mo — no shared auction, no credit burn
                </p>
              </div>
            )}
            {isEmpty ? (
              <Link href="/pricing" className="jf-button w-full bg-white text-[var(--ink)] text-center">
                SEE WHAT YOU UNLOCK →
              </Link>
            ) : (
              <Link href="/leads" className="jf-button w-full bg-white text-[var(--ink)] text-center">
                REVIEW LEADS →
              </Link>
            )}
          </div>
        </section>

        {/* Admin Guard Entry Card */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--yellow)', borderLeftWidth: '4px' }}>
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--muted)]">TAX & DEADLINES</p>
            <Link href="/dashboard/admin-guard" className="text-xs font-black text-[var(--navy)] underline underline-offset-2">OPEN →</Link>
          </div>
          <p className="headline mt-3 text-2xl leading-none">ADMIN GUARD</p>
          <p className="mt-1 text-xs font-black text-[var(--muted)]">Tax dates, Self Assessment, and trade admin — free</p>
          <p className="mt-2 font-black text-[var(--muted)] text-sm">
            HMRC deadlines, monthly checklists and calendar exports — so tax dates and renewal fees don&apos;t sneak up on you.
          </p>
          <Link href="/features/admin-guard" className="mt-4 block text-xs font-black text-[var(--navy)] underline underline-offset-2">What does it track? →</Link>
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
