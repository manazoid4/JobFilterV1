import { useState } from 'react';
import { Link } from 'react-router-dom';

const TRADES = ['Electrical', 'Plumbing', 'Roofing', 'Building', 'HVAC', 'Carpentry'];

const JOBS: Record<string, string[]> = {
  Electrical: ['Consumer unit upgrade', 'EV charger installation', 'Rewire', 'Fault finding', 'New circuit'],
  Plumbing: ['Boiler replacement', 'Bathroom fit', 'Leak repair', 'Cylinder replacement', 'New radiators'],
  Roofing: ['Full re-roof', 'Flat roof', 'Repair and patch', 'Guttering', 'Velux install'],
  Building: ['Extension', 'Kitchen remodel', 'Loft conversion', 'Structural repair', 'New build'],
  HVAC: ['Boiler service', 'Heat pump install', 'Underfloor heating', 'Air con', 'Ventilation'],
  Carpentry: ['Fitted wardrobes', 'Staircase', 'Door hanging', 'Skirting/architrave', 'Kitchen fitting'],
};

const STARTERS: Record<string, Record<string, [string, string]>> = {
  Electrical: {
    'Consumer unit upgrade': ['Thank you for requesting a quotation for your consumer unit upgrade.', 'This proposal covers full replacement of your existing fuseboard with a modern 18th Edition compliant unit, including all circuit labelling and an Electrical Installation Certificate.'],
    'EV charger installation': ['Thank you for enquiring about EV charger installation at your property.', 'This quotation covers supply and installation of a 7kW smart charger, including DNO notification, OZEV compliance, and a dedicated radial circuit from your consumer unit.'],
    'Rewire': ['Thank you for considering us for your full property rewire.', 'This proposal outlines the scope of works, materials, and programme for a complete first-fix and second-fix rewire, including a new consumer unit and full EICR on completion.'],
    'Fault finding': ['Thank you for contacting us regarding an electrical fault at your property.', 'This quotation covers a thorough diagnostic inspection, including test results and a prioritised remedial schedule with fixed-price repair options.'],
    'New circuit': ['Thank you for your enquiry regarding a new dedicated circuit installation.', 'This proposal covers cable runs, isolation provisions, consumer unit amendment, and certification under BS 7671 2018.'],
  },
  Plumbing: {
    'Boiler replacement': ['Thank you for requesting a quotation for your boiler replacement.', 'This proposal covers removal and responsible disposal of your existing unit, supply and fit of a new A-rated condensing boiler, flue, controls, and full commissioning with manufacturer warranty registration.'],
    'Bathroom fit': ['Thank you for your enquiry regarding a full bathroom installation.', 'This quotation covers strip-out, first-fix pipework, tiling, sanitaryware supply and fit, and final decoration prep — all to a fixed price with no hidden extras.'],
    'Leak repair': ['Thank you for contacting us regarding a water leak at your property.', 'This proposal covers trace-and-access, isolation of the affected supply, repair or section replacement, and a post-work pressure test with written confirmation.'],
    'Cylinder replacement': ['Thank you for your enquiry about hot water cylinder replacement.', 'This quotation covers removal of the existing cylinder, supply and installation of a correctly-sized vented or unvented unit, commissioning, and G3 certification where applicable.'],
    'New radiators': ['Thank you for requesting a quotation for new radiator installation.', 'This proposal covers supply and fit of radiators sized to room heat loss calculations, including thermostatic valves, lockshields, and a full system power flush.'],
  },
  Roofing: {
    'Full re-roof': ['Thank you for requesting a quotation for a full roof replacement.', 'This proposal covers strip and responsible disposal of existing coverings, installation of new breathable felt and batten, and supply and lay of matching tiles or natural slates with lead flashings.'],
    'Flat roof': ['Thank you for your enquiry regarding flat roof works.', 'This quotation covers removal of the failed covering, full deck inspection and repair, and installation of a new GRP or EPDM system carrying a 20-year insurance-backed guarantee.'],
    'Repair and patch': ['Thank you for contacting us regarding roof repairs at your property.', 'This proposal covers a full roof inspection from ridge to eaves, targeted tile or slate replacement, and ridge and hip re-bedding and repointing as required.'],
    'Guttering': ['Thank you for your enquiry about guttering replacement.', 'This quotation covers removal of existing gutters and downpipes, supply and fix of new uPVC or cast-iron system to correct falls, and a discharge test on completion.'],
    'Velux install': ['Thank you for requesting a quotation for Velux roof window installation.', 'This proposal covers structural opening, supply and fit of specified Velux units with flashings, and full internal and external weatherproofing to manufacturer specification.'],
  },
  Building: {
    'Extension': ['Thank you for requesting a quotation for a property extension.', 'This proposal covers groundworks, foundations, blockwork cavity walls, structural elements, roof structure, and first-fix trades — subject to planning consent and Building Control approval.'],
    'Kitchen remodel': ['Thank you for your enquiry regarding a kitchen remodel.', 'This quotation covers full strip-out, any structural alterations, first-fix mechanical and electrical, and complete fit-out to your approved specification and material schedule.'],
    'Loft conversion': ['Thank you for requesting a quotation for a loft conversion.', 'This proposal covers structural beam installation, new floor, staircase, dormer or Velux options, insulation to Part L, and boarding — all with Building Control sign-off included.'],
    'Structural repair': ['Thank you for contacting us regarding structural works at your property.', 'This quotation covers investigation, structural engineer co-ordination, underpinning or needling as required, and full reinstatement of finishes.'],
    'New build': ['Thank you for requesting a quotation for your new build project.', 'This proposal outlines our approach to groundworks, superstructure, weathertight shell, and first-fix package, including programme and payment milestones.'],
  },
  HVAC: {
    'Boiler service': ['Thank you for requesting a boiler service quotation.', 'This proposal covers a full manufacturer-approved annual service, gas safety check to Gas Safe standards, and a written report with graded advisory notes.'],
    'Heat pump install': ['Thank you for your enquiry regarding heat pump installation.', 'This quotation covers site survey, MCS-compliant design, supply and installation of an air source heat pump unit, and full BUS grant application support.'],
    'Underfloor heating': ['Thank you for requesting a quotation for underfloor heating.', 'This proposal covers manifold installation, pipe layout designed to CIBSE heat loss calculations, screed or overlay specification, and full flow and return commissioning.'],
    'Air con': ['Thank you for your enquiry about air conditioning installation.', 'This quotation covers F-Gas compliant supply and installation of a split or multi-split system, including full electrical connection and commissioning to manufacturer specification.'],
    'Ventilation': ['Thank you for requesting a quotation for mechanical ventilation.', 'This proposal covers MVHR or MEV system design, ductwork layout and installation, and air flow commissioning to Building Regulations Part F.'],
  },
  Carpentry: {
    'Fitted wardrobes': ['Thank you for requesting a quotation for fitted wardrobe installation.', 'This proposal covers full site survey, bespoke carcass and door manufacture, delivery, and installation with all scribing and shadow gaps to a furniture-grade finish.'],
    'Staircase': ['Thank you for your enquiry regarding staircase works.', 'This quotation covers removal of the existing staircase, supply and installation of a new stair to Building Regulations Part K, including balustrade and handrail fixing.'],
    'Door hanging': ['Thank you for requesting a quotation for internal door hanging.', 'This proposal covers supply of FD30 or standard doors, cutting to size, fitting of frames, architrave, and all ironmongery to a consistent standard throughout.'],
    'Skirting/architrave': ['Thank you for your enquiry about skirting and architrave.', 'This quotation covers strip-out of existing timbers, supply and fix of matching or new profile, all internal mitres, and full preparation for decoration.'],
    'Kitchen fitting': ['Thank you for requesting a quotation for kitchen installation.', 'This proposal covers delivery, assembly, and installation of your kitchen units, worktop cutting and jointing, appliance fitting, and plinth and cornice finishing.'],
  },
};

