import { Link } from 'react-router-dom';
import { AlertTriangle, Radio, ShieldCheck, Target } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { FeedbackPrompt } from '../components/FeedbackPrompt';

const proofPoints = [
  'Real planning signals',
  'Real construction opportunities',
  'Postcode exclusivity',
  'One dominant partner per area',
];

const signalRows = [
  { source: 'Planning', signal: 'Rear extension approved', trade: 'Builder', value: 'GBP 42k', score: 94 },
  { source: 'EPC', signal: 'F-rated rental cluster', trade: 'Insulation', value: 'GBP 18k', score: 87 },
  { source: 'Contracts', signal: 'School maintenance tender', trade: 'Electrical', value: 'GBP 65k', score: 91 },
  { source: 'Land', signal: 'Brownfield site live', trade: 'Groundworks', value: 'GBP 120k', score: 82 },
];

const operatingSteps = [
  {
    icon: Radio,
    title: 'Signals come in',
    body: 'Verified job signals are cleaned, matched, and scored before a tradesman sees anything.',
  },
  {
    icon: Target,
    title: 'Money Filter ranks the job',
    body: 'Urgency, value, distance, confidence, and detail decide if it reaches your WhatsApp.',
  },
  {
    icon: ShieldCheck,
    title: 'Only money leads move',
    body: 'Gold leads route to the right trade and territory. Weak signals stay out of your WhatsApp.',
  },
];

const territoryCards = [
  ['B12 Roofing', 'FOUNDING SLOT OPEN', '91'],
  ['Birmingham Extensions', 'AVAILABLE', '88'],
  ['Coventry Solar', 'RESERVED', '84'],
  ['Manchester Bathrooms', 'COMING SOON', '79'],
];

export function HomePage() {
  return (
    <main className="bg-[var(--paper)] pb-0">
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">TACTICAL CONSTRUCTION INTELLIGENCE</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(46px,9vw,106px)] leading-[0.88] text-white">
              STOP QUOTING FOR TYRE-KICKERS.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/82 md:text-2xl">
              Claim your trade territory before competitors do. JobFilter finds real construction signals, scores the money, and sends the best leads to WhatsApp.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="border-2 border-white/25 bg-white/8 px-3 py-2 text-sm font-black uppercase text-white">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
                Scan My Area
              </Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/territories">
                Claim Territory
              </Link>
              <Link className="jf-button bg-[var(--steel-2)] text-white" to="/post-job">
                Post A Job
              </Link>
            </div>
          </div>

          <aside className="ops-panel bg-[var(--steel)] p-4 text-white">
            <div className="flex items-center justify-between border-b-2 border-[var(--yellow)] pb-3">
              <p className="micro-label text-[var(--yellow)]">LIVE SIGNAL BOARD</p>
              <span className="bg-[var(--yellow)] px-2 py-1 text-xs font-black text-[var(--ink)]">BETA</span>
            </div>
            <div className="mt-4 grid gap-3">
              {signalRows.map((row) => (
                <div key={row.signal} className="border-2 border-white/15 bg-black/40 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--yellow)]">{row.source}</p>
                      <h2 className="mt-1 text-base font-black leading-tight text-white">{row.signal}</h2>
                    </div>
                    <span className="border border-[var(--yellow)] px-2 py-1 font-mono text-xs font-black text-[var(--yellow)]">{row.score}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-black uppercase text-white/70">
                    <span>{row.trade}</span>
                    <span className="text-right">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="ops-strip">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase tracking-[0.08em] text-[var(--ink)] md:grid-cols-3">
          <span>FETCH - NORMALISE - FILTER</span>
              <span>MONEY FILTER - STORE - DELIVER</span>
          <span>WhatsApp first. Dashboard second.</span>
        </div>
      </section>

      <section className="bg-[var(--paper)]">
        <div className="page-shell py-6">
          <FeedbackPrompt />
        </div>
      </section>

      <section className="bg-[var(--paper)]">
        <div className="page-shell grid gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">THIS IS NOT A JOB BOARD</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              A WAR ROOM FOR FINDING WORK BEFORE IT GOES PUBLIC.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-bold text-[var(--muted)]">
              Shared lead sites wait until a homeowner fills a form in. JobFilter watches upstream signals: approvals, tenders, property condition, local activity, and timing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {operatingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="ops-panel p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center border-2 border-[var(--line)] bg-[var(--yellow)]">
                      <Icon size={22} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="headline text-2xl">{step.title}</h3>
                      <p className="mt-2 font-bold leading-snug text-[var(--muted)]">{step.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">TERRITORY OWNERSHIP</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              SECURE YOUR PATCH BEFORE ANOTHER FIRM DOES.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              PatchLock gives one trade first look in one postcode cluster. Founder firms keep the cheaper price while their plan stays active.
            </p>
            <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/territories">
              Open Territory Grid
            </Link>
          </div>
          <div className="grid gap-3">
            {territoryCards.map(([name, status, score]) => (
              <Link key={name} to="/territories" className="border-2 border-[var(--line)] bg-white p-4 text-[var(--ink)] shadow-[4px_4px_0_var(--line)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="headline text-2xl">{name}</h3>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.1em] text-[var(--muted)]">{status}</p>
                  </div>
                  <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 font-mono text-xl font-black">{score}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">PUBLIC DEMAND ENGINE</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              WE ARE NOT ONLY FINDING SIGNALS. WE ARE PULLING JOBS IN.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
              Homeowners and property owners can submit jobs directly. PatchLock firms get routed opportunities, while first-month guerilla campaigns drive more local demand into the system.
            </p>
          </div>
          <div className="ops-panel bg-[var(--paper)] p-5">
            <p className="micro-label text-[var(--ink)]">FIRST MONTH CAMPAIGN ADD-ONS</p>
            <div className="mt-4 grid gap-3 font-black text-[var(--muted)]">
              <p>Sticker campaign around your patch</p>
              <p>Direct letters to selected local opportunities</p>
              <p>Neighbour Signal door-drop after won jobs</p>
              <p>Public “post a job” intake page for repeat demand</p>
            </div>
            <Link className="jf-button mt-5 bg-[var(--ink)] text-white" to="/post-job">See Public Intake</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--yellow)]">WHAT THE USER FEELS IN 5 SECONDS</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              LESS CHASING. BETTER JOBS. CONTROL OF YOUR AREA.
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ['No shared auctions', 'Your best leads are not blasted to five firms.'],
                ['No fake leads', 'Every signal carries source, confidence, urgency, and value.'],
                ['No dashboard homework', 'WhatsApp gets the lead. The dashboard proves the money.'],
              ].map(([title, body]) => (
                <div key={title} className="border-2 border-white/20 bg-white/8 p-4">
                  <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                  <p className="mt-2 font-bold text-white/72">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ops-panel bg-white p-5 text-[var(--ink)]">
            <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-4">
              <AlertTriangle size={28} strokeWidth={3} />
              <div>
                <p className="micro-label text-[var(--orange)]">FOUNDER ACCESS</p>
                <h3 className="headline text-3xl">Claim early. Keep the rate.</h3>
              </div>
            </div>
            <p className="mt-4 text-lg font-black text-[var(--muted)]">
              Paid unlocks verification proof, WhatsApp alerts, priority routing, and company-branded letters written for selected Gold leads.
            </p>
            <WaitlistForm source="home-tactical-2026-05-09" />
          </div>
        </div>
      </section>
    </main>
  );
}
