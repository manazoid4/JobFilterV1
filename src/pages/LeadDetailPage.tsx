"use client";
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { ActionBar } from '../components/ActionBar';
import { ScoreBadge } from '../components/ScoreBadge';
import { TrustBadges } from '../components/TrustBadges';
import { LeadValueKit } from '../components/LeadValueKit';
import { getStoredLeads, updateStoredLead } from '../lib/leadStore';
import { getChaseLeads, snoozeChaseLead } from '../lib/chaseStore';
import { MESSAGE_TEMPLATES, fillTemplate, parseEmailSubject } from '../lib/chaseTemplates';
import { markLost, markWon } from '../lib/winStore';
import { parseCompanyDetails } from '../lib/companyDetails';
import type { LeadDecision, LeadDecisionStatus, LostReason } from '../lib/types';

const LOST_REASON_OPTIONS: { value: LostReason; label: string }[] = [
  { value: 'price', label: 'Got outbid on price' },
  { value: 'competition', label: 'Customer went with someone else' },
  { value: 'timing', label: 'Bad timing — too slow to call back' },
  { value: 'not_interested', label: "Customer wasn't interested" },
  { value: 'went_elsewhere', label: 'Job filled before I called' },
  { value: 'other', label: 'Other / job did not exist' },
];

function formatSignalLabel(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('planning')) return 'Planning approval';
  if (s.includes('epc') || s.includes('energy')) return 'Energy signal';
  if (s.includes('contract') || s === 'fts' || s.includes('pcs')) return 'Contract signal';
  if (s.includes('companies') || s === 'ch') return 'Business signal';
  if (s.includes('landregistry') || s.includes('land_registry')) return 'Property signal';
  if (s.includes('charity')) return 'Activity signal';
  if (s.includes('forestry')) return 'Land signal';
  if (s.includes('directory')) return 'Local signal';
  if (s === 'multi-source verified' || s.includes('multi')) return 'Multi-signal verified';
  return 'Verified signal';
}

