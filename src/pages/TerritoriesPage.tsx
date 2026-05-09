import { Link } from 'react-router-dom';
import { Filter, LockKeyhole, Search, Share2, Trophy } from 'lucide-react';

type TerritoryStatus = 'AVAILABLE' | 'CLAIMED' | 'FOUNDING SLOT OPEN' | 'RESERVED' | 'COMING SOON';

type Territory = {
  id: string;
  area: string;
  postcode: string;
  trade: string;
  status: TerritoryStatus;
  opportunityScore: number;
  planningActivity: number;
  epcOpportunities: number;
  constructionActivity: number;
  foundingAvailability: string;
};

const territories: Territory[] = [
  {
    id: 'b12-roofing',
    area: 'Birmingham South',
    postcode: 'B12',
    trade: 'Roofing',
    status: 'FOUNDING SLOT OPEN',
    opportunityScore: 91,
    planningActivity: 38,
    epcOpportunities: 22,
    constructionActivity: 44,
    foundingAvailability: '1 roofing slot',
  },
  {
    id: 'b17-extensions',
    area: 'Harborne',
    postcode: 'B17',
    trade: 'Extensions',
    status: 'AVAILABLE',
    opportunityScore: 88,
    planningActivity: 41,
    epcOpportunities: 16,
    constructionActivity: 39,
    foundingAvailability: '2 builder slots',
  },
  {
    id: 'cv1-solar',
    area: 'Coventry Central',
    postcode: 'CV1',
    trade: 'Solar',
    status: 'RESERVED',
    opportunityScore: 84,
    planningActivity: 29,
    epcOpportunities: 31,
    constructionActivity: 27,
    foundingAvailability: 'Reserved until Friday',
  },
  {
    id: 'm20-bathrooms',
    area: 'Didsbury',
    postcode: 'M20',
    trade: 'Bathrooms',
    status: 'COMING SOON',
    opportunityScore: 79,
    planningActivity: 24,
    epcOpportunities: 14,
    constructionActivity: 33,
    foundingAvailability: 'Manchester batch pending',
  },
  {
    id: 'bs3-heat-pumps',
    area: 'Bristol South',
    postcode: 'BS3',
    trade: 'Heat Pumps',
    status: 'AVAILABLE',
    opportunityScore: 86,
    planningActivity: 22,
    epcOpportunities: 37,
    constructionActivity: 28,
    foundingAvailability: '1 retrofit slot',
  },
  {
    id: 'se15-groundworks',
    area: 'Peckham',
    postcode: 'SE15',
    trade: 'Groundworks',
    status: 'CLAIMED',
    opportunityScore: 93,
    planningActivity: 47,
    epcOpportunities: 11,
    constructionActivity: 52,
    foundingAvailability: 'Partner secured',
  },
];

const statusClass: Record<TerritoryStatus, string> = {
  AVAILABLE: 'bg-white text-[var(--ink)]',
  CLAIMED: 'bg-[var(--ink)] text-white',
  'FOUNDING SLOT OPEN': 'bg-[var(--yellow)] text-[var(--ink)]',
  RESERVED: 'bg-[var(--orange)] text-white',
  'COMING SOON': 'bg-[var(--offwhite)] text-[var(--ink)]',
};

export function TerritoriesPage() {
  return (
    <main className="bg-[var(--paper)] pb-0">
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_440px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">UK TERRITORY GRID</p>
            <h1 className="headline mt-4 text-[clamp(44px,8vw,98px)] leading-[0.88]">
              DIGITAL LAND FOR TRADES WHO MOVE FIRST.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/80">
              Claim postcode, trade, and first access to scored opportunities in your patch. This is not advertising. It is territory.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="#claim">
                Claim Your Patch
              </a>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">
                Scan Area First
              </Link>
            </div>
          </div>
          <div className="ops-panel map-grid bg-[var(--steel)] p-4">
            <div className="grid grid-cols-5 gap-2">
              {territories.concat(territories).slice(0, 20).map((territory, index) => (
                <div
                  key={`${territory.id}-${index}`}
                  className={`aspect-square border-2 border-[var(--line)] p-1 text-[10px] font-black leading-none ${
                    territory.status === 'CLAIMED' ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white/90 text-[var(--ink)]'
                  }`}
                  title={`${territory.postcode} ${territory.trade}`}
                >
                  {territory.postcode}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ops-strip">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase tracking-[0.08em] md:grid-cols-4">
          <span>One trade partner per area</span>
          <span>Founding slots hold price</span>
          <span>Signals routed by postcode</span>
          <span>WhatsApp delivery first</span>
        </div>
      </section>

      <section className="page-shell py-10">
        <div className="ops-panel grid gap-4 bg-white p-4 md:grid-cols-[1fr_1fr_220px]">
          <label className="field-label">
            <span className="flex items-center gap-2"><Search size={16} /> Search area</span>
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
            <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" type="button">Filter Grid</button>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-4 pb-14 md:grid-cols-2 xl:grid-cols-3">
        {territories.map((territory) => (
          <article key={territory.id} className="ops-panel bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="micro-label text-[var(--muted)]">{territory.postcode} / {territory.area}</p>
                <h2 className="headline mt-2 text-3xl">{territory.trade}</h2>
              </div>
              <span className={`border-2 border-[var(--line)] px-2 py-1 text-[10px] font-black uppercase ${statusClass[territory.status]}`}>
                {territory.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-[96px_1fr] gap-4">
              <div className="grid aspect-square place-items-center border-2 border-[var(--line)] bg-[var(--yellow)]">
                <div className="text-center">
                  <p className="font-mono text-4xl font-black leading-none">{territory.opportunityScore}</p>
                  <p className="text-[10px] font-black uppercase">score</p>
                </div>
              </div>
              <div className="grid gap-2 text-sm font-black text-[var(--muted)]">
                <Metric label="Planning activity" value={territory.planningActivity} />
                <Metric label="EPC opportunities" value={territory.epcOpportunities} />
                <Metric label="Construction activity" value={territory.constructionActivity} />
              </div>
            </div>

            <div className="mt-5 border-t-2 border-[var(--line)] pt-4">
              <p className="text-sm font-black uppercase text-[var(--ink)]">{territory.foundingAvailability}</p>
              <p className="mt-2 text-sm font-bold leading-snug text-[var(--muted)]">
                Routed leads include confidence score, urgency, estimated value, source verification, and buyer visibility.
              </p>
            </div>
          </article>
        ))}
      </section>

      <section id="claim" className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">FOUNDING CLAIM</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              SECURE THE AREA BEFORE LAUNCH TRAFFIC HITS.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              Founding firms get priority routing in their postcode cluster and keep the founding price while they stay active.
            </p>
          </div>
          <div className="ops-panel bg-white p-5">
            <div className="grid gap-3">
              <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-3">
                <LockKeyhole size={24} strokeWidth={3} />
                <span className="font-black uppercase">Postcode and trade lock</span>
              </div>
              <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-3">
                <Trophy size={24} strokeWidth={3} />
                <span className="font-black uppercase">Official partner position</span>
              </div>
              <div className="flex items-center gap-3">
                <Share2 size={24} strokeWidth={3} />
                <span className="font-black uppercase">Shareable territory card</span>
              </div>
            </div>
            <Link className="jf-button mt-5 w-full bg-[var(--ink)] text-white" to="/pricing">
              Claim Territory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between gap-2">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 border border-[var(--line)] bg-[var(--offwhite)]">
        <div className="h-full bg-[var(--ink)]" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}
