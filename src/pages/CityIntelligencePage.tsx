import { Link, useParams } from 'react-router-dom';
import { Lock, TrendingUp, TrendingDown, Minus, ArrowRight, MapPin, AlertTriangle, CheckSquare } from 'lucide-react';

const OPEN_ACCESS = import.meta.env.VITE_OPEN_ACCESS === 'true';

type SignalRow = { type: string; count: number; trend: 'up' | 'down' | 'flat'; top: string };
type CityIntel = {
  city: string;
  postcode: string;
  weekOf: string;
  territoryScore: number;
  scoreTrend: 'up' | 'down' | 'flat';
  totalSignals: number;
  signalChange: number;
  signals: SignalRow[];
  hotLead: { title: string; postcode: string; approvedDaysAgo: number; estimatedValue: string; buyerScore: number; why: string; action: string };
  marketNote: string;
  actionList: string[];
  toolTip: string;
};

const CITY_INTEL: Record<string, CityIntel> = {
  birmingham: {
    city: 'Birmingham',
    postcode: 'B',
    weekOf: 'Week of 19 May 2026',
    territoryScore: 88,
    scoreTrend: 'up',
    totalSignals: 14,
    signalChange: 3,
    signals: [
      { type: 'Planning approvals', count: 8, trend: 'up', top: '4-bed rear extension, B17 Harborne' },
      { type: 'EPC upgrades needed', count: 3, trend: 'flat', top: 'F-rated rental cluster, B15 Edgbaston' },
      { type: 'Council contracts', count: 2, trend: 'up', top: 'School maintenance tender — opens Friday' },
      { type: 'New businesses', count: 1, trend: 'down', top: 'Restaurant fit-out, B3 city centre' },
    ],
    hotLead: {
      title: 'Rear extension, 4-bed detached',
      postcode: 'B17 Harborne',
      approvedDaysAgo: 2,
      estimatedValue: '£38k–£55k',
      buyerScore: 94,
      why: 'Homeowner has not called anyone yet. Detached property in affluent postcode. Full drawings uploaded. Fresh approval — the 48-hour window is open.',
      action: 'Call today. Site visit this week. Quote within 48 hours. Use First Strike to copy your opening message before you dial.',
    },
    marketNote: 'Birmingham South is seeing a 20% spike in extension approvals this quarter. The better builders are 6 weeks out. If you are available now, first-mover advantage is significant — buyers who cannot get a callback will accept the first credible quote that arrives.',
    actionList: [
      'Call B17 Harborne extension — planning approved 2 days ago, buyer not yet contacted',
      'Quote B15 EPC cluster — F-rated landlord property, legally obligated to upgrade',
      'Review school maintenance tender (B20) — deadline Friday, value band £40–80k',
      'Watch B3 restaurant — fit-out scope not confirmed but company registered this week',
    ],
    toolTip: 'Use the Quote Floor tool before calling B17. Labour + materials + margin = your minimum. At £38k estimated, your floor should be around £32k before you pick up the phone.',
  },
  london: {
    city: 'London',
    postcode: 'Various',
    weekOf: 'Week of 19 May 2026',
    territoryScore: 91,
    scoreTrend: 'up',
    totalSignals: 31,
    signalChange: 5,
    signals: [
      { type: 'Planning approvals', count: 18, trend: 'up', top: 'Loft conversion, SE15 Peckham' },
      { type: 'EPC upgrades needed', count: 7, trend: 'up', top: 'G-rated Victorian terrace cluster, N1 Islington' },
      { type: 'Council contracts', count: 4, trend: 'flat', top: 'Housing maintenance framework — Tower Hamlets' },
      { type: 'New businesses', count: 2, trend: 'flat', top: 'Gym fit-out, EC1 Clerkenwell' },
    ],
    hotLead: {
      title: 'Loft conversion, Victorian mid-terrace',
      postcode: 'SE15 Peckham',
      approvedDaysAgo: 1,
      estimatedValue: '£45k–£70k',
      buyerScore: 91,
      why: 'Approved yesterday. Victorian terrace in active regeneration area. Planning includes dormer extension. Owner is a young professional — budget-confident, timeline-driven.',
      action: 'Call this morning if possible. SE15 trades are busy but this was approved 24 hours ago — the buyer has not had time to ring around yet.',
    },
    marketNote: 'Inner London loft conversions are running at peak demand. March–June is the strongest window before summer holiday delays. Buyers who get planning approval now want to start in July. That means they need a quote in May.',
    actionList: [
      'Call SE15 loft conversion — approved yesterday, high buyer score',
      'Approach N1 EPC cluster — 3 G-rated properties in one street, landlord likely owns all',
      'Check Tower Hamlets maintenance framework — multi-year contract, worth the paperwork',
      'Watch EC1 gym — fit-out scope usually large, company just registered',
    ],
    toolTip: 'For loft conversions, structural engineer sign-off is part of the scope. If you have a relationship with a structural engineer, mention it in your opening call — it removes a step the buyer would otherwise need to arrange themselves.',
  },
  manchester: {
    city: 'Manchester',
    postcode: 'M',
    weekOf: 'Week of 19 May 2026',
    territoryScore: 83,
    scoreTrend: 'flat',
    totalSignals: 19,
    signalChange: -1,
    signals: [
      { type: 'Planning approvals', count: 11, trend: 'flat', top: 'Rear extension, M20 Didsbury' },
      { type: 'EPC upgrades needed', count: 4, trend: 'up', top: 'F-rated Victorian terrace, M14 Fallowfield' },
      { type: 'Council contracts', count: 3, trend: 'down', top: 'Park maintenance tender — Trafford' },
      { type: 'New businesses', count: 1, trend: 'flat', top: 'Coffee shop fit-out, M1 Northern Quarter' },
    ],
    hotLead: {
      title: 'Rear extension + kitchen remodel',
      postcode: 'M20 Didsbury',
      approvedDaysAgo: 3,
      estimatedValue: '£32k–£48k',
      buyerScore: 87,
      why: 'M20 is the strongest residential postcode in Manchester. Planning approved 3 days ago. Combined extension and kitchen scope means two trade packages — builder and kitchen fitter both needed.',
      action: 'Call today. Three days since approval — the buyer may already be making calls, but M20 properties are high-value and owners are selective. A credible, professional approach will still win.',
    },
    marketNote: 'Manchester council contracts are slowing slightly ahead of summer. Residential extension demand is steady. Didsbury and Chorlton remain the strongest postcodes — both show above-average planning approvals per household.',
    actionList: [
      'Call M20 extension — 3 days old but still within the first-mover window',
      'Target M14 EPC landlord — F-rated terrace, Fallowfield has high rental density',
      'Review Trafford park tender — smaller value but low competition',
    ],
    toolTip: 'M20 buyers expect professionalism. Have your company details ready before you call — business name, registration, insurance, and a recent job in the area if you have one.',
  },
  bristol: {
    city: 'Bristol',
    postcode: 'BS',
    weekOf: 'Week of 19 May 2026',
    territoryScore: 79,
    scoreTrend: 'up',
    totalSignals: 11,
    signalChange: 2,
    signals: [
      { type: 'Planning approvals', count: 5, trend: 'up', top: 'Extension + annexe, BS9 Westbury-on-Trym' },
      { type: 'EPC upgrades needed', count: 4, trend: 'up', top: 'F-rated rental, BS3 Southville' },
      { type: 'Council contracts', count: 1, trend: 'flat', top: 'School refurb tender — South Gloucestershire' },
      { type: 'New businesses', count: 1, trend: 'flat', top: 'Studio fit-out, BS1 city centre' },
    ],
    hotLead: {
      title: 'Extension + annexe, detached bungalow',
      postcode: 'BS9 Westbury-on-Trym',
      approvedDaysAgo: 4,
      estimatedValue: '£55k–£80k',
      buyerScore: 89,
      why: 'Annexe conversion is a larger scope than a standard extension. BS9 is one of Bristol\'s highest-value postcodes. Bungalow owners converting for family typically have committed budget.',
      action: 'Call today. Four days since approval — still early. Annexe jobs often go to trades with relevant portfolio. Mention a similar project if you have one.',
    },
    marketNote: 'Bristol retrofit demand is above the national average. The city has strong EPC upgrade pressure driven by rental legislation. Southville and Bedminster have high concentrations of F/G-rated Victorian terraces — landlords are being pushed to upgrade.',
    actionList: [
      'Call BS9 annexe — large scope, high-value postcode, 4 days since approval',
      'Target BS3 EPC landlord — Victorian terrace, motivated by legislation',
      'Check South Gloucestershire school tender — refurb work, realistic scope',
    ],
    toolTip: 'Bristol retrofit grants are available through Warm Homes Bristol. If you can reference this when calling EPC leads, it reduces the buyer\'s perceived cost and speeds up the decision.',
  },
  leeds: {
    city: 'Leeds',
    postcode: 'LS',
    weekOf: 'Week of 19 May 2026',
    territoryScore: 76,
    scoreTrend: 'flat',
    totalSignals: 13,
    signalChange: 0,
    signals: [
      { type: 'Planning approvals', count: 7, trend: 'flat', top: 'Rear extension, LS17 Moortown' },
      { type: 'EPC upgrades needed', count: 3, trend: 'up', top: 'F-rated terrace cluster, LS6 Headingley' },
      { type: 'Council contracts', count: 2, trend: 'flat', top: 'Housing repairs framework — Leeds City' },
      { type: 'New businesses', count: 1, trend: 'flat', top: 'Café fit-out, LS1 city centre' },
    ],
    hotLead: {
      title: 'Rear extension, semi-detached',
      postcode: 'LS17 Moortown',
      approvedDaysAgo: 2,
      estimatedValue: '£28k–£42k',
      buyerScore: 85,
      why: 'LS17 is Leeds\' strongest residential postcode. Approved two days ago. Semi-detached extension — standard scope, realistic budget, motivated buyer.',
      action: 'Call today. Use First Strike to copy your first-touch message. LS17 buyers are practical — lead with availability and a ballpark figure.',
    },
    marketNote: 'Leeds extension demand is steady. LS17 and LS16 remain the most active postcodes. Headingley\'s student rental density means EPC upgrade pressure is building — landlords with multiple F/G properties in LS6 are being contacted by the council.',
    actionList: [
      'Call LS17 extension — 2 days since approval, good buyer score',
      'Target LS6 EPC landlord — F-rated student rental, council pressure',
      'Check Leeds housing repairs framework — preferred supplier list, worth applying',
    ],
    toolTip: 'Leeds buyers in LS17 and LS16 respond well to local references. If you have done work in Moortown or Alwoodley, mention it in your opening call.',
  },
  glasgow: {
    city: 'Glasgow',
    postcode: 'G',
    weekOf: 'Week of 19 May 2026',
    territoryScore: 74,
    scoreTrend: 'up',
    totalSignals: 10,
    signalChange: 2,
    signals: [
      { type: 'Planning approvals', count: 5, trend: 'up', top: 'Flat conversion, G12 Hillhead' },
      { type: 'EPC upgrades needed', count: 3, trend: 'up', top: 'F-rated Victorian tenement, G41 Pollokshields' },
      { type: 'Council contracts', count: 1, trend: 'flat', top: 'Social housing refurb — Glasgow City' },
      { type: 'New businesses', count: 1, trend: 'flat', top: 'Bar fit-out, G1 Merchant City' },
    ],
    hotLead: {
      title: 'Flat conversion, top-floor Victorian',
      postcode: 'G12 Hillhead',
      approvedDaysAgo: 3,
      estimatedValue: '£35k–£55k',
      buyerScore: 83,
      why: 'G12 is Glasgow\'s university quarter — high owner-occupier rate, above-average spending on property. Top-floor conversion with planning approval. Tenement properties often need specialist knowledge — a trade with tenement experience has a clear edge.',
      action: 'Call today. Mention any tenement or Victorian flat experience you have. G12 buyers value local knowledge.',
    },
    marketNote: 'Glasgow\'s EPC upgrade pressure is significant. Victorian tenement stock in the West End and South Side has high F/G concentrations. The Scottish Government\'s Heat in Buildings strategy is creating legal urgency for landlords — stronger motivation than the rest of the UK.',
    actionList: [
      'Call G12 flat conversion — 3 days since approval, good buyer score',
      'Target G41 EPC tenement — Heat in Buildings legislation creates urgency',
      'Check Glasgow City social housing refurb — large scope, worth the paperwork if qualified',
    ],
    toolTip: 'Scottish EPC regulations are stricter than England and Wales. When calling G41 landlords, reference the Heat in Buildings Act deadlines specifically — it signals you understand their situation.',
  },
};

