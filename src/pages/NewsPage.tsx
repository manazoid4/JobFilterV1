type NewsItem = {
  title: string;
  whyItMatters: string;
  action: string;
  sourceName: string;
  sourceUrl: string;
};

const newsItems: NewsItem[] = [
  {
    title: 'Repair and maintenance is under pressure',
    whyItMatters: 'Small builders need fewer weak enquiries and better quote discipline.',
    action: 'Price risk properly. Do not chase vague domestic work with no budget.',
    sourceName: 'Federation of Master Builders',
    sourceUrl: 'https://www.fmb.org.uk/news-and-campaigns/press-releases.html',
  },
  {
    title: 'Skills and labour shortages are still biting',
    whyItMatters: 'Good trades can stay selective. Weak jobs cost more than they look.',
    action: 'Protect your diary. Push urgent, clear, local work to the top.',
    sourceName: 'Construction Leadership Council',
    sourceUrl: 'https://www.constructionleadershipcouncil.co.uk/news/',
  },
  {
    title: 'Wiring regulation updates need watching',
    whyItMatters: 'Electrical jobs with compliance pressure convert faster and carry stronger intent.',
    action: 'Prioritise EICR, consumer unit, rental, and deadline-led jobs.',
    sourceName: 'Electrical Safety First',
    sourceUrl: 'https://www.electricalsafetyfirst.org.uk/professional-resources/wiring-regulations/new-rewired-and-similar-installations/',
  },
  {
    title: 'Building safety changes can create urgent trade work',
    whyItMatters: 'Fire doors, higher-risk buildings, and compliance work create real deadlines.',
    action: 'Track jobs where regulation forces action. Deadline beats curiosity.',
    sourceName: 'Building Safety Regulator',
    sourceUrl: 'https://www.gov.uk/government/organisations/building-safety-regulator',
  },
  {
    title: 'Planning approvals are still the best early signal',
    whyItMatters: 'Extensions, conversions, dormers, and refurb approvals turn into paid work before job boards see them.',
    action: 'Use planning signals for first contact, not after everyone else piles in.',
    sourceName: 'Planning Data',
    sourceUrl: 'https://www.planning.data.gov.uk/',
  },
];

export function NewsPage() {
  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">TRADE SIGNALS</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">USEFUL NEWS. NO FLUFF.</h1>
        <p className="mt-3 max-w-2xl text-lg font-black text-[var(--muted)]">
          Links worth checking because they affect quotes, deadlines, and where the money is moving.
        </p>
      </section>

      <section className="grid gap-4">
        {newsItems.map((item) => (
          <article key={item.title} className="jf-box bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="micro-label text-[var(--orange)]">{item.sourceName}</p>
                <h2 className="headline mt-2 text-3xl">{item.title}</h2>
              </div>
              <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href={item.sourceUrl} target="_blank" rel="noreferrer">
                OPEN SOURCE
              </a>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <p className="border-t-2 border-[var(--line)] pt-3 text-lg font-black text-[var(--muted)]">{item.whyItMatters}</p>
              <p className="border-t-2 border-[var(--line)] pt-3 text-lg font-black">{item.action}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
