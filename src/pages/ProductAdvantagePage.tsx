import { WaitlistForm } from '../components/WaitlistForm';

const content = {
  vantage: {
    title: 'VANTAGE',
    headline: 'STOP LOSING BIG BIDS TO PRETTIER FIRMS.',
    subhead: 'Turn rough tender notes into bid decks, renders, and proof that looks premium.',
    bullets: ['Bid decks', '3D renders', 'Infographics', 'Premium proof'],
    cta: 'BUILD A WINNING BID',
  },
  vicinity: {
    title: 'VICINITY',
    headline: 'STOP LETTING GOOD WORK DIE IN YOUR CAMERA ROLL.',
    subhead: 'Turn finished jobs into WhatsApp, website, and social proof that brings in better work.',
    bullets: ['Before and afters', 'WhatsApp posts', 'Website assets', 'Local proof'],
    cta: 'TURN PHOTOS INTO WORK',
  },
  codex: {
    title: 'CODEX',
    headline: 'TURN TECHNICAL WORK INTO SALES ASSETS.',
    subhead: 'Turn manuals, schematics, and specs into clear material buyers understand.',
    bullets: ['Sales carousels', 'How-it-works videos', 'Battle cards', 'Spec explainers'],
    cta: 'MAKE IT CLEAR',
  },
};

export function ProductAdvantagePage({ type }: { type: keyof typeof content }) {
  const page = content[type];
  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">{page.title}</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">{page.headline}</h1>
        <p className="mt-4 max-w-2xl text-xl font-black text-white/70">{page.subhead}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {page.bullets.map((item) => (
          <div key={item} className="jf-box bg-white p-5">
            <p className="headline text-2xl">{item}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-white p-6">
          <h2 className="headline text-4xl">WHY IT EXISTS</h2>
          <p className="mt-3 text-lg font-black text-[var(--muted)]">
            Good tradesmen lose work when buyers cannot see the value. This fixes presentation without turning you into a marketing agency.
          </p>
        </div>
        <WaitlistForm source={page.title.toLowerCase()} />
      </section>
    </main>
  );
}