export function SmartQuotePage() {
  const [trade, setTrade] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);

  const preview = trade && job ? STARTERS[trade]?.[job] : null;

  return (
    <main>
      <section className="bg-[var(--navy)] text-white section-pad">
        <div className="page-shell">
          <p className="micro-label text-[var(--yellow)]">SMART QUOTING</p>
          <h1 className="headline mt-4 text-5xl md:text-6xl text-white">QUOTE FASTER. WIN MORE.</h1>
          <p className="mt-5 max-w-xl text-lg font-black text-white/80">
            Pick your trade and job type. Get a professional quote opener — ready to send in 30 seconds. No blank page. No guessing what to say first.
          </p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <p className="field-label mb-4">SELECT YOUR TRADE</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRADES.map((t) => (
              <button
                key={t}
                onClick={() => { setTrade(t); setJob(null); }}
                className={`jf-box p-4 text-left font-bold text-sm transition-all ${
                  trade === t
                    ? 'border-[var(--yellow)] bg-[var(--yellow)] text-[var(--ink)]'
                    : 'hover:border-[var(--yellow)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {trade && (
        <section className="section-pad pt-0">
          <div className="page-shell">
            <p className="field-label mb-4">SELECT JOB TYPE</p>
            <div className="flex flex-wrap gap-3">
              {JOBS[trade].map((j) => (
                <button
                  key={j}
                  onClick={() => setJob(j)}
                  className={`jf-box px-4 py-2 text-sm font-semibold transition-all ${
                    job === j
                      ? 'border-[var(--yellow)] bg-[var(--yellow)] text-[var(--ink)]'
                      : 'hover:border-[var(--yellow)]'
                  }`}
                >
                  {j}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {preview && (
        <section className="section-pad pt-0">
          <div className="page-shell">
            <p className="field-label mb-4">QUOTE STARTER PREVIEW</p>
            <div className="jf-box p-6 max-w-2xl">
              <p className="micro-label text-[var(--navy)] mb-3">{trade} — {job}</p>
              <p className="font-semibold text-[var(--ink)] mb-2">{preview[0]}</p>
              <p className="text-[var(--muted)] mb-6">{preview[1]}</p>
              <div className="relative rounded overflow-hidden">
                <div className="blur-sm select-none pointer-events-none text-sm text-[var(--muted)] space-y-2 p-4 bg-[var(--bg-main)]">
                  <p>The scope of works includes all labour, materials, and certification as detailed below. All pricing is inclusive of VAT at 20% unless otherwise stated.</p>
                  <p>SECTION 1 — SCOPE OF WORKS: All work carried out to current British Standards and relevant Building Regulations. Programme agreed prior to commencement.</p>
                  <p>SECTION 2 — PRICING SCHEDULE: [Itemised line-by-line breakdown with material and labour split per phase]</p>
                  <p>SECTION 3 — TERMS AND PAYMENT: [Stage payment schedule, retention, and variation clause]</p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-sm">
                  <p className="badge mb-3">FOUNDER ACCESS</p>
                  <Link to="/pricing" className="jf-button text-sm px-5 py-2">
                    UNLOCK FULL STARTER — FROM £39/mo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-pad border-t border-[var(--line)]">
        <div className="page-shell flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-semibold text-[var(--ink)]">Estimate the floor price first before you commit to a number.</p>
          <Link
            to="/free-tools"
            className="jf-button text-sm px-5 py-2 !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors"
          >
            OPEN QUOTE FLOOR TOOL
          </Link>
        </div>
      </section>

      {/* ── Conversion CTA: Intake Engine ─────────── */}
      <section className="section-pad border-t border-[var(--line)]">
        <div className="page-shell">
          <div className="jf-box bg-[var(--navy)] p-6 text-white">
            <p className="micro-label text-[var(--yellow)]">WANT LEADS WORTH QUOTING ON?</p>
            <h2 className="headline mt-2 text-3xl leading-none text-[var(--yellow)]">SCAN YOUR AREA FREE.</h2>
            <p className="mt-3 max-w-xl font-black text-white/90">
              Smart Quote writes the proposal. Intake finds the jobs worth proposing on. REAL LEADS. Scored by budget, urgency, and distance. Sent to your WhatsApp. No chasing. No competing.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN MY AREA FREE →</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
            </div>
            <p className="mt-3 text-xs font-black text-white/60">No credit card required.</p>
          </div>
        </div>
      </section>

      {/* ── Cross-Tool Navigation ─────────────────── */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--muted)]">TRY ANOTHER FREE TOOL</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/free-tools">
                ALL FREE TOOLS
              </Link>
              <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/tips">
                TRADE TIPS
              </Link>
              <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/vantage">
                VANTAGE — BID DECKS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
