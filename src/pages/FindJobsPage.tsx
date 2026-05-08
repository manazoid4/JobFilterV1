import { FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ScoreBadge } from '../components/ScoreBadge';
import { Tag } from '../components/Tag';
import { KeywordSearch, KeywordSearchResults } from '../components/KeywordSearch';
import type { DocumentSearchResult } from '../lib/documentSearch';
import type { Lead, LeadSearchResponse, Trade } from '../lib/types';
import { importLeadToChase, isLeadTracked } from '../lib/chaseStore';

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];

const RADIUS_OPTIONS = [5, 10, 15, 25, 50];

const TRADE_PRESETS: { label: string; trade: Trade }[] = [
  { label: 'ELECTRICAL', trade: 'electrical' },
  { label: 'PLUMBING', trade: 'plumbing' },
  { label: 'BUILDING', trade: 'building' },
  { label: 'ROOFING', trade: 'roofing' },
  { label: 'LANDSCAPING', trade: 'landscaping' },
  { label: 'CARPENTRY', trade: 'carpentry' },
  { label: 'PAINTING', trade: 'painting' },
  { label: 'HVAC', trade: 'hvac' },
];

function getSavedRadius(): number {
  const saved = localStorage.getItem('jobfilter.radius');
  if (saved) {
    const n = Number(saved);
    if (RADIUS_OPTIONS.includes(n)) return n;
  }
  return 25;
}

function getSavedPostcode(): string {
  return localStorage.getItem('jobfilter.postcode') || 'B14 7QH';
}

function getSavedTrade(): Trade {
  const saved = localStorage.getItem('jobfilter.trade');
  if (saved && trades.includes(saved as Trade)) return saved as Trade;
  return 'electrical';
}

