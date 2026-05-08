import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    headline: 'TECHNICAL WORK. COMMERCIAL LANGUAGE.',
    sub: 'Your schematics, specs, and proposals — translated into documents that close deals.',
    body: 'Engineers and specialists lose contracts because clients cannot understand the technical value. Codex bridges the gap between your expertise and their decision.',
    note: 'Built for HVAC engineers, electrical contractors, mechanical specialists, and technical consultants who need their work understood by non-technical buyers.',
    distinct: 'Codex translates technical complexity into commercial clarity. Not marketing. Not bids. Translation.',
    problem: 'Technical excellence invisible to the buyer = lost contract to inferior competitor who communicated better.',
    steps: ['Upload schematics, spec sheets, technical proposals, or complex quotes', 'Specialist team translates technical value into commercial language', 'Client-ready documents delivered within 6 hours'],
    gets: ['Executive summary for decision-makers', 'Technical-to-commercial translation document', 'Value comparison matrix', 'Scope clarification sheet', 'Client presentation deck'],
  },
};

type ProductType = keyof typeof content;

export function ProductAdvantagePage({ type }: { type: ProductType }) {
  const page = content[type];
  const isCodex = type === 'codex';

  return (
    <main className="page-shell grid gap-6 py-8 pb-8">
      <section className={`jf-box p-7 md:p-9 ${page.hero}`}>
        <p className={`micro-label ${page.label}`}>{page.title}</p>
        <h1 className="headline mt-3 max-w-5xl text-5xl leading-none md:text-7xl">{page.headline}</h1>
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

          {isCodex && (
            <article className="jf-box bg-[var(--bg-main)] p-6">
              <p className="micro-label text-[var(--navy)]">WHO THIS IS FOR</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['HVAC Engineers', 'Heat pump specs, ventilation designs, energy calculations'],
                  ['Electrical Contractors', 'Distribution diagrams, load calculations, compliance docs'],
                  ['Mechanical Specialists', 'Piping schematics, structural calculations, material specs'],
                  ['Technical Consultants', 'Feasibility studies, risk assessments, technical proposals'],
                ].map(([role, desc]) => (
                  <div key={role} className="border-2 border-[var(--line)] bg-white p-4">
                    <p className="font-black text-[var(--ink)]">{role}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{desc}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

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

        <ServiceForm trade={page.title} isCodex={isCodex} />
      </section>
    </main>
  );
}

function ServiceForm({ trade, isCodex }: { trade: string; isCodex: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="jf-box bg-[var(--yellow)] p-6">
      <p className="micro-label text-[var(--ink)]">REQUEST RECEIVED</p>
      <h2 className="headline mt-3 text-4xl">Team responds within 6 hours.</h2>
      <p className="mt-3 font-black text-[var(--ink)]/75">Usually much faster. Check your phone.</p>
    </div>
  );
  return (
    <div className="grid gap-4">
      <div className="jf-box border-4 border-[var(--yellow)] bg-white p-4">
        <p className="micro-label text-[var(--orange)]">PRICING</p>
        <p className="mt-2 text-lg font-black text-[var(--ink)]">Included with Founding 30 (£6.99/wk) and Pro (£11.29/wk).</p>
        <p className="mt-1 font-black text-[var(--muted)]">Free tier: free tools only. Paid plan unlocks this service.</p>
        <Link to="/pricing" className="mt-3 inline-block text-sm font-black uppercase text-[var(--navy)] underline underline-offset-2">See full pricing →</Link>
      </div>
      <form className="jf-box bg-white p-6 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <p className="micro-label text-[var(--orange)]">{isCodex ? 'SUBMIT TECHNICAL WORK' : 'SUBMIT TO TEAM'}</p>
        <input className="field-input" placeholder="Your name" required />
        <input className="field-input" placeholder="Company / organisation" defaultValue={trade} required />
        <input className="field-input" placeholder="Email or phone" required />
        <textarea className="field-input min-h-[100px]" placeholder={isCodex ? 'Describe the technical work — what needs translating?' : 'Job details - what do you need help with?'} required />
        <fieldset className="grid gap-2">
          <legend className="micro-label text-[var(--muted)]">HOW URGENT?</legend>
          {['Today', 'This week', 'Planning ahead'].map(opt => (
            <label key={opt} className="flex items-center gap-3 font-black cursor-pointer">
              <input type="radio" name="urgency" value={opt} defaultChecked={opt === 'This week'} />
              {opt}
            </label>
          ))}
        </fieldset>
        <button type="submit" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">{isCodex ? 'SUBMIT TECHNICAL WORK' : 'SUBMIT TO TEAM'}</button>
        <p className="text-sm font-black text-[var(--muted)]">Team responds within 6 hours. Usually much faster.</p>
      </form>
    </div>
  );
}
