type TradeSignal = {
  title: string;
  tradeAffected: string;
  moneyAngle: string;
  actionThisWeek: string;
  socialAngle: string;
};

const tradeSignals: TradeSignal[] = [
  {
    title: 'Small builders are still fighting tight margins and weak enquiries.',
    tradeAffected: 'Small builders, extension firms, refurb crews, and domestic trades.',
    moneyAngle: 'When margins are tight, one bad enquiry can eat the week. Quote discipline matters more than lead volume.',
    actionThisWeek: 'Only chase jobs with a clear scope, real budget signal, and a customer who can make a decision.',
    socialAngle: 'Turn this into a carousel: 5 signs an enquiry will waste your week.',
  },
  {
    title: 'Industry pressure means the diary needs stronger control.',
    tradeAffected: 'All trades dealing with labour pressure, late payments, and squeezed programmes.',
    moneyAngle: 'Busy does not mean profitable. The wrong work fills the diary and blocks better jobs.',
    actionThisWeek: 'Protect slots for urgent, funded, local jobs. Do not let vague enquiries own your week.',
    socialAngle: 'Turn this into a LinkedIn post: why a full diary can still be a bad business.',
  },
  {
    title: 'Material price movement can wipe out margin before you notice.',
    tradeAffected: 'Builders, roofers, plasterers, fit-out, extensions.',
    moneyAngle: 'When material lines move, old quote templates become dangerous. Price the risk before the job starts.',
    actionThisWeek: 'Check key material lines before holding a quote open.',
    socialAngle: 'Turn this into a TikTok script: the quote mistake that kills margin.',
  },
  {
    title: 'Local demand shifts before customers start ringing around.',
    tradeAffected: 'Small builders, landscapers, roofers, decorators, general trades.',
    moneyAngle: 'Demand movement is an early clue. Follow the money before it becomes crowded.',
    actionThisWeek: 'Use the trend to decide which jobs to chase harder and which ones to leave.',
    socialAngle: 'Turn this into a Reddit discussion: how do you spot demand before the phone rings?',
  },
  {
    title: 'Compliance pressure creates higher-intent work.',
    tradeAffected: 'Roofers, builders, electrical, scaffold-linked work, commercial maintenance.',
    moneyAngle: 'Compliance deadlines convert faster than curiosity. Buyers act when fines, inspections, or shutdowns are involved.',
    actionThisWeek: 'Prioritise jobs with safety, access, fire, electrical, or deadline pressure.',
    socialAngle: 'Turn this into a Quora answer: which construction leads convert fastest?',
  },
  {
    title: 'Upgrade work is moving before job boards see it.',
    tradeAffected: 'Builders, roofers, electricians, plumbers, carpenters, decorators, landscapers.',
    moneyAngle: 'Extensions, upgrades, conversions, and commercial changes create work before the open market catches up.',
    actionThisWeek: 'Watch your patch. Contact early. Avoid the race once everyone else notices.',
    socialAngle: 'Turn this into a Medium article: why planning data beats lead marketplaces.',
  },
];

const distributionChannels = [
  ['Instagram', 'Carousel posts, site screenshots, trade rules, before/after signal breakdowns.', 'https://www.instagram.com/jobfilter.uk/'],
  ['Reddit', 'Useful discussion posts in trade/business communities. Lead with practical advice, not a pitch.', 'https://www.reddit.com/'],
  ['Quora', 'Answer buyer-quality, pricing, and trade lead questions with examples from JobFilter methodology.', 'https://www.quora.com/'],
  ['Facebook Groups', 'Short trade tips and question-led posts for local trade/business groups.', 'https://www.facebook.com/groups/'],
  ['LinkedIn', 'Founder/build-in-public posts, market observations, and serious trade business advice.', 'https://www.linkedin.com/'],
  ['TikTok', '30-second scripts: one trade problem, one rule, one JobFilter example.', 'https://www.tiktok.com/'],
  ['Medium', 'Longer essays on construction lead quality, planning signals, and small trade business strategy.', 'https://medium.com/'],
] as const;

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
            No blog fluff. Short trade intelligence you can turn into posts, videos, discussions, and practical sales angles.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              START FREE SCAN
            </a>
            <a className="jf-button bg-[var(--ink)] text-white" href="https://www.instagram.com/jobfilter.uk/" target="_blank" rel="noopener noreferrer">
              FOLLOW INSTAGRAM
            </a>
            <a className="jf-button bg-white text-[var(--ink)]" href="#distribution">
              REPURPOSE CONTENT
            </a>
          </div>
        </div>
      </section>

      <section id="distribution" className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--orange)]">CONTENT DISTRIBUTION</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">ONE ARTICLE. SEVEN PLACES TO POST.</h2>
          <p className="mt-4 max-w-2xl font-black text-[var(--muted)]">
            Each JobFilter article should become a carousel, short video, discussion post, answer, founder post, and long-form essay. Keep each version useful enough to earn attention.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {distributionChannels.map(([channel, use, href]) => (
              <a key={channel} href={href} target="_blank" rel="noopener noreferrer" className="jf-box bg-[var(--bg-main)] p-4 transition-colors hover:bg-[var(--yellow)]">
                <p className="headline text-2xl">{channel}</p>
                <p className="mt-2 text-sm font-black text-[var(--muted)]">{use}</p>
              </a>
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
              <SignalBlock label="Post angle" value={item.socialAngle} />
            </div>
          </article>
        ))}
      </section>

      <section className="border-t-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--ink)]">NEXT STEP</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">READ THE SIGNAL. SCAN YOUR PATCH. CLAIM THE TERRITORY.</h2>
          <p className="mt-4 max-w-xl font-black text-[var(--ink)]">
            Use the content to spot better work, then scan your own postcode to see what is live near you.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">START FREE SCAN →</a>
            <a className="jf-button bg-white text-[var(--ink)]" href="/pricing">SEE PRICING →</a>
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
