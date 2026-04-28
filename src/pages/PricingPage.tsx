import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const rows = [
  ['Scans', '2/week', 'Unlimited'],
  ['Tools', 'Yes', 'Yes'],
  ['WhatsApp Alerts', 'No', 'Yes'],
  ['Users', '1', 'Multiple'],
  ['Lead Shield', 'No', 'Yes'],
];

export function PricingPage() {
  const [hours, setHours] = useState(5);
  const [miles, setMiles] = useState(50);
  const annualCost = useMemo(() => Math.round((hours * 35 + miles * 0.45) * 52), [hours, miles]);

  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">PRICING</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">ONE PRICE. NO LEAD TAX.</h1>
        <p className="mt-4 max-w-xl text-xl font-black text-white/70">Free tools stay free. Pro protects your inbox.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Plan
          name="Free"
          price="£0"
          body="Use the tools. Check the scanner. Learn the system."
          items={['2 scans per week', 'Free tools', 'Newsletter and tips', '1 user']}
          cta="USE FREE TOOLS"
          to="/free-tools"
        />
        <Plan
          name="Pro"
          price="£49/month"
          body="Lead Shield filters time-wasters before they hit your phone."
          items={['Unlimited scans', 'Multiple users', 'WhatsApp lead alerts', 'Filtered lead delivery', 'Priority filtering']}
          cta="JOIN WAITLIST"
          to="#waitlist"
          dark
        />
      </section>

      <section className="jf-box overflow-hidden bg-white">
        <div className="grid grid-cols-3 border-b-2 border-[var(--line)] bg-[var(--yellow)] text-sm font-black uppercase">
          <p className="p-4">Feature</p>
          <p className="p-4">Free</p>
          <p className="p-4">Pro (£49)</p>
        </div>
        {rows.map(([feature, free, pro]) => (
          <div key={feature} className="grid grid-cols-3 border-b-2 border-[var(--line)] last:border-b-0">
            <p className="p-4 font-black">{feature}</p>
            <p className="p-4 font-black text-[var(--muted)]">{free}</p>
            <p className="p-4 font-black">{pro}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-white p-6">
          <p className="micro-label text-[var(--orange)]">COST CHECK</p>
          <h2 className="headline mt-3 text-5xl">£{annualCost.toLocaleString()}/YEAR</h2>
          <p className="mt-2 font-black text-[var(--muted)]">Estimated time and fuel lost to bad jobs.</p>
          <div className="mt-5 grid gap-4">
            <Slider label="Hours lost/week" value={hours} min={0} max={20} onChange={setHours} />
            <Slider label="Wasted miles/week" value={miles} min={0} max={300} step={5} onChange={setMiles} />
          </div>
        </div>
        <div id="waitlist">
          <WaitlistForm source="pricing" />
        </div>
      </section>
    </main>
  );
}

function Plan({ name, price, body, items, cta, to, dark = false }: {
  name: string;
  price: string;
  body: string;
  items: string[];
  cta: string;
  to: string;
  dark?: boolean;
}) {
  const box = dark ? 'bg-[var(--navy)] text-white' : 'bg-white';
  const button = dark ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-[var(--navy)] text-white';
  const link = to.startsWith('#') ? <a className={`jf-button mt-6 ${button}`} href={to}>{cta}</a> : <Link className={`jf-button mt-6 ${button}`} to={to}>{cta}</Link>;

  return (
    <section className={`jf-box p-6 ${box}`}>
      <p className="micro-label text-[var(--orange)]">{name}</p>
      <h2 className="headline mt-3 text-5xl">{price}</h2>
      <p className={`mt-2 font-black ${dark ? 'text-white/70' : 'text-[var(--muted)]'}`}>{body}</p>
      <ul className="mt-5 grid gap-2">
        {items.map((item) => <li key={item} className="font-black">YES {item}</li>)}
      </ul>
      {link}
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field-label">
      {label}
      <input className="w-full accent-[var(--yellow)]" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span className="font-black">{value}</span>
    </label>
  );
}
