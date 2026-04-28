import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function FreeToolsPage() {
  const [dayRate, setDayRate] = useState(280);
  const [days, setDays] = useState(2);
  const [materials, setMaterials] = useState(350);
  const [margin, setMargin] = useState(20);
  const [hours, setHours] = useState(6);
  const [miles, setMiles] = useState(30);
  const [risk, setRisk] = useState(2);

  const quote = useMemo(() => {
    const labour = dayRate * days;
    const subtotal = labour + materials;
    return Math.round(subtotal * (1 + margin / 100));
  }, [dayRate, days, materials, margin]);

  const wastedCost = useMemo(() => Math.round((hours * 35 + miles * 0.45 + risk * 40) * 52), [hours, miles, risk]);

  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">FREE TOOLS FOREVER</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">TOOLS THAT SAVE TIME.</h1>
        <p className="mt-3 max-w-xl text-lg font-black text-white/70">No catch. Use them before you pay us.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ToolCard title="Quote calculator" result={`£${quote.toLocaleString()}`}>
          <NumberField label="Day rate" value={dayRate} onChange={setDayRate} />
          <NumberField label="Days" value={days} onChange={setDays} />
          <NumberField label="Materials" value={materials} onChange={setMaterials} />
          <NumberField label="Margin %" value={margin} onChange={setMargin} />
        </ToolCard>

        <ToolCard title="Job estimator" result={`£${wastedCost.toLocaleString()}/year`}>
          <NumberField label="Hours wasted/week" value={hours} onChange={setHours} />
          <NumberField label="Miles wasted/week" value={miles} onChange={setMiles} />
          <NumberField label="Bad visits/week" value={risk} onChange={setRisk} />
          <p className="font-black text-[var(--muted)]">Shows what bad jobs cost.</p>
        </ToolCard>
      </section>

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-4xl">LIVE LEAD SCANNER</h2>
        <p className="mt-2 font-black text-[var(--muted)]">2 scans per week on Free.</p>
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

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="field-label">
      {label}
      <input className="field-input" type="number" value={value} min={0} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
