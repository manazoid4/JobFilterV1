"use client";
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Calculator, Clock, ExternalLink, Fuel, MapPin, PackageCheck, Search, Star, Wallet, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { apiGet } from '../lib/api';

type SortMode = 'cheapest' | 'pickup' | 'delivered' | 'nearest';

type MaterialResult = {
  id: string;
  material: string;
  category: string;
  supplier: string;
  productName: string;
  priceIncVat: number;
  unit: string;
  sourceUrl: string;
  checkedAt: string;
  sourceConfidence: number;
  branchSignal: string;
  deliveryOptions: string;
  collectionOptions: string;
  tradePricingNote: string;
  postcodeRelevance: string;
  warning: string;
  estimatedDistanceMiles: number | null;
  stale: boolean;
};

type MaterialPriceResponse = {
  ok: boolean;
  checkedAt: string;
  disclaimer: string;
  count: number;
  results: MaterialResult[];
  unavailable: boolean;
  errors: string[];
};

type SavedLine = {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
};

const DEFAULT_POSTCODE = 'SW1A';
const DEFAULT_QUERY = 'plasterboard';
const STORAGE_KEY = 'jobfilter.materials.savedList.v1';

function money(value: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
}

function checkedLabel(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function fuelEstimate(distanceMiles: number | null) {
  if (distanceMiles === null) return null;
  const roundTrip = distanceMiles * 2;
  return {
    miles: roundTrip,
    cost: roundTrip * 0.32,
    timeMinutes: Math.max(12, Math.round(roundTrip * 4)),
  };
}

function sortResults(results: MaterialResult[], mode: SortMode) {
  const next = [...results];
  if (mode === 'nearest') {
    return next.sort((a, b) => (a.estimatedDistanceMiles ?? 999) - (b.estimatedDistanceMiles ?? 999));
  }
  if (mode === 'pickup') {
    return next.sort((a, b) => {
      const aFast = a.collectionOptions.toLowerCase().includes('today') || a.collectionOptions.toLowerCase().includes('15 minutes');
      const bFast = b.collectionOptions.toLowerCase().includes('today') || b.collectionOptions.toLowerCase().includes('15 minutes');
      return Number(bFast) - Number(aFast) || a.priceIncVat - b.priceIncVat;
    });
  }
  if (mode === 'delivered') {
    return next.sort((a, b) => {
      const aDelivery = a.deliveryOptions.toLowerCase().includes('free') ? 0 : 1;
      const bDelivery = b.deliveryOptions.toLowerCase().includes('free') ? 0 : 1;
      return aDelivery - bDelivery || a.priceIncVat - b.priceIncVat;
    });
  }
  return next.sort((a, b) => a.priceIncVat - b.priceIncVat);
}

function getSavedList() {
  try {
    const raw = (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as SavedLine[] : [];
  } catch {
    return [];
  }
}

export function MaterialPriceEnginePage() {
  const [postcode, setPostcode] = useState(DEFAULT_POSTCODE);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [qty, setQty] = useState(10);
  const [sortMode, setSortMode] = useState<SortMode>('cheapest');
  const [data, setData] = useState<MaterialPriceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState<SavedLine[]>(() => getSavedList());

  async function loadPrices(nextQuery = query, nextPostcode = postcode) {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ q: nextQuery, postcode: nextPostcode });
      const response = await apiGet<MaterialPriceResponse>(`/api/material-prices?${params.toString()}`, { timeout: 12000 });
      setData(response);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : 'Material prices unavailable right now.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPrices(DEFAULT_QUERY, DEFAULT_POSTCODE);
  }, []);

  useEffect(() => {
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const sorted = useMemo(() => sortResults(data?.results ?? [], sortMode), [data?.results, sortMode]);
  const best = sorted[0] ?? null;
  const highest = sorted.reduce((max, item) => Math.max(max, item.priceIncVat), 0);
  const savings = best ? Math.max(0, (highest - best.priceIncVat) * qty) : 0;
  const basketTotal = saved.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  function submit(event: FormEvent) {
    event.preventDefault();
    void loadPrices();
  }

  function saveLine(item: MaterialResult) {
    setSaved((current) => {
      const exists = current.find((line) => line.id === item.id);
      if (exists) {
        return current.map((line) => line.id === item.id ? { ...line, qty: line.qty + qty } : line);
      }
      return [{ id: item.id, name: `${item.material} - ${item.supplier}`, qty, unitPrice: item.priceIncVat }, ...current].slice(0, 8);
    });
  }

  return (
    <main className="page-shell grid gap-6 py-6 pb-16">
      <section className="jf-box bg-[var(--ink)] p-6 text-white md:p-8">
        <p className="micro-label text-[var(--yellow)]">MATERIAL PRICE ENGINE</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <h1 className="headline max-w-4xl text-5xl leading-none text-white md:text-7xl">
              STOP OVERPAYING BEFORE YOU QUOTE.
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-black text-white/85">
              Reference prices from major UK suppliers — Selco, Travis Perkins, Buildbase. Use as a quoting baseline; confirm live prices with supplier before ordering.
            </p>
          </div>
          <div className="border-2 border-white bg-[var(--yellow)] p-4 text-[var(--ink)] shadow-[4px_4px_0_white]">
            <p className="micro-label">PAID REASON</p>
            <p className="headline mt-2 text-3xl">SAVE MORE THAN THE SUBSCRIPTION.</p>
            <p className="mt-2 text-sm font-black">Know material costs before you quote. Stop losing margin to price jumps.</p>
          </div>
        </div>
      </section>

      <section className="jf-box bg-white p-5">
        <form onSubmit={submit} className="grid gap-3 lg:grid-cols-[1fr_1fr_140px_auto] lg:items-end">
          <label className="field-label">
            Job postcode
            <input className="field-input" value={postcode} onChange={(event) => setPostcode(event.target.value)} placeholder="e.g. SW1A" />
          </label>
          <label className="field-label">
            Material search
            <input className="field-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="plasterboard, CLS, OSB, foam..." />
          </label>
          <label className="field-label">
            Quantity
            <input className="field-input" type="number" min={1} value={qty} onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))} />
          </label>
          <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" type="submit">
            <Search className="mr-2 h-4 w-4" /> Compare
          </button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={Wallet} label="Best price found" value={best ? money(best.priceIncVat) : 'Unavailable'} note={best ? best.supplier : 'Search a tracked material'} />
        <MetricCard icon={Calculator} label="Estimated saving" value={money(savings)} note={`Against highest traced price x ${qty}`} />
        <MetricCard icon={Fuel} label="Trip estimate" value={best ? `${fuelEstimate(best.estimatedDistanceMiles)?.timeMinutes ?? 0} min` : 'N/A'} note={best ? `${money(fuelEstimate(best.estimatedDistanceMiles)?.cost ?? 0)} fuel estimate` : 'Needs postcode'} />
        <MetricCard icon={Star} label="Saved list" value={money(basketTotal)} note={`${saved.length} saved material lines`} />
      </section>

      <section className="jf-box bg-[var(--paper)] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="micro-label text-[var(--orange)]">SORT RESULTS</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">Cheapest, fastest pickup, cheapest delivered, or nearest branch signal.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            {[
              ['cheapest', 'Cheapest'],
              ['pickup', 'Fastest pickup'],
              ['delivered', 'Cheapest delivered'],
              ['nearest', 'Nearest branch'],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`border-2 border-[var(--ink)] px-3 py-2 text-xs font-black uppercase ${sortMode === value ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white text-[var(--muted)]'}`}
                onClick={() => setSortMode(value as SortMode)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading && (
        <section className="jf-box bg-white p-6 text-center">
          <p className="headline text-3xl">Checking traceable supplier prices...</p>
        </section>
      )}

      {error && (
        <section className="jf-box border-[var(--orange)] bg-white p-6">
          <p className="micro-label text-[var(--orange)]">DATA UNAVAILABLE</p>
          <p className="mt-2 font-black">{error}</p>
        </section>
      )}

      {!loading && data?.unavailable && (
        <section className="jf-box border-[var(--orange)] bg-white p-6">
          <p className="micro-label text-[var(--orange)]">DATA UNAVAILABLE</p>
          <h2 className="headline mt-2 text-3xl">NO TRACEABLE PRICE FOUND.</h2>
          <p className="mt-2 font-black text-[var(--muted)]">No made-up supplier data is shown. Try plasterboard, CLS timber, OSB, expanding foam, copper or cement.</p>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          {sorted.map((item) => {
            const fuel = fuelEstimate(item.estimatedDistanceMiles);
            return (
              <article key={item.id} className="jf-box bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase">{item.supplier}</span>
                      <span className="border-2 border-[var(--ink)] bg-white px-2 py-1 text-xs font-black uppercase">Confidence {item.sourceConfidence}%</span>
                      {item.stale && <span className="border-2 border-[var(--orange)] bg-[var(--orange)] px-2 py-1 text-xs font-black uppercase text-white">Stale &gt; 24h</span>}
                    </div>
                    <h2 className="headline mt-3 text-3xl leading-none">{item.productName}</h2>
                    <p className="mt-2 font-black text-[var(--muted)]">{item.material}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="headline text-5xl text-[var(--green)]">{money(item.priceIncVat)}</p>
                    <p className="text-xs font-black uppercase text-[var(--muted)]">per {item.unit}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <InfoTile icon={MapPin} label="Branch signal" value={item.branchSignal} />
                  <InfoTile icon={PackageCheck} label="Collection" value={item.collectionOptions} />
                  <InfoTile icon={Clock} label="Delivery" value={item.deliveryOptions} />
                </div>

                <div className="mt-4 grid gap-3 border-t-2 border-[var(--line)] pt-4 md:grid-cols-3">
                  <p className="text-sm font-black text-[var(--muted)]">Last checked: <span className="text-[var(--ink)]">{checkedLabel(item.checkedAt)}</span></p>
                  <p className="text-sm font-black text-[var(--muted)]">Trip: <span className="text-[var(--ink)]">{fuel ? `${fuel.miles.toFixed(1)} mi / ${money(fuel.cost)}` : 'postcode needed'}</span></p>
                  <p className="text-sm font-black text-[var(--muted)]">{item.tradePricingNote}</p>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a className="jf-button bg-[var(--ink)] text-white" href={item.sourceUrl} target="_blank" rel="noreferrer">
                    Source <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                  <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" type="button" onClick={() => saveLine(item)}>
                    Save to list
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="grid gap-4 self-start">
          <section className="jf-box bg-[var(--yellow)] p-5">
            <p className="micro-label">MONTHLY SAVINGS TRACKER</p>
            <p className="headline mt-2 text-5xl">{money(savings)}</p>
            <p className="mt-2 text-sm font-black">Estimated saving for this search quantity versus the highest traceable price in current results.</p>
          </section>

          <section className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--orange)]">SAVED MATERIAL LIST</p>
            {saved.length === 0 ? (
              <p className="mt-3 font-black text-[var(--muted)]">Save supplier lines to build a quote basket.</p>
            ) : (
              <div className="mt-3 grid gap-3">
                <div className="border-2 border-[var(--ink)] bg-[var(--yellow)] p-3">
                  <p className="text-xs font-black uppercase text-[var(--ink)]">BASKET TOTAL ({saved.length} lines)</p>
                  <p className="headline mt-1 text-3xl">{money(basketTotal)}</p>
                </div>
                <div className="relative">
                  <div className="pointer-events-none select-none blur-[2px] grid gap-2">
                    {saved.map((line) => (
                      <div key={line.id} className="border-2 border-[var(--line)] bg-[var(--paper)] p-3">
                        <p className="text-sm font-black">{line.name}</p>
                        <p className="mt-1 text-xs font-black text-[var(--muted)]">Qty {line.qty} x {money(line.unitPrice)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                    <p className="text-xs font-black uppercase text-[var(--ink)] text-center">Full breakdown + export</p>
                    <Link href="/pricing" className="jf-button mt-2 bg-[var(--navy)] text-white text-xs">UPGRADE — £39/MO</Link>
                  </div>
                </div>
                <button className="jf-button bg-white text-[var(--ink)]" type="button" onClick={() => setSaved([])}>Clear list</button>
              </div>
            )}
          </section>

          <section className="jf-box border-[var(--orange)] bg-white p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-[var(--orange)]" />
              <p className="text-sm font-black text-[var(--muted)]">
                {data?.disclaimer ?? 'Static reference prices. Confirm with supplier before purchase.'}
              </p>
            </div>
          </section>

          <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/pricing">Use this every month</Link>
        </aside>
      </section>
    </main>
  );
}

function MetricCard({ icon: Icon, label, value, note }: { icon: LucideIcon; label: string; value: string; note: string }) {
  return (
    <article className="jf-box bg-white p-4">
      <Icon className="h-6 w-6 text-[var(--orange)]" />
      <p className="micro-label mt-3 text-[var(--muted)]">{label}</p>
      <p className="headline mt-1 text-3xl">{value}</p>
      <p className="mt-1 text-xs font-black text-[var(--muted)]">{note}</p>
    </article>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border-2 border-[var(--line)] bg-[var(--paper)] p-3">
      <Icon className="h-5 w-5 text-[var(--orange)]" />
      <p className="micro-label mt-2 text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}
