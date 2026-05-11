import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Database,
  Home,
  MapPinned,
  Radar,
  Route,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Layers,
  Send,
  Phone,
  FileText,
  Building2,
  HardHat,
  Wrench,
  CheckCircle,
} from 'lucide-react';

/* ── PIPELINE STEPS ─────────────────────────────────── */
const pipelineSteps = [
  {
    num: '01',
    label: 'FETCH',
    icon: Radar,
    body: 'Scan official sources — Planning Data API, Planning London Datahub, Scottish warrants, Contracts Finder, EPC registers, Land Registry, streetworks, Companies House, council weekly lists, skip and scaffold permits.',
  },
  {
    num: '02',
    label: 'NORMALISE',
    icon: Database,
    body: 'Join every signal to UPRN — the unique property reference number — as the persistent join key, plus postcode and company number. No orphan records. No guesswork.',
  },
  {
    num: '03',
    label: 'ENRICH',
    icon: Layers,
    body: 'Add EPC rating, property type, floor area, price-paid history, trade-fit classification, and affluent postcode indicators. Context turns a signal into a lead.',
  },
  {
    num: '04',
    label: 'SCORE',
    icon: Target,
    body: 'Rank by value, urgency, rarity, distance, win probability, and contactability. Not volume. A hundred weak leads are worth less than five strong ones.',
  },
  {
    num: '05',
    label: 'STORE',
    icon: HardHat,
    body: 'Build a persistent property graph. Every scan improves coverage, confidence, and scoring accuracy. The system gets sharper the longer it runs.',
  },
  {
    num: '06',
    label: 'DELIVER',
    icon: Send,
    body: 'Gold signals route to WhatsApp, direct letters, PatchLock territory locks, and follow-up tracking. The right trade gets the right lead at the right time.',
  },
];

/* ── FUSION STACKS ───────────────────────────────────── */
const fusionStacks = [
  {
    title: 'Homeowner Retrofit',
    icon: Home,
    signals: [
      'Planning application',
      'EPC F/G rating',
      'Affluent postcode',
      'Detached or semi-detached',
      'High floor area',
      'Recent sale or probate',
    ],
  },
  {
    title: 'Active Site',
    icon: Building2,
    signals: [
      'Planning or building control',
      'Scaffold permit',
      'Skip permit',
      'Streetworks notice',
      'Fresh site activity',
    ],
  },
  {
    title: 'Commercial Fit-Out',
    icon: Wrench,
    signals: [
      'New company registration',
      'Licensing application',
      'Change of use',
      'Retail, restaurant, or clinic',
      'Commercial property movement',
    ],
  },
  {
    title: 'Distressed Property',
    icon: FileText,
    signals: [
      'Probate notice',
      'Auction listing',
      'Vacant home flag',
      'Low EPC',
      'Recent price-paid',
      'Storm or flood cluster',
    ],
  },
];

/* ── SIGNAL SCOREBOARD ───────────────────────────────── */
const signalScores = [
  { name: 'Planning before approval', cost: 2, ease: 7, quality: 9, speed: 8, moat: 8 },
  { name: 'EPC F/G retrofit clusters', cost: 2, ease: 8, quality: 8, speed: 9, moat: 7 },
  { name: 'Scaffold / road occupation', cost: 3, ease: 5, quality: 9, speed: 6, moat: 9 },
  { name: 'Skip permits / waste', cost: 2, ease: 5, quality: 8, speed: 6, moat: 8 },
  { name: 'Commercial fit-out licences', cost: 2, ease: 6, quality: 8, speed: 7, moat: 8 },
];

/* ── DATA SOURCES ────────────────────────────────────── */
const dataSources = [
  {
    category: 'Planning',
    icon: FileText,
    items: ['England — Planning Data API', 'London — Planning London Datahub', 'Scotland — building warrants + weekly lists'],
  },
  {
    category: 'Procurement',
    icon: ShieldCheck,
    items: ['Contracts Finder', 'Find a Tender', 'Public Contracts Scotland', 'Sell2Wales', 'eTendersNI'],
  },
  {
    category: 'Property',
    icon: Home,
    items: ['EPC registers', 'HM Land Registry price-paid', 'Council tax bands'],
  },
  {
    category: 'Site Activity',
    icon: HardHat,
    items: ['Streetworks', 'Road occupation notices', 'Skip permits', 'Scaffold permits', 'Hoardings licences'],
  },
  {
    category: 'Commercial',
    icon: Building2,
    items: ['Companies House filings', 'Licensing applications', 'Change of use', 'HMO registrations'],
  },
  {
    category: 'Triggers',
    icon: Zap,
    items: ['Storm and flood clusters', 'Subsidence alerts', 'Probate notices', 'Auction listings'],
  },
];

