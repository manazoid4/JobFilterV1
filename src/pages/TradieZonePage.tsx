import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPinned, FileText, Camera, LayoutGrid, Radio, ShieldCheck, TrendingUp, MessageSquare, LetterText, FileSearch, Eye } from 'lucide-react';
import { getChaseLeads } from '../lib/chaseStore';
import { getMonthlyStats } from '../lib/winStore';
import type { ChaseLead } from '../lib/types';

const memberTools = [
  { id: 'codex', name: 'Codex', desc: 'Simplify technical documents', icon: FileSearch, path: '/codex', colour: 'bg-[var(--navy)] text-white' },
  { id: 'vantage', name: 'Vantage', desc: 'Generate bid decks', icon: LayoutGrid, path: '/vantage', colour: 'bg-[var(--yellow)] text-[var(--ink)]' },
  { id: 'vicinity', name: 'Vicinity', desc: 'Social proof from photos', icon: Camera, path: '/vicinity', colour: 'bg-[var(--green)] text-white' },
  { id: 'letters', name: 'Letters', desc: 'Branded approach letters', icon: LetterText, path: '/dashboard', colour: 'bg-[var(--orange)] text-white' },
];

const quickActions = [
  { label: 'Scan My Area', path: '/find-jobs', icon: Radio, colour: 'bg-[var(--yellow)] text-[var(--ink)]' },
  { label: 'My Pipeline', path: '/dashboard', icon: TrendingUp, colour: 'bg-[var(--navy)] text-white' },
  { label: 'My Territory', path: '/territories', icon: MapPinned, colour: 'bg-[var(--green)] text-white' },
  { label: 'Free Tools', path: '/free-tools', icon: Zap, colour: 'bg-[var(--orange)] text-white' },
];

