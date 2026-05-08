type TradeSignal = {
  title: string;
  sourceName: string;
  sourceUrl: string;
  tradeAffected: string;
  moneyAngle: string;
  actionThisWeek: string;
};

const tradeSignals: TradeSignal[] = [
  {
    title: 'Small builders are still fighting tight margins and weak enquiries.',
    sourceName: 'Federation of Master Builders',
    sourceUrl: 'https://www.fmb.org.uk/news-and-campaigns/press-releases.html',
    tradeAffected: 'Small builders, extension firms, refurb crews, and domestic trades.',
    moneyAngle: 'When margins are tight, one bad enquiry can eat the week. Quote discipline matters more than lead volume.',
    actionThisWeek: 'Only chase jobs with a clear scope, real budget signal, and a customer who can make a decision.',
  },
  {
    title: 'Industry pressure means the diary needs stronger control.',
    sourceName: 'Construction Leadership Council',
    sourceUrl: 'https://www.constructionleadershipcouncil.co.uk/news/',
    tradeAffected: 'All trades dealing with labour pressure, late payments, and squeezed programmes.',
    moneyAngle: 'Busy does not mean profitable. The wrong work fills the diary and blocks better jobs.',
    actionThisWeek: 'Protect slots for urgent, funded, local jobs. Do not let vague enquiries own your week.',
  },
  {
    title: 'Material price movement can wipe out margin before you notice.',
    sourceName: 'GOV.UK Building Materials',
    sourceUrl: 'https://www.gov.uk/government/collections/building-materials-and-components-statistics',
    tradeAffected: 'Builders, roofers, plasterers, fit-out, extensions.',
    moneyAngle: 'When material lines move, old quote templates become dangerous. Price the risk before the job starts.',
    actionThisWeek: 'Check cement, timber, insulation, bricks, steel, and imported product lines before holding a quote open.',
  },
  {
    title: 'Merchant sales show where demand is moving locally.',
    sourceName: 'Builders Merchant Building Index',
    sourceUrl: 'https://bmbi.co.uk/',
    tradeAffected: 'Small builders, landscapers, roofers, decorators, general trades.',
    moneyAngle: 'Merchant category movement is an early clue. If heavy-side or landscaping is moving, follow the money before it becomes crowded.',
    actionThisWeek: 'Use the trend to decide which jobs to chase harder and which materials to pre-price.',
  },
  {
    title: 'Construction forecast pressure means smaller firms must be selective.',
    sourceName: 'Construction Products Association',
    sourceUrl: 'https://www.constructionproducts.org.uk/',
    tradeAffected: 'All trades quoting residential repair, retrofit, commercial refurbs, and public work.',
    moneyAngle: 'When the market tightens, weak enquiries get expensive. The winner is the firm that filters faster.',
    actionThisWeek: 'Push urgent, funded, local work up the list. Drop vague jobs with no budget and no deadline.',
  },
  {
    title: 'Supplier and merchant news spots shortages before customers blame you.',
    sourceName: 'Professional Builders Merchant',
    sourceUrl: 'https://professionalbuildersmerchant.co.uk/',
    tradeAffected: 'Anyone relying on merchants for stock, delivery windows, and price consistency.',
    moneyAngle: 'Availability problems become lost days. Lost days become profit leaks.',
    actionThisWeek: 'Before accepting tight deadlines, check product availability and write the risk into the quote.',
  },
  {
    title: 'HSE enforcement tells you what compliance work buyers cannot ignore.',
    sourceName: 'HSE Construction Enforcement',
    sourceUrl: 'https://www.hse.gov.uk/construction/resources/enforcementregister.htm',
    tradeAffected: 'Roofers, builders, electrical, scaffold-linked work, commercial maintenance.',
    moneyAngle: 'Compliance deadlines convert faster than curiosity. Buyers act when fines, inspections, or shutdowns are involved.',
    actionThisWeek: 'Prioritise jobs with safety, access, fire, electrical, or deadline pressure. They are less likely to be tyre-kickers.',
  },
  {
    title: 'Planning approvals are still the cleanest early signal.',
    sourceName: 'Planning Data',
    sourceUrl: 'https://www.planning.data.gov.uk/docs',
    tradeAffected: 'Builders, roofers, electricians, plumbers, carpenters, decorators, landscapers.',
    moneyAngle: 'Extensions, lofts, conversions, dormers, and commercial changes create work before job boards see it.',
    actionThisWeek: 'Track approvals in your postcode. Contact before five other firms are fighting over the same job.',
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
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            No blog fluff. These are source links worth checking because they change quote risk, job timing, and where demand is moving.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-5 py-10">
        {tradeSignals.map((item, index) => (
          <article key={item.title} className={`jf-box overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--navy)] text-white'}`}>
            <div className="grid gap-5 p-5 lg:grid-cols-[1fr_260px]">
              <div>
                <p className="micro-label text-[var(--orange)]">{item.sourceName}</p>
                <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl md:text-5xl">{item.title}</h2>
              </div>
              <a className="jf-button self-start bg-[var(--yellow)] text-[var(--ink)]" href={item.sourceUrl} target="_blank" rel="noreferrer">
                OPEN SOURCE
              </a>
            </div>
            <div className={`grid gap-0 border-t-4 border-[var(--line)] md:grid-cols-3 ${index % 2 === 0 ? 'bg-[var(--bg-main)]' : 'bg-white text-[var(--ink)]'}`}>
              <SignalBlock label="Trade affected" value={item.tradeAffected} />
              <SignalBlock label="Money angle" value={item.moneyAngle} />
              <SignalBlock label="Action this week" value={item.actionThisWeek} />
            </div>
          </article>
        ))}
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
