import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredLeads } from '../lib/leadStore';

type Tab = 'gold' | 'silver' | 'bin';

const urgencyColour: Record<string, { bg: string; text: string }> = {
  high:   { bg: '#ef4444', text: 'white' },
  medium: { bg: 'var(--yellow)', text: 'var(--navy)' },
  low:    { bg: 'var(--offwhite)', text: 'var(--muted)' },
};

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
    <main style={{ background: 'var(--offwhite)', minHeight: '100vh' }} className="pb-24 md:pb-0">
      <div className="page-shell py-10">

        {/* ── Header ─────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-2">
          <span
            className="inline-block w-fit px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
            style={{ background: 'var(--navy)', color: 'var(--yellow)' }}
          >
            Intake Engine™
          </span>
          <h1
            className="headline"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.0, color: 'var(--navy)' }}
          >
            Your Leads
          </h1>
        </div>

        {/* ── Vantage Insight card ────────────────── */}
        <div
          className="mb-8 flex items-center gap-5 p-5"
          style={{
            background: 'var(--navy)',
            border: '2px solid var(--navy)',
            boxShadow: '8px 8px 0 var(--yellow)',
          }}
        >
          <div
            className="flex flex-shrink-0 flex-col items-center justify-center"
            style={{
              width: 72,
              height: 72,
              background: 'var(--yellow)',
              border: '2px solid rgba(255,255,255,0.25)',
            }}
          >
            <span className="headline text-[20px] leading-none text-[var(--navy)]">98.4%</span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[var(--navy)]">Accuracy</span>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--yellow)]">
              Vantage™ Insight
            </p>
            <p className="mt-1 text-[14px] font-medium leading-snug text-white">
              Based on your trade and area, GOLD leads this week are 98.4% likely to convert at your quoted rate.
            </p>
          </div>
        </div>

        {/* ── Live feed ticker ────────────────────── */}
        <div
          className="mb-8 flex items-center gap-3 overflow-hidden px-4 py-2"
          style={{ background: 'var(--yellow)', border: '2px solid var(--navy)' }}
        >
          <span
            className="flex-shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]"
            style={{ borderRight: '2px solid var(--navy)', paddingRight: 10, marginRight: 2 }}
          >
            ⚡ Live
          </span>
          <p className="truncate text-[12px] font-bold uppercase text-[var(--navy)]">
            New GOLD lead — E8 · Bathroom refit · £3,200 est. · 4 mins ago
          </p>
        </div>

        {/* ── Tabs ────────────────────────────────── */}
        <div
          className="mb-6 flex"
          style={{ border: '2px solid var(--navy)', background: 'var(--paper)' }}
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex flex-1 items-center justify-center gap-2 py-3 transition-colors"
              style={{
                background: tab === t.id ? 'var(--navy)' : 'transparent',
                borderRight: i < tabs.length - 1 ? '2px solid var(--navy)' : 'none',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: '0.06em',
                color: tab === t.id ? 'var(--yellow)' : 'var(--navy)',
                cursor: 'pointer',
                border: tab === t.id ? 'none' : 'none',
                outline: 'none',
              }}
            >
              <span>{t.label}</span>
              <span
                className="flex h-5 min-w-[20px] items-center justify-center px-1 text-[11px]"
                style={{
                  background: tab === t.id ? 'var(--yellow)' : 'var(--offwhite)',
                  color: 'var(--navy)',
                  border: '1px solid var(--navy)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                }}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab border fix */}
        <style>{`
          .lead-tabs button { border-right: 2px solid var(--navy) !important; }
          .lead-tabs button:last-child { border-right: none !important; }
        `}</style>

        {/* ── Lead cards ──────────────────────────── */}
        {visible.length === 0 ? (
          <div
            className="p-8 text-center"
            style={{ border: '2px solid var(--navy)', background: 'var(--paper)', boxShadow: '6px 6px 0 var(--yellow)' }}
          >
            <h2 className="headline text-[22px] uppercase text-[var(--navy)]">No {tab} leads yet</h2>
            <p className="mt-2 text-[14px] text-[var(--muted)]">Share your filter link to start receiving leads.</p>
            <Link
              className="jf-button mt-5 inline-flex bg-[var(--yellow)] text-[var(--navy)]"
              to="/my-link"
            >
              Get My Link
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {visible.map((lead) => {
              const urg = urgencyColour[lead.urgency ?? 'low'] ?? urgencyColour.low;
              return (
                <div
                  key={lead.id}
                  style={{
                    background: 'var(--paper)',
                    border: '2px solid var(--navy)',
                    boxShadow: '6px 6px 0 var(--yellow)',
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-start justify-between gap-4 p-5"
                    style={{ borderBottom: '2px solid var(--navy)' }}
                  >
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                        {lead.area}
                      </p>
                      <h3 className="headline mt-1 text-[20px] uppercase text-[var(--navy)]">
                        {lead.jobType}
                      </h3>
                    </div>
                    <span
                      className="flex-shrink-0 px-2 py-[3px] text-[12px] font-bold uppercase"
                      style={{
                        background: lead.score >= 80 ? 'var(--yellow)' : lead.score >= 50 ? 'var(--offwhite)' : '#fee2e2',
                        border: '2px solid var(--navy)',
                        color: 'var(--navy)',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Score {lead.score}
                    </span>
                  </div>

                  {/* Tags row */}
                  <div
                    className="flex flex-wrap items-center gap-2 px-5 py-3"
                    style={{ borderBottom: '2px solid var(--navy)' }}
                  >
                    {(lead.flags ?? []).slice(0, 4).map((flag: string) => (
                      <span
                        key={flag}
                        className="px-2 py-[2px] text-[10px] font-bold uppercase"
                        style={{ background: 'var(--offwhite)', border: '1px solid var(--navy)', color: 'var(--navy)' }}
                      >
                        {flag}
                      </span>
                    ))}
                    {lead.urgency && (
                      <span
                        className="px-2 py-[2px] text-[10px] font-bold uppercase"
                        style={{ background: urg.bg, border: '1px solid var(--navy)', color: urg.text }}
                      >
                        {lead.urgency} urgency
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 p-5 sm:flex-row">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Hi, I saw your job on JobFilter™ — ${lead.jobType} in ${lead.area}. Happy to quote.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-all active:translate-y-[1px]"
                      style={{
                        background: '#25D366',
                        color: 'white',
                        border: '2px solid var(--navy)',
                        boxShadow: '3px 3px 0 var(--navy)',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        textDecoration: 'none',
                      }}
                    >
                      💬 WhatsApp Ping
                    </a>
                    <Link
                      to={`/leads/${lead.id}`}
                      className="flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-all active:translate-y-[1px]"
                      style={{
                        background: 'var(--navy)',
                        color: 'var(--paper)',
                        border: '2px solid var(--navy)',
                        boxShadow: '3px 3px 0 var(--yellow)',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        textDecoration: 'none',
                      }}
                    >
                      View Full Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
