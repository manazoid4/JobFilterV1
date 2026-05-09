import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredLeads } from '../lib/leadStore';

type Tab = 'gold' | 'silver' | 'bin';

export function LeadListPage() {
  const [tab, setTab] = useState<Tab>('gold');
  const stored = getStoredLeads();

  const gold   = stored.filter((l) => l.score >= 80 && l.status !== 'ignored');
  const silver = stored.filter((l) => l.score >= 50 && l.score < 80 && l.status !== 'ignored');
  const bin    = stored.filter((l) => l.score < 50 || l.status === 'ignored');

  const visible = tab === 'gold' ? gold : tab === 'silver' ? silver : bin;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'gold',   label: 'GOLD',   count: gold.length },
    { id: 'silver', label: 'SILVER', count: silver.length },
    { id: 'bin',    label: 'BIN',    count: bin.length },
  ];

  return (
    <main className="page-shell grid gap-5 py-8 pb-8">

      {/* ── Header ─────────────────────────────── */}
      <div className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">INTAKE ENGINE</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl md:text-7xl text-[var(--yellow)]">
          YOUR LEADS
        </h1>
        <p className="mt-3 max-w-xl text-lg font-black text-white/70">
          Scored leads from your filter link. Gold means act now. Silver means worth watching. Bin means skip it.
        </p>
      </div>

      {/* ── Vantage Insight card ────────────────── */}
      <div className="jf-box bg-[var(--navy)] p-5 text-white">
        <div className="flex items-center gap-5">
          <div className="flex flex-shrink-0 flex-col items-center justify-center w-16 h-16 bg-[var(--yellow)] border-2 border-[var(--navy)]">
            <span className="headline text-xl leading-none text-[var(--navy)]">98.4%</span>
            <span className="mt-0.5 text-[9px] font-black uppercase text-[var(--navy)]">Accuracy</span>
          </div>
          <div>
            <p className="micro-label text-[var(--yellow)]">
              VANTAGE INSIGHT
            </p>
            <p className="mt-1 text-[14px] font-black leading-snug text-white/85">
              Based on your trade and area, GOLD leads this week are 98.4% likely to convert at your quoted rate.
            </p>
          </div>
        </div>
      </div>

      {/* ── Live feed ticker ────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[var(--yellow)] border-2 border-[var(--navy)]">
        <span className="flex-shrink-0 text-[11px] font-black uppercase text-[var(--navy)] border-r-2 border-[var(--navy)] pr-3 mr-1">
          LIVE
        </span>
        <p className="truncate text-sm font-black text-[var(--navy)]">
          New GOLD lead — E8 · Bathroom refit · £3,200 est. · 4 mins ago
        </p>
      </div>

      {/* ── Tabs ────────────────────────────────── */}
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

      {/* ── Lead cards ──────────────────────────── */}
      {visible.length === 0 ? (
        <div className="jf-box bg-white p-8 text-center">
          <h2 className="headline text-2xl uppercase text-[var(--navy)]">NO {tab} LEADS YET</h2>
          <p className="mt-2 text-[15px] text-[var(--muted)]">Share your filter link to start receiving leads.</p>
          <Link className="jf-button mt-5 bg-[var(--yellow)] text-[var(--navy)]" to="/my-link">
            GET MY LINK
          </Link>
        </div>
      ) : (
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
                    href={`https://wa.me/?text=${encodeURIComponent(`Hi, I saw your job on JobFilter — ${lead.jobType} in ${lead.area}. Happy to quote.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="jf-button flex-1 bg-[var(--green)] text-white"
                  >
                    WHATSAPP PING
                  </a>
                  <Link to={`/leads/${lead.id}`} className="jf-button flex-1 bg-[var(--navy)] text-white">
                    VIEW FULL DETAILS →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
