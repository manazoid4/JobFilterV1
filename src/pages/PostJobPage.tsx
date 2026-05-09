import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const trades = ['Builder', 'Roofer', 'Electrician', 'Plumber', 'Heat pump installer', 'Bathroom fitter', 'Landscaper', 'Not sure'];

export function PostJobPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <main className="page-shell py-10">
        <section className="ops-panel bg-[var(--yellow)] p-8">
          <p className="micro-label text-[var(--ink)]">JOB RECEIVED</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">WE WILL MATCH THIS TO A VERIFIED LOCAL FIRM.</h1>
          <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            No lead auction. No spam. We check the job, route it by trade and patch, and only send it where it makes sense.
          </p>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/">Back to JobFilter</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--paper)] pb-0">
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--yellow)]">FOR HOMEOWNERS AND PROPERTY OWNERS</p>
            <h1 className="headline mt-4 text-[clamp(44px,8vw,96px)] leading-[0.88]">
              NEED A SERIOUS TRADE? SKIP THE QUOTE LOTTERY.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
              Tell us the job once. We route it to a suitable local firm instead of blasting it around a shared lead market.
            </p>
          </div>
          <div className="ops-panel bg-white p-5 text-[var(--ink)]">
            <p className="micro-label text-[var(--orange)]">WHAT HAPPENS NEXT</p>
            <div className="mt-4 grid gap-3 font-black text-[var(--muted)]">
              <p>We review the job and send it to a suitable local firm.</p>
              <p>Clear details mean faster replies, better quotes, and less back-and-forth.</p>
              <p>Trades can also add local campaigns to keep their patch busy with more repeat work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-10 lg:grid-cols-[1fr_440px]">
        <form onSubmit={submit} className="ops-panel grid gap-4 bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">POST A JOB</p>
          <label className="field-label">Your name<input className="field-input bg-white" required placeholder="Name" /></label>
          <label className="field-label">Phone or email<input className="field-input bg-white" required placeholder="So the trade can contact you" /></label>
          <label className="field-label">Postcode<input className="field-input bg-white" required placeholder="B14 7QH" /></label>
          <label className="field-label">Trade needed<select className="field-input bg-white">{trades.map((trade) => <option key={trade}>{trade}</option>)}</select></label>
          <label className="field-label">Job details<textarea className="field-input min-h-32 bg-white" required placeholder="What needs doing, when, and any useful details" /></label>
          <button className="jf-button bg-[var(--ink)] text-white">Send Job For Matching</button>
        </form>

        <aside className="grid gap-4">
          {[
            ['No public bidding war', 'We do not make you fight through dozens of calls. The job gets checked and routed.'],
            ['Better matching', 'Serious job details mean less wasted quoting and better first conversations.'],
            ['More local demand', 'PatchLock firms can fund local sticker, leaflet, letter and neighbour campaigns in month one.'],
          ].map(([title, body]) => (
            <article key={title} className="ops-panel bg-white p-5">
              <h2 className="headline text-3xl">{title}</h2>
              <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
}
