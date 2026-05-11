import { Link } from 'react-router-dom';
import { Filter, LockKeyhole, Search, ShieldCheck } from 'lucide-react';

type TerritoryStatus = 'OPEN' | 'CLAIMED' | 'FOUNDER SLOT' | 'RESERVED' | 'WAITLIST';

type Territory = {
  id: string;
  patch: string;
  postcode: string;
  trade: string;
  status: TerritoryStatus;
  signalStrength: number;
  monthlyPotential: string;
  liveSignals: number;
  confidence: string;
  claimNote: string;
};

const territories: Territory[] = [
  { id: 'b12-roofing', patch: 'Birmingham South', postcode: 'B12', trade: 'Roofing', status: 'FOUNDER SLOT', signalStrength: 91, monthlyPotential: 'GBP 38k-62k', liveSignals: 14, confidence: 'High', claimNote: 'One roofing PatchLock open' },
  { id: 'b17-extensions', patch: 'Harborne', postcode: 'B17', trade: 'Extensions', status: 'OPEN', signalStrength: 88, monthlyPotential: 'GBP 55k-90k', liveSignals: 11, confidence: 'High', claimNote: 'Builder slot available' },
  { id: 'cv1-solar', patch: 'Coventry Central', postcode: 'CV1', trade: 'Solar', status: 'RESERVED', signalStrength: 84, monthlyPotential: 'GBP 24k-40k', liveSignals: 9, confidence: 'Medium', claimNote: 'Held until Friday' },
  { id: 'm20-bathrooms', patch: 'Didsbury', postcode: 'M20', trade: 'Bathrooms', status: 'WAITLIST', signalStrength: 79, monthlyPotential: 'GBP 18k-32k', liveSignals: 7, confidence: 'Medium', claimNote: 'Manchester batch pending' },
  { id: 'bs3-heat-pumps', patch: 'Bristol South', postcode: 'BS3', trade: 'Heat Pumps', status: 'OPEN', signalStrength: 86, monthlyPotential: 'GBP 32k-58k', liveSignals: 13, confidence: 'High', claimNote: 'Retrofit PatchLock open' },
  { id: 'se15-groundworks', patch: 'Peckham', postcode: 'SE15', trade: 'Groundworks', status: 'CLAIMED', signalStrength: 93, monthlyPotential: 'GBP 70k-120k', liveSignals: 16, confidence: 'High', claimNote: 'Partner secured' },
];

const statusClass: Record<TerritoryStatus, string> = {
  OPEN: 'bg-white text-[var(--ink)]',
  CLAIMED: 'bg-[var(--ink)] text-white',
  'FOUNDER SLOT': 'bg-[var(--yellow)] text-[var(--ink)]',
  RESERVED: 'bg-[var(--orange)] text-white',
  WAITLIST: 'bg-[var(--offwhite)] text-[var(--ink)]',
};