export function FindJobsPage() {
  const [searchParams] = useSearchParams();
  const [postcode, setPostcode] = useState(getSavedPostcode);
  const [trade, setTrade] = useState<Trade>(getSavedTrade);
  const [radiusMiles, setRadiusMiles] = useState(getSavedRadius);
  const [result, setResult] = useState<LeadSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [whatsappSent, setWhatsappSent] = useState<Record<string, boolean>>({});
  const [hasScanned, setHasScanned] = useState(false);
  const [trackedLeads, setTrackedLeads] = useState<Set<string>>(() => {
    const leads = JSON.parse(localStorage.getItem('jobfilter.find.tracked') || '[]') as string[];
    return new Set(leads);
  });
  const [docSearchResults, setDocSearchResults] = useState<DocumentSearchResult[]>([]);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [showDocSearch, setShowDocSearch] = useState(false);

  const [fillWeekLoading, setFillWeekLoading] = useState(false);
  const [fillWeekResult, setFillWeekResult] = useState<LeadSearchResponse | null>(null);
  const [fillWeekPhase, setFillWeekPhase] = useState('');

  useEffect(() => {
    const tradeParam = searchParams.get('trade');
    const areaParam = searchParams.get('area');
    if (tradeParam && trades.includes(tradeParam as Trade)) {
      setTrade(tradeParam as Trade);
    }
    if (areaParam) {
      setPostcode(areaParam);
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('jobfilter.radius', String(radiusMiles));
  }, [radiusMiles]);

  useEffect(() => {
    localStorage.setItem('jobfilter.postcode', postcode);
  }, [postcode]);

  useEffect(() => {
    localStorage.setItem('jobfilter.trade', trade);
  }, [trade]);

  const trackLead = (lead: Lead) => {
    if (trackedLeads.has(lead.id)) return;
    importLeadToChase({
      id: lead.id,
      title: lead.title,
      trade: String(lead.trade || lead.tradeMatch || 'general'),
      location: lead.location || lead.postcodeOutward || 'Unknown',
      estimatedValue: lead.estimatedValue || 'TBC',
      score: lead.score,
    });
    const next = new Set(trackedLeads);
    next.add(lead.id);
    setTrackedLeads(next);
    localStorage.setItem('jobfilter.find.tracked', JSON.stringify([...next]));
  };

  async function submit(event?: FormEvent, overrides?: { radiusMiles?: number; trade?: Trade }) {
    event?.preventDefault();
    setErrorText('');
    setLoading(true);
    setResult(null);
    setHasScanned(true);
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode,
          trade: overrides?.trade ?? trade,
          radiusMiles: overrides?.radiusMiles ?? radiusMiles,
        }),
      });
      const data = await response.json() as LeadSearchResponse;
      setResult(data);
      if (!response.ok || !data.ok) {
        setErrorText(data.errors?.[0] ?? 'Scan failed. Retry the scan.');
      }
      setLastUpdated(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      setErrorText('Network error. Retry the scan.');
      setResult({
        ok: false,
        source: 'lead_engine',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: ['Network error. Retry the scan.'],
      });
    } finally {
      setLoading(false);
    }
  }

  function widenAndScan(nextRadius: number) {
    setRadiusMiles(nextRadius);
    void submit(undefined, { radiusMiles: nextRadius });
  }

  async function sendWhatsApp(lead: Lead) {
    setWhatsappSent((prev) => ({ ...prev, [lead.id]: true }));
    try {
      await fetch('/api/leads/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: 'user',
          leadData: {
            trade: lead.trade,
            area: lead.location,
            value: lead.estimatedValue,
            score: lead.score,
            source: lead.source,
            planningRef: lead.url,
          },
        }),
      });
    } catch {
      setWhatsappSent((prev) => ({ ...prev, [lead.id]: false }));
    }
  }

  async function fillMyWeek() {
    setFillWeekLoading(true);
    setFillWeekResult(null);
    setFillWeekPhase('Scanning 400+ councils, EPC database, and contract feeds...');
    await new Promise(r => setTimeout(r, 800));
    setFillWeekPhase('Matching leads to your trade — scoring every signal...');
    await new Promise(r => setTimeout(r, 600));
    setFillWeekPhase('Ranking the best jobs near you...');
    await new Promise(r => setTimeout(r, 400));
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode,
          trade,
          radiusMiles: Math.max(radiusMiles, 25),
        }),
      });
      const data = await response.json() as LeadSearchResponse;
      setFillWeekResult(data);
    } catch {
      setFillWeekResult({
        ok: false,
        source: 'lead_engine',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: ['Scan failed. Retry.'],
      });
    } finally {
      setFillWeekLoading(false);
      setFillWeekPhase('');
    }
  }

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      {/* ── SCANNER ──────────────────────────────────── */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">LIVE INTAKE ENGINE</p>
        <h1 className="headline mt-3 text-3xl leading-none sm:text-5xl md:text-7xl">FIND JOBS WORTH PRICING</h1>
        <p className="mt-3 max-w-2xl text-lg font-black text-[var(--muted)]">
          Pick your trade. Enter your postcode. See what's live near you right now.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Link to="/chase" className="text-sm font-black text-[var(--navy)] underline underline-offset-4 hover:text-[var(--ink)]">
            GO TO CHASE →
          </Link>
          <Link to="/win" className="text-sm font-black text-[var(--navy)] underline underline-offset-4 hover:text-[var(--ink)]">
            GO TO WIN →
          </Link>
        </div>

        {/* Trade presets — one tap to scan */}
        <div className="mt-4">
          <p className="micro-label text-[var(--muted)]">TAP YOUR TRADE — INSTANT SCAN</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TRADE_PRESETS.map((preset) => (
              <button
                key={preset.trade}
                type="button"
                disabled={loading || fillWeekLoading}
                onClick={() => { setTrade(preset.trade); void submit(undefined, { trade: preset.trade }); }}
                className={`px-3 py-2 text-sm font-black disabled:opacity-60 border-2 border-[var(--navy)] transition ${
                  trade === preset.trade
                    ? 'bg-[var(--yellow)] text-[var(--ink)]'
                    : 'bg-[var(--ink)] text-white hover:bg-[var(--yellow)] hover:text-[var(--ink)]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form — postcode + radius only (trade already selected above) */}
        <form onSubmit={submit} className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
          <label className="field-label">
            Postcode
            <input value={postcode} onChange={(event) => setPostcode(event.target.value.toUpperCase())} className="field-input" placeholder="B14 7QH" />
          </label>
          <label className="field-label">
            Radius
            <select value={radiusMiles} onChange={(event) => setRadiusMiles(Number(event.target.value))} className="field-input">
              {RADIUS_OPTIONS.map((miles) => <option key={miles} value={miles}>{miles} miles</option>)}
            </select>
          </label>
          <button disabled={loading || fillWeekLoading} className="jf-button self-end bg-[var(--navy)] text-white disabled:opacity-60">
            {loading ? 'SCANNING...' : 'SCAN NOW'}
          </button>
        </form>
      </section>

      {/* ── FILL MY WEEK ─────────────────────────────── */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="micro-label text-[var(--ink)]">QUIET WEEK? FIX IT.</p>
            <h2 className="headline mt-2 text-2xl leading-none sm:text-4xl text-[var(--ink)]">FILL MY WEEK</h2>
            <p className="mt-2 max-w-xl font-black text-[var(--ink)]/70">
              One tap. We hit every data source — councils, EPC, contracts — and return the best {trade} jobs within {radiusMiles} miles.
            </p>
          </div>
          <button
            type="button"
            disabled={fillWeekLoading || loading}
            onClick={fillMyWeek}
            className="jf-button bg-[var(--ink)] text-white text-lg px-8 py-4 disabled:opacity-60 shrink-0"
          >
            {fillWeekLoading ? 'SCANNING...' : 'FILL MY WEEK →'}
          </button>
        </div>

        {fillWeekLoading && (
          <div className="mt-5 bg-[var(--ink)] text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-[var(--yellow)] border-t-transparent rounded-full animate-spin" />
              <p className="font-black">{fillWeekPhase}</p>
            </div>
          </div>
        )}

        {fillWeekResult && fillWeekResult.count > 0 && (
          <div className="mt-5 grid gap-4">
            <div className="bg-[var(--ink)] text-white p-5">
              <p className="text-3xl font-black text-[var(--yellow)]">
                {fillWeekResult.count} JOBS FOUND NEAR YOU
              </p>
              <p className="mt-1 font-black text-white/70">
                {fillWeekResult.leads.filter(l => l.score >= 80).length} are GOLD — scored for {titleCase(trade)} within {Math.max(radiusMiles, 25)} miles
              </p>
              <p className="mt-1 text-sm font-black text-white/50">
                Your quiet week isn't a skills problem. It's a pipeline problem.
              </p>
            </div>
            {fillWeekResult.leads.map((lead) => (
              <LeadResultCard key={`fw-${lead.id}`} lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} isTracked={trackedLeads.has(lead.id)} onTrack={() => trackLead(lead)} />
            ))}
          </div>
        )}

        {fillWeekResult && fillWeekResult.count === 0 && (
          <div className="mt-5 bg-white p-5">
            <p className="font-black text-[var(--ink)]">No matches right now. Try widening your radius or switching trade.</p>
          </div>
        )}
      </section>

      {/* ── DOCUMENT SEARCH ──────────────────────────── */}
      <section className="jf-box bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="micro-label text-[var(--orange)]">DOCUMENT SEARCH</p>
            <h2 className="headline mt-2 text-2xl leading-none sm:text-3xl">SEARCH PLANNING DOCS BY KEYWORD</h2>
            <p className="mt-2 max-w-2xl font-black text-[var(--muted)]">
              Type a keyword. We scan planning documents for matches. Find jobs that fit your exact capability.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDocSearch(!showDocSearch)}
            className="jf-button bg-[var(--navy)] text-white text-sm shrink-0 ml-4"
          >
            {showDocSearch ? 'HIDE' : 'OPEN SEARCH'}
          </button>
        </div>

        {showDocSearch && (
          <div className="mt-5">
            <KeywordSearch
              onSearch={(results) => {
                setDocSearchResults(results);
              }}
              searchesRemaining={3}
              isPro={false}
            />
          </div>
        )}
      </section>

      {/* ── DOCUMENT SEARCH RESULTS ──────────────────── */}
      {docSearchResults.length > 0 && (
        <KeywordSearchResults results={docSearchResults} query={docSearchQuery || 'keyword'} />
      )}

      {/* ── LOADING ──────────────────────────────────── */}
      {loading && !fillWeekLoading && (
        <section className="jf-box bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">SCANNING</p>
          <p className="mt-2 text-xl font-black">Checking official sources. Scoring every signal.</p>
        </section>
      )}

      {/* ── RESULTS ──────────────────────────────────── */}
      {result && !fillWeekResult && (
        <section className="grid gap-5">
          {errorText && (
            <div className="jf-box bg-[var(--orange)] p-5 text-white">
              <p className="font-black">Scan failed.</p>
              <p className="mt-1 font-semibold">{errorText}</p>
              <button onClick={() => void submit()} className="jf-button mt-4 bg-white text-[var(--ink)]">RETRY</button>
            </div>
          )}

          <div className="jf-box grid gap-3 bg-white p-4 md:grid-cols-5">
            <Stat label="Engine" value={result.source === 'lead_engine' ? 'JobFilter' : 'Verified'} />
            <Stat label="Matches" value={String(result.count)} />
            <Stat label="Radius" value={`${radiusMiles} miles`} />
            <Stat label="Region" value={result.region || 'Unknown'} />
            <Stat label="Updated" value={lastUpdated || 'N/A'} />
          </div>

          {result.count === 0 ? (
            <EmptyScanReport
              trade={trade}
              radiusMiles={radiusMiles}
              result={result}
              lastUpdated={lastUpdated}
              onWiden={widenAndScan}
            />
          ) : (
            <div className="grid gap-4">
              {/* Preview banner */}
              <section className="jf-box bg-[var(--yellow)] p-5">
                <p className="micro-label text-[var(--ink)]">FREE PREVIEW — THIS IS A SAMPLE</p>
                <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">THE SIGNAL IS REAL. THE DETAIL IS LOCKED.</h2>
                <p className="mt-2 max-w-2xl font-black text-[var(--ink)]/75">
                  What you see above proves the leads exist. Unlock from £6.99/week for buyer name, deadline, source link, WhatsApp alerts, and the full score breakdown.
                </p>
              </section>

              {result.leads.map((lead) => (
                <LeadResultCard key={lead.id} lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} isTracked={trackedLeads.has(lead.id)} onTrack={() => trackLead(lead)} />
              ))}

              {/* Locked leads CTA */}
              {(result.lockedCount ?? 0) > 0 && (
                <div className="jf-box bg-[var(--ink)] p-8 text-center">
                  <p className="micro-label text-[var(--yellow)]">FULL RESULTS LOCKED</p>
                  <p className="headline mt-2 text-3xl text-white leading-tight">
                    {result.lockedCount} MORE LEAD{(result.lockedCount ?? 0) > 1 ? 'S' : ''} IN YOUR AREA
                  </p>
                  <p className="mt-2 font-black text-white/70">
                    Each includes buyer name, deadline, source link, and contact signal — the detail that decides if a job is worth chasing.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-black">
                    <span className="text-[var(--green)]">Founding 30: £6.99/wk (£29/mo)</span>
                    <span className="text-white/40">·</span>
                    <span className="text-[var(--yellow)]">Pro: £49/mo</span>
                    <span className="text-white/40">·</span>
                    <span className="text-[var(--green)]">30-day money-back</span>
                  </div>
                  <Link to="/pricing" className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)] inline-block">UNLOCK FOR £6.99/WK →</Link>
                  <p className="mt-3 text-xs font-black text-white/50">
                    30-day money-back guarantee. If you don't see at least one job worth chasing, we refund every penny. No quibbles.
                  </p>
                </div>
              )}

              {/* Inline upgrade prompt on each card */}
              <div className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-5 text-center">
                <p className="font-black text-[var(--green)]">THIS IS A PREVIEW — UNLOCK FULL DETAILS</p>
                <p className="mt-1 font-black text-[var(--muted)]">
                  Buyer name, deadline, source link, and WhatsApp alerts are locked on the free plan.
                </p>
                <Link to="/pricing" className="jf-button mt-3 bg-[var(--navy)] text-white inline-block">
                  UNLOCK FROM £6.99/WK →
                </Link>
                <p className="mt-2 text-xs font-black text-[var(--muted)]">
                  30-day money-back guarantee. No quibbles, no hoops.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── NO SCAN YET — PROMPT ─────────────────────── */}
      {!hasScanned && !loading && !fillWeekLoading && (
        <section className="jf-box bg-[var(--navy)] p-6 text-center text-white">
          <p className="micro-label text-[var(--yellow)]">READY?</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">YOUR AREA HAS LIVE SIGNALS RIGHT NOW.</h2>
          <p className="mt-3 font-black text-white/70">
            Tap a trade above or enter your postcode. Takes 10 seconds. No signup needed.
          </p>
        </section>
      )}
    </main>
  );
}

function LeadResultCard({ lead, onWhatsapp, whatsappSent, isTracked, onTrack }: { key?: string; lead: Lead; onWhatsapp: () => void; whatsappSent: boolean; isTracked: boolean; onTrack: () => void }) {
  const reasons = lead.reasons?.length ? lead.reasons : ['Official source', `${lead.sourceConfidence}% source confidence`];
  const outward = lead.postcodeOutward || 'Unknown';
  const dist = lead.distanceMiles;
  const distLabel = dist !== undefined && dist > 0 ? `${Math.round(dist)} miles from ${outward}` : `In ${outward}`;

  const fields = [
    ['Trade', titleCase(String(lead.trade || lead.tradeMatch || 'trade'))],
    ['Location', lead.location || outward],
    ['Distance', distLabel],
    ['Value', safePreviewValue(lead.estimatedValue)],
    ['Urgency', lead.urgency || 'Unknown'],
  ];

  const isGold = lead.score >= 80;

  return (
    <article className="jf-box grid gap-4 bg-white p-4 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_260px]">
      <ScoreBadge score={lead.score} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Tag label={tierLabel(lead.score)} />
          {lead.source && <Tag label="verified_signal" />}
          {lead.urgency && <Tag label={lead.urgency} />}
          {isTracked && <span className="badge bg-[var(--navy)] text-white text-[10px] font-black">TRACKING</span>}
        </div>
        <h2 className="mt-3 text-2xl font-black leading-tight">{lead.title}</h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(([label, value]) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {reasons.map((reason) => <span key={reason} className="badge bg-[var(--bg-main)] text-[var(--ink)]">{reason}</span>)}
        </div>
      </div>
      <div className="grid gap-3 md:self-start">
        <LockedValue label="Buyer" value={lead.buyer} />
        <LockedValue label="Deadline" value={lead.deadlineAt ? new Date(lead.deadlineAt).toLocaleDateString('en-GB') : undefined} />
        <LockedValue label="Source URL" value={lead.url || undefined} isLink href={lead.url} />
        {isTracked ? (
          <button className="jf-button w-full bg-[var(--navy)] text-white opacity-70 cursor-default" disabled>
            TRACKING IN CHASE
          </button>
        ) : (
          <button className="jf-button w-full bg-[var(--ink)] text-white text-xs" onClick={onTrack}>
            TRACK THIS LEAD
          </button>
        )}
        {isGold ? (
          <button className="jf-button w-full bg-[var(--green)] text-white" onClick={onWhatsapp} disabled={whatsappSent}>
            {whatsappSent ? 'SENT TO WHATSAPP' : 'SEND TO WHATSAPP'}
          </button>
        ) : (
          <button className="jf-button w-full bg-[var(--navy)] text-white" onClick={onWhatsapp} disabled={whatsappSent}>{whatsappSent ? 'SENT' : 'SEND TO WHATSAPP'}</button>
        )}
      </div>
    </article>
  );
}

const EPC_RATING_COLOURS: Record<string, string> = {
  A: 'bg-[#008054] text-white',
  B: 'bg-[#19b459] text-white',
  C: 'bg-[#8dce46] text-[#1a1a1a]',
  D: 'bg-[#ffd500] text-[#1a1a1a]',
  E: 'bg-[#fcaa65] text-[#1a1a1a]',
  F: 'bg-[#ef8023] text-white',
  G: 'bg-[#e9153b] text-white',
};

function EpcSourceBadge({ title }: { title: string }) {
  const match = title.match(/Rating\s+([A-G])/i);
  const rating = match ? match[1].toUpperCase() : null;
  const ratingColour = rating ? (EPC_RATING_COLOURS[rating] ?? 'bg-gray-400 text-white') : '';
  return (
    <span className="flex items-center gap-1">
      <span className="badge bg-[#2d7a4f] text-white font-black text-xs px-2 py-1">EPC</span>
      {rating && (
        <span className={`badge font-black text-xs px-2 py-1 ${ratingColour}`}>{rating}</span>
      )}
    </span>
  );
}

function EmptyScanReport({ trade, radiusMiles, result, lastUpdated, onWiden }: {
  trade: Trade;
  radiusMiles: number;
  result: LeadSearchResponse;
  lastUpdated: string;
  onWiden: (radius: number) => void;
}) {
  const nextRadius = radiusMiles < 50 ? 50 : 100;
  const adjacentTrade = trade === 'building' ? 'roofing' : 'building';

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">SCAN REPORT</p>
      <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">NO LIVE MATCHES. NO FAKE LEADS.</h2>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Engine checked" value={result.source === 'lead_engine' ? 'JobFilter' : 'Verified'} />
        <Stat label="Trade" value={titleCase(trade)} />
        <Stat label="Radius" value={`${radiusMiles} miles`} />
        <Stat label="Checked" value={lastUpdated || 'N/A'} />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => onWiden(nextRadius)}>
          WIDEN TO {nextRadius} MILES
        </button>
        <button className="jf-button bg-white text-[var(--ink)]" onClick={() => onWiden(100)}>
          INCLUDE REGIONAL JOBS
        </button>
        <Link className="jf-button bg-[var(--navy)] text-white" to="/pricing">
          GET WHATSAPP ALERTS
        </Link>
      </div>
      <p className="mt-5 font-black text-[var(--muted)]">
        Next best move: watch this trade automatically, widen the radius, or scan adjacent {adjacentTrade} work. Pro alerts send the match when it appears.
      </p>
    </section>
  );
}

function LockedValue({ label, value, isLink, href }: { label: string; value: string | undefined; isLink?: boolean; href?: string }) {
  if (!value) {
    return (
      <div className="relative border-2 border-[var(--line)] overflow-hidden p-3">
        <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
        <p className="mt-1 font-black blur-sm select-none text-[var(--ink)] pointer-events-none">████████████████</p>
        <Link
          to="/pricing"
          className="absolute inset-0 flex items-center justify-center bg-white/80"
        >
          <span className="bg-[var(--navy)] text-white text-[10px] font-black px-2 py-1 tracking-widest">UNLOCK</span>
        </Link>
      </div>
    );
  }
  if (isLink && href) {
    return (
      <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
        <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
        <a href={href} target="_blank" rel="noreferrer" className="mt-1 block font-black text-[var(--navy)] underline underline-offset-2 truncate text-sm">VIEW SOURCE →</a>
      </div>
    );
  }
  return (
    <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { key?: string; label: string; value: string }) {
  return (
    <div>
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function safePreviewValue(value: string) {
  if (!value) return 'Unlock exact value';
  return value;
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function tierLabel(score: number) {
  if (score >= 80) return 'GOLD';
  if (score >= 55) return 'WORTH CHECKING';
  return 'LOW SIGNAL';
}
