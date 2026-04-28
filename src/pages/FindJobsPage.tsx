import { FormEvent, useState } from 'react';
import { LeadCard } from '../components/LeadCard';
import { SectionLabel } from '../components/SectionLabel';
import type { LeadSearchResponse, Trade } from '../lib/types';

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building'];

export function FindJobsPage() {
  const [postcode, setPostcode] = useState('B14 7QH');
  const [trade, setTrade] = useState<Trade>('electrical');
  const [radiusMiles, setRadiusMiles] = useState(25);
  const [result, setResult] = useState<LeadSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
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
      setLastUpdated(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
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

  return (
    <main className="page-shell py-10">
      <section className="jf-box bg-white p-6 md:p-8">
        <SectionLabel>FIG. 01 · LIVE SCANNER</SectionLabel>
        <h1 className="headline mt-5 text-6xl leading-none md:text-8xl">FIND REAL JOBS NEAR YOU.</h1>
        <p className="mt-4 max-w-3xl text-lg font-black text-[var(--muted)]">
          Live Contracts Finder notices only. If the feed has nothing useful, you see an honest empty state.
        </p>
        <form onSubmit={submit} className="mt-8 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <label className="field-label">
            Postcode
            <input value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} className="field-input" placeholder="B14 7QH" />
          </label>
          <label className="field-label">
            Trade
            <select value={trade} onChange={(e) => setTrade(e.target.value as Trade)} className="field-input">
              {trades.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="field-label">
            Radius
            <select value={radiusMiles} onChange={(e) => setRadiusMiles(Number(e.target.value))} className="field-input">
              {[10, 25, 50, 100].map((miles) => <option key={miles} value={miles}>{miles} miles</option>)}
            </select>
          </label>
          <button disabled={loading} className="jf-button self-end bg-[var(--navy)] text-white disabled:opacity-60">
            {loading ? 'SCANNING...' : 'SCAN NOW →'}
          </button>
        </form>
      </section>

      {loading && (
        <section className="jf-box mt-5 bg-[var(--navy)] p-5 text-white">
          <p className="micro-label text-[var(--yellow)]">SOURCE · CONTRACTS FINDER</p>
          <p className="mt-3 text-xl font-black">Scanning live public procurement feed. Results appear when the feed responds.</p>
        </section>
      )}

      {result && (
        <section className="mt-5">
          {!result.ok && (
            <div className="jf-box mb-5 bg-[var(--orange)] p-5 text-white">
              <p className="font-black">Scan failed cleanly.</p>
              <p className="mt-1 font-semibold">{result.errors.join(' ') || 'Retry in a minute.'}</p>
              <button onClick={submit as any} className="jf-button mt-4 bg-white text-[var(--ink)]">RETRY</button>
            </div>
          )}

          <div className="jf-box grid gap-3 bg-white p-4 md:grid-cols-5">
            <Stat label="Source" value="Contracts Finder" />
            <Stat label="Count" value={String(result.count)} />
            <Stat label="Region" value={result.region || 'Unknown'} />
            <Stat label="Outward" value={result.outward || 'N/A'} />
            <Stat label="Last updated" value={lastUpdated || 'N/A'} />
          </div>

          {result.count === 0 ? (
            <div className="jf-box mt-5 bg-white p-8">
              <p className="micro-label text-[var(--orange)]">EMPTY · HONEST RESULT</p>
              <h2 className="headline mt-3 text-5xl">NO LIVE MATCHES FOUND.</h2>
              <p className="mt-3 max-w-2xl text-lg font-bold text-[var(--muted)]">
                Contracts Finder returned no usable notices for this trade and search. Try a wider radius, a different trade, or scan again later.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {result.leads.map((lead) => (
                <div key={lead.id}>
                  <LeadCard lead={lead} />
                </div>
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