function buildIcs(lead: LeadDecision): string {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const description = [
    `Area: ${lead.area}`,
    lead.budget ? `Budget: ${lead.budget}` : '',
    `Urgency: ${lead.urgency}`,
    `Score: ${lead.score}/100`,
    lead.details ? `Details: ${lead.details}` : '',
  ]
    .filter(Boolean)
    .join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JobFilter//Lead Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `DTSTAMP:${fmt(now)}`,
    `UID:jf-lead-${lead.id}@jobfilter.co.uk`,
    `SUMMARY:Follow up: ${lead.jobType} – ${lead.postcode}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${lead.postcode}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadIcs(lead: LeadDecision) {
  const blob = new Blob([buildIcs(lead)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jobfilter-lead-${lead.postcode.replace(/\s+/, '')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function CalendarCopyLink({ lead }: { lead: LeadDecision }) {
  const [copied, setCopied] = useState(false);

  const calendarUrl = `/api/leads/calendar.ics?${new URLSearchParams({
    leadId: lead.id,
    jobType: lead.jobType,
    postcode: lead.postcode,
    area: lead.area,
    score: String(lead.score),
    urgency: lead.urgency,
    ...(lead.details ? { details: lead.details } : {}),
  }).toString()}`;

  function copyLink() {
    const fullUrl = window.location.origin + calendarUrl;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <button className="jf-button bg-white text-[var(--ink)]" onClick={copyLink}>
      {copied ? 'LINK COPIED' : 'COPY CALENDAR LINK'}
    </button>
  );
}

export function LeadDetailPage() {
  const params = useParams();
  const id  = (params?.id  as string) || '' ;
  const router = useRouter();
  const lead = getStoredLeads().find((item) => item.id === id);
  const [lostReason, setLostReason] = useState<LostReason | ''>('');
  const [showLostPicker, setShowLostPicker] = useState(false);
  const [reviewLink, setReviewLink] = useState('');
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(() => {
    const cl = getChaseLeads().find((c) => c.leadId === id);
    const stage = cl?.stage ?? 'not_contacted';
    if (stage === 'won') return 'won_thanks';
    if (stage === 'following_up' || stage === 'contacted') return 'follow_up_24h';
    return 'first_touch_2h';
  });
  const [showWonCapture, setShowWonCapture] = useState(false);
  const [wonValueInput, setWonValueInput] = useState('');
  const [copiedOtherKey, setCopiedOtherKey] = useState<string | null>(null);
  const [snoozed, setSnoozed] = useState(false);
  const [flagged, setFlagged] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (JSON.parse(localStorage.getItem('jf-flagged-leads') || '[]') as string[]).includes(id);
  });
  const [showFlagPicker, setShowFlagPicker] = useState(false);
  const [flagReason, setFlagReason] = useState('');
  const { user } = useAuth();
  const [emailChaseState, setEmailChaseState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailChaseError, setEmailChaseError] = useState('');
  const [aiDraft, setAiDraft] = useState<string | null>(null);
  const [aiDraftState, setAiDraftState] = useState<'idle' | 'loading' | 'ready' | 'locked' | 'error'>('idle');
  const [explainResult, setExplainResult] = useState<{ summary: string; plainDescription: string } | null>(null);
  const [explainState, setExplainState] = useState<'idle' | 'loading' | 'ready' | 'locked' | 'error'>('idle');

  function handleFlagLead() {
    const stored = JSON.parse(localStorage.getItem('jf-flagged-leads') || '[]') as string[];
    if (!stored.includes(id)) {
      stored.push(id);
      localStorage.setItem('jf-flagged-leads', JSON.stringify(stored));
    }
    setFlagged(true);
    setShowFlagPicker(false);
    fetch('/api/leads/flag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: id, reason: flagReason || null }),
    }).catch(() => {});
  }

  if (!lead) {
    return (
      <main className="page-shell py-8">
        <section className="jf-box bg-white p-6">
          <h1 className="headline text-4xl">LEAD NOT FOUND</h1>
          <Link className="jf-button mt-4 bg-[var(--yellow)] text-[var(--ink)] min-h-[44px]" href="/leads">BACK</Link>
        </section>
      </main>
    );
  }

  const chaseLead = getChaseLeads().find((cl) => cl.leadId === id);
  const chaseStage = chaseLead?.stage ?? 'not_contacted';
  const waTemplates = MESSAGE_TEMPLATES.filter((t) => {
    if (t.channel && t.channel !== 'whatsapp') return false;
    if (chaseStage === 'won') return t.stage === 'won';
    if (chaseStage === 'following_up' || chaseStage === 'contacted') return t.stage === 'following_up';
    return t.stage === 'not_contacted';
  });
  const otherTemplates = MESSAGE_TEMPLATES.filter((t) => {
    if (!t.channel || t.channel === 'whatsapp') return false;
    const targetStage = chaseStage === 'won' ? 'won'
      : (chaseStage === 'following_up' || chaseStage === 'contacted') ? 'following_up'
      : 'not_contacted';
    return t.stage === targetStage;
  });
  const selectedTemplate = waTemplates.find((t) => t.key === selectedTemplateKey) ?? null;
  const filledMessage = selectedTemplate ? fillTemplate(selectedTemplate, { job_type: lead.jobType, area: lead.area }) : null;

  const firstTouchTemplate = MESSAGE_TEMPLATES.find((t) => t.key === 'first_touch_2h');

  // Format UK phone for wa.me: strip non-digits, replace leading 0 with 44
  const waPhone = lead.phone
    ? lead.phone.replace(/\D/g, '').replace(/^0/, '44').replace(/^\+/, '')
    : null;

  const quickWaUrl = firstTouchTemplate
    ? `https://wa.me/${waPhone ?? ''}?text=${encodeURIComponent(fillTemplate(firstTouchTemplate, { job_type: lead.jobType, area: lead.area }))}`
    : null;

  function handleSnooze() {
    snoozeChaseLead(id);
    setSnoozed(true);
  }

  async function handleEmailChase() {
    if (!user?.email) {
      setEmailChaseState('error');
      setEmailChaseError('Log in to email yourself this lead.');
      return;
    }
    setEmailChaseState('sending');
    const chaseMessage = filledMessage ?? fillTemplate(MESSAGE_TEMPLATES.find((t) => t.key === 'first_touch_2h')!, { job_type: lead!.jobType, area: lead!.area });
    try {
      const res = await fetch('/api/leads/email-chase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: user.email,
          leadTitle: lead!.title,
          area: lead!.area,
          score: lead!.score,
          estimatedValue: lead!.budget ?? 'POA',
          message: chaseMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setEmailChaseState('error');
        setEmailChaseError(data.error || 'Email failed to send.');
        return;
      }
      setEmailChaseState('sent');
    } catch {
      setEmailChaseState('error');
      setEmailChaseError('Email failed to send.');
    }
  }

  async function handleAiDraft() {
    setAiDraftState('loading');
    try {
      const res = await fetch('/api/leads/draft-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            title: lead!.jobType,
            description: lead!.details ?? '',
            trade: lead!.jobType,
            estimatedValue: lead!.budget ?? '',
            urgency: lead!.urgency,
          },
          tone: 'quote',
        }),
      });
      if (res.status === 401 || res.status === 403) {
        setAiDraftState('locked');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok || !data.draft) {
        setAiDraftState('error');
        return;
      }
      setAiDraft(data.draft);
      setAiDraftState('ready');
    } catch {
      setAiDraftState('error');
    }
  }

  async function handleExplain() {
    setExplainState('loading');
    try {
      const res = await fetch('/api/leads/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            title: lead!.jobType,
            description: lead!.description ?? '',
            trade: lead!.jobType,
            estimatedValue: lead!.budget ?? '',
            source: lead!.source,
            sourceUrl: lead!.sourceUrl ?? '',
          },
        }),
      });
      if (res.status === 401 || res.status === 403) {
        setExplainState('locked');
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok || !data.summary || !data.plainDescription) {
        setExplainState('error');
        return;
      }
      setExplainResult({ summary: data.summary, plainDescription: data.plainDescription });
      setExplainState('ready');
    } catch {
      setExplainState('error');
    }
  }

  function copyOtherTemplate(key: string, body: string) {
    navigator.clipboard.writeText(body).then(() => {
      setCopiedOtherKey(key);
      setTimeout(() => setCopiedOtherKey(null), 2500);
    });
  }

  async function setStatus(status: LeadDecisionStatus) {
    const outcome: Record<string, string> = {};
    if (status === 'lost' && lostReason) {
      outcome.lostReason = lostReason;
      markLost({
        leadId: lead!.id,
        title: lead!.jobType,
        trade: lead!.jobType,
        location: lead!.area,
        estimatedValue: lead!.budget ?? '',
        reason: lostReason,
        source: 'chase',
      });
    }
    updateStoredLead(lead!.id, { status, ...outcome });

    await fetch('/api/leads/outcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead!.id, status, title: lead!.jobType, value: lead!.budget, lostReason, postcode: lead!.postcode }),
    }).catch(() => {});

    if (status === 'won') {
      try {
        const res = await fetch('/api/leads/review-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId: lead!.id, customerName: 'your customer', trade: lead!.jobType }),
        });
        const data = await res.json();
        if (data.ok && data.message) {
          setReviewLink(data.message);
          return;
        }
      } catch {}
    }

    router.push('/leads');
  }

  function handleWonClick() {
    const stripped = (lead?.budget ?? '').replace(/[^0-9]/g, '');
    setWonValueInput(stripped);
    setShowWonCapture(true);
  }

  async function confirmWon() {
    const parsedValue = parseInt(wonValueInput.replace(/[^0-9]/g, ''), 10) || 0;
    markWon({
      leadId: lead!.id,
      title: lead!.jobType,
      trade: lead!.jobType,
      location: lead!.area,
      value: parsedValue,
      estimatedValue: lead!.budget,
      source: 'chase',
    });
    updateStoredLead(lead!.id, { status: 'won' });
    await fetch('/api/leads/outcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: lead!.id,
        status: 'won',
        title: lead!.jobType,
        value: parsedValue > 0 ? `£${parsedValue.toLocaleString()}` : lead!.budget,
        postcode: lead!.postcode,
      }),
    }).catch(() => {});
    setShowWonCapture(false);
    try {
      const res = await fetch('/api/leads/review-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead!.id, customerName: 'your customer', trade: lead!.jobType }),
      });
      const data = await res.json();
      if (data.ok && data.message) {
        setReviewLink(data.message);
        return;
      }
    } catch {}
    router.push('/leads');
  }

  return (
    <main className="page-shell grid gap-5 py-8 pb-28 md:pb-8">
      <section className="jf-box grid gap-5 bg-white p-7 sm:grid-cols-[auto_1fr]">
        <ScoreBadge score={lead.score} large />
        <div>
          <p className="micro-label text-[var(--orange)]">{lead.urgency}</p>
          <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl">{lead.jobType}</h1>
          <p className="mt-4 text-xl font-black text-[var(--muted)]">{lead.area}</p>
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">WHY THIS LEAD</h2>
        <div className="mt-4 grid gap-2 text-base font-black">
          {lead.flags.includes('Local') && <p className="flex items-center gap-2"><span className="text-[var(--green)]">YES</span> Within your area</p>}
          {lead.flags.includes('Urgent') && <p className="flex items-center gap-2"><span className="text-[var(--orange)]">YES</span> Urgent — customer wants it done fast</p>}
          {lead.flags.includes('Photos') && <p className="flex items-center gap-2"><span className="text-[var(--green)]">YES</span> Photos provided — serious enquiry</p>}
          {lead.flags.includes('Clear') ? <p className="flex items-center gap-2"><span className="text-[var(--green)]">YES</span> Clear brief — no guesswork on the quote</p> : <p className="flex items-center gap-2"><span className="text-[var(--muted)]">LOW</span> Limited detail — ask questions before quoting</p>}
          {lead.flags.includes('GoodBudget') && <p className="flex items-center gap-2"><span className="text-[var(--green)]">YES</span> Budget confirmed — not fishing for a free quote</p>}
          {lead.flags.includes('Budget') && <p className="flex items-center gap-2"><span className="text-[var(--orange)]">LOW</span> Budget may be tight — qualify before committing a full day</p>}
          {lead.flags.includes('Risk') && !lead.flags.includes('Clear') && <p className="flex items-center gap-2"><span className="text-[var(--orange)]">LOW</span> Low detail — ask for a site visit before quoting</p>}
          {lead.isCommercial && <p className="flex items-center gap-2"><span className="text-[var(--green)]">YES</span> Commercial job — business buyer, not a homeowner</p>}
          {lead.isCommercial && lead.projectScale === 'large' && <p className="flex items-center gap-2"><span className="text-[var(--orange)]">BIG</span> Large project — likely needs more than one trade on site</p>}
        </div>
        {lead.score >= 80 ? (
          <div className="mt-4 border-l-4 border-[var(--yellow)] bg-[var(--yellow)]/15 px-4 py-3">
            <p className="text-sm font-black text-[var(--ink)]">GOLD — first-mover window open. Most trades won't see this for 24–48h. Send a WhatsApp now — five minutes costs nothing. Losing the job to someone faster costs everything.</p>
            {quickWaUrl && (
              <a
                href={quickWaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-2 text-xs font-black uppercase tracking-wider text-[var(--yellow)] shadow-[2px_2px_0_var(--yellow)]"
              >
                {waPhone ? 'OPEN BUYER WHATSAPP →' : 'SEND WHATSAPP NOW →'}
              </a>
            )}
          </div>
        ) : lead.score >= 50 ? (
          <div className="mt-4 border-l-4 border-[var(--navy)] bg-[var(--navy)]/5 px-4 py-3">
            <p className="text-sm font-black text-[var(--ink)]">SILVER — timing not confirmed yet. Signal is verified. A quick message asking if they need a quote now finds out if they're ready — use the WhatsApp templates below. Takes 30 seconds.</p>
          </div>
        ) : (
          <div className="mt-4 border-l-4 border-[var(--line)] bg-[var(--paper)] px-4 py-3">
            <p className="text-sm font-black text-[var(--muted)]">BRONZE — real signal, not urgent. Work may not start for weeks. Add to your quiet-week list. Don't spend chase time here yet — revisit when work is quiet.</p>
          </div>
        )}
      </section>

      {(lead.signalStack?.length || lead.recommendedAction || lead.signalClass) && (
        <section className="jf-box bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="micro-label text-[var(--orange)]">TIMING SIGNAL</p>
              <h2 className="headline text-2xl sm:text-3xl">WHY NOW</h2>
            </div>
            {lead.leadReadiness && (
              <span className="inline-block border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-1 text-xs font-black uppercase text-[var(--ink)]">
                {lead.leadReadiness}
              </span>
            )}
          </div>
          <div className="mt-4 grid gap-4">
            {lead.signalClass && (
              <p className="micro-label text-[var(--orange)]">{lead.signalClass.replace(/_/g, ' ').toUpperCase()}</p>
            )}
            {lead.signalStack?.length ? (
              <div className="flex flex-wrap gap-2">
                {lead.signalStack.map((source) => (
                  <span key={source} className="border-2 border-[var(--navy)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
                    {formatSignalLabel(source)}
                  </span>
                ))}
              </div>
            ) : null}
            {lead.recommendedAction && (
              <div className="border-l-4 border-[var(--yellow)] bg-[var(--yellow)]/20 px-4 py-3">
                <p className="text-sm font-black text-[var(--ink)]">{lead.recommendedAction}</p>
              </div>
            )}
            {lead.evidenceBadges?.length ? <TrustBadges badges={lead.evidenceBadges} /> : null}
            <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--ink)]">VERIFY BEFORE CONTACT</p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]/75">
                Source data can lag or change. Confirm the linked evidence before quoting, visiting, or making contact.
              </p>
            </div>
          </div>
        </section>
      )}

      {lead.source === 'CompaniesHouse' && (() => {
        const company = parseCompanyDetails(lead.description, lead.source);
        return company ? (
          <section className="jf-box bg-white p-6">
            <p className="micro-label text-[var(--green)]">BUSINESS SIGNAL</p>
            <h2 className="headline text-2xl sm:text-3xl">COMPANY DETAILS</h2>
            <div className="mt-4 grid gap-2 text-sm font-black text-[var(--ink)]">
              {company.industry && <p>Industry: {company.industry}</p>}
              {company.incorporated && <p>Incorporated: {company.incorporated}</p>}
              {company.companyNumber && <p>Company No: {company.companyNumber}</p>}
            </div>
            <p className="mt-3 text-xs font-black text-[var(--muted)]">New companies often need premises fit-out fast — call before they find someone else.</p>
          </section>
        ) : (
          <section className="jf-box bg-[var(--paper)] p-6">
            <p className="micro-label text-[var(--green)]">BUSINESS SIGNAL</p>
            <h2 className="headline text-2xl sm:text-3xl">COMPANY DETAILS LOCKED</h2>
            <p className="mt-2 text-sm font-black text-[var(--muted)]">Incorporation date, company number, and industry — unlocked at £39/mo.</p>
          </section>
        );
      })()}

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">LEAD VALUE KIT</h2>
        <p className="mt-2 text-sm font-black text-[var(--muted)]">The paid part is not just the lead. It is the quote floor and the chase plan around it.</p>
        <LeadValueKit lead={lead} unlocked title="LEAD VALUE KIT" />
      </section>

      <section className="jf-box bg-[var(--paper)] p-5">
        <p className="micro-label text-[var(--orange)]">MATERIAL COSTS</p>
        <h2 className="headline mt-1 text-2xl">KNOW YOUR FLOOR BEFORE YOU QUOTE.</h2>
        <p className="mt-2 text-sm font-black text-[var(--muted)]">
          Material price jumps quietly kill your margin. Check traceable UK supplier prices for {lead.jobType} before you commit to a number.
        </p>
        <Link
          href={`/material-price-engine?q=${encodeURIComponent(lead.jobType)}&postcode=${encodeURIComponent(lead.postcode)}`}
          className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]"
        >
          ESTIMATE MATERIALS FOR THIS JOB →
        </Link>
        <p className="mt-2 text-xs font-black text-[var(--muted)] uppercase">Benchmark estimates — verify with supplier before purchase</p>
      </section>

      {lead.details && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">DETAILS</h2>
          <p className="mt-3 font-bold text-[var(--muted)]">{lead.details}</p>
        </section>
      )}

      {lead.description && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">WHAT THIS MEANS</h2>
          <p className="mt-2 text-sm font-black text-[var(--muted)]">The raw record is full of council/legal jargon — get it in plain English before you call.</p>
          <button
            className="jf-button mt-4 bg-white text-[var(--ink)]"
            onClick={handleExplain}
            disabled={explainState === 'loading'}
          >
            {explainState === 'loading' ? 'TRANSLATING...' : 'EXPLAIN THIS LEAD IN PLAIN ENGLISH'}
          </button>
          {explainState === 'locked' && (
            <div className="mt-3 border-2 border-[var(--navy)] bg-[var(--navy)]/5 p-4">
              <p className="text-sm font-black text-[var(--ink)]">Get a plain-English breakdown of this exact signal — what it means, who to call, and why it's worth your time. One job won covers 3 months at £39.</p>
              <Link href="/pricing" className="jf-button mt-3 inline-block bg-[var(--yellow)] text-[var(--ink)]">GET FULL ACCESS — £39/MO →</Link>
              <p className="mt-2 text-xs font-black text-[var(--muted)] uppercase tracking-wider">30-DAY MONEY-BACK GUARANTEE · Cancel anytime.</p>
            </div>
          )}
          {explainState === 'error' && (
            <p className="mt-2 text-xs font-black text-[var(--orange)]">Couldn't translate this one — the details above are the raw record.</p>
          )}
          {explainState === 'ready' && explainResult && (
            <div className="mt-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <p className="text-sm font-black text-[var(--ink)]">{explainResult.summary}</p>
              <p className="mt-2 text-sm font-bold text-[var(--muted)] leading-relaxed">{explainResult.plainDescription}</p>
            </div>
          )}
        </section>
      )}

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">SEND WHATSAPP</h2>
        <p className="mt-2 text-sm font-black text-[var(--muted)]">Message ready — tap SEND WHATSAPP to go. Swap template below if needed.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {waTemplates.map((t) => (
            <button
              key={t.key}
              onClick={() => setSelectedTemplateKey(selectedTemplateKey === t.key ? null : t.key)}
              className={`px-3 py-1.5 text-xs font-black uppercase border-2 ${
                selectedTemplateKey === t.key
                  ? 'bg-[var(--yellow)] border-[var(--ink)]'
                  : 'bg-white border-[var(--line)] text-[var(--ink)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {selectedTemplate && (
          <p className="mt-3 text-xs font-black text-[var(--muted)]">{selectedTemplate.timing} — {selectedTemplate.purpose}</p>
        )}
        {filledMessage && (
          <div className="mt-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-bold text-[var(--ink)] leading-relaxed whitespace-pre-wrap">{filledMessage}</p>
            <a
              className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]"
              href={`https://wa.me/${waPhone ?? ''}?text=${encodeURIComponent(filledMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {waPhone ? 'OPEN WHATSAPP CHAT →' : 'SEND WHATSAPP'}
            </a>
          </div>
        )}
        <div className="mt-4 border-t-2 border-[var(--line)] pt-4">
          <button
            className="jf-button bg-white text-[var(--ink)]"
            onClick={handleAiDraft}
            disabled={aiDraftState === 'loading'}
          >
            {aiDraftState === 'loading' ? 'DRAFTING...' : 'AI DRAFT — WRITE ME A MESSAGE'}
          </button>
          <p className="mt-2 text-xs font-black text-[var(--muted)]">Writes a one-off message from this job's details — not a generic template.</p>
          {aiDraftState === 'locked' && (
            <div className="mt-3 border-2 border-[var(--navy)] bg-[var(--navy)]/5 p-4">
              <p className="text-sm font-black text-[var(--ink)]">Get a tailored first message for this exact job — not a copy-paste template. One job won covers 3 months at £39.</p>
              <Link href="/pricing" className="jf-button mt-3 inline-block bg-[var(--yellow)] text-[var(--ink)]">GET FULL ACCESS — £39/MO →</Link>
              <p className="mt-2 text-xs font-black text-[var(--muted)] uppercase tracking-wider">30-DAY MONEY-BACK GUARANTEE · Cancel anytime.</p>
            </div>
          )}
          {aiDraftState === 'error' && (
            <p className="mt-2 text-xs font-black text-[var(--orange)]">Couldn't draft a message — use a template above instead.</p>
          )}
          {aiDraftState === 'ready' && aiDraft && (
            <div className="mt-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <p className="text-sm font-bold text-[var(--ink)] leading-relaxed whitespace-pre-wrap">{aiDraft}</p>
              <a
                className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]"
                href={`https://wa.me/${waPhone ?? ''}?text=${encodeURIComponent(aiDraft)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {waPhone ? 'OPEN WHATSAPP CHAT →' : 'SEND WHATSAPP'}
              </a>
            </div>
          )}
        </div>
      </section>

      {otherTemplates.length > 0 && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">OTHER APPROACHES</h2>
          <p className="mt-2 text-sm font-black text-[var(--muted)]">Email, portal, door-step, or letter — copy the message and use it your way.</p>
          <div className="mt-4 grid gap-4">
            {otherTemplates.map((t) => {
              const filled = fillTemplate(t, { job_type: lead.jobType, area: lead.area });
              const isEmail = t.channel === 'email';
              const emailParts = isEmail ? parseEmailSubject(filled) : null;
              const copyText = emailParts ? `Subject: ${emailParts.subject}\n\n${emailParts.body}` : filled;
              return (
                <div key={t.key} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase text-[var(--ink)]">{t.label}</p>
                      <p className="mt-0.5 text-xs font-black text-[var(--muted)]">{t.timing} — {t.purpose}</p>
                    </div>
                    <button
                      onClick={() => copyOtherTemplate(t.key, copyText)}
                      className={`shrink-0 px-3 py-1.5 text-xs font-black uppercase border-2 ${copiedOtherKey === t.key ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)] text-[var(--ink)]'}`}
                    >
                      {copiedOtherKey === t.key ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  {isEmail && emailParts?.subject && (
                    <div className="mt-3 border-l-4 border-[var(--navy)] bg-white px-3 py-2">
                      <p className="text-[10px] font-black uppercase text-[var(--muted)]">Subject</p>
                      <p className="text-sm font-bold text-[var(--ink)]">{emailParts.subject}</p>
                    </div>
                  )}
                  <p className="mt-3 text-sm font-bold text-[var(--ink)] leading-relaxed whitespace-pre-wrap">{emailParts ? emailParts.body : filled}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">FOLLOW-UP REMINDER</h2>
        <p className="mt-2 font-black text-[var(--muted)] text-sm">Block time to chase this job. Adds a 9am reminder for tomorrow — works with Google Calendar, Apple Calendar, and Outlook.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="jf-button bg-[var(--yellow)] text-[var(--ink)]"
            onClick={() => downloadIcs(lead)}
          >
            ADD TO CALENDAR
          </button>
          <CalendarCopyLink lead={lead} />
          {chaseLead && chaseLead.stage !== 'won' && chaseLead.stage !== 'lost' && (
            <button
              className={`jf-button ${snoozed ? 'bg-[var(--green)] text-white' : 'bg-[var(--bg-main)] text-[var(--ink)]'}`}
              onClick={handleSnooze}
              disabled={snoozed}
            >
              {snoozed ? 'SNOOZED — BACK TOMORROW' : 'SNOOZE 24H'}
            </button>
          )}
          <button
            className={`jf-button ${emailChaseState === 'sent' ? 'bg-[var(--green)] text-white' : 'bg-white text-[var(--ink)]'}`}
            onClick={handleEmailChase}
            disabled={emailChaseState === 'sending' || emailChaseState === 'sent'}
          >
            {emailChaseState === 'sending' ? 'SENDING...' : emailChaseState === 'sent' ? 'SENT TO YOUR EMAIL' : 'EMAIL ME THIS LEAD'}
          </button>
        </div>
        {emailChaseState === 'error' && (
          <p className="mt-2 text-xs font-black text-[var(--orange)]">{emailChaseError}</p>
        )}
        {emailChaseState === 'sent' && (
          <p className="mt-2 text-xs font-black text-[var(--green)]">✓ Sent to {user?.email} — chase message and lead summary, ready to action from your inbox.</p>
        )}
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">OUTCOME</p>
        <h2 className="headline mt-2 text-2xl sm:text-3xl">DID YOU WIN IT?</h2>
        <p className="mt-2 font-black text-[var(--muted)]">
          Status: {outcomeLabel(lead.status)} — mark the result so your wins build up over time.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={handleWonClick}>WON</button>
          <button className="jf-button bg-white text-[var(--ink)]" onClick={() => { setShowLostPicker(true); setLostReason(''); }}>LOST</button>
          <button className="jf-button bg-[var(--bg-main)] text-[var(--ink)]" onClick={() => setStatus('no_answer')}>NO ANSWER</button>
        </div>
        {showLostPicker && (
          <div className="mt-4 border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-xs font-black uppercase text-[var(--muted)] mb-2">Why did you lose it? (optional)</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {LOST_REASON_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setLostReason(value)}
                  className={`border-2 px-2 py-1 text-xs font-black ${lostReason === value ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <button className="jf-button bg-[var(--ink)] text-white" onClick={() => { setShowLostPicker(false); setStatus('lost'); }}>CONFIRM LOSS</button>
              <button className="jf-button bg-white text-[var(--ink)]" onClick={() => { setShowLostPicker(false); setLostReason(''); }}>CANCEL</button>
            </div>
          </div>
        )}
        {showWonCapture && (
          <div className="mt-4 border-2 border-[var(--ink)] bg-[var(--yellow)] p-5">
            <p className="headline text-xl">WHAT WAS THE JOB WORTH?</p>
            <p className="mt-1 text-sm font-black">Enter the actual value — leave blank if you're not sure.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-black text-2xl">£</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder={lead.budget?.replace(/[^0-9]/g, '') || '0'}
                value={wonValueInput}
                onChange={(e) => setWonValueInput(e.target.value)}
                className="w-36 border-2 border-[var(--ink)] bg-white px-3 py-2 font-black text-xl"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="jf-button bg-[var(--ink)] text-white" onClick={confirmWon}>CONFIRM WIN</button>
              <button className="jf-button bg-white text-[var(--ink)]" onClick={() => setShowWonCapture(false)}>CANCEL</button>
            </div>
          </div>
        )}
        {reviewLink && (
          <div className="mt-4 border-4 border-[var(--green)] bg-[var(--yellow)] p-4">
            <p className="font-black uppercase text-[var(--ink)]">Review request ready — send this to your customer:</p>
            <p className="mt-2 font-black">{reviewLink}</p>
          </div>
        )}
      </section>

      {!lead.phone && (
        <section className="jf-box bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">BUYER CONTACT LOCKED</p>
          <h2 className="headline mt-1 text-2xl">UNLOCK THE PHONE NUMBER.</h2>
          <p className="mt-2 text-sm font-black text-white/80">
            The template above is ready. Gold members get the buyer&apos;s direct number so you can send it — no shared auction, no five-trade blast.
          </p>
          <Link href="/pricing" className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]">
            UNLOCK THIS LEAD — £39/MO →
          </Link>
          <p className="mt-2 text-xs font-black text-white/75">30-day money-back · one job covers 3 months · cancel anytime</p>
        </section>
      )}

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--muted)]">NOT WHAT YOU EXPECTED?</p>
        <h2 className="headline mt-2 text-2xl sm:text-3xl">FLAG THIS LEAD</h2>
        {flagged ? (
          <div className="mt-4 border-2 border-[var(--green)] bg-[var(--green)]/10 p-4">
            <p className="font-black text-[var(--ink)]">FLAGGED. We'll review it.</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">3+ flagged duds in a month? Email support@jobfilter.uk — we'll look at a partial credit. Every flag improves signal quality for everyone.</p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm font-black text-[var(--muted)]">Wrong area, fake, or already gone? Flag it. Every dud you report makes the next scan sharper.</p>
            {!showFlagPicker ? (
              <button className="jf-button mt-4 bg-white text-[var(--ink)]" onClick={() => setShowFlagPicker(true)}>FLAG AS A DUD</button>
            ) : (
              <div className="mt-4 border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
                <p className="text-xs font-black uppercase text-[var(--muted)] mb-2">Why? (optional)</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {['Wrong area', 'Fake or spam', 'Already started', 'Duplicate lead'].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setFlagReason(reason)}
                      className={`border-2 px-2 py-1 text-xs font-black ${flagReason === reason ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)]'}`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button className="jf-button bg-[var(--ink)] text-white" onClick={handleFlagLead}>CONFIRM FLAG</button>
                  <button className="jf-button bg-white text-[var(--ink)]" onClick={() => { setShowFlagPicker(false); setFlagReason(''); }}>CANCEL</button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <ActionBar>
        {lead.phone ? (
          <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href={`tel:${lead.phone}`}>CALL</a>
        ) : (
          <Link href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">UNLOCK CONTACT →</Link>
        )}
        <button className="jf-button bg-[var(--bg-main)] text-[var(--ink)]" onClick={() => setStatus('ignored')}>IGNORE</button>
        <button className="jf-button bg-[var(--navy)] text-white" onClick={() => setStatus('saved')}>SAVE</button>
      </ActionBar>
    </main>
  );
}

function outcomeLabel(status: LeadDecisionStatus) {
  if (status === 'won') return 'WON';
  if (status === 'lost') return 'LOST';
  if (status === 'no_answer') return 'NO ANSWER';
  if (status === 'saved') return 'SAVED';
  if (status === 'ignored') return 'IGNORED';
  return 'NEW';
}
