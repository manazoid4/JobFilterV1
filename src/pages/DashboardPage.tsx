import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChaseLeads } from '../lib/chaseStore';
import { getMonthlyStats, getWinData } from '../lib/winStore';
import type { ChaseLead } from '../lib/types';

export function DashboardPage() {
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0 });
  const [winData, setWinData] = useState({ wins: 0, losses: 0 });
  const [totalValueAllTime, setTotalValueAllTime] = useState(0);

  useEffect(() => {
    const cl = getChaseLeads();
    setChaseLeads(cl);
    const ms = getMonthlyStats();
    setMonthlyStats(ms);
    const wd = getWinData();
    setWinData({ wins: wd.wins.length, losses: wd.losses.length });
    setTotalValueAllTime(wd.wins.reduce((s, w) => s + w.value, 0));
  }, []);

  const activeChase = chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length;
  const wonChase = chaseLeads.filter((l) => l.stage === 'won').length;
  const overdueCount = chaseLeads.filter((l) => l.nextNudgeAt && new Date(l.nextNudgeAt).getTime() < Date.now() && l.stage !== 'won' && l.stage !== 'lost').length;
  const notContacted = chaseLeads.filter((l) => l.stage === 'not_contacted').length;
  const isEmpty = activeChase === 0 && monthlyStats.count === 0 && winData.wins === 0;

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      {/* Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">TRIPLE ENGINE</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">FIND → CHASE → WIN</h1>
        <p className="mt-3 max-w-2xl font-black text-white/70">
          One flow. Three engines. Find the jobs. Chase them down. Win the work. This is your pipeline at a glance.
        </p>
      </section>

      {isEmpty && (
        <section className="jf-box bg-[var(--yellow)] p-8 text-center">
          <p className="micro-label text-[var(--ink)]">START HERE</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">YOUR PIPELINE IS EMPTY.</h2>
          <p className="mt-3 max-w-lg mx-auto font-black text-[var(--ink)]/75">
            No data yet because you haven't scanned for jobs. Head to Find Jobs, enter your postcode, and see what's live near you.
          </p>
          <Link to="/find-jobs" className="jf-button mt-5 bg-[var(--ink)] text-white inline-block">
            SCAN FOR JOBS →
          </Link>
        </section>
      )}

      {/* Pipeline Visual */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/find-jobs" className="block border-2 border-[var(--ink)] bg-white p-5 hover:bg-[var(--yellow)]/20 transition">
            <p className="micro-label text-[var(--muted)]">FIND ENGINE</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">SCAN</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">Find jobs worth pricing</p>
          </Link>
          <Link to="/chase" className="block border-2 border-[var(--ink)] bg-white p-5 hover:bg-[var(--yellow)]/20 transition relative">
            <p className="micro-label text-[var(--muted)]">CHASE ENGINE</p>
            <p className="headline mt-2 text-4xl leading-none text-[var(--ink)]">{activeChase}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">leads being chased</p>
            {overdueCount > 0 && (
              <span className="absolute top-3 right-3 badge bg-[var(--orange)] text-white text-[10px] font-black">{overdueCount} OVERDUE</span>
            )}
          </Link>
          <Link to="/win" className="block border-2 border-[var(--ink)] bg-white p-5 hover:bg-[var(--yellow)]/20 transition">
            <p className="micro-label text-[var(--muted)]">WIN ENGINE</p>
            <p className="headline mt-2 text-4xl leading-none text-green-700">{monthlyStats.count}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">won this month · £{monthlyStats.totalValue.toLocaleString()}</p>
          </Link>
        </div>
      </section>

      {/* Detailed Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Find Summary */}
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--muted)]">FIND ENGINE</p>
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
            <p className="micro-label text-[var(--muted)]">CHASE ENGINE</p>
            <Link to="/chase" className="text-xs font-black text-[var(--navy)] underline underline-offset-2">OPEN →</Link>
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
            <p className="micro-label text-[var(--muted)]">WIN ENGINE</p>
            <Link to="/win" className="text-xs font-black text-[var(--navy)] underline underline-offset-2">OPEN →</Link>
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
            <Link to="/find-jobs" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center">
              SCAN FOR JOBS
            </Link>
            <Link to="/chase" className="jf-button w-full bg-white text-[var(--ink)] text-center">
              CHECK CHASE ({activeChase} ACTIVE)
            </Link>
            <Link to="/win" className="jf-button w-full bg-[var(--green)] text-white text-center">
              VIEW SCOREBOARD
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
