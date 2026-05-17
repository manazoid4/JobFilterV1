import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChaseLeads, snoozeChaseLead } from '../lib/chaseStore';
import { getMonthlyStats, getWinData } from '../lib/winStore';
import type { ChaseLead } from '../lib/types';

export function DashboardPage() {
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0 });
  const [winData, setWinData] = useState({ wins: 0, losses: 0 });
  const [totalValueAllTime, setTotalValueAllTime] = useState(0);
  const [territory, setTerritory] = useState<string | null>(null);

  useEffect(() => {
    const cl = getChaseLeads();
    setChaseLeads(cl);
    const ms = getMonthlyStats();
    setMonthlyStats(ms);
    const wd = getWinData();
    setWinData({ wins: wd.wins.length, losses: wd.losses.length });
    setTotalValueAllTime(wd.wins.reduce((s, w) => s + w.value, 0));
    setTerritory(localStorage.getItem('jobfilter.territory'));
  }, []);

  const activeChase = chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length;
  const wonChase = chaseLeads.filter((l) => l.stage === 'won').length;
  const overdueLeads = chaseLeads.filter((l) => l.nextNudgeAt && new Date(l.nextNudgeAt).getTime() < Date.now() && l.stage !== 'won' && l.stage !== 'lost');
  const overdueCount = overdueLeads.length;
  const notContacted = chaseLeads.filter((l) => l.stage === 'not_contacted').length;
  const isEmpty = activeChase === 0 && monthlyStats.count === 0 && winData.wins === 0;

  function handleSnooze(leadId: string) {
    snoozeChaseLead(leadId);
    setChaseLeads(getChaseLeads());
  }

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      {/* Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">PIPELINE</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">YOUR JOBS. TRACKED.</h1>
        <p className="mt-3 max-w-2xl font-black text-white/90">
          Scan. Track. Close. Everything in one place. No fluff, no jargon — just your work, organised.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="inline-flex items-center gap-2 border-2 border-white/20 bg-white/10 px-3 py-1.5">
            <span className={`h-2 w-2 rounded-full shrink-0 ${territory ? 'bg-[var(--green)]' : 'bg-[var(--orange)]'}`} />
            <span className="font-mono text-xs font-black uppercase text-white/80">
              Territory: {territory ?? 'Not Locked'}
            </span>
          </div>
          {territory ? (
            <p className="text-xs font-black text-white/60">
              Locked — Gold leads in this patch won&apos;t go to other {territory.split(' ')[1] || 'trades'} before you.
            </p>
          ) : (
            <p className="text-xs font-black text-white/60">
              No territory = same leads as everyone else.{' '}
              <Link to="/territories" className="text-[var(--yellow)] underline underline-offset-2">
                Lock yours →
              </Link>
            </p>
          )}
        </div>
      </section>

      {isEmpty && (
        <section className="jf-box bg-[var(--yellow)] p-8 text-center">
          <p className="micro-label text-[var(--ink)]">START HERE</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">YOUR PIPELINE IS EMPTY.</h2>
          <p className="mt-3 max-w-lg mx-auto font-black text-[var(--ink)]">
            Enter your postcode. Pick your trade. See what jobs are live near you — then track the ones worth chasing.
          </p>
          <Link to="/find-jobs" className="jf-button mt-5 bg-[var(--ink)] text-white inline-block">
            SCAN FOR JOBS →
          </Link>
        </section>
      )}

      {/* Pipeline Visual */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/find-jobs" className="block border-2 border-[var(--ink)] bg-[var(--yellow)] p-5 hover:opacity-90 transition shadow-[4px_4px_0_var(--ink)]">
            <p className="micro-label text-[var(--ink)]">SCAN NOW →</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">SCAN</p>
            <p className="mt-1 text-sm font-black text-[var(--ink)]">Find jobs worth pricing</p>
          </Link>
          <Link to="/leads" className="block border-2 border-[var(--ink)] bg-white p-5 relative hover:bg-[var(--offwhite)] transition">
            <p className="micro-label text-[var(--muted)]">TRACKING</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">{activeChase}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {activeChase === 0 ? 'Scan for jobs → add them here to track' : 'leads in your pipeline'}
            </p>
            <p className="mt-2 text-xs font-black text-[var(--navy)] underline underline-offset-2">View chase list →</p>
            {overdueCount > 0 && (
              <span className="absolute top-3 right-3 badge bg-[var(--orange)] text-white text-[10px] font-black">{overdueCount} OVERDUE</span>
            )}
          </Link>
          <div className="block border-2 border-[var(--ink)] bg-white p-5">
            <p className="micro-label text-[var(--muted)]">RESULTS</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">{monthlyStats.count}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {monthlyStats.count === 0 ? 'Open any lead → mark it Won to record value' : `won this month · £${monthlyStats.totalValue.toLocaleString()}`}
            </p>
          </div>
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
            {overdueLeads.map((l) => (
              <div key={l.leadId} className="flex items-center justify-between gap-4 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
                <div className="min-w-0">
                  <p className="truncate font-black text-[var(--ink)]">{l.leadTitle}</p>
                  <p className="text-xs font-black text-[var(--muted)]">{l.location} · {l.stage.replace('_', ' ')}</p>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    onClick={() => handleSnooze(l.leadId)}
                    className="jf-button bg-white text-[var(--ink)] text-sm"
                  >
                    SNOOZE 24H
                  </button>
                  <Link to={`/leads/${l.leadId}`} className="jf-button bg-[var(--navy)] text-white text-sm">
                    VIEW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Find Summary */}
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--muted)]">SCAN</p>
            <Link to="/find-jobs" className="text-xs font-black text-[var(--navy)] underline underline-offset-2">OPEN →</Link>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR INTAKE</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Row label="Status" value="Ready to scan" />
            <Row label="Last action" value="Tap a trade to start" />
          </div>
        </section>

        {/* Chase Summary */}
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--muted)]">TRACKING</p>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR PIPELINE</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Row label="Active" value={`${activeChase} leads`} />
            <Row label="Not contacted" value={`${notContacted} need first touch`} />
            <Row label="Won" value={`${wonChase} closed`} />
            {overdueCount > 0 && <Row label="Overdue" value={`${overdueCount} need attention`} />}
          </div>
        </section>

        {/* Win Summary */}
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--muted)]">RESULTS</p>
          </div>
          <p className="headline mt-3 text-2xl leading-none">YOUR SCOREBOARD</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Row label="This month" value={`${monthlyStats.count} wins`} />
            <Row label="This month value" value={`£${monthlyStats.totalValue.toLocaleString()}`} />
            <Row label="All time" value={`${winData.wins} wins · £${totalValueAllTime.toLocaleString()}`} />
            <Row label="Losses" value={`${winData.losses} logged`} />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="jf-box bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">QUICK ACTIONS</p>
          <div className="mt-4 grid gap-3">
            {!territory && (
              <Link to="/territories" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center text-sm">
                LOCK YOUR TERRITORY →
              </Link>
            )}
            <Link to="/find-jobs" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center">
              SCAN FOR JOBS
            </Link>
          </div>
        </section>
      </div>
    </main>
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
