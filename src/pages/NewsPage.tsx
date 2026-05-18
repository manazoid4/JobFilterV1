import { Link } from 'react-router-dom';

type TradeSignal = {
  title: string;
  tradeAffected: string;
  moneyAngle: string;
  actionThisWeek: string;
};

const tradeSignals: TradeSignal[] = [
  {
    title: 'Small builders are still fighting tight margins and weak enquiries.',
    tradeAffected: 'Small builders, extension firms, refurb crews, and domestic trades.',
    moneyAngle: 'When margins are tight, one bad enquiry can eat the week. Quote discipline matters more than lead volume.',
    actionThisWeek: 'Only chase jobs with a clear scope, real budget signal, and a customer who can make a decision.',
  },
  {
    title: 'A full diary can still be a weak pipeline.',
    tradeAffected: 'All trades dealing with labour pressure, late payments, and squeezed programmes.',
    moneyAngle: 'Busy does not mean profitable. The wrong work fills the diary and blocks better jobs.',
    actionThisWeek: 'Protect slots for urgent, funded, local jobs. Do not let vague enquiries own your week.',
  },
  {
    title: 'Material price movement makes old quote templates risky.',
    tradeAffected: 'Builders, roofers, plasterers, fit-out, extensions.',
    moneyAngle: 'When material lines move, old quote templates become dangerous. Price the risk before the job starts.',
    actionThisWeek: 'Check key material lines before holding a quote open or visiting a low-detail lead.',
  },
  {
    title: 'Local demand shifts before customers start ringing around.',
    tradeAffected: 'Small builders, landscapers, roofers, decorators, general trades.',
    moneyAngle: 'Demand movement is an early clue. Follow the money before it becomes crowded.',
    actionThisWeek: 'Use planning, EPC, and tender signals to decide which jobs to chase harder and which ones to leave.',
  },
  {
    title: 'Compliance pressure creates higher-intent work.',
    tradeAffected: 'Roofers, builders, electrical, scaffold-linked work, commercial maintenance.',
    moneyAngle: 'Compliance deadlines convert faster than curiosity. Buyers act when fines, inspections, or shutdowns are involved.',
    actionThisWeek: 'Prioritise jobs with safety, access, fire, electrical, or deadline pressure.',
  },
  {
    title: 'Upgrade work moves before job boards see it.',
    tradeAffected: 'Builders, roofers, electricians, plumbers, carpenters, decorators, landscapers.',
    moneyAngle: 'Extensions, upgrades, conversions, and commercial changes create work before the open market catches up.',
    actionThisWeek: 'Watch your patch. Contact early. Avoid the race once everyone else notices.',
  },
];

const signalChecks = [
  ['Source proof', 'Is there an official planning, EPC, tender, or company signal?'],
  ['Buyer detail', 'Is there a named buyer, council, company, applicant, or source link?'],
  ['Time pressure', 'Is there a deadline, approval, compliance issue, or recent trigger?'],
  ['Trade fit', 'Does the scope clearly match your trade, not just general interest?'],
  ['Value band', 'Is the likely job value worth a call, quote, or site visit?'],
] as const;

export function NewsPage() {
  return (
    <main className="grid pb-24 md:pb-8">
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)] py-16">
        <div className="page-shell text-center">
          <p className="micro-label text-[var(--ink)]">TRADE INTELLIGENCE</p>
          <h1 className="headline mx-auto mt-4 max-w-4xl text-4xl leading-none sm:text-6xl md:text-8xl">
            NEWS FOR FINDING BETTER WORK.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            Short UK construction signal notes for tradesmen who want fewer weak enquiries and more jobs worth pricing.
          </p>
          <p className="mx-auto mt-3 max-w-2xl border-2 border-[var(--ink)] bg-white px-4 py-3 text-sm font-black uppercase text-[var(--ink)]">
            Included in the monthly JobFilter price: weekly trade intelligence, patch signals, and practical chase rules.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">
              START FREE SCAN
            </Link>
            <a className="jf-button bg-[var(--ink)] text-white" href="https://www.instagram.com/jobfilter.uk/" target="_blank" rel="noopener noreferrer">
              FOLLOW INSTAGRAM
            </a>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">
              CLAIM A PATCH
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <p className="micro-label text-[var(--orange)]">HOW TO READ A SIGNAL</p>
            <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">DO NOT CHASE EVERY LEAD. FILTER FIRST.</h2>
            <p className="mt-4 max-w-2xl font-black text-[var(--muted)]">
              JobFilter ranks construction signals by source proof, urgency, trade fit, value, and contact quality. Use the same checklist before you waste a site visit.
            </p>
          </div>
          <div className="grid gap-2">
            {signalChecks.map(([label, body]) => (
              <div key={label} className="border-2 border-[var(--line)] bg-[var(--paper)] p-3">
                <p className="micro-label text-[var(--orange)]">{label}</p>
                <p className="mt-1 text-sm font-black text-[var(--ink)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-12">
        {tradeSignals.map((item, index) => (
          <article key={item.title} className={`jf-box overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--navy)] text-white'}`}>
            <div className="p-6">
              <p className="micro-label text-[var(--orange)]">MARKET INTELLIGENCE</p>
              <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">{item.title}</h2>
            </div>
            <div className={`grid gap-0 border-t-4 border-[var(--line)] md:grid-cols-3 ${index % 2 === 0 ? 'bg-[var(--bg-main)]' : 'bg-white text-[var(--ink)]'}`}>
              <SignalBlock label="Trade affected" value={item.tradeAffected} />
              <SignalBlock label="Money angle" value={item.moneyAngle} />
              <SignalBlock label="Action this week" value={item.actionThisWeek} />
            </div>
          </article>
        ))}
      </section>

      <section className="border-t-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--ink)]">NEXT STEP</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">READ THE SIGNAL. SCAN YOUR PATCH. CHASE THE BEST JOB FIRST.</h2>
          <p className="mt-4 max-w-xl font-black text-[var(--ink)]">
            Use the weekly notes to sharpen your filter, then scan your own postcode to see what is live near you.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">START FREE SCAN</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SignalBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b-4 border-[var(--line)] p-5 last:border-b-0 md:border-b-0 md:border-r-4 md:last:border-r-0">
      <p className="micro-label text-[var(--orange)]">{label}</p>
      <p className="mt-3 text-lg font-black leading-snug">{value}</p>
    </div>
  );
}
