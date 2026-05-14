import { Link } from 'react-router-dom';
import { Filter, LockKeyhole, Search, ShieldCheck, TrendingUp, Clock, AlertTriangle, CheckCircle, ArrowRight, Star, MapPin, Users, Zap, Mail } from 'lucide-react';

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
  { id: 'b12-roofing', patch: 'Birmingham South', postcode: 'B12', trade: 'Roofing', status: 'FOUNDER SLOT', signalStrength: 91, monthlyPotential: '£38k–£62k', liveSignals: 14, confidence: 'High', claimNote: 'One roofing slot open' },
  { id: 'b17-extensions', patch: 'Harborne', postcode: 'B17', trade: 'Extensions', status: 'OPEN', signalStrength: 88, monthlyPotential: '£55k–£90k', liveSignals: 11, confidence: 'High', claimNote: 'Builder slot available' },
  { id: 'cv1-solar', patch: 'Coventry Central', postcode: 'CV1', trade: 'Solar', status: 'RESERVED', signalStrength: 84, monthlyPotential: '£24k–£40k', liveSignals: 9, confidence: 'Medium', claimNote: 'Interest registered — decision pending' },
  { id: 'm20-bathrooms', patch: 'Didsbury', postcode: 'M20', trade: 'Bathrooms', status: 'WAITLIST', signalStrength: 79, monthlyPotential: '£18k–£32k', liveSignals: 7, confidence: 'Medium', claimNote: 'Manchester batch pending' },
  { id: 'bs3-heat-pumps', patch: 'Bristol South', postcode: 'BS3', trade: 'Heat Pumps', status: 'OPEN', signalStrength: 86, monthlyPotential: '£32k–£58k', liveSignals: 13, confidence: 'High', claimNote: 'Retrofit slot open' },
  { id: 'se15-groundworks', patch: 'Peckham', postcode: 'SE15', trade: 'Groundworks', status: 'CLAIMED', signalStrength: 93, monthlyPotential: '£70k–£120k', liveSignals: 16, confidence: 'High', claimNote: 'Partner secured' },
  { id: 'ls8-electrical', patch: 'Leeds East', postcode: 'LS8', trade: 'Electrical', status: 'FOUNDER SLOT', signalStrength: 89, monthlyPotential: '£28k–£48k', liveSignals: 12, confidence: 'High', claimNote: 'Electrician slot open' },
  { id: 'g42-plumbing', patch: 'Glasgow South', postcode: 'G42', trade: 'Plumbing', status: 'OPEN', signalStrength: 85, monthlyPotential: '£22k–£38k', liveSignals: 10, confidence: 'High', claimNote: 'Plumber slot available' },
];

const statusClass: Record<TerritoryStatus, string> = {
  OPEN: 'bg-white text-[var(--ink)]',
  CLAIMED: 'bg-[var(--ink)] text-white',
  'FOUNDER SLOT': 'bg-[var(--yellow)] text-[var(--ink)]',
  RESERVED: 'bg-[var(--orange)] text-white',
  WAITLIST: 'bg-[var(--offwhite)] text-[var(--ink)]',
};

const recentClaims = [
  { trade: 'Roofer', patch: 'M14', time: '2 hours ago' },
  { trade: 'Builder', patch: 'B32', time: '5 hours ago' },
  { trade: 'Electrician', patch: 'CV3', time: 'Yesterday' },
];

const objections = [
  {
    q: 'What if my patch has no signals?',
    a: 'Every patch we list has verified live signals right now. If signals drop below viable levels for 60 days, we release the lock and refund that month.',
  },
  {
    q: 'Can I change my trade or patch later?',
    a: 'Yes — one free change in your first 30 days. After that, GBP 19 to switch. Most tradesmen stay locked because the signals keep coming.',
  },
  {
    q: 'What stops someone from copying my territory?',
    a: 'Legally, nothing. Practically, you get the signals first. By the time a competitor sees the same planning approval, you have already called. Speed wins.',
  },
  {
    q: 'Do I need to sign a contract?',
    a: 'No contract. Cancel anytime. But founder price locks only stay active while your plan does. Cancel and rejoin later, you pay the new rate.',
  },
];

