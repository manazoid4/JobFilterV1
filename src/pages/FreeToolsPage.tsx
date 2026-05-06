import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function FreeToolsPage() {
  const [labourHours, setLabourHours] = useState(14);
  const [hourRate, setHourRate] = useState(45);
  const [materials, setMaterials] = useState(650);
  const [margin, setMargin] = useState(22);
  const [wastedHours, setWastedHours] = useState(5);
  const [wastedMiles, setWastedMiles] = useState(40);
  const [badVisits, setBadVisits] = useState(2);
  const [fuelMiles, setFuelMiles] = useState(85);
  const [mpg, setMpg] = useState(32);
  const [dieselPrice, setDieselPrice] = useState(1.55);
  const [jobValue, setJobValue] = useState(4500);
  const [jobDistance, setJobDistance] = useState(18);
  const [daysToStart, setDaysToStart] = useState(10);
  const [hasBudget, setHasBudget] = useState(1);
  const [hasPhotos, setHasPhotos] = useState(1);

  const quoteFloor = useMemo(() => {
    const labour = labourHours * hourRate;
    const subtotal = labour + materials;
    return Math.round(subtotal * (1 + margin / 100));
  }, [hourRate, labourHours, materials, margin]);

  const wastedCost = useMemo(() => Math.round((wastedHours * 35 + wastedMiles * 0.45 + badVisits * 40) * 52), [badVisits, wastedHours, wastedMiles]);
  const dieselCost = useMemo(() => {
    const litres = mpg > 0 ? (fuelMiles / mpg) * 4.54609 : 0;
    return Math.round(litres * dieselPrice);
  }, [dieselPrice, fuelMiles, mpg]);
  const leadScore = useMemo(() => {
    let score = 0;
    if (jobValue >= 2000) score += 35;
    if (jobValue >= 7500) score += 15;
    if (jobDistance <= 15) score += 20;
    else if (jobDistance <= 35) score += 10;
    if (daysToStart <= 14) score += 15;
    if (hasBudget) score += 8;
    if (hasPhotos) score += 7;
    return Math.min(100, score);
  }, [daysToStart, hasBudget, hasPhotos, jobDistance, jobValue]);
  const leadVerdict = leadScore >= 75 ? 'PRICE IT' : leadScore >= 50 ? 'CHECK FIRST' : 'BIN IT';

  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">FREE DAILY TOOLS</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">USEFUL BEFORE YOU PAY.</h1>
        <p className="mt-3 max-w-2xl text-lg font-black text-white/70">
          Tools are free. Leads are not. Use these to price cleaner, spot time-wasters, and protect your week.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ToolCard title="Quote floor" result={`£${quoteFloor.toLocaleString()}`}>
          <NumberField label="Labour hours" value={labourHours} onChange={setLabourHours} />
          <NumberField label="Hourly rate" value={hourRate} onChange={setHourRate} />
          <NumberField label="Materials" value={materials} onChange={setMaterials} />
          <NumberField label="Margin %" value={margin} onChange={setMargin} />
          <p className="font-black text-[var(--muted)]">Your minimum sensible quote before you start shaving profit off.</p>
        </ToolCard>

        <ToolCard title="Tyre-kicker check" result={leadVerdict}>
          <NumberField label="Job value" value={jobValue} onChange={setJobValue} />
          <NumberField label="Miles away" value={jobDistance} onChange={setJobDistance} />
          <NumberField label="Days until start" value={daysToStart} onChange={setDaysToStart} />
          <NumberField label="Budget confirmed (0/1)" value={hasBudget} max={1} onChange={setHasBudget} />
          <NumberField label="Photos sent (0/1)" value={hasPhotos} max={1} onChange={setHasPhotos} />
          <p className="font-black text-[var(--muted)]">Score: {leadScore}/100. Quick gut check before wasting a visit.</p>
        </ToolCard>

        <ToolCard title="Profit check" result={`£${Math.max(0, quoteFloor - materials - labourHours * hourRate).toLocaleString()}`}>
          <NumberField label="Labour hours" value={labourHours} onChange={setLabourHours} />
          <NumberField label="Hourly rate" value={hourRate} onChange={setHourRate} />
          <NumberField label="Materials" value={materials} onChange={setMaterials} />
          <NumberField label="Margin %" value={margin} onChange={setMargin} />
          <p className="font-black text-[var(--muted)]">Shows the money left after labour and materials. If this is weak, walk away.</p>
        </ToolCard>

        <ToolCard title="Travel cost" result={`£${dieselCost.toLocaleString()}`}>
          <NumberField label="Miles" value={fuelMiles} onChange={setFuelMiles} />
          <NumberField label="MPG" value={mpg} onChange={setMpg} />
          <NumberField label="Diesel £/litre" value={dieselPrice} step={0.01} onChange={setDieselPrice} />
          <p className="font-black text-[var(--muted)]">Know the fuel cost before you quote.</p>
        </ToolCard>

        <ToolCard title="Time-waster cost" result={`£${wastedCost.toLocaleString()}/year`}>
          <NumberField label="Hours wasted/week" value={wastedHours} onChange={setWastedHours} />
          <NumberField label="Miles wasted/week" value={wastedMiles} onChange={setWastedMiles} />
          <NumberField label="Bad visits/week" value={badVisits} onChange={setBadVisits} />
          <p className="font-black text-[var(--muted)]">Shows what weak enquiries cost before you even price the job.</p>
        </ToolCard>
      </section>

      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">FREE TOOL — SMART QUOTING</p>
        <h2 className="headline mt-3 text-4xl leading-none text-[var(--yellow)]">QUOTE STARTER IN 10 SECONDS.</h2>
        <p className="mt-3 max-w-2xl font-black text-white/75">
          Pick your trade and job type. Get a professional opening paragraph ready to paste into your quote. Covers 6 trades and 30+ job types. Free. No login.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-black text-white/60">
          {['Electrical', 'Plumbing', 'Roofing', 'Building', 'HVAC', 'Carpentry'].map((t) => (
            <span key={t} className="border border-white/20 px-2 py-1">{t}</span>
          ))}
        </div>
        <Link className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)]" to="/smart-quote">OPEN SMART QUOTE →</Link>
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">PAID VALUE STAYS LOCKED</p>
        <h2 className="headline text-4xl">LIVE LEAD SCANNER</h2>
        <p className="mt-2 max-w-2xl font-black text-[var(--muted)]">
          Free tools help you make better decisions. Full lead detail, WhatsApp alerts, saved leads, and Letterhead Pack stay behind access.
        </p>
        <Link className="jf-button mt-4 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">OPEN SCANNER</Link>
      </section>
    </main>
  );
}

function ToolCard({ title, result, children }: { title: string; result: string; children: ReactNode }) {
  return (
    <section className="jf-box bg-white p-5">
      <p className="micro-label text-[var(--orange)]">{title}</p>
      <p className="headline mt-3 text-5xl">{result}</p>
      <div className="mt-5 grid gap-3">{children}</div>
    </section>
  );
}

function NumberField({ label, value, step = 1, max, onChange }: { label: string; value: number; step?: number; max?: number; onChange: (value: number) => void }) {
  return (
    <label className="field-label">
      {label}
      <input className="field-input" type="number" value={value} min={0} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
