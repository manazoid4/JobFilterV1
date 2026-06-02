"use client";
import { useMemo, useState } from 'react';
import Link from 'next/link';

// Static benchmark data per trade/job type — not live prices.
// All values in GBP, representing typical UK material costs as of early 2025.
const BENCHMARKS: Record<string, Record<string, Array<{ name: string; qty: number; unit: string; unitPrice: number }>>> = {
  Electrical: {
    'Consumer unit upgrade': [
      { name: 'Consumer unit (18-way)', qty: 1, unit: 'unit', unitPrice: 120 },
      { name: 'MCBs (pack of 10)', qty: 2, unit: 'pack', unitPrice: 35 },
      { name: 'RCDs (dual 63A)', qty: 2, unit: 'unit', unitPrice: 22 },
      { name: 'Cable (2.5mm twin+E, 10m)', qty: 5, unit: 'roll', unitPrice: 18 },
      { name: 'Sundries (connectors, tape, fixings)', qty: 1, unit: 'lot', unitPrice: 25 },
    ],
    'EV charger installation': [
      { name: '7kW EV charger unit', qty: 1, unit: 'unit', unitPrice: 350 },
      { name: 'Armoured cable (10mm, 10m)', qty: 1, unit: 'roll', unitPrice: 85 },
      { name: 'Weatherproof enclosure', qty: 1, unit: 'unit', unitPrice: 30 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 20 },
    ],
    'Rewire': [
      { name: 'Consumer unit', qty: 1, unit: 'unit', unitPrice: 120 },
      { name: 'Cable 2.5mm T+E (100m)', qty: 3, unit: 'drum', unitPrice: 145 },
      { name: 'Cable 1.5mm T+E (100m)', qty: 2, unit: 'drum', unitPrice: 110 },
      { name: 'Sockets and plates (pack)', qty: 3, unit: 'pack', unitPrice: 45 },
      { name: 'Back boxes (pack of 10)', qty: 2, unit: 'pack', unitPrice: 12 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 80 },
    ],
  },
  Plumbing: {
    'Boiler replacement': [
      { name: 'Condensing combi boiler', qty: 1, unit: 'unit', unitPrice: 650 },
      { name: 'Flue kit', qty: 1, unit: 'kit', unitPrice: 55 },
      { name: 'Magnetic filter', qty: 1, unit: 'unit', unitPrice: 45 },
      { name: 'Programmer/controls', qty: 1, unit: 'set', unitPrice: 60 },
      { name: 'Fittings and pipe (15mm, 22mm)', qty: 1, unit: 'lot', unitPrice: 40 },
      { name: 'Flue gas sealant/sundries', qty: 1, unit: 'lot', unitPrice: 20 },
    ],
    'Bathroom fit': [
      { name: 'Basin with pedestal', qty: 1, unit: 'unit', unitPrice: 85 },
      { name: 'WC close-coupled set', qty: 1, unit: 'unit', unitPrice: 110 },
      { name: 'Bath panel + legs', qty: 1, unit: 'set', unitPrice: 65 },
      { name: 'Bath (1700mm)', qty: 1, unit: 'unit', unitPrice: 120 },
      { name: 'Mixer taps (bath + basin)', qty: 2, unit: 'unit', unitPrice: 55 },
      { name: 'Waste and trap sets', qty: 3, unit: 'unit', unitPrice: 12 },
      { name: 'Pipe and fittings', qty: 1, unit: 'lot', unitPrice: 60 },
      { name: 'Silicone and sundries', qty: 1, unit: 'lot', unitPrice: 25 },
    ],
    'Leak repair': [
      { name: 'Pipe repair coupling (22mm)', qty: 2, unit: 'unit', unitPrice: 8 },
      { name: 'PTFE tape and flux', qty: 1, unit: 'lot', unitPrice: 8 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 15 },
    ],
  },
  Roofing: {
    'Full re-roof': [
      { name: 'Concrete interlocking tiles', qty: 200, unit: 'tile', unitPrice: 0.95 },
      { name: 'Breathable felt (50m roll)', qty: 3, unit: 'roll', unitPrice: 55 },
      { name: 'Batten (25x50mm, 50m)', qty: 10, unit: 'length', unitPrice: 4.50 },
      { name: 'Lead flashing (3m)', qty: 4, unit: 'piece', unitPrice: 28 },
      { name: 'Ridge tiles', qty: 12, unit: 'unit', unitPrice: 3.50 },
      { name: 'Nails and fixings', qty: 1, unit: 'lot', unitPrice: 25 },
    ],
    'Flat roof': [
      { name: 'GRP resin (per litre)', qty: 20, unit: 'litre', unitPrice: 12 },
      { name: 'GRP matting (per m²)', qty: 15, unit: 'm²', unitPrice: 3.50 },
      { name: 'Topcoat gelcoat (per litre)', qty: 8, unit: 'litre', unitPrice: 14 },
      { name: 'OSB decking (18mm, sheet)', qty: 8, unit: 'sheet', unitPrice: 22 },
      { name: 'Trim and drip edge', qty: 1, unit: 'lot', unitPrice: 45 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 30 },
    ],
  },
  Building: {
    'Extension': [
      { name: 'Concrete blocks (100mm, per pack)', qty: 20, unit: 'pack', unitPrice: 55 },
      { name: 'Facing bricks (per 1000)', qty: 2, unit: '1000', unitPrice: 550 },
      { name: 'Cement (25kg bags)', qty: 30, unit: 'bag', unitPrice: 7 },
      { name: 'Sand (bulk bag)', qty: 5, unit: 'bag', unitPrice: 55 },
      { name: 'DPC (30m roll)', qty: 2, unit: 'roll', unitPrice: 28 },
      { name: 'Insulation (100mm board, pack)', qty: 8, unit: 'pack', unitPrice: 45 },
      { name: 'Timber joists (6m, C24)', qty: 10, unit: 'length', unitPrice: 18 },
      { name: 'Plasterboard (2400x1200)', qty: 20, unit: 'sheet', unitPrice: 9 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 150 },
    ],
    'Loft conversion': [
      { name: 'Steel beam (UC 152x152)', qty: 2, unit: 'length', unitPrice: 180 },
      { name: 'Timber (C24 6m lengths)', qty: 20, unit: 'length', unitPrice: 18 },
      { name: 'Velux window (550x980)', qty: 2, unit: 'unit', unitPrice: 280 },
      { name: 'Insulation (100mm quilt, 10m roll)', qty: 6, unit: 'roll', unitPrice: 35 },
      { name: 'Plasterboard (2400x1200)', qty: 30, unit: 'sheet', unitPrice: 9 },
      { name: 'Staircase (loft straight)', qty: 1, unit: 'unit', unitPrice: 650 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 120 },
    ],
  },
  HVAC: {
    'Heat pump install': [
      { name: 'Air source heat pump (6kW)', qty: 1, unit: 'unit', unitPrice: 2200 },
      { name: 'Refrigerant pipe set (15m)', qty: 1, unit: 'set', unitPrice: 85 },
      { name: 'Buffer tank (100L)', qty: 1, unit: 'unit', unitPrice: 180 },
      { name: 'Controller/programmer', qty: 1, unit: 'unit', unitPrice: 120 },
      { name: 'Pipework and fittings', qty: 1, unit: 'lot', unitPrice: 60 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 40 },
    ],
    'Boiler service': [
      { name: 'Boiler service kit (filters, seals)', qty: 1, unit: 'kit', unitPrice: 25 },
      { name: 'Gas safety record pad', qty: 1, unit: 'unit', unitPrice: 5 },
    ],
  },
  Carpentry: {
    'Fitted wardrobes': [
      { name: 'MDF sheet (18mm, 8x4)', qty: 8, unit: 'sheet', unitPrice: 38 },
      { name: 'Wardrobe doors (per pair)', qty: 3, unit: 'pair', unitPrice: 85 },
      { name: 'Drawer runners (pairs, pack)', qty: 2, unit: 'pack', unitPrice: 22 },
      { name: 'Hinges and fixings', qty: 1, unit: 'lot', unitPrice: 25 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 30 },
    ],
    'Door hanging': [
      { name: 'Internal door (FD30)', qty: 1, unit: 'unit', unitPrice: 55 },
      { name: 'Door frame set', qty: 1, unit: 'set', unitPrice: 35 },
      { name: 'Hinges (pair)', qty: 2, unit: 'pair', unitPrice: 6 },
      { name: 'Latch/lock set', qty: 1, unit: 'set', unitPrice: 12 },
      { name: 'Architrave (per set)', qty: 1, unit: 'set', unitPrice: 18 },
      { name: 'Sundries', qty: 1, unit: 'lot', unitPrice: 10 },
    ],
  },
};

