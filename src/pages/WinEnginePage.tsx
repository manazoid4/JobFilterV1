import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { LostJob, LostReason, WinJob } from '../lib/types';
import {
  generateReviewMessage,
  getLostReasonBreakdown,
  getMonthlyStats,
  getWinData,
  getYearlyTrend,
  markLost,
  markWon,
  removeLost,
  removeWin,
} from '../lib/winStore';
import { getChaseLeads, saveChaseLead } from '../lib/chaseStore';
import { getStoredLeads } from '../lib/leadStore';

type Tab = 'wins' | 'lost' | 'review' | 'trend';

export function WinEnginePage() {
  const [activeTab, setActiveTab] = useState<Tab>('wins');
  const [wins, setWins] = useState<WinJob[]>([]);
  const [losses, setLosses] = useState<LostJob[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, totalValue: 0, wins: [] as WinJob[] });
  const [yearlyTrend, setYearlyTrend] = useState<{ month: string; count: number; value: number }[]>([]);
  const [lostBreakdown, setLostBreakdown] = useState<{ reason: LostReason; count: number; label: string }[]>([]);
  const [copiedReview, setCopiedReview] = useState<string | null>(null);
  const [showMarkWon, setShowMarkWon] = useState(false);
  const [showMarkLost, setShowMarkLost] = useState(false);
  const [selectedLeadForWon, setSelectedLeadForWon] = useState<{ id: string; title: string; trade: string; location: string; estimatedValue: string } | null>(null);
  const [selectedLeadForLost, setSelectedLeadForLost] = useState<{ id: string; title: string; trade: string; location: string; estimatedValue: string } | null>(null);
  const [wonValueInput, setWonValueInput] = useState('');
  const [lostReasonInput, setLostReasonInput] = useState<LostReason>('price');
  const [lostNotesInput, setLostNotesInput] = useState('');
  const [reviewPlatform, setReviewPlatform] = useState<'google' | 'checkatrade'>('google');
  const [reviewSelectedWin, setReviewSelectedWin] = useState<WinJob | null>(null);
  const [untrackedChase, setUntrackedChase] = useState<{ id: string; title: string; trade: string; location: string; estimatedValue: string }[]>([]);

  const refresh = useCallback(() => {
    const data = getWinData();
    setWins(data.wins);
    setLosses(data.losses);
    setMonthlyStats(getMonthlyStats());
    setYearlyTrend(getYearlyTrend());
    setLostBreakdown(getLostReasonBreakdown());

    const chaseLeads = getChaseLeads();
    const wonInChase = chaseLeads.filter((l) => l.stage === 'won' && !data.wins.some((w) => w.leadId === l.leadId));
    const lostInChase = chaseLeads.filter((l) => l.stage === 'lost' && !data.losses.some((l2) => l2.leadId === l.leadId));
    setUntrackedChase([
      ...wonInChase.map((l) => ({ id: l.leadId, title: l.leadTitle, trade: l.trade, location: l.location, estimatedValue: l.estimatedValue })),
      ...lostInChase.map((l) => ({ id: l.leadId, title: l.leadTitle, trade: l.trade, location: l.location, estimatedValue: l.estimatedValue })),
    ]);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleMarkWon = () => {
    if (!selectedLeadForWon) return;
    const value = parseInt(wonValueInput.replace(/[^0-9]/g, ''), 10) || 0;
    if (value === 0) return;

    markWon({
      leadId: selectedLeadForWon.id,
      title: selectedLeadForWon.title,
      trade: selectedLeadForWon.trade,
      location: selectedLeadForWon.location,
      value,
      source: 'chase',
    });

    const chaseLeads = getChaseLeads();
    const chaseLead = chaseLeads.find((l) => l.leadId === selectedLeadForWon.id);
    if (chaseLead) {
      chaseLead.stage = 'won';
      saveChaseLead(chaseLead);
    }

    setShowMarkWon(false);
    setSelectedLeadForWon(null);
    setWonValueInput('');
    refresh();
  };

  const handleMarkLost = () => {
    if (!selectedLeadForLost) return;

    markLost({
      leadId: selectedLeadForLost.id,
      title: selectedLeadForLost.title,
      trade: selectedLeadForLost.trade,
      location: selectedLeadForLost.location,
      estimatedValue: selectedLeadForLost.estimatedValue,
      reason: lostReasonInput,
      notes: lostNotesInput || undefined,
      source: 'chase',
    });

    const chaseLeads = getChaseLeads();
    const chaseLead = chaseLeads.find((l) => l.leadId === selectedLeadForLost.id);
    if (chaseLead) {
      chaseLead.stage = 'lost';
      saveChaseLead(chaseLead);
    }

    setShowMarkLost(false);
    setSelectedLeadForLost(null);
    setLostReasonInput('price');
    setLostNotesInput('');
    refresh();
  };

  const handleCopyReview = (win: WinJob) => {
    const msg = generateReviewMessage(win, reviewPlatform);
    navigator.clipboard.writeText(msg).then(() => {
      setCopiedReview(win.id);
      setTimeout(() => setCopiedReview(null), 2000);
    });
  };

  const maxTrendCount = Math.max(...yearlyTrend.map((t) => t.count), 1);

  const currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      {/* Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">WIN ENGINE</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">YOUR SCOREBOARD</h1>
        <p className="mt-3 max-w-2xl font-black text-white/70">
          Every job you win proves JobFilter works. Track your wins, see your ROI, and turn happy customers into reviews. This is the engine that keeps you subscribed.
        </p>
      </section>

      {/* Monthly ROI — Big Numbers */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="jf-box bg-[var(--yellow)] p-5 text-[var(--ink)]">
          <p className="micro-label text-[var(--ink)]">JOBS WON THIS MONTH</p>
          <p className="headline mt-2 text-5xl leading-none">{monthlyStats.count}</p>
          <p className="mt-1 text-xs font-bold text-[var(--ink)]/60">{currentMonth}</p>
        </div>
        <div className="jf-box bg-[var(--yellow)] p-5 text-[var(--ink)]">
          <p className="micro-label text-[var(--ink)]">TOTAL VALUE WON</p>
          <p className="headline mt-2 text-5xl leading-none">£{monthlyStats.totalValue.toLocaleString()}</p>
          <p className="mt-1 text-xs font-bold text-[var(--ink)]/60">This month</p>
        </div>
        <div className="jf-box bg-white p-5">
          <p className="micro-label">AVG JOB VALUE</p>
          <p className="headline mt-2 text-5xl leading-none">
            £{monthlyStats.count > 0 ? Math.round(monthlyStats.totalValue / monthlyStats.count).toLocaleString() : '0'}
          </p>
          <p className="mt-1 text-xs font-semibold text-[var(--muted)]">Per win</p>
        </div>
        <div className="jf-box bg-white p-5">
          <p className="micro-label">WIN RATE</p>
          <p className="headline mt-2 text-5xl leading-none">
            {wins.length + losses.length > 0 ? Math.round((wins.length / (wins.length + losses.length)) * 100) : 0}%
          </p>
          <p className="mt-1 text-xs font-semibold text-[var(--muted)]">All time</p>
        </div>
      </div>

      {/* Untracked Chase Leads */}
      {untrackedChase.length > 0 && (
        <section className="jf-box border-2 border-[var(--yellow)] bg-[var(--yellow)]/10 p-5">
          <p className="micro-label text-[var(--ink)]">UNTRACKED WINS/LOSSES</p>
          <p className="mt-1 text-sm font-black text-[var(--ink)]">
            {untrackedChase.length} lead{untrackedChase.length !== 1 ? 's' : ''} in Chase marked as won/lost but not logged. Add them to your scoreboard.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {untrackedChase.map((lead) => (
              <div key={lead.id} className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedLeadForWon(lead);
                    setWonValueInput(lead.estimatedValue.replace(/[^0-9]/g, ''));
                    setShowMarkWon(true);
                  }}
                  className="jf-button bg-green-600 text-white text-xs"
                >
                  LOG WIN: {lead.title}
                </button>
                <button
                  onClick={() => {
                    setSelectedLeadForLost(lead);
                    setShowMarkLost(true);
                  }}
                  className="jf-button bg-gray-500 text-white text-xs"
                >
                  LOG LOSS
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {([
          { key: 'wins' as Tab, label: 'WINS' },
          { key: 'lost' as Tab, label: 'LOST' },
          { key: 'review' as Tab, label: 'REVIEW LINKS' },
          { key: 'trend' as Tab, label: 'TREND' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-[var(--ink)] ${
              activeTab === tab.key
                ? 'bg-[var(--yellow)] text-[var(--ink)]'
                : 'bg-white text-[var(--muted)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* WINS TAB */}
      {activeTab === 'wins' && (
        <section className="jf-box bg-white">
          <div className="flex items-center justify-between border-b-2 border-[var(--ink)] bg-[var(--bg-main)] px-5 py-3">
            <div>
              <p className="micro-label">WON JOBS</p>
              <p className="text-xs font-bold text-[var(--muted)]">{wins.length} total</p>
            </div>
            <button
              onClick={() => {
                const stored = getStoredLeads();
                if (stored.length > 0) {
                  const first = stored[0];
                  setSelectedLeadForWon({
                    id: first.id,
                    title: first.jobType,
                    trade: first.flags?.join(', ') || 'general',
                    location: first.area,
                    estimatedValue: first.budget || '',
                  });
                  setWonValueInput(first.budget?.replace(/[^0-9]/g, '') || '');
                } else {
                  setSelectedLeadForWon({ id: `manual-${Date.now()}`, title: '', trade: '', location: '', estimatedValue: '' });
                  setWonValueInput('');
                }
                setShowMarkWon(true);
              }}
              className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-xs"
            >
              + LOG A WIN
            </button>
          </div>

          {wins.length === 0 ? (
            <div className="p-10 text-center">
              <p className="headline text-2xl">NO WINS LOGGED YET</p>
              <p className="mt-2 font-black text-[var(--muted)]">
                Mark a lead as Won in Chase Engine or log one manually. Your scoreboard starts here.
              </p>
              <Link to="/chase" className="jf-button mt-4 inline-block bg-[var(--ink)] text-white text-sm">
                GO TO CHASE ENGINE
              </Link>
            </div>
          ) : (
            <div className="divide-y-2 divide-[var(--line)]">
              {wins.map((win) => (
                <div key={win.id} className="grid grid-cols-12 gap-3 px-5 py-4 hover:bg-[var(--yellow)]/5">
                  <div className="col-span-4">
                    <p className="text-sm font-black">{win.title}</p>
                    <p className="text-xs text-[var(--muted)]">{win.trade} · {win.location}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-lg font-black text-green-700">£{win.value.toLocaleString()}</span>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <span className="text-xs font-semibold text-[var(--muted)]">
                      {new Date(win.wonAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setReviewSelectedWin(win);
                        setActiveTab('review');
                      }}
                      className="jf-button bg-[var(--ink)] text-white text-[10px]"
                    >
                      REVIEW LINK
                    </button>
                    <button
                      onClick={() => {
                        removeWin(win.id);
                        refresh();
                      }}
                      className="text-[var(--muted)] hover:text-[var(--orange)] text-xs font-black"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* LOST TAB */}
      {activeTab === 'lost' && (
        <section className="jf-box bg-white">
          <div className="flex items-center justify-between border-b-2 border-[var(--ink)] bg-[var(--bg-main)] px-5 py-3">
            <div>
              <p className="micro-label">LOST JOBS</p>
              <p className="text-xs font-bold text-[var(--muted)]">{losses.length} total</p>
            </div>
            <button
              onClick={() => {
                const stored = getStoredLeads();
                if (stored.length > 0) {
                  const first = stored[0];
                  setSelectedLeadForLost({
                    id: first.id,
                    title: first.jobType,
                    trade: first.flags?.join(', ') || 'general',
                    location: first.area,
                    estimatedValue: first.budget || '',
                  });
                } else {
                  setSelectedLeadForLost({ id: `manual-${Date.now()}`, title: '', trade: '', location: '', estimatedValue: '' });
                }
                setLostReasonInput('price');
                setLostNotesInput('');
                setShowMarkLost(true);
              }}
              className="jf-button bg-gray-500 text-white text-xs"
            >
              + LOG A LOSS
            </button>
          </div>

          {/* Quick reason breakdown */}
          {lostBreakdown.length > 0 && (
            <div className="border-b-2 border-[var(--line)] px-5 py-4">
              <p className="micro-label mb-3">WHY YOU'RE LOSING</p>
              <div className="flex flex-wrap gap-2">
                {lostBreakdown.map((b) => (
                  <div key={b.reason} className="flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-3 py-2">
                    <span className="text-sm font-black">{b.label}</span>
                    <span className="badge bg-[var(--ink)] text-white">{b.count}</span>
                  </div>
                ))}
              </div>
              {/* Bar visualization */}
              <div className="mt-3 flex h-4 overflow-hidden border-2 border-[var(--ink)]">
                {lostBreakdown.map((b, i) => {
                  const colors = ['bg-red-500', 'bg-orange-500', 'bg-[var(--yellow)]', 'bg-gray-400', 'bg-blue-500', 'bg-purple-500'];
                  const total = losses.length;
                  const pct = (b.count / total) * 100;
                  return (
                    <div
                      key={b.reason}
                      className={`${colors[i % colors.length]}`}
                      style={{ width: `${pct}%` }}
                      title={`${b.label}: ${b.count}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {losses.length === 0 ? (
            <div className="p-10 text-center">
              <p className="headline text-2xl">NO LOSSES LOGGED</p>
              <p className="mt-2 font-black text-[var(--muted)]">
                Every loss teaches something. Log why you lost it — price, timing, competition.
              </p>
            </div>
          ) : (
            <div className="divide-y-2 divide-[var(--line)]">
              {losses.map((lost) => {
                const reasonLabels: Record<LostReason, string> = {
                  price: 'Price Too High',
                  timing: 'Bad Timing',
                  competition: 'Lost to Competition',
                  not_interested: 'Not Interested',
                  went_elsewhere: 'Went Elsewhere',
                  other: 'Other',
                };
                return (
                  <div key={lost.id} className="grid grid-cols-12 gap-3 px-5 py-4 hover:bg-[var(--yellow)]/5">
                    <div className="col-span-3">
                      <p className="text-sm font-black">{lost.title}</p>
                      <p className="text-xs text-[var(--muted)]">{lost.trade} · {lost.location}</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="text-xs font-semibold text-[var(--muted)]">Est: {lost.estimatedValue}</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="badge bg-gray-300 text-[var(--ink)] text-[10px]">{reasonLabels[lost.reason]}</span>
                      {lost.notes && (
                        <span className="ml-2 text-[10px] text-[var(--muted)] truncate">{lost.notes}</span>
                      )}
                    </div>
                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <span className="text-xs font-semibold text-[var(--muted)]">
                        {new Date(lost.lostAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                      <button
                        onClick={() => {
                          removeLost(lost.id);
                          refresh();
                        }}
                        className="text-[var(--muted)] hover:text-[var(--orange)] text-xs font-black"
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* REVIEW LINKS TAB */}
      {activeTab === 'review' && (
        <section className="jf-box bg-white p-6">
          <p className="micro-label">REVIEW LINK GENERATOR</p>
          <h2 className="headline mt-2 text-2xl leading-none">TURN WINS INTO REVIEWS</h2>
          <p className="mt-2 font-black text-[var(--muted)]">
            Pick a won job, pick a platform, copy the message. Send it on WhatsApp. Reviews bring more jobs.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setReviewPlatform('google')}
              className={`px-4 py-2 text-xs font-black uppercase border-2 border-[var(--ink)] ${
                reviewPlatform === 'google' ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white text-[var(--muted)]'
              }`}
            >
              GOOGLE
            </button>
            <button
              onClick={() => setReviewPlatform('checkatrade')}
              className={`px-4 py-2 text-xs font-black uppercase border-2 border-[var(--ink)] ${
                reviewPlatform === 'checkatrade' ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white text-[var(--muted)]'
              }`}
            >
              CHECKATRADE
            </button>
          </div>

          {wins.length === 0 ? (
            <div className="mt-6 border-2 border-dashed border-[var(--line)] p-8 text-center">
              <p className="font-black text-[var(--muted)]">No wins logged yet. Win a job first, then come back here.</p>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {wins.map((win) => (
                <div key={win.id} className="border-2 border-[var(--ink)] bg-white">
                  <div className="border-b-2 border-[var(--ink)] bg-[var(--bg-main)] px-4 py-3">
                    <p className="text-sm font-black">{win.title}</p>
                    <p className="text-xs text-[var(--muted)]">{win.location} · £{win.value.toLocaleString()}</p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 font-mono text-xs leading-relaxed">
                      {generateReviewMessage(win, reviewPlatform)}
                    </div>
                    <button
                      onClick={() => handleCopyReview(win)}
                      className={`jf-button mt-3 w-full text-xs ${
                        copiedReview === win.id ? 'bg-green-600 text-white' : 'bg-[var(--yellow)] text-[var(--ink)]'
                      }`}
                    >
                      {copiedReview === win.id ? 'COPIED' : 'COPY FOR WHATSAPP'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 border-2 border-[var(--yellow)] bg-[var(--yellow)]/10 p-4">
            <p className="text-sm font-black text-[var(--ink)]">SETUP REQUIRED</p>
            <p className="mt-1 text-xs font-bold text-[var(--ink)]/80">
              Replace YOUR_GOOGLE_REVIEW_LINK and YOUR_PROFILE with your actual review URLs. One-time setup.
            </p>
          </div>
        </section>
      )}

      {/* TREND TAB */}
      {activeTab === 'trend' && (
        <section className="jf-box bg-white p-6">
          <p className="micro-label">12-MONTH TREND</p>
          <h2 className="headline mt-2 text-2xl leading-none">YOUR WIN TRAJECTORY</h2>
          <p className="mt-2 font-black text-[var(--muted)]">
            Jobs won per month. If this line goes up, JobFilter is working.
          </p>

          <div className="mt-6 flex items-end gap-1 sm:gap-2" style={{ height: '200px' }}>
            {yearlyTrend.map((t, i) => {
              const heightPct = maxTrendCount > 0 ? (t.count / maxTrendCount) * 100 : 0;
              const isCurrentMonth = i === yearlyTrend.length - 1;
              return (
                <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                  {t.count > 0 && (
                    <span className="text-[10px] font-black text-[var(--muted)]">{t.count}</span>
                  )}
                  <div
                    className={`w-full ${isCurrentMonth ? 'bg-[var(--yellow)]' : 'bg-[var(--ink)]/30'}`}
                    style={{ height: `${Math.max(heightPct, 4)}%` }}
                  />
                  <span className={`text-[10px] font-bold ${isCurrentMonth ? 'text-[var(--ink)] font-black' : 'text-[var(--muted)]'}`}>
                    {t.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Value trend */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="border-2 border-[var(--ink)] bg-[var(--bg-main)] p-4">
              <p className="micro-label text-[10px]">TOTAL WINS (ALL TIME)</p>
              <p className="headline mt-2 text-3xl leading-none">{wins.length}</p>
            </div>
            <div className="border-2 border-[var(--ink)] bg-[var(--bg-main)] p-4">
              <p className="micro-label text-[10px]">TOTAL VALUE WON</p>
              <p className="headline mt-2 text-3xl leading-none">£{wins.reduce((s, w) => s + w.value, 0).toLocaleString()}</p>
            </div>
            <div className="border-2 border-[var(--ink)] bg-[var(--bg-main)] p-4">
              <p className="micro-label text-[10px]">TOTAL LOSSES</p>
              <p className="headline mt-2 text-3xl leading-none">{losses.length}</p>
            </div>
          </div>
        </section>
      )}

      {/* Mark Won Modal */}
      {showMarkWon && selectedLeadForWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white p-6">
            <p className="micro-label">LOG A WIN</p>
            <h3 className="headline mt-2 text-xl leading-none">{selectedLeadForWon.title || 'Manual Entry'}</h3>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {selectedLeadForWon.trade} · {selectedLeadForWon.location}
            </p>

            <div className="mt-4">
              <label className="text-xs font-black uppercase text-[var(--muted)]">Job Value (£)</label>
              <input
                type="text"
                value={wonValueInput}
                onChange={(e) => setWonValueInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 2500"
                className="mt-1 w-full border-2 border-[var(--ink)] px-3 py-2 text-lg font-black"
                autoFocus
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleMarkWon}
                disabled={!wonValueInput || parseInt(wonValueInput) === 0}
                className={`jf-button flex-1 text-sm ${
                  wonValueInput && parseInt(wonValueInput) > 0
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                LOG WIN
              </button>
              <button
                onClick={() => {
                  setShowMarkWon(false);
                  setSelectedLeadForWon(null);
                  setWonValueInput('');
                }}
                className="jf-button bg-[var(--ink)] text-white text-sm"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Lost Modal */}
      {showMarkLost && selectedLeadForLost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white p-6">
            <p className="micro-label">LOG A LOSS</p>
            <h3 className="headline mt-2 text-xl leading-none">{selectedLeadForLost.title || 'Manual Entry'}</h3>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {selectedLeadForLost.trade} · {selectedLeadForLost.location}
            </p>

            <div className="mt-4">
              <label className="text-xs font-black uppercase text-[var(--muted)]">Why did you lose it?</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([
                  { key: 'price', label: 'Price Too High' },
                  { key: 'timing', label: 'Bad Timing' },
                  { key: 'competition', label: 'Lost to Competition' },
                  { key: 'not_interested', label: 'Not Interested' },
                  { key: 'went_elsewhere', label: 'Went Elsewhere' },
                  { key: 'other', label: 'Other' },
                ] as { key: LostReason; label: string }[]).map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setLostReasonInput(r.key)}
                    className={`border-2 border-[var(--ink)] px-3 py-2 text-xs font-black ${
                      lostReasonInput === r.key
                        ? 'bg-[var(--yellow)] text-[var(--ink)]'
                        : 'bg-white text-[var(--muted)]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-black uppercase text-[var(--muted)]">Notes (optional)</label>
              <input
                type="text"
                value={lostNotesInput}
                onChange={(e) => setLostNotesInput(e.target.value)}
                placeholder="e.g. They went with someone £200 cheaper"
                className="mt-1 w-full border-2 border-[var(--ink)] px-3 py-2 text-sm font-semibold"
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleMarkLost}
                className="jf-button flex-1 bg-gray-600 text-white text-sm"
              >
                LOG LOSS
              </button>
              <button
                onClick={() => {
                  setShowMarkLost(false);
                  setSelectedLeadForLost(null);
                  setLostReasonInput('price');
                  setLostNotesInput('');
                }}
                className="jf-button bg-[var(--ink)] text-white text-sm"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
