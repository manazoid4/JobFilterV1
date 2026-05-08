import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';
import { EpcSignalCard } from '../components/EpcSignalCard';

const ratings = [
  { grade: 'A-C', status: 'Compliant', desc: 'No action required. Lower urgency.' },
  { grade: 'D-E', status: 'Borderline', desc: 'Improvement likely. Not forced yet.' },
  { grade: 'F-G', status: 'Illegal to Rent', desc: 'Must retrofit. Guaranteed work trigger.', urgent: true },
];

const trades = [
  {
    trade: 'Electricians',
    signals: ['EICR remedials', 'Rewires', 'EV chargers', 'Consumer unit upgrades'],
    icon: '⚡',
  },
  {
    trade: 'Plumbers',
    signals: ['Boiler replacements', 'Heating controls', 'Cylinder upgrades', 'Underfloor heating'],
    icon: '🔧',
  },
  {
    trade: 'HVAC',
    signals: ['Heat pumps', 'MVHR systems', 'Ventilation', 'Commercial efficiency'],
    icon: '❄️',
  },
  {
    trade: 'Builders',
    signals: ['Cavity wall insulation', 'Solid wall insulation', 'Loft upgrades', 'Retrofit works'],
    icon: '🏗️',
  },
  {
    trade: 'Roofers',
    signals: ['Roof insulation', 'Solar prep', 'Flat roof insulation', 'Weatherproofing'],
    icon: '🏠',
  },
];

const sampleSignals = [
  {
    address: '42 Victoria Road, Birmingham B12',
    rating: 'F',
    potentialRating: 'C',
    trade: 'Plumbing',
    signal: 'Boiler replacement required',
    score: 87,
    urgency: 'high',
  },
  {
    address: '18 Oak Lane, Solihull B91',
    rating: 'G',
    potentialRating: 'B',
    trade: 'HVAC',
    signal: 'Heat pump install recommended',
    score: 92,
    urgency: 'high',
  },
  {
    address: '7 Church Street, Walsall WS1',
    rating: 'F',
    potentialRating: 'D',
    trade: 'Electrical',
    signal: 'EICR remedial + rewire needed',
    score: 78,
    urgency: 'medium',
  },
];

