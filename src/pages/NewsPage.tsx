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
    title: 'Industry pressure means the diary needs stronger control.',
    tradeAffected: 'All trades dealing with labour pressure, late payments, and squeezed programmes.',
    moneyAngle: 'Busy does not mean profitable. The wrong work fills the diary and blocks better jobs.',
    actionThisWeek: 'Protect slots for urgent, funded, local jobs. Do not let vague enquiries own your week.',
  },
  {
    title: 'Material price movement can wipe out margin before you notice.',
    tradeAffected: 'Builders, roofers, plasterers, fit-out, extensions.',
    moneyAngle: 'When material lines move, old quote templates become dangerous. Price the risk before the job starts.',
    actionThisWeek: 'Check key material lines before holding a quote open.',
  },
  {
    title: 'Local demand shifts before customers start ringing around.',
    tradeAffected: 'Small builders, landscapers, roofers, decorators, general trades.',
    moneyAngle: 'Demand movement is an early clue. Follow the money before it becomes crowded.',
    actionThisWeek: 'Use the trend to decide which jobs to chase harder and which ones to leave.',
  },
  {
    title: 'Compliance pressure creates higher-intent work.',
    tradeAffected: 'Roofers, builders, electrical, scaffold-linked work, commercial maintenance.',
    moneyAngle: 'Compliance deadlines convert faster than curiosity. Buyers act when fines, inspections, or shutdowns are involved.',
    actionThisWeek: 'Prioritise jobs with safety, access, fire, electrical, or deadline pressure.',
  },
  {
    title: 'Upgrade work is moving before job boards see it.',
    tradeAffected: 'Builders, roofers, electricians, plumbers, carpenters, decorators, landscapers.',
    moneyAngle: 'Extensions, upgrades, conversions, and commercial changes create work before the open market catches up.',
    actionThisWeek: 'Watch your patch. Contact early. Avoid the race once everyone else notices.',
  },
];

export function NewsPage() {
  return (
    <main className="grid pb-24 md:pb-8">
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)] py-16">
        <div className="page-shell text-center">
          <p className="micro-label text-[var(--ink)]">TRADE SIGNALS</p>
          <h1 className="headline mx-auto mt-4 max-w-4xl text-4xl leading-none sm:text-6xl md:text-8xl">
            NEWS THAT CAN MAKE OR SAVE MONEY.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            No blog fluff. Just the market signals that change quote risk, job timing, and where demand is moving.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-12">
        {tradeSignals.map((item, index) => (
          <article key={item.title} className={`jf-box overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--navy)] text-white'}`}>
            <div className="p-6">
              <p className="micro-label text-[var(--orange)]">PRIVATE SIGNAL READ</p>
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
          <p className="micro-label text-[var(--ink)]">TRADE TIPS</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">PRACTICAL RULES FOR AVOIDING TYRE-KICKERS.</h2>
          <p className="mt-4 max-w-xl font-black text-[var(--ink)]">Ask budget before you travel. Charge for surveys. Invoice the day the job finishes. 12 rules that protect your time and margin.</p>
          <a className="jf-button mt-5 inline-block bg-[var(--ink)] text-white" href="/tips">READ TRADE TIPS →</a>
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
