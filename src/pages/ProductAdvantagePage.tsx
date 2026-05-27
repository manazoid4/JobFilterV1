"use client";
import { useState } from 'react';

const content = {
  // ── TIER 2: NATURAL EXTENSION ADD-ONS ──────────────────────────────────────

  'dno-brief': {
    title: 'DNO BRIEF',
    hero: 'bg-[var(--yellow)] text-[var(--ink)]',
    label: 'text-[var(--ink)]',
    headline: 'GRID CONNECTION PAPERWORK. DONE IN HOURS.',
    sub: 'Submit your solar or EV installation details. Our team produces a pre-filled DNO application pack for your Distribution Network Operator — ready to send.',
    body: 'DNO applications hold up solar and EV installations by days or weeks when they\'re done badly. Ours are done right the first time — correct technical specs, correct forms, correct supporting evidence.',
    note: 'Our team works with all 14 UK DNOs: SSEN, UKPN, Western Power, SP Energy Networks, and more.',
    distinct: 'DNO Brief removes the grid paperwork bottleneck. Submit the job, get the pack.',
    problem: 'A rejected DNO application delays your whole job by 3-6 weeks. Most rejections are avoidable paperwork errors.',
    steps: ['Submit install details (PV size, inverter, property type)', 'Team produces correct G98/G99 application for your DNO area', 'Pre-filled pack delivered within 8 hours — ready to submit'],
    gets: ['G98 or G99 application form (pre-filled)', 'Single-line diagram template', 'Technical summary for DNO review', 'DNO contact details for your area', 'Submission checklist'],
  },

  'ozev-grant-pack': {
    title: 'OZEV GRANT PACK',
    hero: 'bg-[var(--ink)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'CLOSE MORE EV JOBS WITH THE GRANT PAPERWORK SORTED.',
    sub: 'EV customers ask about grants. Most installers can\'t answer properly. Submit the customer details — we produce the full OZEV eligibility check and grant application guidance pack.',
    body: 'The EV Chargepoint Grant and Workplace Charging Scheme stop deals when customers can\'t navigate the application. Ozev Grant Pack closes that gap — you look professional, customer gets their grant, job proceeds.',
    note: 'Covers residential (EV Chargepoint Grant), workplace (WCS), and landlord schemes.',
    distinct: 'Grant Pack closes the customer hesitation gap. Turn "I need to look into the grant first" into a signed job.',
    problem: 'Grant confusion loses EV charger jobs every week. Customers go cold while they try to figure out eligibility — and call a different installer.',
    steps: ['Submit customer details (property type, vehicle, employer status)', 'We produce grant eligibility summary + application guide', 'Customer-ready PDF delivered within 4 hours'],
    gets: ['Grant eligibility summary for your customer', 'Step-by-step application guide (OZEV portal)', 'Workplace Charging Scheme brief (if applicable)', 'Landlord consent letter template', 'Installer compliance checklist'],
  },

  'gas-safe-kit': {
    title: 'GAS SAFE KIT',
    hero: 'bg-[var(--navy)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'EVERY GAS JOB. RIGHT PAPERWORK. EVERY TIME.',
    sub: 'Gas Safe compliance documents ready for any job type — boiler installs, service records, warning notices, RIDDOR reports. Submit the job, get the correct forms back.',
    body: 'Gas Safe paperwork done wrong exposes you to enforcement, insurance voids, and liability. Our kit covers every document type for every common gas job — correct, branded, and ready to hand over.',
    note: 'All documents are compliant with Gas Safe Register requirements and current Gas Industry Unsafe Situations Procedure (GIUSP).',
    distinct: 'Gas Safe Kit removes compliance risk from every job. No more searching for the right form.',
    steps: ['Tell us the job type (boiler install, service, warning notice, etc.)', 'Team produces the correct documentation set', 'Completed documents delivered within 3 hours'],
    gets: ['CP12 Landlord Gas Safety Record (if applicable)', 'Boiler installation completion certificate', 'Warning notice (At Risk / Immediately Dangerous)', 'RIDDOR report template (if applicable)', 'Service record template with your branding'],
  },

  'swmp-template': {
    title: 'SWMP TEMPLATE',
    hero: 'bg-[var(--yellow)] text-[var(--ink)]',
    label: 'text-[var(--ink)]',
    headline: 'SITE WASTE MANAGEMENT PLAN. BUILT FOR YOUR JOB.',
    sub: 'Submit your groundworks project details. We produce a compliant Site Waste Management Plan ready for planning conditions, procurement requirements, or client handover.',
    body: 'SWMPs are required on most commercial groundworks and larger residential projects — but most groundworkers either skip them or produce something that fails. Ours are built to the Environment Agency\'s requirements.',
    note: 'Produced to Environment Agency SWMP best practice guidance and Construction (Design and Management) Regulations 2015.',
    distinct: 'SWMP Template removes the compliance paperwork from groundworks jobs that need it. Submit the job, get the plan.',
    steps: ['Submit project details (site, scope, estimated waste volumes)', 'Team builds the SWMP to EA requirements', 'Completed SWMP delivered within 6 hours'],
    gets: ['Compliant SWMP document', 'Waste type and volume estimates', 'Approved contractor and disposal route section', 'Monitoring and reporting log template', 'Planning condition sign-off letter template'],
  },

  'om-builder': {
    title: 'O&M BUILDER',
    hero: 'bg-[var(--ink)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'O&M MANUALS THAT CLIENTS ACTUALLY ACCEPT.',
    sub: 'Submit your HVAC installation details. Our team produces a complete Operations & Maintenance manual — formatted correctly, covering all installed plant, ready for client handover or building log.',
    body: 'O&M manuals rejected at handover hold up your final payment. Facilities managers and building owners reject vague or incomplete documentation. Ours cover every installed item correctly.',
    note: 'Produced to BSRIA BG 1/2009 O&M manual guidance and CIBSE commissioning standards.',
    distinct: 'O&M Builder removes the documentation bottleneck on commercial HVAC jobs. Submit install, get manual.',
    problem: 'A rejected O&M manual at handover can hold your retention for months. Most are rejected because they\'re incomplete.',
    steps: ['Submit installed plant list and site details', 'Team builds the O&M manual to BSRIA BG 1 standard', 'Complete manual delivered within 24 hours'],
    gets: ['O&M manual (BSRIA BG 1 format)', 'Plant schedule with model numbers and serial numbers', 'Maintenance schedule with intervals', 'Spare parts and contact list', 'Commissioning certificate template'],
  },

  // ── TIER 3: PROFESSIONAL TRADE ADD-ONS ─────────────────────────────────────

  'calc-pack': {
    title: 'CALC PACK',
    hero: 'bg-[var(--yellow)] text-[var(--ink)]',
    label: 'text-[var(--ink)]',
    headline: 'STRUCTURAL NOTES TURNED AROUND IN 6 HOURS.',
    sub: 'Submit the job brief. Our structural specialists produce the calculation notes, beam specifications, and scope letter — ready for building control submission.',
    body: 'Homeowners need structural calcs for loft conversions, extensions, knocked walls, and basement work. Most engineers spend hours on admin for straightforward residential jobs. Calc Pack handles the paperwork for standard project types.',
    note: 'Produced by chartered structural engineers. Suitable for standard residential projects — lofts, extensions, beam specs, party wall sections.',
    distinct: 'Calc Pack turns standard residential calcs admin into a 5-minute submit. Complex or non-standard projects are quoted separately.',
    problem: 'Structural engineers charge £600-£1,800 per residential commission but spend 40% of that time on admin and templates rather than engineering.',
    steps: ['Submit project details (drawings, dimensions, load requirements)', 'Our structural team produces the calc notes and specification', 'Complete pack delivered within 6 hours'],
    gets: ['Structural calculation notes', 'Beam specification and sizing', 'Scope of works + limitations letter', 'Building control submission-ready format', 'PI insurance scope statement'],
  },

  'fra-template': {
    title: 'FRA TEMPLATE',
    hero: 'bg-[var(--orange)] text-white',
    label: 'text-white',
    headline: 'FIRE RISK ASSESSMENTS BUILT FOR THE JOB.',
    sub: 'Submit the property details. Our fire safety team produces a PAS 79-compliant Fire Risk Assessment — ready for the Responsible Person, the client, or the local fire authority.',
    body: 'FRAs done wrong create enforcement risk for you and the client. A Responsible Person who signs off on a weak FRA faces unlimited liability. Ours are done to PAS 79:2020 — the accepted standard for Type 1-4 assessments.',
    note: 'Produced by fire safety professionals with BS 9999 and PAS 9980 knowledge. Covers residential (including HMOs), commercial, and care sector premises.',
    distinct: 'FRA Template produces compliant assessments fast. Critical after the Building Safety Act 2022 raised enforcement stakes.',
    problem: 'The Building Safety Act 2022 made FRA liability personal for Responsible Persons. A weak FRA now exposes your client — and you — to criminal enforcement.',
    steps: ['Submit property details (type, floors, occupancy, known hazards)', 'Our fire safety team produces the PAS 79-compliant FRA', 'Assessment delivered within 12 hours'],
    gets: ['PAS 79:2020-compliant Fire Risk Assessment', 'Responsible Person appointment letter', 'Action plan with priority ratings', 'Evacuation plan framework', 'Annual review schedule'],
  },

  'acm-report-pack': {
    title: 'ACM REPORT PACK',
    hero: 'bg-[var(--navy)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'ASBESTOS DOCUMENTATION DONE RIGHT.',
    sub: 'Submit the survey or removal job details. Our team produces the management survey, R&D specification, duty holder letters, and waste consignment notes — HSE-compliant.',
    body: 'Asbestos documentation errors create enforcement liability under CAR 2012. Duty holders who receive inadequate documentation face HSE prosecution. Ours are produced to HSE guidance L143 and the Analysts\' Guide.',
    note: 'Produced in line with HSE L143 (Managing and Working with Asbestos), CAR 2012, and the Analysts\' Guide (3rd edition).',
    distinct: 'ACM Report Pack removes the compliance documentation bottleneck from every asbestos job.',
    problem: 'Incorrect asbestos waste documentation is the number one cause of Environment Agency enforcement action against removal contractors.',
    steps: ['Submit job details (property age, survey findings, removal scope)', 'Our team produces the correct documentation set', 'Complete pack delivered within 8 hours'],
    gets: ['Management survey report (HSE L143 format)', 'R&D specification for removal', 'Duty holder notification letter', 'Waste consignment note (CAR 2012)', 'Clearance certificate template'],
  },

  'nasc-pack': {
    title: 'NASC PACK',
    hero: 'bg-[var(--yellow)] text-[var(--ink)]',
    label: 'text-[var(--ink)]',
    headline: 'SCAFFOLD HANDOVER DONE RIGHT. EVERY JOB.',
    sub: 'Submit the scaffold details. Our team produces the TG20-compliant handover certificate, inspection register, and NASC documentation — ready for client sign-off.',
    body: 'Scaffold handover documentation done wrong leaves you liable for every access incident after erection. TG20:21 compliance is the legal and industry standard — our pack covers it completely.',
    note: 'All documentation produced to NASC TG20:21 compliance requirements and PASMA/CISRS standards.',
    distinct: 'NASC Pack removes the handover paperwork from every scaffold erection. Submit the job, sign off correctly.',
    problem: 'Scaffold-related injury claims almost always hinge on whether the handover certificate was completed correctly. A missing document is the difference between a defended claim and a settled one.',
    steps: ['Submit scaffold details (type, height, load class, address)', 'Team produces TG20:21 handover cert and inspection register', 'Complete pack delivered within 4 hours'],
    gets: ['TG20:21 scaffold handover certificate', 'Weekly inspection register (SG4:22 format)', 'Loading bay and access notation', 'Client sign-off confirmation page', 'Dismantling notification template'],
  },

  // ── TIER 4: INFRASTRUCTURE TRADE ADD-ONS ────────────────────────────────────

  'wayleave-pack': {
    title: 'WAYLEAVE PACK',
    hero: 'bg-[var(--ink)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'WAYLEAVE AGREEMENTS THAT ACTUALLY GET SIGNED.',
    sub: 'Submit the install address and property type. Our team produces a complete wayleave and permission pack — drafted for the property owner, freeholder, or landlord, ready to sign.',
    body: 'Unsigned wayleave agreements stall FTTP installs for weeks. Property owners won\'t sign documents they don\'t understand. Ours are written in plain English, explain the rights clearly, and include a covering letter that gets responses.',
    note: 'Covers standard residential wayleave, multi-occupancy/MDU installations, and commercial/freeholder consent.',
    distinct: 'Wayleave Pack removes the permission bottleneck from FTTP installs. Submit the address, get the signed agreement faster.',
    problem: 'The average stalled FTTP install costs an alt-net £180-£400 in wasted site visits and delayed revenue. Most stalls start with an unsigned wayleave.',
    steps: ['Submit property type, address, and freeholder/owner details', 'Team produces the correct wayleave pack for that property type', 'Signed-ready documents delivered within 6 hours'],
    gets: ['Wayleave agreement (plain English, correctly drafted)', 'Covering letter for property owner or freeholder', 'Rights of access explanation document', 'MDU/managed property consent form (if applicable)', 'Escalation template for non-responding owners'],
  },

  'cctv-compliance-pack': {
    title: 'CCTV COMPLIANCE PACK',
    hero: 'bg-[var(--navy)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'CCTV INSTALLED RIGHT. GDPR DOCUMENTED CORRECTLY.',
    sub: 'Submit the installation details. Our team produces the Data Protection Impact Assessment, privacy notice, and signage spec — UK GDPR-compliant and ready for client handover.',
    body: 'CCTV systems that capture public space or monitor staff require a DPIA under UK GDPR. Clients who skip it face ICO enforcement. Installers who don\'t flag it get blamed. Our pack covers it completely.',
    note: 'Produced to ICO CCTV Code of Practice and UK GDPR Article 35 DPIA requirements.',
    distinct: 'CCTV Compliance Pack protects your clients from ICO enforcement and protects you from liability claims after install.',
    problem: 'ICO fines for CCTV systems without a DPIA start at £1,000 for small businesses. Most commercial clients don\'t know they need one — and don\'t thank the installer who didn\'t tell them.',
    steps: ['Submit system details (cameras, location types, footage retention)', 'Team produces DPIA and privacy documentation', 'Complete compliance pack delivered within 8 hours'],
    gets: ['Data Protection Impact Assessment (DPIA)', 'Privacy notice for display at premises', 'Data retention and access policy', 'Signage specification (ICO-compliant)', 'Legitimate interest assessment template'],
  },

  // ── EXISTING ADD-ONS ─────────────────────────────────────────────────────────
  vantage: {
    title: 'VANTAGE',
    hero: 'bg-[var(--navy)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'LOOK LIKE THE FIRM THAT WINS.',
    sub: 'Submit your job. Our team builds the bid pack. You send it. Done.',
    body: 'Good tradesmen lose big jobs because their paperwork looks weak. Vantage fixes that without you touching a design tool.',
    note: 'Our team includes professional designers, bid writers, and trade specialists.',
    distinct: 'Vantage wins NEW jobs. Forward-looking.',
    steps: ['Fill the job form (5 mins)', 'Team of designers + bid writers build your pack', 'Full bid pack delivered within 6 hours'],
    gets: ['Professional bid deck', 'Company letterhead', 'Scope of works document', 'Proof and compliance points', 'Print-ready PDF'],
  },
  vicinity: {
    title: 'VICINITY',
    hero: 'bg-[var(--yellow)] text-[var(--ink)]',
    label: 'text-[var(--ink)]',
    headline: 'PUT YOUR NAME ON EVERY DOOR IN YOUR PATCH.',
    sub: 'Hyper-local ads targeting households that need your work right now — based on verified job signals, property sales, and planning approvals.',
    body: 'You know your patch. Vicinity puts your brand in the right doors before they post on Bark or Checkatrade. No blanket drops. Just the houses already showing a live signal.',
    note: 'Powered by JobFilter\'s signal engine — we know which homes need work before they post a job.',
    distinct: 'Vicinity fills your pipeline between big jobs. Targeted, cheap as chips, no shared auction.',
    problem: 'Every blanket leaflet drop wastes 90% of your budget on houses that don\'t need your trade this year. Vicinity skips those entirely.',
    steps: ['Tell us your patch (postcode + radius)', 'We target homes with active job signals (low energy ratings, recent sales, planning approvals)', 'Your ad lands in the right letterboxes — not the bin'],
    gets: ['Targeted door-drop campaign', 'Signal-matched household list', 'Custom trade-branded leaflet design', 'Delivery tracking report', 'Follow-up lead alerts from targeted area'],
  },
  codex: {
    title: 'CODEX',
    hero: 'bg-[var(--ink)] text-white',
    label: 'text-[var(--yellow)]',
    headline: 'TURN BORING MANUALS INTO QUOTES THAT WIN.',
    sub: 'Send us a product manual, technical schematic, or installation spec. Our team turns it into a plain-English sales sheet a homeowner or facilities manager can actually read.',
    body: 'Manufacturers write for engineers. Homeowners and procurement teams buy from people who can explain it without 40 pages of jargon. Codex rewrites the dense stuff into one-pagers that close.',
    note: 'Our team includes technical writers and trade specialists who have read more boiler manuals than anyone should.',
    distinct: 'Codex turns specs into sales. Backward-looking — pulls clarity out of paperwork you already own.',
    problem: 'You quote against firms with proper one-pagers and product comparisons. They look prepared. You look like a quote from a phone.',
    steps: ['Upload the manual, datasheet, or schematic', 'Team rewrites it into a sales-ready explainer', 'Branded PDF + WhatsApp-ready version delivered within 24 hours'],
    gets: ['Plain-English product sheet', 'Comparison table vs alternatives', 'Branded one-pager (PDF)', 'WhatsApp-ready short version', 'Customer-objection answers'],
  },
};

