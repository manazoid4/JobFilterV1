import { useState } from 'react';

const content = {
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
    headline: 'TURN YOUR LAST JOB INTO YOUR NEXT ONE.',
    sub: 'Send your photos. We build the content. Work comes to you.',
    body: 'Most tradesmen do great work and tell nobody. Vicinity does the telling.',
    note: 'Our team turns rough camera-roll proof into local content that gets seen.',
    distinct: 'Vicinity turns PAST WORK into future leads. Backward-looking.',
    steps: ['Send your job photos (any quality, before/after, finished work)', 'Team creates content', 'Ready to post, usually within a few hours - always within 6'],
    gets: ['WhatsApp posts', 'Instagram + Facebook assets', 'Website portfolio images', 'Local area targeted ads', 'Google Business content'],
  },
  codex: {
    title: 'CODEX',
    hero: 'bg-white text-[var(--ink)]',
    label: 'text-[var(--orange)]',
    headline: "IF THEY DON'T GET IT, THEY WON'T PAY FOR IT.",
    sub: 'Submit your technical work. We turn it into content that closes.',
    body: 'Your expertise is the product. Codex makes sure the buyer sees it.',
    note: 'Built for HVAC engineers, electrical contractors, and mechanical specialists doing complex technical work.',
    distinct: 'Codex is not about winning bids or marketing past work. It translates technical complexity into sales language.',
    problem: "Client can't understand technical work -> won't see value -> won't pay the price.",
    steps: ['Submit schematics, manuals, spec sheets, complex quotes, or technical proposals', 'Team translates the value into plain English', 'Client-ready sales content delivered within 6 hours'],
    gets: ['Plain English client document', 'How-it-works explainer', 'Spec comparison card', 'Value justification sheet'],
  },
};

type ProductType = keyof typeof content;

export function ProductAdvantagePage({ type }: { type: ProductType }) {
  const page = content[type];

  return (
    <main className="page-shell grid gap-6 py-8 pb-8">
      <section className={`jf-box p-7 md:p-9 ${page.hero}`}>
        <p className={`micro-label ${page.label}`}>{page.title}</p>
        <h1 className="headline mt-3 max-w-5xl text-3xl leading-none sm:text-5xl md:text-7xl">{page.headline}</h1>
        <p className="mt-5 max-w-2xl text-xl font-black opacity-80">{page.sub}</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          <article className="jf-box bg-white p-6">
            <p className="micro-label text-[var(--orange)]">HUMAN-STAFFED SERVICE</p>
            <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">{page.distinct}</h2>
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
  if (submitted) return (
    <div className="jf-box bg-[var(--yellow)] p-6">
      <p className="micro-label text-[var(--ink)]">REQUEST RECEIVED</p>
      <h2 className="headline mt-3 text-3xl sm:text-4xl">Team responds within 6 hours.</h2>
      <p className="mt-3 font-black text-[var(--ink)]/75">Usually much faster. Check your phone.</p>
    </div>
  );
  return (
    <form className="jf-box bg-white p-6 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <p className="micro-label text-[var(--orange)]">SUBMIT TO TEAM</p>
      <input className="field-input" placeholder="Your name" required />
      <input className="field-input" placeholder="Trade / company" defaultValue={trade} required />
      <input className="field-input" placeholder="Phone number" required />
      <textarea className="field-input min-h-[100px]" placeholder="Job details - what do you need help with?" required />
      <fieldset className="grid gap-2">
        <legend className="micro-label text-[var(--muted)]">HOW URGENT?</legend>
        {['Today', 'This week', 'Planning ahead'].map(opt => (
          <label key={opt} className="flex items-center gap-3 font-black cursor-pointer">
            <input type="radio" name="urgency" value={opt} defaultChecked={opt === 'This week'} />
            {opt}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">SUBMIT TO TEAM</button>
      <p className="text-sm font-black text-[var(--muted)]">Team responds within 6 hours. Usually much faster.</p>
    </form>
  );
}