/* ── DELIVERY LOOP ───────────────────────────────────── */
const deliverySteps = [
  {
    icon: Radar,
    title: 'Signal detected',
    body: 'Planning submitted, EPC registered, permit filed. The raw event lands in the pipeline.',
  },
  {
    icon: Target,
    title: 'Lead scored',
    body: 'Fused with property context, ranked by value and trade fit. Weak signals stay out.',
  },
  {
    icon: Phone,
    title: 'Delivered to you',
    body: 'WhatsApp alert, direct letter, or PatchLock territory notification. You choose the channel.',
  },
  {
    icon: CheckCircle,
    title: 'You close it',
    body: 'Quote, follow-up, win. Feedback improves future scoring. The loop gets tighter.',
  },
];

/* ── AUDIENCE CARDS ──────────────────────────────────── */
const audienceCards = [
  {
    icon: MapPinned,
    title: 'For Trades',
    body: 'Own the patch, receive high-intent signals, and stop wasting evenings on weak enquiries.',
  },
  {
    icon: Home,
    title: 'For Homeowners',
    body: 'Get matched to serious local operators without creating a noisy shared lead.',
  },
  {
    icon: Route,
    title: 'For JobFilter',
    body: 'Build the UK signal layer: cheaper than incumbents, earlier than marketplaces, sharper than ads.',
  },
];

/* ── SCORE BAR ───────────────────────────────────────── */
function ScoreBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-3.5 w-3.5 border-2 border-[var(--line)] ${
            i < value ? 'bg-[var(--yellow)]' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}

