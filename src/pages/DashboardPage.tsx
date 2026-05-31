"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getChaseLeads, snoozeChaseLead } from '../lib/chaseStore';
import { getMonthlyStats, getWinBreakdown, getWinData } from '../lib/winStore';
import type { ChaseLead } from '../lib/types';

export function DashboardPage() {
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0 });
  const [winData, setWinData] = useState({ wins: 0, losses: 0 });
  const [totalValueAllTime, setTotalValueAllTime] = useState(0);
  const [breakdown, setBreakdown] = useState<ReturnType<typeof getWinBreakdown>>({ byTrade: [], byLocation: [], bySource: [] });
  const [territory, setTerritory] = useState<string | null>(null);
  const [scanTrade, setScanTrade] = useState<string | null>(null);
  const [scanPostcode, setScanPostcode] = useState<string | null>(null);
  const [scansUsed, setScansUsed] = useState(0);
  const [trackedLeadCount, setTrackedLeadCount] = useState(0);

  useEffect(() => {
    const cl = getChaseLeads();
    setChaseLeads(cl);
    const ms = getMonthlyStats();
    setMonthlyStats(ms);
    const wd = getWinData();
    setWinData({ wins: wd.wins.length, losses: wd.losses.length });
    setTotalValueAllTime(wd.wins.reduce((s, w) => s + w.value, 0));
    setBreakdown(getWinBreakdown());
    setTerritory((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.territory'));
    setScanTrade((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.trade'));
    setScanPostcode((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.postcode'));
    setScansUsed(Number((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jf-weekly-scans-used')) || 0);
    const tracked = JSON.parse((typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.find.tracked') || '[]') as string[];
    setTrackedLeadCount(tracked.length);
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
            <p className="text-xs font-black text-white/60">
              Gold leads shown to you first — your competition gets them 24h later.
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-xs font-black text-white/60">
                No patch locked — you&apos;re racing every other trade for the same leads.
              </p>
              <Link href="/territories" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-xs py-1.5 px-3 shrink-0">
                LOCK YOUR PATCH →
              </Link>
            </div>
          )}
        </div>
      </section>

      {isEmpty && (
        <div className="jf-box border-2 border-[var(--orange)] bg-[var(--orange)]/5 p-8 text-center">
          <p className="micro-label text-[var(--orange)]">NO PIPELINE YET</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">YOUR FIRST SCAN IS FREE.</h2>
          <p className="mt-3 max-w-lg mx-auto font-black text-[var(--ink)]/80 text-sm">
            Find a job before Checkatrade lists it. One £2,000 win and the Patch Plan pays for itself — founding rate £39/mo, no shared auction.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/find-jobs" className="jf-button bg-[var(--ink)] text-white">RUN YOUR FIRST SCAN →</Link>
            <Link href="/pricing" className="jf-button bg-white text-[var(--ink)] border-2 border-[var(--ink)]">SEE PRICING</Link>
          </div>
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
              {activeChase === 0 ? 'Your active chases — scan first, then tap TRACK THIS LEAD' : 'leads in your pipeline'}
            </p>
            <p className="mt-2 text-xs font-black text-[var(--navy)] underline underline-offset-2">View chase list →</p>
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
                  <Link href={`/leads/${l.leadId}`} className="jf-button bg-[var(--navy)] text-white text-sm">
                    VIEW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Admin Guard Entry Card */}
      <section className="jf-box bg-[var(--yellow)] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="micro-label text-[var(--ink)]">TRADE COMMAND CENTRE</p>
            <h2 className="headline mt-1 text-2xl leading-none text-[var(--ink)]">ADMIN GUARD</h2>
            <p className="mt-2 font-black text-[var(--ink)]/80 text-sm max-w-sm">
              HMRC deadlines, monthly checklists and calendar exports. Keep the boring dates under control.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/admin-guard" className="jf-button bg-[var(--ink)] text-white text-sm">
              OPEN ADMIN GUARD →
            </Link>
            <Link href="/features/admin-guard" className="jf-button bg-white text-[var(--ink)] text-sm">
              WHAT DOES IT TRACK? →
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Find Summary */}
        <section className="jf-box bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="micro-label text-[var(--muted)]">SCAN</p>
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
            <Row label="Scans this week" value={scansUsed === 0 ? 'None yet' : scansUsed >= 3 ? `${scansUsed} of 3 used` : `${scansUsed} of 3 free used`} />
            {scansUsed >= 3 && <RowLink label="Scan limit reached" href="/pricing" cta="Upgrade for unlimited →" />}
            <Row label="Leads flagged" value={trackedLeadCount === 0 ? 'None tracked yet' : `${trackedLeadCount} in your list`} />
          </div>
        </section>

        {/* Chase Summary */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--orange)', borderLeftWidth: '4px' }}>
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
          {activeChase === 0 && (
            <p className="mt-3 border-t border-[var(--line)] pt-3 text-xs font-black text-[var(--muted)]">
              Track a lead from Find Jobs — your list stays here so you know who to contact first.
            </p>
          )}
        </section>

        {/* Win Summary */}
        <section className="jf-box bg-white p-5" style={{ borderLeftColor: 'var(--green)', borderLeftWidth: '4px' }}>
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
              <Link href="/territories" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center text-sm">
                LOCK YOUR PATCH →
              </Link>
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
