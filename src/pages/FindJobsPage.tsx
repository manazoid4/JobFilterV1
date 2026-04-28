import { FormEvent, useState } from 'react';
import { LeadCard } from '../components/LeadCard';
import type { LeadSearchResponse, Trade } from '../lib/types';

const trades: Trade[] = ['electrical', 'plumbing', 'roofing', 'building'];

export function FindJobsPage() {
  const [postcode, setPostcode] = useState('');
  const [trade, setTrade] = useState<Trade>('electrical');
  const [result, setResult] = useState<LeadSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/leads/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode: postcode.trim().toUpperCase(), trade }),
      });
      const data = await res.json() as LeadSearchResponse;
      setResult(data);
      if (!res.ok || (data.errors?.length ?? 0) > 0) {
        setError(data.errors?.[0] ?? 'Scan failed.');
      }
      setLastUpdated(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setError('Network error. Try again.');
      setResult({ total: 0, region: '', outward: '', leads: [], errors: [] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--navy)] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--yellow)]">Live Scanner · Contracts Finder</p>
          <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">Find real jobs near you.</h1>
          <p className="mt-3 max-w-2xl text-base font-semibold text-white/60">
            Live public procurement notices filtered by trade and location. Honest empty state if nothing matches.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-black uppercase tracking-widest text-white/50">Postcode</label>
            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 font-black text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--yellow)]"
              placeholder="B14 7QH"
              required
            />
          </div>
          <div className="sm:w-44">
            <label className="mb-1 block text-xs font-black uppercase tracking-widest text-white/50">Trade</label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value as Trade)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 font-black text-white focus:outline-none focus:ring-2 focus:ring-[var(--yellow)]"
            >
              {trades.map((t) => <option key={t} value={t} className="bg-[var(--navy)]">{t}</option>)}
            </select>
          </div>
          <button
            disabled={loading}
            className="rounded-lg bg-[var(--yellow)] px-6 py-3 font-black text-[var(--ink)] hover:opacity-90 disabled:opacity-50 sm:whitespace-nowrap"
          >
            {loading ? 'Scanning...' : 'Scan now →'}
          </button>
        </form>

        {loading && (
          <div className="mt-6 rounded-xl border border-[var(--yellow)]/30 bg-[var(--yellow)]/10 p-5">
            <p className="font-black text-[var(--yellow)]">Scanning live feed…</p>
            <p className="mt-1 text-sm text-white/60">Checking Contracts Finder. Usually takes 3–8 seconds.</p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="font-black text-red-400">{error}</p>
            <button onClick={() => submit({ preventDefault() {} } as FormEvent)} className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-sm font-black hover:bg-white/20">
              Retry →
            </button>
          </div>
        )}

        {result && !loading && (
          <div className="mt-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-white/50">
                {result.total > 0 ? `${result.total} result${result.total !== 1 ? 's' : ''}` : 'No results'} · {result.region || 'UK'}{lastUpdated && ` · updated ${lastUpdated}`}
              </p>
            </div>

            {result.total === 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-lg font-black text-white/60">No live matches found.</p>
                <p className="mt-2 text-sm text-white/40">Try a different trade or scan again later — the feed updates throughout the day.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {result.leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