export function TradieZonePage() {
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0 });
  const [memberName, setMemberName] = useState<string>('');
  const [memberTerritory, setMemberTerritory] = useState<string>('');

  useEffect(() => {
    const cl = getChaseLeads();
    setChaseLeads(cl);
    const ms = getMonthlyStats();
    setMonthlyStats(ms);
    try {
      const stored = localStorage.getItem('jf-member-name');
      if (stored) setMemberName(stored);
      const territory = localStorage.getItem('jf-territory');
      if (territory) setMemberTerritory(territory);
    } catch { /* ignore */ }
  }, []);

  const activeChase = chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length;
  const wonThisMonth = monthlyStats.count;
  const totalValue = monthlyStats.totalValue;
  const recentLeads = chaseLeads.slice(0, 5);

  return (
    <main className="page-shell grid gap-6 py-6 pb-24 md:pb-8">
      {/* Welcome Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">TRADE HUB</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">
          {memberName ? `WELCOME BACK, ${memberName.toUpperCase()}.` : 'WELCOME TO YOUR ZONE.'}
        </h1>
        <p className="mt-3 max-w-2xl font-black text-white/90">
          Everything you need in one place. Your leads, your tools, your territory. No fluff.
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="jf-box bg-[var(--yellow)] p-5">
          <p className="micro-label text-[var(--ink)]">ACTIVE LEADS</p>
          <p className="headline mt-2 text-4xl">{activeChase}</p>
          <p className="mt-1 text-sm font-black text-[var(--ink)]/70">In your pipeline</p>
        </div>
        <div className="jf-box bg-white p-5">
          <p className="micro-label text-[var(--green)]">WON THIS MONTH</p>
          <p className="headline mt-2 text-4xl">{wonThisMonth}</p>
          <p className="mt-1 text-sm font-black text-[var(--muted)]">Jobs secured</p>
        </div>
        <div className="jf-box bg-white p-5">
          <p className="micro-label text-[var(--navy)]">TOTAL VALUE</p>
          <p className="headline mt-2 text-4xl">£{totalValue.toLocaleString()}</p>
          <p className="mt-1 text-sm font-black text-[var(--muted)]">This month</p>
        </div>
        <div className="jf-box bg-white p-5">
          <p className="micro-label text-[var(--orange)]">TERRITORY</p>
          {memberTerritory ? (
            <>
              <p className="headline mt-2 text-4xl">LOCKED</p>
              <p className="mt-1 text-sm font-black text-[var(--muted)]">{memberTerritory}</p>
            </>
          ) : (
            <>
              <p className="headline mt-2 text-4xl">OPEN</p>
              <p className="mt-1 text-sm font-black text-[var(--muted)]">No patch claimed yet</p>
            </>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <p className="micro-label text-[var(--muted)]">QUICK ACTIONS</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.path}
                className={`jf-box flex items-center gap-3 p-4 transition-all hover:shadow-[4px_4px_0_var(--line)] ${action.colour}`}
              >
                <Icon size={24} strokeWidth={2.5} />
                <span className="headline text-lg">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Member Tools */}
      <section>
        <p className="micro-label text-[var(--muted)]">MEMBER TOOLS</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {memberTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="jf-box group bg-white p-5 transition-all hover:border-[var(--yellow)]"
              >
                <div className={`inline-flex items-center justify-center h-10 w-10 border-2 border-[var(--line)] ${tool.colour}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <h3 className="headline mt-3 text-xl">{tool.name}</h3>
                <p className="mt-1 text-sm font-black text-[var(--muted)]">{tool.desc}</p>
                <span className="mt-3 inline-block text-sm font-black uppercase text-[var(--navy)] group-hover:underline">
                  OPEN →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Leads */}
      <section>
        <div className="flex items-center justify-between">
          <p className="micro-label text-[var(--muted)]">RECENT LEADS</p>
          <Link to="/dashboard" className="text-sm font-black text-[var(--navy)] hover:underline">VIEW PIPELINE →</Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="mt-3 jf-box bg-[var(--bg-main)] p-6 text-center">
            <p className="font-black text-[var(--muted)]">No leads yet. Start scanning to see real jobs in your area.</p>
            <Link to="/find-jobs" className="jf-button mt-3 bg-[var(--yellow)] text-[var(--ink)] inline-block">SCAN MY AREA →</Link>
          </div>
        ) : (
          <div className="mt-3 divide-y-2 divide-[var(--line)] border-2 border-[var(--line)] bg-white">
            {recentLeads.map((lead) => (
              <div key={lead.leadId} className="grid gap-2 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="font-black text-[var(--ink)]">{lead.leadTitle}</p>
                  <p className="text-sm font-black text-[var(--muted)]">{lead.location} · {lead.trade}</p>
                </div>
                <div className="font-mono text-sm font-black">{lead.estimatedValue}</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block border-2 border-[var(--line)] px-2 py-0.5 text-xs font-black uppercase ${
                    lead.stage === 'won' ? 'bg-[var(--green)] text-white' :
                    lead.stage === 'lost' ? 'bg-[var(--muted)] text-white' :
                    lead.stage === 'contacted' ? 'bg-[var(--yellow)] text-[var(--ink)]' :
                    'bg-white text-[var(--ink)]'
                  }`}>
                    {lead.stage.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Territory Status */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="micro-label text-[var(--ink)]">MY TERRITORY</p>
            {memberTerritory ? (
              <>
                <h2 className="headline mt-1 text-2xl">{memberTerritory.toUpperCase()}</h2>
                <p className="mt-1 text-sm font-black text-[var(--ink)]/70">Locked · Priority routing active</p>
              </>
            ) : (
              <>
                <h2 className="headline mt-1 text-2xl">NO PATCH CLAIMED YET</h2>
                <p className="mt-1 text-sm font-black text-[var(--ink)]/70">Lock your area before another trade does.</p>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/territories" className="jf-button bg-[var(--navy)] text-white">{memberTerritory ? 'MANAGE TERRITORY' : 'CLAIM YOUR PATCH'}</Link>
            <Link to="/find-jobs" className="jf-button bg-white text-[var(--ink)]">SCAN AREA</Link>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="jf-box bg-white p-6 text-center">
        <p className="micro-label text-[var(--muted)]">SUPPORT</p>
        <h2 className="headline mt-2 text-2xl">NEED HELP?</h2>
        <p className="mt-2 font-black text-[var(--muted)]">
          Email us directly. We reply same day, Mon-Fri.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a href="mailto:support@jobfilter.uk" className="jf-button bg-[var(--navy)] text-white">EMAIL SUPPORT</a>
        </div>
      </section>
    </main>
  );
}
