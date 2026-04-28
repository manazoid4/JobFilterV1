import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';

export function PricingPage() {
  const [hours, setHours] = useState(6);
  const [miles, setMiles] = useState(80);
  const annualCost = useMemo(() => (hours * 35 + miles * 0.45) * 52, [hours, miles]);

  return (
    <main>
      <section className="page-shell py-12">
        <div className="jf-box bg-white p-8">
          <SectionLabel>FIG. 01 · PRICING</SectionLabel>
          <h1 className="headline mt-5 text-6xl leading-none md:text-8xl">ONE PRICE. FAIR SYSTEM. NO GAMES.</h1>
          <p className="mt-4 text-xl font-black text-[var(--muted)]">NO CONTRACTS. Cancel anytime. Pay for control, not noise.</p>
        </div>
      </section>

      <section className="page-shell grid gap-4 pb-12 md:grid-cols-3">
        <Plan name="Free Tools" price="£0" body="Basic access and public scanner checks." cta="START FREE" />
        <Plan name="Intake Engine" price="£49/mo" body="Live scanner, priority matching, source confidence, and control workflow." cta="START FREE WEEK →" featured />
        <Plan name="Codex Pro" price="£99/mo" body="Technical packs, product logic, installer/manufacturer workflows." cta="ENTER CODEX" />
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>REF. 02 · COST OF DOING NOTHING</SectionLabel>
            <h2 className="headline mt-4 text-5xl">CHASING COSTS MONEY.</h2>
            <p className="mt-3 font-bold text-[var(--muted)]">Move the sliders. See what weak intake burns every year.</p>
          </div>
          <div className="jf-box bg-[var(--bg-main)] p-6">
            <label className="field-label">
              Hours wasted each week: {hours}
              <input type="range" min="0" max="20" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
            </label>
            <label className="field-label mt-5">
              Miles wasted each week: {miles}
              <input type="range" min="0" max="300" step="5" value={miles} onChange={(e) => setMiles(Number(e.target.value))} />
            </label>
            <p className="headline mt-6 bg-[var(--yellow)] p-4 text-5xl">£{Math.round(annualCost).toLocaleString()} / YEAR</p>
          </div>
        </div>
      </section>

      <section className="page-shell py-12 text-center">
        <h2 className="headline text-6xl">START FREE WEEK →</h2>
        <p className="mt-3 text-lg font-black text-[var(--muted)]">NO CONTRACTS. FAIR SYSTEM. STAY IN CONTROL.</p>
        <Link className="jf-button mt-6 bg-[var(--navy)] text-white" to="/find-jobs">SCAN FIRST</Link>
      </section>
    </main>
  );
}

function Plan({ name, price, body, cta, featured = false }: { name: string; price: string; body: string; cta: string; featured?: boolean }) {
  return (
    <article className={`jf-box p-6 ${featured ? 'bg-[var(--navy)] text-white' : 'bg-white'}`}>
      <p className="micro-label text-[var(--orange)]">{name}</p>
      <h2 className="headline mt-4 text-6xl">{price}</h2>
      <p className={`mt-4 min-h-20 font-bold ${featured ? 'text-white/75' : 'text-[var(--muted)]'}`}>{body}</p>
      <button className={`jf-button mt-6 ${featured ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-[var(--bg-main)] text-[var(--ink)]'}`}>{cta}</button>
    </article>
  );
}
