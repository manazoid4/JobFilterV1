import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface CityData {
  slug: string;
  name: string;
  postcode: string;
  region: string;
  planningAppsPerWeek: number;
  epcFGProperties: number;
  councilContractsActive: number;
  areaCodes: string[];
  tradeDensity: string;
  heroH1: string;
  heroSub: string;
  statsNote: string;
  localAngle: string;
  localAngleBody: string;
  ctaText: string;
}

export const CITIES: CityData[] = [
  {
    slug: 'birmingham',
    name: 'Birmingham',
    postcode: 'B1',
    region: 'West Midlands',
    planningAppsPerWeek: 280,
    epcFGProperties: 34000,
    councilContractsActive: 142,
    areaCodes: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20', 'B21', 'B23', 'B24', 'B25', 'B26', 'B27', 'B28', 'B29', 'B30', 'B31', 'B32', 'B33', 'B34', 'B35', 'B36', 'B37', 'B38', 'B40', 'B42', 'B43', 'B44', 'B45', 'B46', 'B47', 'B48', 'B49', 'B50', 'B60', 'B61', 'B62', 'B63', 'B64', 'B65', 'B66', 'B67', 'B68', 'B69', 'B70', 'B71', 'B72', 'B73', 'B74', 'B75', 'B76', 'B77', 'B78', 'B79', 'B80', 'B90', 'B91', 'B92', 'B93', 'B94', 'B95', 'B96', 'B97', 'B98'],
    tradeDensity: 'Highest trade density outside London — 12,000+ registered builders in the West Midlands',
    heroH1: 'Find building work in Birmingham before it hits the directories.',
    heroSub: 'JobFilter scans official planning applications, EPC data, and council contract notices across Birmingham and the West Midlands — and sends the ones worth chasing straight to your phone. Built here. No shared leads. No per-lead fees.',
    statsNote: 'Birmingham generates more planning applications per week than any UK city outside London. The Big City Plan and HS2 fallout mean thousands of trades are competing for the same jobs. JobFilter finds the ones nobody else sees.',
    localAngle: 'Built in Birmingham. Not London.',
    localAngleBody: 'We know how this city works. From Erdington to Selly Oak, from Solihull to Walsall — the jobs are here. The problem is finding them before 8 other blokes quote. JobFilter was built in Birmingham for Birmingham trades. We scan every planning application, every EPC rating, every council contract notice across the B postcodes — and score them before they reach you.',
    ctaText: 'Scan Birmingham now — free',
  },
  {
    slug: 'london',
    name: 'London',
    postcode: 'EC1',
    region: 'Greater London',
    planningAppsPerWeek: 820,
    epcFGProperties: 120000,
    councilContractsActive: 387,
    areaCodes: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'EC1', 'EC2', 'EC3', 'EC4', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'N11', 'N12', 'N13', 'N14', 'N15', 'N16', 'N17', 'N18', 'N19', 'N20', 'N21', 'N22', 'NW1', 'NW2', 'NW3', 'NW4', 'NW5', 'NW6', 'NW7', 'NW8', 'NW9', 'NW10', 'NW11', 'SE1', 'SE2', 'SE3', 'SE4', 'SE5', 'SE6', 'SE7', 'SE8', 'SE9', 'SE10', 'SE11', 'SE12', 'SE13', 'SE14', 'SE15', 'SE16', 'SE17', 'SE18', 'SE19', 'SE20', 'SE21', 'SE22', 'SE23', 'SE24', 'SE25', 'SE26', 'SE27', 'SE28', 'SW1', 'SW2', 'SW3', 'SW4', 'SW5', 'SW6', 'SW7', 'SW8', 'SW9', 'SW10', 'SW11', 'SW12', 'SW13', 'SW14', 'SW15', 'SW16', 'SW17', 'SW18', 'SW19', 'SW20', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12', 'W13', 'W14', 'WC1', 'WC2'],
    tradeDensity: 'Largest construction market in the UK — 45,000+ active trades competing across 32 boroughs',
    heroH1: 'Find construction leads in London before every other trade quotes.',
    heroSub: '820 planning applications a week. 387 live council contracts. 120,000 F/G-rated properties needing retrofit. JobFilter scans all three sources across every London postcode — and scores the leads worth chasing. No shared leads. No per-lead fees. £29/month.',
    statsNote: 'London has more planning applications than any UK city by a massive margin. But 45,000+ trades are fighting for the same work. The ones who win are the ones who see the jobs first.',
    localAngle: 'London moves fast. The first quote wins 70% of jobs.',
    localAngleBody: 'Every borough in London has a different planning portal, different council contract process, different timeline. JobFilter reads them all — 32 boroughs, every planning application, every EPC assessment, every tender notice. When something scores GOLD, it hits your WhatsApp within minutes. Not batched. Not delayed. Before the directories even know about it.',
    ctaText: 'Scan London now — free',
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    postcode: 'M1',
    region: 'Greater Manchester',
    planningAppsPerWeek: 310,
    epcFGProperties: 42000,
    councilContractsActive: 98,
    areaCodes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'M18', 'M19', 'M20', 'M21', 'M22', 'M23', 'M24', 'M25', 'M26', 'M27', 'M28', 'M29', 'M30', 'M31', 'M32', 'M33', 'M34', 'M35', 'M38', 'M40', 'M41', 'M43', 'M44', 'M45', 'M46', 'M50', 'M60', 'M90'],
    tradeDensity: 'Fastest-growing construction market in the North — £8bn+ in active development projects',
    heroH1: 'Construction leads in Manchester — planning, EPC and council contracts.',
    heroSub: 'Manchester is the fastest-growing construction market in the North. £8 billion in active projects. JobFilter scans every planning application across Greater Manchester, every EPC rating, every council tender — and sends GOLD leads to your WhatsApp. No shared leads. No per-lead fees.',
    statsNote: 'Manchester has more active development projects than any northern city. From Salford Quays to Stockport, the work is real. The question is who sees it first.',
    localAngle: 'The North is building. Manchester leads the way.',
    localAngleBody: 'Manchester has more planning applications per week than Birmingham. The city is growing — new builds, conversions, retrofit work, council contracts. But most trades still rely on Checkatrade and word of mouth. JobFilter scans every M postcode for planning approvals, EPC upgrades, and council tenders. When a job scores GOLD, you know about it before anyone else.',
    ctaText: 'Scan Manchester now — free',
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    postcode: 'BS1',
    region: 'South West',
    planningAppsPerWeek: 190,
    epcFGProperties: 22000,
    councilContractsActive: 67,
    areaCodes: ['BS1', 'BS2', 'BS3', 'BS4', 'BS5', 'BS6', 'BS7', 'BS8', 'BS9', 'BS10', 'BS11', 'BS13', 'BS14', 'BS15', 'BS16', 'BS20', 'BS21', 'BS22', 'BS23', 'BS24', 'BS25', 'BS26', 'BS27', 'BS28', 'BS29', 'BS30', 'BS31', 'BS32', 'BS34', 'BS35', 'BS36', 'BS37', 'BS39', 'BS40', 'BS41', 'BS48', 'BS49'],
    tradeDensity: 'High-value retrofit market — 22,000 F/G properties and strong green building standards',
    heroH1: 'Bristol construction leads — find retrofit, extension and council work.',
    heroSub: 'Bristol has some of the strictest energy efficiency standards in the UK. 22,000 F/G-rated properties need upgrading. JobFilter scans every planning application, every EPC assessment, and every council contract across the BS postcodes — and sends the best leads to your phone. No shared leads. No per-lead fees.',
    statsNote: 'Bristol leads the UK on green building standards. The city council has committed to carbon neutrality by 2030 — meaning massive demand for retrofit, insulation, and heat pump work.',
    localAngle: 'Bristol is the retrofit capital. The work is guaranteed.',
    localAngleBody: 'Bristol council has committed to carbon neutrality by 2030. That means thousands of properties need insulation, heat pumps, solar panels, and EPC upgrades before the deadline. JobFilter flags every F/G-rated property, every planning application for energy-efficient builds, and every council contract for retrofit work across the South West. The work is guaranteed. The question is who gets there first.',
    ctaText: 'Scan Bristol now — free',
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    postcode: 'LS1',
    region: 'West Yorkshire',
    planningAppsPerWeek: 220,
    epcFGProperties: 31000,
    councilContractsActive: 78,
    areaCodes: ['LS1', 'LS2', 'LS3', 'LS4', 'LS5', 'LS6', 'LS7', 'LS8', 'LS9', 'LS10', 'LS11', 'LS12', 'LS13', 'LS14', 'LS15', 'LS16', 'LS17', 'LS18', 'LS19', 'LS20', 'LS21', 'LS22', 'LS23', 'LS24', 'LS25', 'LS26', 'LS27', 'LS28', 'LS29', 'LS31', 'LS32', 'LS33', 'LS34', 'LS35', 'LS36', 'LS37', 'LS38', 'LS39', 'LS40', 'LS41', 'LS42', 'LS43', 'LS44', 'LS45', 'LS46', 'LS47', 'LS48', 'LS49', 'LS50', 'LS51', 'LS52', 'LS53', 'LS54', 'LS55', 'LS56', 'LS57', 'LS58', 'LS59', 'LS60', 'LS61', 'LS62', 'LS63', 'LS64', 'LS65', 'LS66', 'LS67', 'LS68', 'LS69', 'LS70', 'LS71', 'LS72', 'LS73', 'LS74', 'LS75', 'LS76', 'LS77', 'LS78', 'LS79', 'LS80', 'LS81', 'LS82', 'LS83', 'LS84', 'LS85', 'LS86', 'LS87', 'LS88'],
    tradeDensity: 'Major northern trade hub — 8,000+ registered builders across West Yorkshire',
    heroH1: 'Construction leads in Leeds — planning applications and council contracts.',
    heroSub: 'Leeds is the construction hub of Yorkshire. 220 planning applications a week. 78 active council contracts. 31,000 F/G-rated properties needing work. JobFilter scans every LS postcode for planning approvals, EPC signals, and council tenders — and scores them before they reach you. No shared leads. No per-lead fees.',
    statsNote: 'Leeds has the largest construction economy in Yorkshire. South Bank regeneration alone is a £2.5bn project. The work is here — but most trades never see it coming.',
    localAngle: 'Yorkshire builds different. The jobs are bigger, the competition is fierce.',
    localAngleBody: 'Leeds is the economic engine of the North. South Bank regeneration, South Leeds Industrial Strategy, the Aire Valley enterprise zone — billions in construction work. But 8,000+ builders across West Yorkshire are competing for it. JobFilter scans every planning application, every council contract, every EPC upgrade across the LS postcodes. When a job scores GOLD, it hits your WhatsApp. Not email. Not a dashboard. WhatsApp.',
    ctaText: 'Scan Leeds now — free',
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    postcode: 'G1',
    region: 'Scotland',
    planningAppsPerWeek: 170,
    epcFGProperties: 38000,
    councilContractsActive: 54,
    areaCodes: ['G1', 'G2', 'G3', 'G4', 'G5', 'G11', 'G12', 'G13', 'G14', 'G15', 'G20', 'G21', 'G22', 'G23', 'G31', 'G32', 'G33', 'G34', 'G40', 'G41', 'G42', 'G43', 'G44', 'G45', 'G46', 'G51', 'G52', 'G53', 'G58', 'G60', 'G61', 'G62', 'G63', 'G64', 'G65', 'G66', 'G67', 'G68', 'G69', 'G70', 'G71', 'G72', 'G73', 'G74', 'G75', 'G76', 'G77', 'G78', 'G79', 'G80', 'G81', 'G82', 'G83', 'G84'],
    tradeDensity: 'Scotland\'s largest construction market — 38,000 F/G properties and growing retrofit demand',
    heroH1: 'Construction leads in Glasgow — Scotland\'s biggest retrofit and building market.',
    heroSub: 'Glasgow has 38,000 F/G-rated properties — the highest of any Scottish city. Scottish building regulations are tightening. The work is coming. JobFilter scans every planning application, every EPC assessment, and every council contract across the G postcodes — and sends GOLD leads to your phone. No shared leads. No per-lead fees.',
    statsNote: 'Scotland has its own planning system, its own EPC regulations, and its own council procurement. JobFilter covers all three for Glasgow and the Central Belt.',
    localAngle: 'Scotland plays by different rules. JobFilter knows them.',
    localAngleBody: 'Scottish planning applications go through ePlanning Scotland, not the English system. EPC regulations are different. Council procurement follows Scottish public contract rules. Most lead platforms ignore Scotland entirely. JobFilter doesn\'t. We scan every G postcode for planning approvals, EPC upgrades, and council tenders — scored and delivered to WhatsApp. The retrofit wave is coming to Glasgow. Be ready for it.',
    ctaText: 'Scan Glasgow now — free',
  },
];