/* ── PAGE ────────────────────────────────────────────── */
export function BlueprintPage() {
  return (
    <main className="bg-[var(--paper)]">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">BLUEPRINT</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(46px,9vw,106px)] leading-[0.88] text-white">
              We find the work before it hits the bid boards.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/82 md:text-2xl">
              JobFilter scans official UK construction signals — planning applications, permits, EPC records, streetworks, company filings — fuses them around each property, scores them for real job value, and delivers the best leads straight to your WhatsApp. No shared leads. No homeowner posts. Just early, exclusive signals routed to the right trade.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
                Scan a Patch <ArrowRight className="ml-1 inline h-5 w-5" />
              </Link>
              <Link className="jf-button jf-button-lg bg-white text-[var(--ink)]" to="/pricing">
                Get Early Access
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-2">
            {pipelineSteps.slice(0, 4).map((s) => (
              <div
                key={s.num}
                className="border-2 border-white/20 bg-white/8 px-4 py-3"
              >
                <p className="micro-label text-[var(--yellow)]">{s.num} {s.label}</p>
                <s.icon className="mt-1 h-5 w-5 text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ──────────────────────────────────── */}
      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">THE PIPELINE</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-white">
            Six layers. One job: get you the right work, early.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pipelineSteps.map((step) => (
              <div
                key={step.num}
                className="border-2 border-white/20 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="headline text-[var(--yellow)]">{step.num}</span>
                  <step.icon className="h-6 w-6 text-[var(--yellow)]" />
                  <span className="micro-label text-white">{step.label}</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-relaxed text-white/75">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REACTIVE VS PROACTIVE ─────────────────────── */}
      <section className="bg-[var(--paper)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--orange)]">THE COMPETITION WAITS. WE DO NOT.</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            Reactive maintenance apps are slow. Signal intelligence is early.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-[var(--muted)]">
            Belvoir Maintenance and FixFlo dominate the UK rental maintenance market. But both are purely reactive: tenant reports a problem, the agent triages it, the landlord approves it, then a trade gets assigned. By the time you see the job, three other trades have already quoted. JobFilter works backwards from the official record — detecting work before anyone reports it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="ops-panel p-5 bg-white">
              <h3 className="headline text-2xl text-[var(--ink)]">Reactive: Belvoir / FixFlo</h3>
              <ul className="mt-3 grid gap-2">
                <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                  Wait for tenant to report a problem
                </li>
                <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                  Agent triages during office hours (Mon–Fri 9–5)
                </li>
                <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                  Landlord approval takes days
                </li>
                <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                  Trade gets assigned after the damage is done
                </li>
                <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                  Shared with 4,000+ other contractors on FixFlo
                </li>
              </ul>
            </div>
            <div className="ops-panel p-5 bg-[var(--ink)] text-white">
              <h3 className="headline text-2xl text-white">Proactive: JobFilter</h3>
              <ul className="mt-3 grid gap-2">
                <li className="flex items-start gap-2 text-sm font-bold text-white/80">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
                  Detect planning applications before approval
                </li>
                <li className="flex items-start gap-2 text-sm font-bold text-white/80">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
                  Flag EPC F/G ratings as retrofit opportunities
                </li>
                <li className="flex items-start gap-2 text-sm font-bold text-white/80">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
                  Spot scaffold/skip permits = active work site
                </li>
                <li className="flex items-start gap-2 text-sm font-bold text-white/80">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
                  WhatsApp alert within minutes of signal detection
                </li>
                <li className="flex items-start gap-2 text-sm font-bold text-white/80">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
                  Exclusive to you — no shared lead lists
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm font-black text-[var(--muted)]">
            The £29.7 billion UK rental maintenance market operates on reactive workflows. JobFilter shifts the paradigm: detect the need before the tenant complains, quote before the competition knows the job exists.
          </p>
        </div>
      </section>

      {/* ── SIGNAL FUSION ─────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">SIGNAL FUSION</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            Single signals are easy. Fusion is the moat.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-[var(--ink)]/80">
            A planning application on its own tells you almost nothing. A planning application plus low EPC, recent sale, scaffold permit, affluent postcode, and solar orientation is a money signal competitors cannot cheaply copy.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {fusionStacks.map((stack) => (
              <div
                key={stack.title}
                className="ops-panel p-5"
              >
                <div className="flex items-center gap-3">
                  <stack.icon className="h-6 w-6 text-[var(--ink)]" />
                  <h3 className="headline text-2xl text-[var(--ink)]">{stack.title}</h3>
                </div>
                <ul className="mt-3 grid gap-1.5">
                  {stack.signals.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm font-black text-[var(--ink)]">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNAL SCOREBOARD ─────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">SCOREBOARD</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            What we scan. What it costs us. What it earns you.
          </h2>
          <div className="mt-8 grid gap-4">
            {signalScores.map((row) => (
              <div
                key={row.name}
                className="ops-panel p-5"
              >
                <h3 className="headline text-xl text-[var(--ink)]">{row.name}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <ScoreLabel label="Cost to us" value={row.cost} />
                  <ScoreLabel label="Ease" value={row.ease} />
                  <ScoreLabel label="Lead quality" value={row.quality} />
                  <ScoreLabel label="Speed" value={row.speed} />
                  <ScoreLabel label="Moat" value={row.moat} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-black text-[var(--muted)]">
            We do not chase every source at once. We build one reliable path, score it well, then add fusion.
          </p>
        </div>
      </section>

      {/* ── DATA SOURCES ──────────────────────────────── */}
      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">DATA SOURCES</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-white">
            Official data first.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-white/75">
            Every connector runs on a schedule. No manual searches. No missed filings.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataSources.map((src) => (
              <div
                key={src.category}
                className="border-2 border-white/20 bg-white/5 p-5"
              >
                <div className="flex items-center gap-2">
                  <src.icon className="h-5 w-5 text-[var(--yellow)]" />
                  <h3 className="micro-label text-[var(--yellow)]">{src.category}</h3>
                </div>
                <ul className="mt-3 grid gap-1">
                  {src.items.map((item) => (
                    <li key={item} className="text-sm font-bold text-white/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY LOOP ─────────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">DELIVERY</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            From signal to signed job.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deliverySteps.map((step, i) => (
              <div
                key={step.title}
                className="ops-panel p-5"
              >
                <div className="flex items-center gap-2">
                  <span className="headline text-[var(--yellow)]">{String(i + 1).padStart(2, '0')}</span>
                  <step.icon className="h-5 w-5 text-[var(--ink)]" />
                </div>
                <h3 className="mt-2 headline text-xl text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE / OUTCOMES ────────────────────────── */}
      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">WHO IT SERVES</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-white">
            Built for trades who want to own their patch.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audienceCards.map((card) => (
              <div
                key={card.title}
                className="border-2 border-white/20 bg-white/5 p-5"
              >
                <card.icon className="h-8 w-8 text-[var(--yellow)]" />
                <h3 className="mt-3 headline text-2xl text-white">{card.title}</h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-white/75">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-12 text-center">
          <h2 className="headline max-w-3xl mx-auto text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            See what your patch looks like.
          </h2>
          <p className="mt-4 text-lg font-black text-[var(--ink)]/80">
            Run a free postcode scan. No signup required.
          </p>
          <div className="mt-6">
            <Link className="jf-button jf-button-lg bg-[var(--ink)] text-[var(--yellow)]" to="/find-jobs">
              Scan a Patch <ArrowRight className="ml-1 inline h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── SCORE LABEL SUB-COMPONENT ───────────────────────── */
function ScoreLabel({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="micro-label text-[var(--muted)]">{label}</p>
      <ScoreBar value={value} />
    </div>
  );
}