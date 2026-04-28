import { FormEvent, useState } from 'react';
import { LeadCard } from '../components/LeadCard';
import type { LeadSearchResponse, Trade } from '../lib/types';

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building'];

export function FindJobsPage() {
  const [postcode, setPostcode] = useState('B14 7QH');
  const [trade, setTrade] = useState<Trade>('electrical');
  const [radiusMiles, setRadiusMiles] = useState(25);
  const [result, setResult] = useState<LeadSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setErrorText('');
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode, trade, radiusMiles }),
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
        source: 'contracts_finder',
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

  async function retryScan() {
    await submit({ preventDefault() {} } as FormEvent);
  }

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">LIVE SCANNER</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">FIND REAL JOBS NEAR YOU</h1>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">
          Contracts Finder only. No made-up leads.
        </p>
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
          <p className="micro-label text-[var(--yellow)]">CONTRACTS FINDER</p>
          <p className="mt-2 text-xl font-black">Checking live notices.</p>
        </section>
      )}

      {result && (
        <section className="grid gap-5">
          {errorText && (
            <div className="jf-box bg-[var(--orange)] p-5 text-white">
              <p className="font-black">Scan failed cleanly.</p>
              <p className="mt-1 font-semibold">{errorText}</p>
              <button onClick={() => void retryScan()} className="jf-button mt-4 bg-white text-[var(--ink)]">RETRY</button>
            </div>
          )}

          <div className="jf-box grid gap-3 bg-white p-4 md:grid-cols-5">
            <Stat label="Source" value="Contracts Finder" />
            <Stat label="Count" value={String(result.count)} />
            <Stat label="Region" value={result.region || 'Unknown'} />
            <Stat label="Outward" value={result.outward || 'N/A'} />
            <Stat label="Updated" value={lastUpdated || 'N/A'} />
          </div>

          {result.count === 0 ? (
            <div className="jf-box bg-white p-6">
              <p className="micro-label text-[var(--orange)]">EMPTY</p>
              <h2 className="headline mt-2 text-4xl">NO LIVE MATCHES</h2>
              <p className="mt-2 font-black text-[var(--muted)]">Try a wider radius or scan later.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {result.leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  title={lead.title}
                  score={lead.score}
                  tags={[lead.postcodeOutward ? 'Local' : 'Clear', lead.estimatedValue ? 'Budget' : 'Clear', 'Risk'].slice(0, 3)}
                  cta="VIEW NOTICE"
                  href={lead.url}
                  meta={lead.source}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
