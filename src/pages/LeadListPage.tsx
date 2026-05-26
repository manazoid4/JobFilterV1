"use client";
import { useMemo, useState } from 'react';
import Link from 'next/link';

import { getStoredLeads } from '../lib/leadStore';
import type { LeadDecision } from '../lib/types';

type Tab = 'gold' | 'silver' | 'bin';

function leadsToCsv(leads: LeadDecision[]): string {
  const headers = ['Score', 'Job Type', 'Area', 'Postcode', 'Urgency', 'Budget', 'Phone', 'Status', 'Flags', 'Created'];
  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [l.score, l.jobType, l.area, l.postcode, l.urgency, l.budget ?? '', l.phone ?? '', l.status, (l.flags ?? []).join('|'), l.createdAt]
      .map(escape)
      .join(','),
  );
  return [headers.join(','), ...rows].join('\r\n');
}

function downloadCsv(leads: LeadDecision[], tab: Tab) {
  if (leads.length === 0) return;
  const blob = new Blob([leadsToCsv(leads)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jobfilter-${tab}-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function LeadListPage() {
  const [tab, setTab] = useState<Tab>('gold');
  const [query, setQuery] = useState('');
  const stored = getStoredLeads();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stored;
    return stored.filter((l) =>
      [l.jobType, l.area, l.postcode, l.details, (l.flags ?? []).join(' ')]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q)),
    );
  }, [stored, query]);

  const gold   = filtered.filter((l) => l.score >= 80 && l.status !== 'ignored');
  const silver = filtered.filter((l) => l.score >= 50 && l.score < 80 && l.status !== 'ignored');
  const bin    = filtered.filter((l) => l.score < 50 || l.status === 'ignored');

  const wonCount       = stored.filter((l) => l.status === 'won').length;
  const lostCount      = stored.filter((l) => l.status === 'lost').length;
  const noAnswerCount  = stored.filter((l) => l.status === 'no_answer').length;

  const visible = tab === 'gold' ? gold : tab === 'silver' ? silver : bin;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'gold',   label: 'GOLD',   count: gold.length },
    { id: 'silver', label: 'SILVER', count: silver.length },
    { id: 'bin',    label: 'BIN',    count: bin.length },
  ];

  return (
    <main className="page-shell grid gap-5 py-8 pb-8">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">JOB PIPELINE</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl md:text-7xl text-[var(--yellow)]">
          YOUR LEADS
        </h1>
        <p className="mt-3 max-w-xl text-lg font-black text-white/90">
          Every lead scored before it reaches you — not recycled from Checkatrade or Bark. GOLD = call today. SILVER = watch it. BIN = don't waste your time.
        </p>
      </div>

      {/* ── How scoring works ────────────────────── */}
      <div className="jf-box bg-[var(--navy)] p-5 text-white">
        <div className="flex items-center gap-5">
          <div className="flex flex-shrink-0 flex-col items-center justify-center w-16 h-16 bg-[var(--yellow)] border-2 border-[var(--navy)]">
            <span className="headline text-xl leading-none text-[var(--navy)]">100</span>
            <span className="mt-0.5 text-[9px] font-black uppercase text-[var(--navy)]">Max score</span>
          </div>
          <div>
            <p className="micro-label text-[var(--yellow)]">HOW IT'S SCORED</p>
            <p className="mt-1 text-[14px] font-black leading-snug text-white/85">
              Your trade, how far from your base, urgency, job value, and verified evidence — combined into one score. GOLD means call today. SILVER means watch it. BIN it if the score says don't bother.
            </p>
          </div>
        </div>
      </div>

      {/* ── OUTCOMES summary ─────────────────────────────────── */}
      {stored.length > 0 && (wonCount > 0 || lostCount > 0 || noAnswerCount > 0) && (
        <div className="jf-box bg-white p-4">
          <p className="micro-label text-[var(--muted)] mb-3">OUTCOMES</p>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 px-3 py-2 border-2 border-[var(--green)] text-sm font-black text-[var(--green)]">
              WON <span className="ml-1">{wonCount}</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-2 border-2 border-[var(--orange)] text-sm font-black text-[var(--orange)]">
              LOST <span className="ml-1">{lostCount}</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-2 border-2 border-[var(--muted)] text-sm font-black text-[var(--muted)]">
              NO ANSWER <span className="ml-1">{noAnswerCount}</span>
            </span>
          </div>
        </div>
      )}

      {/* ── Tip banner ────────────────────────────────────── */}
      <div className="flex items-start gap-3 px-4 py-3 bg-[var(--yellow)] border-2 border-[var(--navy)]">
        <span className="flex-shrink-0 text-[11px] font-black uppercase text-[var(--navy)] border-r-2 border-[var(--navy)] pr-3 mr-1 mt-0.5">
          TIP
        </span>
        <p className="text-sm font-black text-[var(--navy)]">
          Call GOLD leads the same day. Response rate drops 60% after 24 hours.
        </p>
      </div>

      {/* ── Empty state — shown when no leads at all ─────────── */}
      {stored.length === 0 && (
        <div className="jf-box bg-[var(--yellow)] p-8 text-center">
          <h2 className="headline text-3xl uppercase text-[var(--ink)]">YOUR LIST IS EMPTY.</h2>
          <p className="mt-3 max-w-sm mx-auto text-[15px] font-black text-[var(--ink)]/80">
            Scan your postcode → find jobs scored for your trade → tap TRACK THIS LEAD on any result. It lands here so you can chase it.
          </p>
          <Link className="jf-button mt-5 inline-block bg-[var(--ink)] text-white" href="/find-jobs">
            SCAN FOR JOBS NOW →
          </Link>
          <p className="mt-3 text-xs font-black text-[var(--ink)]/60">No credit card required</p>
        </div>
      )}

      {/* ── Search + Export — only shown when leads exist ─── */}
      {stored.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads — job type, area, postcode, keyword"
            className="flex-1 border-2 border-[var(--navy)] bg-white px-4 py-3 text-sm font-black text-[var(--ink)] placeholder:text-[var(--muted)]"
          />
          <button
            type="button"
            onClick={() => downloadCsv(visible, tab)}
            disabled={visible.length === 0}
            className="jf-button bg-[var(--navy)] text-white sm:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download visible leads as CSV"
          >
            EXPORT CSV ({visible.length})
          </button>
        </div>
      )}

      {/* ── Tabs — only shown when leads exist ───────────── */}
      {stored.length > 0 && (
        <div className="flex border-2 border-[var(--navy)] bg-[var(--paper)]">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-1 items-center justify-center gap-2 py-3 font-black uppercase text-sm tracking-wider transition-colors ${
                tab === t.id ? 'bg-[var(--navy)] text-[var(--yellow)]' : 'text-[var(--navy)] hover:bg-[var(--yellow)]/20'
              } ${i < tabs.length - 1 ? 'border-r-2 border-[var(--navy)]' : ''}`}
            >
              <span>{t.label}</span>
              <span className={`flex h-5 min-w-[20px] items-center justify-center px-1 text-[11px] font-black ${
                tab === t.id ? 'bg-[var(--yellow)] text-[var(--navy)]' : 'bg-[var(--offwhite)] text-[var(--navy)]'
              } border border-[var(--navy)]`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Lead cards ────────────────────────────────────────── */}
      {stored.length > 0 && visible.length === 0 ? (
        <div className="jf-box bg-white p-8 text-center">
          {query ? (
            <>
              <h2 className="headline text-2xl uppercase text-[var(--navy)]">NO {tab.toUpperCase()} LEADS MATCH</h2>
              <p className="mt-3 max-w-sm mx-auto text-[15px] font-black text-[var(--muted)]">
                Try a different tab or clear your search filter.
              </p>
              <button
                onClick={() => { setQuery(''); setTab('gold'); }}
                className="jf-button mt-5 bg-[var(--navy)] text-white"
              >
                CLEAR FILTER
              </button>
            </>
          ) : (
            <>
              <h2 className="headline text-2xl uppercase text-[var(--navy)]">
                {tab === 'gold' ? 'NO GOLD LEADS YET' : tab === 'silver' ? 'NO SILVER LEADS YET' : 'BIN IS EMPTY'}
              </h2>
              <p className="mt-3 max-w-sm mx-auto text-[15px] font-black text-[var(--muted)]">
                {tab === 'gold'
                  ? 'Scan your postcode to find jobs worth calling today. GOLD leads appear here when the score is 80+.'
                  : tab === 'silver'
                  ? 'SILVER leads (score 50–79) appear here. Run a scan to fill your pipeline.'
                  : 'Good — no low-quality leads in your pipeline.'}
              </p>
              {tab !== 'bin' && (
                <Link href="/find-jobs" className="jf-button mt-5 inline-block bg-[var(--yellow)] text-[var(--ink)]">
                  SCAN FOR JOBS →
                </Link>
              )}
            </>
          )}
        </div>
      ) : stored.length > 0 ? (
        <div className="flex flex-col gap-5">
          {visible.map((lead) => {
            const urgencyColor = lead.urgency === 'Emergency'
              ? 'bg-[var(--orange)] text-white'
              : lead.urgency === 'This week'
                ? 'bg-[var(--yellow)] text-[var(--navy)]'
                : 'bg-[var(--offwhite)] text-[var(--muted)]';
            return (
              <div key={lead.id} className="jf-box bg-white">
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 p-5 border-b-2 border-[var(--navy)]">
                  <div>
                    <p className="micro-label text-[var(--muted)]">
                      {lead.area}
                    </p>
                    <h3 className="headline mt-1 text-2xl uppercase text-[var(--navy)]">
                      {lead.jobType}
                    </h3>
                  </div>
                  <span className="flex-shrink-0 px-3 py-1 text-sm font-black uppercase border-2 border-[var(--navy)] bg-[var(--yellow)] text-[var(--navy)]">
                    SCORE {lead.score}
                  </span>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b-2 border-[var(--navy)]">
                  {(lead.flags ?? []).slice(0, 4).map((flag: string) => (
                    <span key={flag} className="px-2 py-1 text-xs font-black uppercase border border-[var(--navy)] bg-[var(--offwhite)] text-[var(--navy)]">
                      {flag}
                    </span>
                  ))}
                  {lead.urgency && (
                    <span className={`px-2 py-1 text-xs font-black uppercase border border-[var(--navy)] ${urgencyColor}`}>
                      {lead.urgency} URGENCY
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 p-5 sm:flex-row">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hi, saw your ${lead.jobType} job in ${lead.area}. I'm local and can quote this week — happy to pop round. Let me know.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="jf-button flex-1 bg-[var(--green)] text-white"
                  >
                    SEND WHATSAPP
                  </a>
                  <Link href={`/leads/${lead.id}`} className="jf-button flex-1 bg-[var(--navy)] text-white">
                    VIEW FULL DETAILS →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </main>
  );
}