export function EpcPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-8">
      {/* HERO */}
      <section className="jf-box bg-[var(--navy)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">EPC SIGNAL ENGINE</p>
        <h1 className="headline mt-3 max-w-5xl text-3xl leading-none sm:text-5xl text-[var(--yellow)] md:text-7xl">
          PROPERTIES THAT CAN'T BE RENTED WITHOUT YOUR WORK.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
          1.2 million UK rentals are legally forced to upgrade. JobFilter finds them before they post anywhere. First trade to call wins.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
            SCAN MY AREA FREE
          </Link>
          <a
            className="jf-button border-2 border-white text-white"
            href="https://www.legislation.gov.uk/uksi/2025/495"
            target="_blank"
            rel="noreferrer"
          >
            SEE THE LAW
          </a>
        </div>
      </section>

      {/* URGENCY BAR */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { num: '1.2M', label: 'UK rentals below E rating' },
          { num: '£5,000+', label: 'Fines for non-compliance' },
          { num: '£15BN', label: 'Warm Homes Plan funding' },
        ].map(({ num, label }) => (
          <article key={label} className="jf-box bg-[var(--yellow)] p-5 text-center">
            <p className="headline text-4xl sm:text-5xl">{num}</p>
            <p className="mt-2 font-black text-[var(--ink)]/75">{label}</p>
          </article>
        ))}
      </section>

      {/* THE LAW */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">THE LAW</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">MEES REGULATIONS. NOT OPTIONAL.</h2>
        <p className="mt-4 max-w-3xl text-lg font-black text-[var(--muted)]">
          From 2025, landlords cannot legally let properties rated F or G. They must upgrade to at least an E rating or face fines of £5,000+. The £15bn Warm Homes Plan means funding is available — and landlords are looking for tradesmen who can do the work.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {ratings.map(({ grade, status, desc, urgent }) => (
            <article
              key={grade}
              className={`border-2 p-4 ${
                urgent
                  ? 'border-[var(--orange)] bg-[var(--orange)]/10'
                  : 'border-[var(--line)] bg-[var(--bg-main)]'
              }`}
            >
              <p className="micro-label text-[var(--orange)]">{grade}</p>
              <h3 className="headline mt-2 text-2xl">{status}</h3>
              <p className="mt-2 font-black text-[var(--muted)]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">HOW IT WORKS</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl text-[var(--yellow)]">
          SCAN. MATCH. DELIVER.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { step: '01', title: 'SCAN', body: 'Enter your postcode. We scan every F/G rated property in your area.' },
            { step: '02', title: 'MATCH', body: 'Signals filtered to your trade. Electricians see electrical work. Plumbers see boilers.' },
            { step: '03', title: 'SCORE', body: 'Each property scored GOLD, SILVER, or BIN. Gold fires to WhatsApp instantly.' },
            { step: '04', title: 'DELIVER', body: 'Get the address, the problem, and the owner signal. First to call wins.' },
          ].map(({ step, title, body }) => (
            <article key={step} className="border-2 border-white/20 p-4">
              <p className="headline text-4xl text-[var(--yellow)]">{step}</p>
              <h3 className="headline mt-2 text-xl">{title}</h3>
              <p className="mt-2 font-black text-white/60">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TRADE SIGNALS */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">TRADE-SPECIFIC SIGNALS</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">YOUR TRADE. YOUR SIGNALS. NO NOISE.</h2>
        <p className="mt-4 max-w-3xl text-lg font-black text-[var(--muted)]">
          "Rating F" means different things to different trades. We filter the noise so you only see work you can actually do.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {trades.map(({ trade, signals, icon }) => (
            <article key={trade} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <p className="text-2xl">{icon}</p>
              <h3 className="headline mt-2 text-xl">{trade}</h3>
              <ul className="mt-3 grid gap-1">
                {signals.map((s) => (
                  <li key={s} className="text-sm font-black text-[var(--muted)]">
                    → {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* SAMPLE SIGNALS */}
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">LIVE SIGNALS PREVIEW</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl text-[var(--yellow)]">
          THIS IS WHAT YOU GET.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-black text-white/60">
          Real properties. Real problems. Real deadlines. No job boards. No competition.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {sampleSignals.map((s) => (
            <EpcSignalCard key={s.address} {...s} />
          ))}
        </div>
      </section>

      {/* LETTER SERVICE */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">LETTERHEAD PACK</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">WE KNOCK FIRST. YOU CLOSE.</h2>
        <p className="mt-5 max-w-3xl text-xl font-black text-[var(--ink)]/75">
          JobFilter sends a professional introductory letter to F/G property owners on your behalf. Your details. Your trade. Before five other tradesmen are fighting for the same job.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            'Printed on headed paper',
            'Posted to the property address',
            'Your details and trade specialisation',
            'WhatsApp-ready PDF copy included',
          ].map((feature) => (
            <div key={feature} className="border-2 border-[var(--ink)] bg-white p-3 font-black">
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* VICINITY */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">VICINITY</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">HYPER-LOCAL EPC ADS.</h2>
        <p className="mt-5 max-w-3xl text-xl font-black text-[var(--muted)]">
          Run targeted ads to every F/G rated property owner in your postcode. Vicinity handles the design and placement — you take the calls.
        </p>
        <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" to="/vicinity">
          OPEN VICINITY
        </Link>
      </section>

      {/* PRICING */}
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="jf-box bg-white p-6">
          <p className="micro-label text-[var(--orange)]">STANDALONE</p>
          <h2 className="headline mt-3 text-4xl">EPC SIGNAL ENGINE</h2>
          <p className="headline mt-2 text-5xl text-[var(--yellow)]">£19<span className="text-lg text-[var(--muted)]">/mo</span></p>
          <ul className="mt-5 grid gap-2">
            {[
              'Unlimited EPC scans',
              'F/G rated property alerts',
              'WhatsApp delivery',
              'Trade-specific matching',
              '10 intro letters/month',
              'Property address + owner signal',
              'No contracts',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 font-black text-[var(--muted)]">
                <span className="text-[var(--green)]">✓</span> {f}
              </li>
            ))}
          </ul>
          <Link className="jf-button mt-6 w-full bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">
            GET EPC SIGNALS
          </Link>
        </article>

        <article className="jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">BUNDLE — BEST VALUE</p>
          <h2 className="headline mt-3 text-4xl">JOBFILTER PRO</h2>
          <p className="headline mt-2 text-5xl text-[var(--yellow)]">£49<span className="text-lg text-white/60">/mo</span></p>
          <p className="mt-3 font-black text-white/60">EPC Signal Engine included. Plus everything else.</p>
          <ul className="mt-5 grid gap-2">
            {[
              'Everything in EPC Signal Engine',
              'All 5 signal sources',
              'Planning + contracts + EPC + more',
              'Vantage dashboard',
              'Codex proposal builder',
              'Vicinity ad campaigns',
              'Unlimited intro letters',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 font-black text-white/70">
                <span className="text-[var(--green)]">✓</span> {f}
              </li>
            ))}
          </ul>
          <Link className="jf-button mt-6 w-full bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">
            GET PRO — EPC INCLUDED
          </Link>
        </article>
      </section>

      {/* CTA */}
      <section className="grid gap-5 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">ENTER THE INTAKE</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl text-[var(--yellow)]">
            FIND THE RETROFIT WORK FIRST.
          </h2>
          <p className="mt-4 max-w-xl text-lg font-black text-white/75">
            Scan your area free. See the F/G properties. Get a feel for the signal. When you're ready, upgrade and get them on WhatsApp.
          </p>
          <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
            SCAN MY AREA FREE
          </Link>
        </div>
        <WaitlistForm source="epc-leads" />
      </section>
    </main>
  );
}