export function TerritoriesPage() {
  return (
    <main className="bg-[var(--paper)] pb-0">
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_460px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">PATCHLOCK REGISTER</p>
            <h1 className="headline mt-4 text-[clamp(44px,8vw,98px)] leading-[0.88]">
              ONE TRADE. ONE POSTCODE CLUSTER. FIRST CALL ON GOLD LEADS.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/80">
              Lock your trade and postcode cluster. Gold leads route to you first while your plan is active. Serious firms secure the patch before the launch rush.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="#claim">Lock My Patch</a>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">Scan Area First</Link>
            </div>
          </div>
          <aside className="ops-panel bg-[var(--steel)] p-5 text-white">
            <p className="micro-label text-[var(--yellow)]">PATCH STATUS</p>
            <div className="mt-4 grid gap-3">
              {territories.slice(0, 4).map((territory) => (
                <div key={territory.id} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border-2 border-white/15 bg-black/35 p-3">
                  <span className="font-mono text-lg font-black text-[var(--yellow)]">{territory.postcode}</span>
                  <div>
                    <p className="font-black uppercase text-white">{territory.trade}</p>
                    <p className="text-xs font-black uppercase text-white/90">{territory.patch}</p>
                  </div>
                  <span className="font-mono text-sm font-black text-white">{territory.signalStrength}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="ops-strip">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase tracking-[0.08em] md:grid-cols-4">
          <span>Priority routing</span>
          <span>Founder price protected</span>
          <span>Letters included monthly</span>
          <span>Extra patch +GBP 19/mo</span>
        </div>
      </section>

      <section className="page-shell py-10">
        <div className="ops-panel grid gap-4 bg-white p-4 md:grid-cols-[1fr_1fr_220px]">
          <label className="field-label">
            <span className="flex items-center gap-2"><Search size={16} /> Search patch</span>
            <input className="field-input" placeholder="B12, Birmingham, Coventry..." defaultValue="Birmingham" />
          </label>
          <label className="field-label">
            <span className="flex items-center gap-2"><Filter size={16} /> Trade</span>
            <select className="field-input" defaultValue="All trades">
              <option>All trades</option>
              <option>Roofing</option>
              <option>Extensions</option>
              <option>Solar</option>
              <option>Bathrooms</option>
              <option>Heat Pumps</option>
              <option>Groundworks</option>
            </select>
          </label>
          <div className="grid content-end">
            <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" type="button">Check Patch</button>
          </div>
        </div>
      </section>

      <section className="page-shell pb-14">
        <div className="ops-panel overflow-hidden bg-white">
          <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr_0.6fr_0.7fr] border-b-2 border-[var(--line)] bg-[var(--ink)] p-4 text-xs font-black uppercase tracking-[0.08em] text-white max-lg:hidden">
            <span>Patch</span>
            <span>Trade</span>
            <span>Monthly potential</span>
            <span>Signals</span>
            <span>Status</span>
          </div>
          <div className="divide-y-2 divide-[var(--line)]">
            {territories.map((territory) => (
              <article key={territory.id} className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.6fr_0.7fr] lg:items-center">
                <div>
                  <p className="micro-label text-[var(--muted)]">{territory.postcode}</p>
                  <h2 className="headline mt-1 text-3xl">{territory.patch}</h2>
                  <p className="mt-1 text-sm font-black text-[var(--muted)]">{territory.claimNote}</p>
                </div>
                <div className="font-black">{territory.trade}</div>
                <div className="font-mono font-black">{territory.monthlyPotential}</div>
                <div>
                  <p className="font-mono text-2xl font-black">{territory.liveSignals}</p>
                  <p className="text-xs font-black uppercase text-[var(--muted)]">{territory.confidence} confidence</p>
                </div>
                <div className="grid gap-3">
                  <span className={`w-fit border-2 border-[var(--line)] px-3 py-1 text-xs font-black uppercase ${statusClass[territory.status]}`}>{territory.status}</span>
                  <Link className="jf-button bg-[var(--yellow)] px-3 py-2 text-xs text-[var(--ink)]" to="/pricing">Lock Patch</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="claim" className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">PATCHLOCK</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">CLAIM FIRST LOOK IN YOUR WORKING AREA.</h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
              Founder monthly includes one PatchLock, WhatsApp alerts, and direct letters for selected Gold leads. Extra patch is +GBP 19/month.
            </p>
          </div>
          <div className="ops-panel bg-white p-5">
            <div className="grid gap-3">
              <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-3">
                <LockKeyhole size={24} strokeWidth={3} />
                <span className="font-black uppercase">Trade + postcode priority</span>
              </div>
              <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-3">
                <ShieldCheck size={24} strokeWidth={3} />
                <span className="font-black uppercase">Verification proof on every lead</span>
              </div>
              <div className="flex items-center gap-3">
                <LockKeyhole size={24} strokeWidth={3} />
                <span className="font-black uppercase">Letters written with your company details</span>
              </div>
            </div>
            <Link className="jf-button mt-5 w-full bg-[var(--ink)] text-white" to="/pricing">Lock My Patch</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