interface CityPageProps {
  city: CityData;
}

export function CityPage({ city }: CityPageProps) {
  const navigate = useNavigate();
  const otherCities = CITIES.filter((c) => c.slug !== city.slug);

  useEffect(() => {
    document.title = `Construction Leads in ${city.name} — Planning, EPC & Council Contracts | JobFilter`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Find ${city.name.toLowerCase()} construction leads from planning applications, EPC data, and council contracts. ${city.planningAppsPerWeek}+ planning apps per week. Scan free — no card required.`
      );
    }
  }, [city]);

  function handleScan() {
    navigate(`/find-jobs?postcode=${city.postcode}&trade=building`);
  }

  return (
    <main className="pb-8">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span className="micro-label text-[var(--muted)]">CONSTRUCTION LEADS IN {city.name.toUpperCase()}</span>
          <h1
            className="headline mt-3"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            {city.heroH1}
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]/80">
            {city.heroSub}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleScan} className="jf-button bg-[var(--ink)] text-white">
              {city.ctaText.toUpperCase()}
            </button>
            <a href="/pricing" className="jf-button bg-white text-[var(--ink)]">
              SEE PRICING
            </a>
          </div>
          <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
            <p>NO SHARED LEADS</p>
            <p>NO PER-LEAD FEES</p>
            <p>WHATSAPP ALERTS</p>
            <p>GOLD SCORING</p>
          </div>
        </div>
      </section>

      {/* ── City Stats ───────────────────────────────── */}
      <section className="bg-white border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">{city.name.toUpperCase()} — THE NUMBERS</p>
          <h2 className="headline mt-3 max-w-3xl text-4xl leading-[0.9] sm:text-5xl md:text-6xl">
            {city.statsNote.split('.')[0]}.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <p className="micro-label text-[var(--muted)]">PLANNING APPLICATIONS</p>
              <p className="headline mt-2 text-5xl text-[var(--navy)]">{city.planningAppsPerWeek}/wk</p>
              <p className="mt-2 font-black text-[var(--muted)]">New extensions, conversions, and builds every week across {city.name}</p>
            </div>
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <p className="micro-label text-[var(--muted)]">EPC F/G PROPERTIES</p>
              <p className="headline mt-2 text-5xl text-[var(--navy)]">{city.epcFGProperties.toLocaleString()}</p>
              <p className="mt-2 font-black text-[var(--muted)]">Properties that legally need retrofit work before they can be rented</p>
            </div>
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <p className="micro-label text-[var(--muted)]">COUNCIL CONTRACTS</p>
              <p className="headline mt-2 text-5xl text-[var(--navy)]">{city.councilContractsActive}</p>
              <p className="mt-2 font-black text-[var(--muted)]">Active council tenders in {city.region} open to local trades</p>
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--muted)]">{city.tradeDensity}</p>
        </div>
      </section>

      {/* ── Local Angle ──────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">{city.localAngle.toUpperCase()}</p>
          <h2 className="headline mt-3 max-w-3xl text-4xl leading-[0.9] sm:text-5xl md:text-6xl">
            {city.localAngle}
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            {city.localAngleBody}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="jf-box bg-white p-6">
              <p className="micro-label text-[var(--red)]" style={{ color: 'var(--orange)' }}>THE OLD WAY</p>
              <ul className="mt-4 grid gap-3 font-black text-[var(--muted)]">
                <li>✗ Checkatrade — lead goes to 5 other trades</li>
                <li>✗ Google Ads — £5-£15 per click, no guarantee</li>
                <li>✗ Word of mouth — feast or famine</li>
                <li>✗ Council portals — hours of manual searching</li>
              </ul>
            </div>
            <div className="jf-box bg-[var(--ink)] p-6 text-white">
              <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
              <ul className="mt-4 grid gap-3 font-black text-white/85">
                <li>✓ Every scan is private — nobody else sees your results</li>
                <li>✓ Three data sources — planning, EPC, council contracts</li>
                <li>✓ GOLD scoring — only the jobs worth chasing hit WhatsApp</li>
                <li>✓ £29/month unlimited — cheaper than 15 Checkatrade leads</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works for This City ───────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 max-w-3xl text-4xl leading-[0.9] sm:text-5xl">
            THREE STEPS. {city.name.toUpperCase()} COVERAGE.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="jf-box bg-[var(--bg-main)] p-7">
              <span className="headline block" style={{ fontSize: 42, color: 'var(--navy)' }}>01</span>
              <h3 className="mt-3 text-lg font-black text-[var(--navy)]">ENTER YOUR {city.name} POSTCODE</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">
                We cover every {city.areaCodes.slice(0, 3).join(', ')} postcode and beyond. Tell us where you work and what trade you're in.
              </p>
            </div>
            <div className="jf-box bg-[var(--bg-main)] p-7">
              <span className="headline block" style={{ fontSize: 42, color: 'var(--navy)' }}>02</span>
              <h3 className="mt-3 text-lg font-black text-[var(--navy)]">WE SCAN THREE SOURCES</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">
                Planning applications across {city.region}, EPC ratings for every property, council contracts open to local trades. All scored.
              </p>
            </div>
            <div className="jf-box bg-[var(--bg-main)] p-7">
              <span className="headline block" style={{ fontSize: 42, color: 'var(--navy)' }}>03</span>
              <h3 className="mt-3 text-lg font-black text-[var(--navy)]">GOLD LEADS HIT WHATSAPP</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">
                When a job scores 80+, it fires to your phone within minutes. Not batched. Not delayed. Before anyone else sees it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample Lead Preview ──────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">WHAT A {city.name.toUpperCase()} LEAD LOOKS LIKE</p>
          <h2 className="headline mt-3 max-w-3xl text-4xl leading-[0.9] sm:text-5xl text-[var(--yellow)]">
            REAL SIGNAL. NOT A FORM FILL.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="jf-box bg-white/10 p-5">
              <p className="micro-label text-[var(--yellow)]">PLANNING LEAD</p>
              <h3 className="mt-3 text-xl font-black text-white">Two-storey side extension</h3>
              <div className="mt-4 grid gap-2 text-sm font-black text-white/75">
                <p>Area: {city.postcode} / {city.region}</p>
                <p>Value: £45k-£80k</p>
                <p>Status: Approved</p>
                <p>Trade match: Building, Roofing, Electrical</p>
              </div>
            </div>
            <div className="jf-box bg-white/10 p-5">
              <p className="micro-label text-[var(--yellow)]">EPC LEAD</p>
              <h3 className="mt-3 text-xl font-black text-white">Efficiency Upgrade: Rating F</h3>
              <div className="mt-4 grid gap-2 text-sm font-black text-white/75">
                <p>Area: {city.postcode} / {city.region}</p>
                <p>Work needed: Insulation, heating upgrade</p>
                <p>Value: £8k-£25k</p>
                <p>Deadline: 2030 rental compliance</p>
              </div>
            </div>
            <div className="jf-box bg-white/10 p-5">
              <p className="micro-label text-[var(--yellow)]">COUNCIL CONTRACT</p>
              <h3 className="mt-3 text-xl font-black text-white">School roof replacement</h3>
              <div className="mt-4 grid gap-2 text-sm font-black text-white/75">
                <p>Area: {city.region}</p>
                <p>Value: £120k+</p>
                <p>Deadline: 6 weeks</p>
                <p>Trade match: Roofing, Building</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-lg font-black text-white/60">
            These are real signal types. Free scan shows they exist. £29/month unlocks the full detail — buyer name, source link, contact signal.
          </p>
          <button onClick={handleScan} className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)]">
            {city.ctaText.toUpperCase()}
          </button>
        </div>
      </section>

      {/* ── Coverage Area ────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">COVERAGE</p>
          <h2 className="headline mt-3 text-4xl leading-[0.9] sm:text-5xl md:text-6xl">
            EVERY {city.name.toUpperCase()} POSTCODE. THREE DATA SOURCES.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]/75">
            JobFilter covers all {city.areaCodes.length} {city.name} postcode districts for planning applications, EPC data, and council contracts.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {city.areaCodes.slice(0, 20).map((code) => (
              <span key={code} className="border-2 border-[var(--ink)] bg-white px-2 py-1 text-xs font-black">
                {code}
              </span>
            ))}
            {city.areaCodes.length > 20 && (
              <span className="border-2 border-[var(--ink)] bg-white px-2 py-1 text-xs font-black">
                +{city.areaCodes.length - 20} more
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Other Cities (Internal Linking) ──────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">ALSO COVERING</p>
          <h2 className="headline mt-3 text-4xl leading-[0.9] sm:text-5xl">
            CONSTRUCTION LEADS ACROSS THE UK
          </h2>
          <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">
            JobFilter scans planning, EPC, and council data in every major UK city.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/construction-leads/${c.slug}`}
                className="jf-box block bg-[var(--bg-main)] p-6"
                style={{ textDecoration: 'none' }}
              >
                <p className="micro-label text-[var(--muted)]">{c.region.toUpperCase()}</p>
                <h3 className="mt-2 text-2xl font-black text-[var(--navy)]">{c.name}</h3>
                <div className="mt-3 grid gap-1 text-sm font-black text-[var(--muted)]">
                  <p>{c.planningAppsPerWeek} planning apps/week</p>
                  <p>{c.epcFGProperties.toLocaleString()} F/G properties</p>
                  <p>{c.councilContractsActive} council contracts</p>
                </div>
                <p className="mt-4 text-sm font-black text-[var(--navy)]">
                  Scan {c.name} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">START FREE</p>
          <h2 className="headline mt-3 max-w-3xl text-4xl leading-[0.9] sm:text-5xl md:text-6xl text-white">
            SEE WHAT IS LIVE IN {city.name.toUpperCase()} RIGHT NOW.
          </h2>
          <p className="mt-4 max-w-xl text-xl font-black text-white/70">
            Free scan shows the signals. £29/month unlocks full detail, WhatsApp alerts, and unlimited scans. 30-day money-back guarantee.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleScan} className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
              {city.ctaText.toUpperCase()}
            </button>
            <a href="/pricing" className="jf-button bg-white/10 text-white">
              SEE PRICING
            </a>
          </div>
          <div className="mt-6 grid gap-2 text-sm font-black text-white/50 sm:grid-cols-3">
            <p>3 FREE SCANS EVERY WEEK</p>
            <p>NO CARD REQUIRED</p>
            <p>30-DAY MONEY-BACK</p>
          </div>
        </div>
      </section>
    </main>
  );
}