export type ProductType = keyof typeof content;

export function ProductAdvantagePage({ type }: { type: ProductType }) {
  const page = content[type];

  return (
    <main className="page-shell grid gap-6 py-8 pb-8">
      <section className={`jf-box p-8 md:p-10 ${page.hero}`}>
        <p className={`micro-label ${page.label}`}>{page.title}</p>
        <h1 className="headline mt-4 max-w-5xl text-5xl leading-none md:text-7xl">{page.headline}</h1>
        <p className="mt-5 max-w-2xl text-xl font-black opacity-80">{page.sub}</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          <article className="jf-box bg-white p-6">
            <p className="micro-label text-[var(--orange)]">HUMAN-STAFFED SERVICE</p>
            <h2 className="headline mt-3 text-4xl leading-none">{page.distinct}</h2>
            <p className="mt-4 text-lg font-black text-[var(--muted)]">{page.body}</p>
            <p className="mt-4 border-t-2 border-[var(--line)] pt-4 font-black text-[var(--ink)]">{page.note}</p>
            {'problem' in page && <p className="mt-4 font-black text-[var(--orange)]">{page.problem}</p>}
          </article>

          <section className="grid gap-4 md:grid-cols-3">
            {page.steps.map((step, index) => (
              <article key={step} className="jf-box bg-[var(--yellow)] p-5">
                <p className="micro-label text-[var(--ink)]">STEP {index + 1}</p>
                <h3 className="mt-3 text-xl font-black leading-tight">{step}</h3>
              </article>
            ))}
          </section>

          <section className="jf-box bg-white p-6">
            <p className="micro-label text-[var(--orange)]">WHAT YOU GET</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {page.gets.map((item) => (
                <div key={item} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 font-black">
                  ✓ {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <ServiceForm trade={page.title} />
      </section>
    </main>
  );
}

function ServiceForm({ trade }: { trade: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  if (submitted) return (
    <div className="jf-box bg-[var(--yellow)] p-6">
      <p className="micro-label text-[var(--ink)]">REQUEST RECEIVED</p>
      <h2 className="headline mt-3 text-4xl">Team responds within 6 hours.</h2>
      <p className="mt-3 font-black text-[var(--ink)]">Usually much faster. Check your phone.</p>
    </div>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          trade: fd.get('company'),
          contact: fd.get('contact'),
          details: fd.get('details'),
          source: `service-form-${trade.toLowerCase().replace(/\s+/g, '-')}`,
        }),
      });
      if (!res.ok) throw new Error('Submit failed');
      setSubmitted(true);
    } catch {
      setError('Could not send — please call or email us directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid gap-4">
      <form className="jf-box bg-white p-6 grid gap-4" onSubmit={handleSubmit}>
        <p className="micro-label text-[var(--orange)]">SUBMIT TO TEAM</p>
        <input name="name" className="field-input" placeholder="Your name" required />
        <input name="company" className="field-input" placeholder="Company / organisation" defaultValue={trade} required />
        <input name="contact" className="field-input" placeholder="Email or phone" required />
        <textarea name="details" className="field-input min-h-[100px]" placeholder="Job details — what do you need help with?" />
        <fieldset className="grid gap-2">
          <legend className="micro-label text-[var(--muted)]">HOW URGENT?</legend>
          {['Today', 'This week', 'Planning ahead'].map(opt => (
            <label key={opt} className="flex items-center gap-3 font-black cursor-pointer">
              <input type="radio" name="urgency" value={opt} defaultChecked={opt === 'This week'} />
              {opt}
            </label>
          ))}
        </fieldset>
        {error && <p className="text-sm font-black text-[var(--orange)]">{error}</p>}
        <button type="submit" disabled={sending} className="jf-button bg-[var(--yellow)] text-[var(--ink)] disabled:opacity-50">
          {sending ? 'SENDING...' : 'SUBMIT TO TEAM'}
        </button>
        <p className="text-sm font-black text-[var(--muted)]">Team responds within 6 hours. Usually much faster.</p>
      </form>
    </div>
  );
}