export function TerritoriesPage() {
  return (
    <main className="bg-[var(--paper)] pb-0">
      {/* ── HERO ── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_460px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">TERRITORY REGISTER</p>
            <h1 className="headline mt-4 text-[clamp(44px,8vw,98px)] leading-[0.88]">
              ONE TRADE. ONE POSTCODE CLUSTER. FIRST CALL ON GOLD LEADS.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/80">
              Lock your trade and postcode cluster. Gold leads route to you first while your plan is active. Serious firms secure the patch before the launch rush.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="#claim">LOCK MY PATCH →</a>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">SCAN FREE FIRST — NO CARD NEEDED</Link>
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

      {/* ── SOCIAL PROOF + URGENCY ── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} strokeWidth={3} className="text-[var(--ink)]" />
              <p className="text-sm font-black text-[var(--ink)]">
                <span className="underline">{recentClaims.length} patches claimed this week</span> — {territories.filter(t => t.status === 'OPEN' || t.status === 'FOUNDER SLOT').length} slots still open
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} strokeWidth={3} className="text-[var(--orange)]" />
              <p className="text-sm font-black text-[var(--ink)]">Founder price ends when slots fill</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TERRITORIES WIN ── */}
      <section className="page-shell py-14">
        <p className="micro-label text-[var(--orange)]">WHY LOCK A TERRITORY?</p>
        <h2 className="headline mt-3 text-4xl leading-none sm:text-5xl">
          WITHOUT A LOCK, YOU&apos;RE LAST TO EVERY JOB.
        </h2>
        <p className="mt-3 max-w-2xl font-black text-[var(--muted)]">
          Checkatrade blasts the same lead to 5 trades. Bark sells you a name then lets you fight for it. MyBuilder runs the auction in public. JobFilter doesn&apos;t work like that — but only if you lock before someone else does.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: AlertTriangle, title: 'You miss the window', body: 'Planning approval drops Friday. By Monday, the firm that gets the signal first has already called. You hear about it in week three.' },
            { icon: Clock, title: 'You\'re driving blind', body: 'No signal system means driving past scaffolding, asking around, and hoping word of mouth covers a quiet patch.' },
            { icon: TrendingUp, title: 'The fast firm wins', body: 'A trade with a locked territory calls within 24 hours of a verified signal. Without one, you\'re always reacting, never first.' },
            { icon: Zap, title: 'You cut price to survive', body: 'Desperation bids happen when the pipeline is empty. A full pipeline lets you price to margin, not to panic.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="jf-box bg-white p-5">
              <Icon size={24} strokeWidth={3} className="text-[var(--orange)]" />
              <p className="headline mt-3 text-xl">{title}</p>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE TERRITORY TABLE ── */}
      <section className="page-shell py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="micro-label text-[var(--muted)]">LIVE REGISTER</p>
            <h2 className="headline mt-2 text-3xl">AVAILABLE PATCHES</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--green)]" />
            <span className="text-xs font-black uppercase text-[var(--muted)]">Live now</span>
          </div>
        </div>
      </section>

      <section className="page-shell pb-14">
        <div className="ops-panel overflow-hidden bg-white">
          <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr_0.6fr_0.7fr] border-b-2 border-[var(--line)] bg-[var(--ink)] p-4 text-xs font-black uppercase tracking-[0.08em] text-white max-lg:hidden">
            <span>Patch</span>
            <span>Trade</span>
            <span>Area value</span>
            <span>Live signals</span>
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
                  <p className={`text-xs font-black uppercase ${territory.confidence === 'High' ? 'text-[var(--green)]' : 'text-[var(--orange)]'}`}>
                    {territory.confidence === 'High' ? '● Strong' : '● Growing'}
                  </p>
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

      {/* ── ROI CALCULATOR ── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <p className="micro-label text-[var(--green)]">THE MATH</p>
              <h2 className="headline mt-3 text-4xl leading-none sm:text-5xl">
                ONE SMALL JOB COVERS YOUR YEAR.
              </h2>
              <p className="mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
                At £39 per month, one £2,000 job covers 51 months of JobFilter. Most founding members close their first lead within 14 days.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="jf-box bg-white p-5 text-center">
                  <p className="micro-label text-[var(--muted)]">Monthly cost</p>
                  <p className="headline mt-1 text-4xl text-[var(--green)]">£39</p>
                </div>
                <div className="jf-box bg-white p-5 text-center">
                  <p className="micro-label text-[var(--muted)]">Average lead value</p>
                  <p className="headline mt-1 text-4xl text-[var(--yellow)]">£42k</p>
                </div>
                <div className="jf-box bg-white p-5 text-center">
                  <p className="micro-label text-[var(--muted)]">Close 1 job =</p>
                  <p className="headline mt-1 text-4xl text-[var(--orange)]">51 months</p>
                  <p className="text-xs font-black text-[var(--muted)]">of membership paid</p>
                </div>
              </div>
            </div>
            <div className="jf-box bg-[var(--ink)] p-6 text-white">
              <p className="micro-label text-[var(--yellow)]">WHAT YOU GET</p>
              <ul className="mt-4 grid gap-3">
                {[
                  'One territory lock — your trade + postcode patch',
                  'Gold leads controlled by trade, patch, and timing — no shared auction, no five-trade blast',
                  'Unlimited WhatsApp alerts',
                  'Unlimited direct letters — 1st class postage included',
                  'Full lead scoring + Ghost Risk rating',
                  'Pipeline tracking for every opportunity',
                  'Founder price locked forever while active',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-black">
                    <CheckCircle size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[var(--green)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-black text-white/60">
                Extra territory: +£19/month. Cancel anytime. No contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIONS ── */}
      <section className="page-shell py-14">
        <p className="micro-label text-[var(--muted)]">STILL UNSURE?</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          EVERY QUESTION YOU HAVE, ANSWERED.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {objections.map(({ q, a }) => (
            <div key={q} className="jf-box bg-white p-6">
              <p className="headline text-lg">{q}</p>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="claim" className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">TERRITORIES</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">CLAIM FIRST LOOK IN YOUR WORKING AREA.</h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
              Founder monthly includes one territory lock, unlimited WhatsApp alerts, and unlimited direct letters with 1st class postage included. Extra territory is +£19/month.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="jf-button bg-[var(--ink)] text-white" to="/pricing">LOCK MY PATCH →</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">SCAN FREE — NO CARD NEEDED</Link>
            </div>
          </div>
          <div className="jf-box bg-white p-6">
            <div className="grid gap-4">
              {[
                { icon: LockKeyhole, text: 'Trade + postcode priority' },
                { icon: ShieldCheck, text: 'Verification proof on every lead' },
                { icon: Mail, text: 'Unlimited letters — 1st class included' },
                { icon: Star, text: 'Founder price locked forever' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-3 last:border-0 last:pb-0">
                  <Icon size={22} strokeWidth={3} />
                  <span className="font-black uppercase">{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t-2 border-[var(--line)] pt-4">
              <p className="text-xs font-black text-[var(--muted)]">
                30-day guarantee: Set up your territory. View 10 leads. If you don't see one job worth chasing, we refund every penny. No hoops.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
