"use client";
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

import { useState } from 'react';
import { ActionBar } from '../components/ActionBar';
import { ScoreBadge } from '../components/ScoreBadge';
import { TrustBadges } from '../components/TrustBadges';
import { LeadValueKit } from '../components/LeadValueKit';
import { getStoredLeads, updateStoredLead } from '../lib/leadStore';
import { getChaseLeads } from '../lib/chaseStore';
import { MESSAGE_TEMPLATES, fillTemplate } from '../lib/chaseTemplates';
import { markWon } from '../lib/winStore';
import type { LeadDecision, LeadDecisionStatus } from '../lib/types';

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
  const [lostReason, setLostReason] = useState('');
  const [showLostPicker, setShowLostPicker] = useState(false);
  const [reviewLink, setReviewLink] = useState('');
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const [showWonCapture, setShowWonCapture] = useState(false);
  const [wonValueInput, setWonValueInput] = useState('');
  const [copiedOtherKey, setCopiedOtherKey] = useState<string | null>(null);

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
          {lead.flags.includes('Budget') && <p className="flex items-center gap-2"><span className="text-[var(--green)]">YES</span> Budget confirmed — not fishing for a free quote</p>}
        </div>
        {lead.score >= 80 ? (
          <div className="mt-4 border-l-4 border-[var(--yellow)] bg-[var(--yellow)]/15 px-4 py-3">
            <p className="text-sm font-black text-[var(--ink)]">GOLD — first-mover window open. Most trades won't see this for 24–48h. Chase now.</p>
          </div>
        ) : lead.score >= 50 ? (
          <div className="mt-4 border-l-4 border-[var(--navy)] bg-[var(--navy)]/5 px-4 py-3">
            <p className="text-sm font-black text-[var(--ink)]">SILVER — worth watching. Job signal is verified but timing or budget not confirmed. Worth a quick call, not a full chase yet.</p>
          </div>
        ) : (
          <div className="mt-4 border-l-4 border-[var(--line)] bg-[var(--paper)] px-4 py-3">
            <p className="text-sm font-black text-[var(--muted)]">BRONZE — check timing. Signal detected but work may not start immediately. Verify before spending time chasing.</p>
          </div>
        )}
      </section>

      {(lead.signalStack?.length || lead.recommendedAction || lead.signalClass) && (
        <section className="jf-box bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="micro-label text-[var(--orange)]">WORKS STARTING NOW</p>
              <h2 className="headline text-2xl sm:text-3xl">SIGNAL INTELLIGENCE</h2>
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
                    {source}
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

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">LEAD VALUE KIT</h2>
        <p className="mt-2 text-sm font-black text-[var(--muted)]">The paid part is not just the lead. It is the quote floor and the chase plan around it.</p>
        <LeadValueKit lead={lead} unlocked title="LEAD VALUE KIT" />
      </section>

      {lead.details && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">DETAILS</h2>
          <p className="mt-3 font-bold text-[var(--muted)]">{lead.details}</p>
        </section>
      )}

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">SEND WHATSAPP</h2>
        <p className="mt-2 text-sm font-black text-[var(--muted)]">Pick a message — we fill in the job details. Tap SEND to open WhatsApp.</p>
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
              href={`https://wa.me/?text=${encodeURIComponent(filledMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              SEND WHATSAPP
            </a>
          </div>
        )}
      </section>

      {otherTemplates.length > 0 && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">OTHER APPROACHES</h2>
          <p className="mt-2 text-sm font-black text-[var(--muted)]">Portal, door-step, or letter — copy the message and use it your way.</p>
          <div className="mt-4 grid gap-4">
            {otherTemplates.map((t) => {
              const filled = fillTemplate(t, { job_type: lead.jobType, area: lead.area });
              return (
                <div key={t.key} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase text-[var(--ink)]">{t.label}</p>
                      <p className="mt-0.5 text-xs font-black text-[var(--muted)]">{t.timing} — {t.purpose}</p>
                    </div>
                    <button
                      onClick={() => copyOtherTemplate(t.key, filled)}
                      className={`shrink-0 px-3 py-1.5 text-xs font-black uppercase border-2 ${copiedOtherKey === t.key ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)] text-[var(--ink)]'}`}
                    >
                      {copiedOtherKey === t.key ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  <p className="mt-3 text-sm font-bold text-[var(--ink)] leading-relaxed whitespace-pre-wrap">{filled}</p>
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
        </div>
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
            <div className="grid gap-2 sm:grid-cols-4">
              {['Got outbid on price', 'Customer went with someone else', "Job didn't exist", 'Other'].map((reason) => (
                <button
                  key={reason}
                  onClick={() => setLostReason(reason)}
                  className={`border-2 px-2 py-1 text-xs font-black ${lostReason === reason ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)]'}`}
                >
                  {reason}
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

      <ActionBar>
        {lead.phone ? (
          <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href={`tel:${lead.phone}`}>CALL</a>
        ) : (
          <button className="jf-button bg-[#D7D9D4] text-[var(--ink)]" disabled>NO PHONE</button>
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
