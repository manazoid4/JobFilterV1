import { Link } from 'react-router-dom';
import { ArrowRight, Database, Home, MapPinned, Radar, Route, ShieldCheck, Sparkles } from 'lucide-react';

const layers = [
  ['Official signals', 'Planning, EPC, procurement, streetworks, permits, property movement, and company events.'],
  ['UPRN graph', 'Every property signal joins around a persistent address key instead of floating as isolated leads.'],
  ['Money Filter', 'Urgency, value, proximity, confidence, rarity, and contactability decide what reaches a trade.'],
  ['Delivery loop', 'Gold signals route to WhatsApp, direct letters, PatchLock, and follow-up tracking.'],
];

const homeownerSteps = [
  ['Tell us once', 'Share the job, postcode, timing, photos, and what good help looks like.'],
  ['We verify the job', 'JobFilter checks seriousness, trade fit, location, and whether the job has enough detail to quote.'],
  ['Matched, not blasted', 'The job routes to a suitable local firm instead of becoming a noisy shared-lead auction.'],
];

const moatSignals = [
  'Planning before approval',
  'Low EPC + affluent postcode',
  'Scaffold, skip, streetworks, and permit activity',
  'Probate, auction, and recent property movement',
  'Licensing, HMO, fit-out, and new-business signals',
  'Storm, flood, subsidence, and weather-triggered repair clusters',
];

const blueprintCards = [
  { icon: Radar, title: 'Earlier than marketplaces', body: 'Signals appear when intent forms: applications, permits, EPC gaps, warrants, licences, and site activity.' },
  { icon: Database, title: 'Data compounds', body: 'Every scan improves the property graph, source confidence, postcode coverage, and trade-fit scoring.' },
  { icon: ShieldCheck, title: 'Built for compliance', body: 'Official data first, private source mechanics, opt-out discipline, and safer routing than indiscriminate scraping.' },
];

const audienceCards = [
  { icon: MapPinned, title: 'For trades', body: 'Own the patch, receive high-intent signals, and stop wasting evenings on weak enquiries.' },
  { icon: Home, title: 'For homeowners', body: 'Get matched to serious local operators without creating a noisy shared lead.' },
  { icon: Route, title: 'For JobFilter', body: 'Build the UK signal layer: cheaper than incumbents, earlier than marketplaces, sharper than ads.' },
];

export function BlueprintPage() {
  return (
    <main className="bg-[var(--paper)]">
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">BLUEPRINT</p>
            <h1 className="headline mt-4 text-[clamp(46px,8vw,104px)] leading-[0.88] text-white">
              THE UK CONSTRUCTION SIGNAL GRAPH.
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-black leading-tight text-white/80 md:text-2xl">
              JobFilter is not another directory. It is a UPRN-centred intelligence layer that detects construction intent before it becomes a crowded quote request.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">Scan a Patch</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/post-job">Post a Job</Link>
            </div>
          </div>
          <aside className="ops-panel bg-[var(--steel)] p-5">
            <p className="micro-label text-[var(--yellow)]">FETCH - NORMALISE - FILTER - SCORE - STORE - DELIVER</p>
            <div className="mt-5 grid gap-3">
              {layers.map(([title, body], index) => (
                <div key={title} className="border-2 border-white/15 bg-black/30 p-3">
                  <p className="font-mono text-xs font-black text-[var(--yellow)]">0{index + 1}</p>
                  <h2 className="mt-1 text-xl font-black text-white">{title}</h2>
                  <p className="mt-1 text-sm font-bold text-white/70">{body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-12 lg:grid-cols-3">
        {blueprintCards.map(({ icon: RealIcon, title, body }) => {
          return (
            <article key={title} className="ops-panel bg-white p-5">
              <div className="grid h-12 w-12 place-items-center border-2 border-[var(--line)] bg-[var(--yellow)]">
                <RealIcon size={24} strokeWidth={3} />
              </div>
              <h2 className="headline mt-4 text-3xl">{title}</h2>
              <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
            </article>
          );
        })}
      </section>

      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">FOR HOMEOWNERS</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">A BETTER WAY TO FIND A SERIOUS TRADE.</h2>
            <p className="mt-5 text-xl font-black text-[var(--ink)]/75">
              No quote circus. No five firms chasing the same vague form. JobFilter packages the job properly and routes it to the right local operator.
            </p>
          </div>
          <div className="grid gap-3">
            {homeownerSteps.map(([title, body], index) => (
              <article key={title} className="border-2 border-[var(--line)] bg-white p-4 shadow-[4px_4px_0_var(--line)]">
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-[var(--ink)] font-mono font-black text-white">{index + 1}</span>
                  <div>
                    <h3 className="headline text-2xl">{title}</h3>
                    <p className="mt-1 font-black text-[var(--muted)]">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_460px]">
        <div>
          <p className="micro-label text-[var(--orange)]">UNFAIR ADVANTAGE STACK</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">SINGLE SIGNALS ARE EASY. FUSION IS THE MOAT.</h2>
          <p className="mt-5 max-w-2xl text-lg font-black text-[var(--muted)]">
            A planning application is useful. A planning application plus low EPC, recent sale, scaffold permit, affluent postcode, and solar orientation is a money signal competitors cannot cheaply copy.
          </p>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/signals">
            Open Signal System <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid gap-3">
          {moatSignals.map((signal) => (
            <div key={signal} className="ops-panel flex items-center gap-3 bg-white p-4">
              <Sparkles className="text-[var(--orange)]" size={20} strokeWidth={3} />
              <p className="font-black text-[var(--ink)]">{signal}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-5 py-12 md:grid-cols-3">
          {audienceCards.map(({ icon: RealIcon, title, body }) => {
            return (
              <article key={title} className="border-2 border-white/20 bg-white/8 p-5">
                <RealIcon className="text-[var(--yellow)]" size={28} strokeWidth={3} />
                <h2 className="headline mt-4 text-3xl text-white">{title}</h2>
                <p className="mt-2 font-bold text-white/72">{body}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
