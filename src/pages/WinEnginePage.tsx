import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { LostReason, WinJob } from '../lib/types';
import {
  getLostReasonBreakdown,
  getMonthlyStats,
  getWinData,
  markLost,
  markWon,
} from '../lib/winStore';
import { getChaseLeads, saveChaseLead } from '../lib/chaseStore';

const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';

export function WinEnginePage() {
  const [wins, setWins] = useState<WinJob[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0 });
  const [lostBreakdown, setLostBreakdown] = useState<{ reason: LostReason; count: number; label: string }[]>([]);
  const [showMarkWon, setShowMarkWon] = useState(false);
  const [showMarkLost, setShowMarkLost] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [wonValue, setWonValue] = useState('');
  const [lostReason, setLostReason] = useState<LostReason>('price');
  const [untracked, setUntracked] = useState<{ id: string; title: string; trade: string; location: string; estimatedValue: string }[]>([]);

  const refresh = useCallback(() => {
    const data = getWinData();
    setWins(data.wins);
    setMonthlyStats(getMonthlyStats());
    setLostBreakdown(getLostReasonBreakdown());

    const cl = getChaseLeads();
    const wonInChase = cl.filter((l) => l.stage === 'won' && !data.wins.some((w) => w.leadId === l.leadId));
    const lostInChase = cl.filter((l) => l.stage === 'lost' && !data.losses.some((l2) => l2.leadId === l.leadId));
    setUntracked([
      ...wonInChase.map((l) => ({ id: l.leadId, title: l.leadTitle, trade: l.trade, location: l.location, estimatedValue: l.estimatedValue })),
      ...lostInChase.map((l) => ({ id: l.leadId, title: l.leadTitle, trade: l.trade, location: l.location, estimatedValue: l.estimatedValue })),
    ]);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleMarkWon = () => {
    const value = parseInt(wonValue.replace(/[^0-9]/g, ''), 10);
    if (!value || !selectedId) return;
    markWon({ leadId: selectedId, title: selectedTitle, trade: '', location: '', value, source: 'chase' });
    const cl = getChaseLeads();
    const lead = cl.find((l) => l.leadId === selectedId);
    if (lead) { lead.stage = 'won'; saveChaseLead(lead); }
    setShowMarkWon(false); setWonValue(''); setSelectedId(''); refresh();
  };

  const handleMarkLost = () => {
    if (!selectedId) return;
    markLost({ leadId: selectedId, title: selectedTitle, trade: '', location: '', estimatedValue: '', reason: lostReason, source: 'chase' });
    const cl = getChaseLeads();
    const lead = cl.find((l) => l.leadId === selectedId);
    if (lead) { lead.stage = 'lost'; saveChaseLead(lead); }
    setShowMarkLost(false); setSelectedId(''); setLostReason('price'); refresh();
  };

  const currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">WIN</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl">YOUR SCOREBOARD</h1>
        <p className="mt-3 text-[15px] font-black text-white/70">
          Track wins. Prove the value. Stay subscribed.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="jf-box bg-[var(--yellow)] p-5">
          <p className="text-xs font-black uppercase text-[var(--ink)]/60">JOBS WON</p>
          <p className="headline text-4xl mt-1">{monthlyStats.count}</p>
          <p className="text-xs text-[var(--ink)]/50">{currentMonth}</p>
        </div>
        <div className="jf-box bg-[var(--yellow)] p-5">
          <p className="text-xs font-black uppercase text-[var(--ink)]/60">VALUE WON</p>
          <p className="headline mt-1 break-words text-3xl sm:text-4xl">£{monthlyStats.totalValue.toLocaleString()}</p>
        </div>
      </div>

      {untracked.length > 0 && (
        <div className="jf-box bg-[var(--orange)]/10 border-[var(--orange)] p-4">
          <p className="text-sm font-black text-[var(--orange)]">{untracked.length} lead{untracked.length > 1 ? 's' : ''} marked in Chase but not tracked here.</p>
          <div className="mt-3 grid gap-2">
            {untracked.map((u) => (
              <div key={u.id} className="flex flex-wrap gap-2 items-center bg-white p-3 border-2 border-[var(--line)]">
                <span className="font-black text-sm flex-1 min-w-0 truncate">{u.title}</span>
                <button onClick={() => { setSelectedId(u.id); setSelectedTitle(u.title); setShowMarkWon(true); }} className="jf-button bg-[var(--green)] text-white text-xs">
                  WON
                </button>
                <button onClick={() => { setSelectedId(u.id); setSelectedTitle(u.title); setShowMarkLost(true); }} className="jf-button bg-[var(--orange)] text-white text-xs">
                  LOST
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {wins.length === 0 && (
        <div className="jf-box bg-white p-5">
          <h2 className="headline text-xl">RECENT WINS</h2>
          <p className="mt-3 text-[var(--muted)]">No wins yet. Mark a lead as won to see it here.</p>
          {DEV_MODE && (
            <div className="mt-4 p-4 bg-[var(--green)]/10 border-2 border-[var(--green)]">
              <p className="text-sm font-black text-[var(--green)]">DEV MODE: Add sample wins to test the Scoreboard.</p>
              <button
                onClick={() => {
                  const sampleWins: WinJob[] = [
                    { id: 'dev-win-1', leadId: 'dev-1', title: 'Kitchen extension — B15', trade: 'building', location: 'B15 / Birmingham', value: 25000, wonAt: new Date().toISOString(), source: 'chase' },
                    { id: 'dev-win-2', leadId: 'dev-2', title: 'Full rewire — 3-bed semi', trade: 'electrical', location: 'B14 / Birmingham', value: 8500, wonAt: new Date(Date.now() - 86400000 * 3).toISOString(), source: 'chase' },
                  ];
                  const data = getWinData();
                  data.wins = [...sampleWins, ...data.wins];
                  localStorage.setItem('jobfilter.win', JSON.stringify(data));
                  refresh();
                }}
                className="jf-button mt-3 bg-[var(--green)] text-white text-sm"
              >
                ADD 2 SAMPLE WINS
              </button>
            </div>
          )}
        </div>
      )}

      {wins.length > 0 && (
        <div className="jf-box bg-white p-5">
          <h2 className="headline text-xl">RECENT WINS</h2>
          <div className="mt-4 grid gap-3">
            {wins.slice(0, 10).map((w) => (
              <div key={w.id} className="border-2 border-[var(--line)] p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-black text-sm truncate">{w.title}</p>
                  <p className="text-xs text-[var(--muted)]">{w.trade} · {w.location}</p>
                </div>
                <span className="headline text-lg text-[var(--green)] flex-shrink-0">£{w.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {lostBreakdown.length > 0 && (
        <div className="jf-box bg-white p-5">
          <h2 className="headline text-xl">WHY YOU LOST</h2>
          <div className="mt-4 grid gap-2">
            {lostBreakdown.map((b) => (
              <div key={b.reason} className="flex items-center gap-3">
                <span className="text-sm font-black flex-1">{b.label}</span>
                <span className="text-sm font-black text-[var(--muted)]">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/chase" className="jf-button bg-[var(--ink)] text-white text-center">
        ← BACK TO CHASE
      </Link>

      {showMarkWon && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowMarkWon(false)}>
          <div className="jf-box bg-white p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="headline text-2xl">MARK AS WON</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{selectedTitle}</p>
            <label className="mt-4 block">
              <span className="text-xs font-black uppercase">Job Value (£)</span>
              <input
                type="number"
                value={wonValue}
                onChange={(e) => setWonValue(e.target.value)}
                className="field-input mt-1"
                placeholder="5000"
                autoFocus
              />
            </label>
            <div className="mt-4 flex gap-2">
              <button onClick={handleMarkWon} className="jf-button bg-[var(--green)] text-white flex-1">CONFIRM WIN</button>
              <button onClick={() => setShowMarkWon(false)} className="jf-button bg-white flex-1">CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {showMarkLost && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowMarkLost(false)}>
          <div className="jf-box bg-white p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="headline text-2xl">MARK AS LOST</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{selectedTitle}</p>
            <label className="mt-4 block">
              <span className="text-xs font-black uppercase">Reason</span>
              <select
                value={lostReason}
                onChange={(e) => setLostReason(e.target.value as LostReason)}
                className="field-input mt-1"
              >
                <option value="price">Too expensive</option>
                <option value="timing">Wrong timing</option>
                <option value="competitor">Went with competitor</option>
                <option value="no_response">No response</option>
                <option value="other">Other</option>
              </select>
            </label>
            <div className="mt-4 flex gap-2">
              <button onClick={handleMarkLost} className="jf-button bg-[var(--orange)] text-white flex-1">CONFIRM LOST</button>
              <button onClick={() => setShowMarkLost(false)} className="jf-button bg-white flex-1">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
