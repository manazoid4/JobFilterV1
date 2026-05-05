import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScoreBadge } from '../components/ScoreBadge';
import { Tag } from '../components/Tag';
import type { Lead, LeadSearchResponse, Trade } from '../lib/types';

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];

const TRADE_PRESETS: { label: string; trade: Trade }[] = [
  { label: '⚡ ELECTRICAL', trade: 'electrical' },
  { label: '🔧 PLUMBING', trade: 'plumbing' },
  { label: '🏗️ BUILDING', trade: 'building' },
  { label: '🏠 ROOFING', trade: 'roofing' },
  { label: '🌿 LANDSCAPING', trade: 'landscaping' },
];

export function FindJobsPage() {
  const [postcode, setPostcode] = useState('B14 7QH');
  const [trade, setTrade] = useState<Trade>('electrical');
  const [radiusMiles, setRadiusMiles] = useState(25);
  const [result, setResult] = useState<LeadSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [whatsappSent, setWhatsappSent] = useState<Record<string, boolean>>({});

  async function submit(event?: FormEvent, overrides?: { radiusMiles?: number; trade?: Trade }) {
    event?.preventDefault();
    setErrorText('');
    setLoading(true);
    setResult(null);
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

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">LIVE INTAKE ENGINE</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">FIND JOBS WORTH PRICING</h1>
        <p className="mt-3 max-w-2xl text-lg font-black text-[var(--muted)]">
          Planning data, tender notices, company signals, and official source proof. JobFilter scores value, urgency, proximity, and completeness before anything hits your phone.
        </p>
        <div className="mt-4">
          <p className="micro-label text-[var(--muted)]">QUICK SCAN</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TRADE_PRESETS.map((preset) => (
              <button
                key={preset.trade}
                type="button"
                disabled={loading}
                onClick={() => { setTrade(preset.trade); void submit(undefined, { trade: preset.trade }); }}
                className="bg-[var(--ink)] text-white px-3 py-2 text-sm font-black disabled:opacity-60"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <label className="field-label">
            Postcode
            <input value={postcode} onChange={(event) => setPostcode(event.target.value.toUpperCase())} className="field-input" placeholder="B14 7QH" />
          </label>
          <label className="field-label">
            Trade
            <select value={trade} onChange={(event) => setTrade(event.target.value as Trade)} className="field-input">
              {trades.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="field-label">
            Radius
            <select value={radiusMiles} onChange={(event) => setRadiusMiles(Number(event.target.value))} className="field-input">
              {[10, 25, 50, 100].map((miles) => <option key={miles} value={miles}>{miles} miles</option>)}
            </select>
          </label>
          <button disabled={loading} className="jf-button self-end bg-[var(--navy)] text-white disabled:opacity-60">
            {loading ? 'SCANNING' : 'SCAN NOW'}
          </button>
        </form>
      </section>

      {loading && (
        <section className="jf-box bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">LEAD ENGINE</p>
          <p className="mt-2 text-xl font-black">Checking planning, tender, company, and fallback signals before scoring quality.</p>
        </section>
      )}

      {result && (
        <section className="grid gap-5">
          {errorText && (
            <div className="jf-box bg-[var(--orange)] p-5 text-white">
              <p className="font-black">Scan failed cleanly.</p>
              <p className="mt-1 font-semibold">{errorText}</p>
              <button onClick={() => void submit()} className="jf-button mt-4 bg-white text-[var(--ink)]">RETRY</button>
            </div>
          )}

          <div className="jf-box grid gap-3 bg-white p-4 md:grid-cols-5">
            <Stat label="Source" value={result.source === 'lead_engine' ? 'Lead Engine' : 'Contracts Finder'} />
            <Stat label="Matches" value={String(result.count)} />
            <Stat label="Region" value={result.region || 'Unknown'} />
            <Stat label="Outward" value={result.outward || 'N/A'} />
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
              <section className="jf-box bg-[var(--yellow)] p-5">
                <p className="micro-label text-[var(--ink)]">RANKED BY MONEY SIGNAL</p>
                <h2 className="headline mt-2 text-4xl leading-none">HIGHEST VALUE FIRST</h2>
                <p className="mt-2 max-w-2xl font-black text-[var(--ink)]/75">
                  Free view proves the signal exists. Pro unlocks exact value, buyer detail, deadline, WhatsApp delivery, and the full action workflow.
                </p>
              </section>
              {result.leads.slice(0, 2).map((lead) => (
                <LeadResultCard key={lead.id} lead={lead} onWhatsapp={() => sendWhatsApp(lead)} whatsappSent={!!whatsappSent[lead.id]} />
              ))}
              {result.count > 2 && (
                <div className="jf-box bg-white p-8 text-center border-dashed border-4 border-[var(--line)]">
                  <p className="headline text-2xl text-[var(--muted)]">AND {result.count - 2} MORE LOCKED LEADS</p>
                  <Link to="/pricing" className="jf-button mt-4 bg-[var(--navy)] text-white">UNLOCK ALL RESULTS</Link>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function LeadResultCard({ lead, onWhatsapp, whatsappSent }: { key?: string; lead: Lead; onWhatsapp: () => void; whatsappSent: boolean }) {
  const reasons = lead.reasons?.length ? lead.reasons : ['Official source', `${lead.sourceConfidence}% source confidence`];
  const fields = [
    ['Trade', titleCase(String(lead.trade || lead.tradeMatch || 'trade'))],
    ['Location', lead.location || lead.postcodeOutward || 'Unknown'],
    ['Outward', lead.postcodeOutward || 'N/A'],
    ['Value', safePreviewValue(lead.estimatedValue)],
    ['Urgency', 'Unlock timing'],
    ['Contact', 'Unlock on Pro'],
  ];

  const isGold = lead.score >= 80;

  return (
    <article className="jf-box grid gap-4 bg-white p-4 md:grid-cols-[auto_1fr_260px]">
      <ScoreBadge score={lead.score} />
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <Tag label={tierLabel(lead.score)} />
          {lead.source === 'EPC' && <Tag label="epc_signal" />}
          {lead.source === 'PlanningData' && <Tag label="planning_portal" />}
          <Tag label="Timing locked" />
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
        <LockedValue label="Buyer" value="Unlock on Pro" />
        <LockedValue label="Deadline" value="Unlock on Pro" />
        <Link className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">UNLOCK FULL DETAIL</Link>
        {isGold ? (
          <button className="jf-button w-full bg-[var(--green)] text-white" onClick={onWhatsapp} disabled={whatsappSent}>
            {whatsappSent ? 'SENT TO WHATSAPP ✓' : 'SEND TO WHATSAPP'}
          </button>
        ) : (
          <button className="jf-button w-full bg-[var(--bg-main)] text-[var(--ink)]" disabled>SEND TO WHATSAPP - PRO</button>
        )}
      </div>
    </article>
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
      <h2 className="headline mt-2 text-4xl leading-none">NO LIVE MATCHES. NO FAKE LEADS.</h2>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Source checked" value={result.source === 'lead_engine' ? 'Lead Engine' : 'Contracts Finder'} />
        <Stat label="Trade" value={titleCase(trade)} />
        <Stat label="Area" value={`${result.outward || 'N/A'} / ${result.region || 'Unknown'}`} />
        <Stat label="Checked" value={lastUpdated || 'N/A'} />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
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

function LockedValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-black">{value || 'Unlock on Pro'}</p>
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

