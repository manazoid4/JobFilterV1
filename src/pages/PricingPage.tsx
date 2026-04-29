import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const rows = [
  ['Area scans', '2/week', 'Unlimited'],
  ['Lead score', 'Score band', 'Full score + reasons'],
  ['Source detail', 'Source name', 'Official link + buyer'],
  ['Contact signal', 'Hidden', 'Unlocked'],
  ['WhatsApp alerts', 'No', 'Yes'],
  ['Saved leads', 'No', 'Yes'],
];

const contrasts = [
  ['Quoting tools', 'PriceBuilder and BuildScope help price jobs after you already have them.'],
  ['Missed-call AI', 'Unmissed recovers calls, but does not decide if the job is worth chasing.'],
  ['Trade agencies', 'Time To Scale style packages cost more and can still send weak enquiries.'],
  ['Enterprise controls', 'Morta is powerful project data infrastructure, not a tradesman lead filter.'],
];

export function PricingPage() {
  const [hours, setHours] = useState(5);
  const [miles, setMiles] = useState(50);
  const annualCost = useMemo(() => Math.round((hours * 35 + miles * 0.45) * 52), [hours, miles]);

  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">PRICING</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">£49/MONTH TO UNLOCK THE ACTION LAYER.</h1>
        <p className="mt-4 max-w-2xl text-xl font-black text-white/70">
          Free shows the signal. Pro unlocks the detail, WhatsApp delivery, and saved-lead workflow.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="#waitlist">GET WHATSAPP ALERTS</a>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">SCAN FIRST</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Plan
          name="Free"
          price="£0"
          body="Check your area and see whether there is signal."
          items={['2 scans per week', 'Score band', 'Source name', 'Free tools', 'Limited lead reasons']}
          cta="SCAN MY AREA"
          to="/find-jobs"
        />
        <Plan
          name="Pro"
          price="£49/month"
          body="Unlock the fields that turn a signal into an action."
          items={['Unlimited scans', 'Full score reasons', 'Buyer and official source link', 'Contact signal', 'WhatsApp alerts', 'Saved leads']}
          cta="JOIN PRO WAITLIST"
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
          <p className="micro-label text-[var(--orange)]">ROI CHECK</p>
          <h2 className="headline mt-3 text-5xl leading-none">£{annualCost.toLocaleString()}/YEAR</h2>
          <p className="mt-2 font-black text-[var(--muted)]">
            Estimated time and fuel lost to weak jobs. One avoided wasted evening can cover the month.
          </p>
          <div className="mt-5 grid gap-4">
            <Slider label="Hours lost/week" value={hours} min={0} max={20} onChange={setHours} />
            <Slider label="Wasted miles/week" value={miles} min={0} max={300} step={5} onChange={setMiles} />
          </div>
        </div>
        <WhatsAppBox />
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">WHY NOT ANOTHER TOOL?</p>
        <h2 className="headline mt-3 text-4xl leading-none">JobFilter sits before quoting, calls, and admin.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {contrasts.map(([title, body]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <h3 className="font-black uppercase">{title}</h3>
              <p className="mt-2 font-bold text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="waitlist" className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">PRO WAITLIST</p>
          <h2 className="headline mt-3 text-5xl leading-none">Get the jobs worth checking sent to WhatsApp.</h2>
          <p className="mt-4 max-w-xl text-lg font-black text-[var(--ink)]/75">
            No checkout is forced here. Join the alert list and unlock the paid route when the Intake Engine opens.
          </p>
        </div>
        <WaitlistForm source="pricing-whatsapp-alerts" />
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

function WhatsAppBox() {
  return (
    <article className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">WHATSAPP ALERT PREVIEW</p>
      <pre className="mt-4 whitespace-pre-wrap font-mono text-sm font-bold leading-relaxed text-white/85">
{`GOLD LEAD - Roofing
Area: B91 / West Midlands
Value: £50k+
Urgency: Deadline soon
Why it matters: Official source, buyer named, high value
Action: Open notice`}
      </pre>
    </article>
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