const TRADES = Object.keys(BENCHMARKS);
const MARKUP_OPTIONS = [10, 15, 20, 25, 30];

export type MaterialEstimatorProps = {
  defaultTrade?: string;
  defaultJob?: string;
  compact?: boolean;
};

export function MaterialEstimator({ defaultTrade, defaultJob, compact = false }: MaterialEstimatorProps) {
  const firstTrade = defaultTrade && BENCHMARKS[defaultTrade] ? defaultTrade : TRADES[0];
  const firstJob = defaultJob && BENCHMARKS[firstTrade]?.[defaultJob] ? defaultJob : Object.keys(BENCHMARKS[firstTrade])[0];

  const [trade, setTrade] = useState<string>(firstTrade);
  const [job, setJob] = useState<string>(firstJob);
  const [markup, setMarkup] = useState<number>(20);
  const [items, setItems] = useState(() =>
    (BENCHMARKS[firstTrade]?.[firstJob] ?? []).map((item, i) => ({ ...item, id: i }))
  );

  function handleTradeChange(newTrade: string) {
    const newJob = Object.keys(BENCHMARKS[newTrade] ?? {})[0] ?? '';
    setTrade(newTrade);
    setJob(newJob);
    setItems((BENCHMARKS[newTrade]?.[newJob] ?? []).map((item, i) => ({ ...item, id: i })));
  }

  function handleJobChange(newJob: string) {
    setJob(newJob);
    setItems((BENCHMARKS[trade]?.[newJob] ?? []).map((item, i) => ({ ...item, id: i })));
  }

  function updateItem(id: number, field: 'qty' | 'unitPrice', value: number) {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: Math.max(0, value) } : item));
  }

  const materialTotal = useMemo(() => items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0), [items]);
  const quoteFloorLow = useMemo(() => materialTotal * (1 + markup / 100), [materialTotal, markup]);
  const quoteFloorHigh = useMemo(() => quoteFloorLow * 1.25, [quoteFloorLow]);

  const jobOptions = Object.keys(BENCHMARKS[trade] ?? {});

  function money(v: number) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(v);
  }

  return (
    <div className="jf-box bg-white p-5">
      <p className="micro-label text-[var(--orange)]">MATERIAL ESTIMATOR</p>
      <p className="mt-0.5 text-[10px] font-black text-[var(--muted)] uppercase">
        Benchmark estimates — verify with supplier before purchase
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="field-label">
          Trade
          <select className="field-input" value={trade} onChange={(e) => handleTradeChange(e.target.value)}>
            {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="field-label">
          Job type
          <select className="field-input" value={job} onChange={(e) => handleJobChange(e.target.value)}>
            {jobOptions.map((j) => <option key={j} value={j}>{j}</option>)}
          </select>
        </label>
      </div>

      {/* Free tier: show editable line items (full breakdown) */}
      <div className="mt-4 grid gap-1">
        <div className="grid grid-cols-[1fr_70px_80px] gap-1 border-b-2 border-[var(--navy)] pb-1">
          <p className="text-[10px] font-black uppercase text-[var(--muted)]">Material</p>
          <p className="text-[10px] font-black uppercase text-[var(--muted)] text-right">Qty</p>
          <p className="text-[10px] font-black uppercase text-[var(--muted)] text-right">Unit £</p>
        </div>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_70px_80px] gap-1 items-center py-0.5">
            <p className="text-xs font-black text-[var(--ink)] truncate pr-1" title={item.name}>{item.name}</p>
            <input
              type="number"
              min={0}
              step={1}
              value={item.qty}
              onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
              className="border border-[var(--line)] bg-[var(--paper)] px-1 py-1 text-xs font-black text-right w-full"
            />
            <input
              type="number"
              min={0}
              step={0.01}
              value={item.unitPrice}
              onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
              className="border border-[var(--line)] bg-[var(--paper)] px-1 py-1 text-xs font-black text-right w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="field-label mb-2">Markup %</p>
        <div className="flex gap-2 flex-wrap">
          {MARKUP_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMarkup(m)}
              className={`px-3 py-1.5 text-xs font-black uppercase border-2 ${markup === m ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)] text-[var(--muted)]'}`}
            >
              {m}%
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t-2 border-[var(--navy)] pt-4 grid gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-[var(--muted)]">Material total</p>
          <p className="headline text-2xl">{money(materialTotal)}</p>
        </div>
        <div className="flex items-center justify-between border-2 border-[var(--navy)] bg-[var(--yellow)] px-3 py-2">
          <p className="text-xs font-black text-[var(--ink)]">Suggested quote range ({markup}% markup)</p>
          <p className="headline text-lg text-[var(--ink)]">{money(quoteFloorLow)} – {money(quoteFloorHigh)}</p>
        </div>
        <p className="text-[9px] font-black uppercase text-[var(--muted)]">
          Benchmark estimates only. Add labour separately. Confirm material costs with supplier.
        </p>
      </div>

      {!compact && (
        <div className="mt-4 border-t-2 border-[var(--line)] pt-4">
          <p className="micro-label text-[var(--muted)]">NEED LIVE SUPPLIER PRICES?</p>
          <p className="mt-1 text-xs font-black text-[var(--muted)]">
            Compare traceable live prices from Selco, Travis Perkins, and Buildbase — with source URLs and branch signals.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/material-price-engine" className="jf-button bg-[var(--navy)] text-white text-sm">
              COMPARE LIVE PRICES →
            </Link>
            <Link href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
              UNLOCK FULL ENGINE
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