const TREND_ICON = {
  up: <TrendingUp className="w-4 h-4 text-[var(--green)]" />,
  down: <TrendingDown className="w-4 h-4 text-[var(--orange)]" />,
  flat: <Minus className="w-4 h-4 text-[var(--muted)]" />,
};

function hasAccess() {
  return OPEN_ACCESS || localStorage.getItem('jf-unlimited-tester') === 'true';
}

export function CityIntelligencePage() {
  const { city = 'birmingham' } = useParams<{ city: string }>();
  const intel = CITY_INTEL[city.toLowerCase()];
  const unlocked = hasAccess();

  if (!intel) {
    return (
      <main className="page-shell py-14">
        <p className="micro-label text-[var(--orange)]">NOT FOUND</p>
        <h1 className="headline mt-3 text-4xl">No intelligence briefing for "{city}".</h1>
        <Link to="/news" className="jf-button mt-6 inline-block bg-[var(--ink)] text-white">← Back to briefings</Link>
      </main>
    );
  }

  const scoreTrendClass = intel.scoreTrend === 'up' ? 'text-[var(--green)]' : intel.scoreTrend === 'down' ? 'text-[var(--orange)]' : 'text-[var(--muted)]';

  // Cross-city ranking strip — sorted by territory score desc
  const cityRanking = Object.entries(CITY_INTEL)
    .map(([slug, c]) => ({ slug, city: c.city, score: c.territoryScore, totalSignals: c.totalSignals, signalChange: c.signalChange }))
    .sort((a, b) => b.score - a.score);

  return (
    <main className="pb-24">

      {/* ── STICKY CITY SWITCHER ── */}
      <div className="sticky top-[64px] z-30 border-b-2 border-[var(--line)] bg-[var(--paper)]">
        <div className="page-shell flex items-center gap-2 overflow-x-auto py-2">
          <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-[var(--muted)] mr-1">CITIES:</span>
          {Object.entries(CITY_INTEL).map(([slug, c]) => {
            const active = slug === city.toLowerCase();
            return (
              <Link
                key={slug}
                to={`/intelligence/${slug}`}
                className={`shrink-0 border-2 px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)]'
                    : 'border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--yellow)]/30'
                }`}
              >
                {c.city} <span className="font-mono ml-1 text-[10px] opacity-70">{c.territoryScore}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── HEADER ── */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--yellow)]">
        <div className="page-shell py-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-[var(--yellow)]" />
            <p className="micro-label text-[var(--yellow)]">CITY INTELLIGENCE — {intel.city.toUpperCase()}</p>
            <span className="border-2 border-[var(--orange)] bg-[var(--orange)]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--orange)]">
              SAMPLE BRIEFING
            </span>
          </div>
          <h1 className="headline text-4xl leading-none text-white sm:text-6xl">
            TRADE BRIEFING<br />{intel.city.toUpperCase()}
          </h1>
          <p className="mt-3 text-sm font-black uppercase tracking-wider text-white/50">{intel.weekOf} · Postcode area: {intel.postcode}</p>
          <p className="mt-2 max-w-2xl text-xs font-bold text-white/60">
            Sample briefing showing the format. Live briefings pull from real planning, EPC and tender feeds — only delivered to founder-patch subscribers in covered postcodes.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="border-2 border-[var(--yellow)]/30 bg-white/5 px-5 py-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-white/50">Territory Score</p>
              <p className={`headline text-3xl ${scoreTrendClass}`}>{intel.territoryScore}</p>
            </div>
            <div className="border-2 border-[var(--yellow)]/30 bg-white/5 px-5 py-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-white/50">Signals This Week</p>
              <p className="headline text-3xl text-white">{intel.totalSignals}</p>
            </div>
            <div className="border-2 border-[var(--yellow)]/30 bg-white/5 px-5 py-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-white/50">Change vs Last Week</p>
              <p className={`headline text-3xl ${intel.signalChange >= 0 ? 'text-[var(--green)]' : 'text-[var(--orange)]'}`}>
                {intel.signalChange >= 0 ? '+' : ''}{intel.signalChange}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell py-10 flex flex-col gap-8">

        {/* ── SIGNAL BREAKDOWN ── */}
        <section>
          <p className="micro-label text-[var(--orange)]">SIGNAL BREAKDOWN</p>
          <h2 className="headline mt-1 text-2xl leading-none">THIS WEEK IN {intel.city.toUpperCase()}</h2>
          <div className="mt-4 border-2 border-[var(--line)] divide-y-2 divide-[var(--line)]">
            {intel.signals.map((row) => (
              <div key={row.type} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-white px-5 py-4">
                <div className="flex items-center gap-2">
                  {TREND_ICON[row.trend]}
                  <span className="font-mono text-2xl font-black text-[var(--ink)]">{row.count}</span>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-[var(--ink)]">{row.type}</p>
                  {unlocked && <p className="text-xs font-bold text-[var(--muted)]">Top signal: {row.top}</p>}
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-1 ${
                  row.trend === 'up' ? 'bg-[var(--green)] text-white' :
                  row.trend === 'down' ? 'bg-[var(--orange)] text-white' :
                  'bg-[var(--muted)]/15 text-[var(--muted)]'
                }`}>
                  {row.trend === 'up' ? '↑ UP' : row.trend === 'down' ? '↓ DOWN' : '→ FLAT'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOT LEAD SPOTLIGHT ── */}
        <section>
          <p className="micro-label text-[var(--orange)]">HOT LEAD SPOTLIGHT</p>
          <h2 className="headline mt-1 text-2xl leading-none">THIS WEEK'S STRONGEST SIGNAL</h2>
          {unlocked ? (
            <div className="mt-4 border-2 border-[var(--yellow)] bg-white">
              <div className="border-b-2 border-[var(--yellow)] bg-[var(--yellow)] px-5 py-3 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wider text-[var(--ink)]">GOLD — Approved {intel.hotLead.approvedDaysAgo} day{intel.hotLead.approvedDaysAgo !== 1 ? 's' : ''} ago</p>
                <p className="font-mono text-sm font-black text-[var(--ink)]">Score {intel.hotLead.buyerScore}</p>
              </div>
              <div className="px-5 py-5">
                <h3 className="headline text-2xl">{intel.hotLead.title}</h3>
                <p className="mt-1 text-sm font-black text-[var(--muted)]">{intel.hotLead.postcode} · Est. {intel.hotLead.estimatedValue}</p>
                <div className="mt-4 border-l-4 border-[var(--yellow)] pl-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)] mb-1">WHY IT'S HOT</p>
                  <p className="text-sm font-bold text-[var(--ink)] leading-relaxed">{intel.hotLead.why}</p>
                </div>
                <div className="mt-4 bg-[var(--ink)] px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[var(--yellow)] mb-1">RECOMMENDED ACTION</p>
                  <p className="text-sm font-bold text-white leading-relaxed">{intel.hotLead.action}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 border-2 border-[var(--line)] bg-white overflow-hidden">
              <div className="border-b-2 border-[var(--line)] bg-[var(--offwhite)] px-5 py-3 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">GOLD — Approved {intel.hotLead.approvedDaysAgo} day{intel.hotLead.approvedDaysAgo !== 1 ? 's' : ''} ago</p>
                <Lock className="w-4 h-4 text-[var(--muted)]" />
              </div>
              <div className="px-5 py-5">
                <p className="headline text-2xl select-none blur-[4px]">████████████████</p>
                <p className="mt-1 text-sm font-black text-[var(--muted)] select-none blur-[4px]">██████ · Est. £██k–£██k</p>
                <div className="mt-4 border-l-4 border-[var(--line)] pl-4 blur-[3px] select-none">
                  <p className="text-sm font-bold text-[var(--ink)]">████████████ ██████████ ████████████████████ ██████████ ████████.</p>
                </div>
                <div className="mt-4">
                  <Link to="/pricing" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-center block">
                    UNLOCK WITH PATCH PLAN — £39/MO →
                  </Link>
                  <p className="mt-2 text-center text-[10px] font-black text-[var(--muted)] uppercase tracking-wider">Full spotlight + action list + market note included</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── MARKET NOTE ── */}
        {unlocked ? (
          <section>
            <p className="micro-label text-[var(--orange)]">MARKET NOTE</p>
            <h2 className="headline mt-1 text-2xl leading-none">{intel.city.toUpperCase()} THIS WEEK</h2>
            <div className="mt-4 border-2 border-[var(--line)] bg-white px-6 py-5">
              <p className="text-base font-bold text-[var(--ink)] leading-relaxed">{intel.marketNote}</p>
            </div>
          </section>
        ) : (
          <section>
            <p className="micro-label text-[var(--orange)]">MARKET NOTE</p>
            <h2 className="headline mt-1 text-2xl leading-none">{intel.city.toUpperCase()} THIS WEEK</h2>
            <div className="mt-4 border-2 border-[var(--line)] bg-[var(--offwhite)] px-6 py-5 flex items-center gap-3">
              <Lock className="w-5 h-5 shrink-0 text-[var(--muted)]" />
              <p className="text-sm font-bold text-[var(--muted)]">Market intelligence available on Patch Plan. Weekly paragraph on local conditions, demand trends, and what's happening in your city.</p>
            </div>
          </section>
        )}

        {/* ── ACTION LIST ── */}
        {unlocked ? (
          <section>
            <p className="micro-label text-[var(--orange)]">THIS WEEK'S ACTION LIST</p>
            <h2 className="headline mt-1 text-2xl leading-none">WHAT TO DO BEFORE FRIDAY</h2>
            <div className="mt-4 border-2 border-[var(--line)] divide-y divide-[var(--line)] bg-white">
              {intel.actionList.map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4">
                  <CheckSquare className="w-5 h-5 shrink-0 text-[var(--yellow)] mt-0.5" />
                  <p className="text-sm font-bold text-[var(--ink)]">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── TOOL TIP ── */}
        {unlocked && (
          <section>
            <div className="border-2 border-[var(--ink)] bg-[var(--yellow)] px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--ink)] mb-2">TOOL TIP THIS WEEK</p>
              <p className="text-sm font-bold text-[var(--ink)] leading-relaxed">{intel.toolTip}</p>
            </div>
          </section>
        )}

        {/* ── CROSS-CITY RANKING ── */}
        <section>
          <p className="micro-label text-[var(--orange)]">UK RANKING THIS WEEK</p>
          <h2 className="headline mt-1 text-2xl leading-none">HOW {intel.city.toUpperCase()} STACKS UP.</h2>
          <p className="mt-2 max-w-2xl text-sm font-bold text-[var(--muted)]">
            Territory score across covered cities. Highest score = strongest live signal mix this week. Tap any city to switch briefing.
          </p>
          <div className="mt-4 border-2 border-[var(--line)] divide-y-2 divide-[var(--line)] bg-white">
            {cityRanking.map((row, i) => {
              const active = row.slug === city.toLowerCase();
              return (
                <Link
                  key={row.slug}
                  to={`/intelligence/${row.slug}`}
                  className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-3 hover:bg-[var(--yellow)]/10 transition-colors ${active ? 'bg-[var(--yellow)]/30' : ''}`}
                >
                  <span className="font-mono text-sm font-black text-[var(--muted)] w-6">#{i + 1}</span>
                  <span className="text-base font-black uppercase text-[var(--ink)]">{row.city}</span>
                  <span className="text-xs font-black uppercase text-[var(--muted)]">
                    {row.totalSignals} signals · {row.signalChange >= 0 ? '+' : ''}{row.signalChange}
                  </span>
                  <span className={`border-2 border-[var(--line)] px-2 py-1 font-mono text-sm font-black ${row.score >= 85 ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-[var(--paper)] text-[var(--ink)]'}`}>
                    {row.score}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        {!unlocked && (
          <section className="border-2 border-[var(--ink)] bg-[var(--ink)] px-6 py-8">
            <AlertTriangle className="w-6 h-6 text-[var(--yellow)] mb-3" />
            <h2 className="headline text-3xl leading-none text-white">UNLOCK THE FULL BRIEFING.</h2>
            <p className="mt-3 text-sm font-bold text-white/70 max-w-lg">
              Hot lead spotlight, action list, market note, and tool tip — all included with the Patch Plan. One dominant trade per postcode. £39/mo. If you don't see one job worth chasing in 30 days, we refund every penny.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">UNLOCK — £39/MO</Link>
              <Link to="/find-jobs" className="jf-button bg-white text-[var(--ink)]">SCAN FREE FIRST</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
