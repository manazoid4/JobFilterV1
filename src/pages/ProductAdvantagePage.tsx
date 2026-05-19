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
    headline: 'PUT YOUR NAME ON EVERY DOOR IN YOUR PATCH.',
    sub: 'Hyper-local ads targeting households that need your work right now — based on verified job signals, property sales, and planning approvals.',
    body: 'You know your patch. Vicinity puts your brand in the right doors before they post on Bark or Checkatrade. No blanket drops. Just the houses already showing a live signal.',
    note: 'Powered by JobFilter\'s signal engine — we know which homes need work before they post a job.',
    distinct: 'Vicinity fills your pipeline between big jobs. Targeted, cheap as chips, no shared auction.',
    problem: 'Every blanket leaflet drop wastes 90% of your budget on houses that don\'t need your trade this year. Vicinity skips those entirely.',
    steps: ['Tell us your patch (postcode + radius)', 'We target homes with active job signals (low energy ratings, recent sales, planning approvals)', 'Your ad lands in the right letterboxes — not the bin'],
    gets: ['Targeted door-drop campaign', 'Signal-matched household list', 'Custom trade-branded leaflet design', 'Delivery tracking report', 'Follow-up lead alerts from targeted area'],
  },
};

type ProductType = keyof typeof content;

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
        <textarea className="field-input min-h-[100px]" placeholder="Job details — what do you need help with?" />
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


