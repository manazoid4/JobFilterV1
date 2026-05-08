import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ActionBar } from '../components/ActionBar';
import { ScoreBadge } from '../components/ScoreBadge';
import { getStoredLeads, updateStoredLead } from '../lib/leadStore';
import type { LeadDecisionStatus } from '../lib/types';

export function LeadDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const lead = getStoredLeads().find((item) => item.id === id);
  const [lostReason, setLostReason] = useState('');
  const [reviewLink, setReviewLink] = useState('');

  if (!lead) {
    return (
      <main className="page-shell py-8">
        <section className="jf-box bg-white p-6">
          <h1 className="headline text-4xl">LEAD NOT FOUND</h1>
          <Link className="jf-button mt-4 bg-[var(--yellow)] text-[var(--ink)] min-h-[44px]" to="/leads">BACK</Link>
        </section>
      </main>
    );
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
      body: JSON.stringify({ leadId: lead!.id, status, title: lead!.jobType, value: lead!.budget, lostReason }),
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
          return; // Stay on page so tradesman can copy the review link
        }
      } catch {}
    }

    navigate('/leads');
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
        <h2 className="headline text-2xl sm:text-3xl">REASONS</h2>
        <div className="mt-4 grid gap-2 text-xl font-black">
          {lead.flags.includes('Local') && <p>YES Local</p>}
          {lead.flags.includes('Urgent') && <p>YES Urgent</p>}
          {lead.flags.includes('Photos') && <p>YES Photos</p>}
          {lead.flags.includes('Clear') ? <p>YES Clear</p> : <p>NO Low detail</p>}
          {lead.flags.includes('Budget') && <p>YES Budget confirmed</p>}
        </div>
      </section>

      {lead.details && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">DETAILS</h2>
          <p className="mt-3 font-bold text-[var(--muted)]">{lead.details}</p>
        </section>
      )}

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">OUTCOME</p>
        <h2 className="headline mt-2 text-2xl sm:text-3xl">TRACK THE MONEY</h2>
        <p className="mt-2 font-black text-[var(--muted)]">
          Current result: {outcomeLabel(lead.status)}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-4">
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
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => setStatus('won')}>WON</button>
          <button className="jf-button bg-white text-[var(--ink)]" onClick={() => setStatus('lost')}>LOST</button>
          <button className="jf-button bg-[var(--bg-main)] text-[var(--ink)]" onClick={() => setStatus('no_answer')}>NO ANSWER</button>
        </div>
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
