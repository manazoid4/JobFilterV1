import { Link } from 'react-router-dom';

const tips = [
  ['Ask budget in the first message', "If they won't give a rough number, they're not serious. Save the site visit. Ask before you travel."],
  ['Charge for detailed site surveys', "A paid survey weeds out tyre-kickers instantly. Credit it against the job if they proceed. If they won't pay £50 for a proper look, they won't pay your rate either."],
  ['Never quote without photos', "Photos catch surprises before they eat your margin. If they can't send three photos, the job isn't ready. Let someone else find that out the expensive way."],
  ['Quote the risk, not just the job', "If you can't see behind the wall, price what you can see and write a variation clause. Don't absorb unknowns into a fixed price."],
  ['Avoid shared lead platforms', 'If five tradesmen get the same lead, the buyer wins on price and you lose on margin. Official sources do not share. Job boards do.'],
  ['Send a WhatsApp confirmation after every call', "One message: job type, date agreed, what's included. No dispute later. Takes 30 seconds."],
  ['Only do urgent jobs on a written basis', 'Emergency callouts are where margins get squeezed hardest. Set your emergency rate, put it in writing before you arrive, stick to it.'],
  ['Follow up every quote within 48 hours', "Auto-chase on quotes lifts close rate by 20-30%. Most tradesmen don't follow up at all. One WhatsApp message beats silence every time."],
  ["Don't let one big job own your diary", 'Large jobs feel safe until they delay. Keep smaller confirmed work in the diary as buffer. Never fully clear the schedule for a verbal agreement.'],
  ['Protect mornings for hard decisions', 'Pricing, quoting, and lead review done in the morning. Admin in the afternoon. Site visits never before 9am without a premium.'],
  ['Invoice the day the job finishes', 'Not the next day. Not Friday. The day it finishes. Payment terms start from invoice date, not from when you remember to send it.'],
  ['One strong lead is worth more than ten weak ones', 'A £5k job with a confirmed budget, clear scope, and a decision-maker beats fifty vague enquiries. Filter harder, not wider.'],
];

export function TipsPage() {
  return (
    <main className="page-shell grid gap-5 py-8 pb-8">
      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">TIPS FOR TRADESMEN</p>
        <h1 className="headline mt-4 text-5xl leading-none sm:text-6xl md:text-8xl">KEEP YOUR EVENINGS.</h1>
        <p className="mt-4 max-w-xl text-lg font-black text-[var(--muted)]">Practical rules for avoiding tyre-kickers.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {tips.map(([title, body]) => (
          <article key={title} className="jf-box bg-white p-5">
            <h2 className="headline text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-2 text-lg font-black text-[var(--muted)]">{body}</p>
          </article>
        ))}
      </section>

      {/* ── Ready to find real jobs? CTA ──────────── */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">READY TO FIND REAL JOBS?</p>
        <h2 className="headline mt-2 text-3xl leading-none text-[var(--ink)]">STOP SORTING THROUGH RUBBISH.</h2>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--ink)]/70">
          These tips help you handle bad leads better. JobFilter removes them before they reach you. Official UK signals scored before they hit your phone. Gold jobs to WhatsApp. Weak noise blocked.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="jf-button bg-[var(--navy)] text-white" to="/find-jobs">SCAN MY AREA FREE →</Link>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
        </div>
      </section>

      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">THE FILTER</p>
        <h2 className="headline mt-3 text-4xl leading-none text-[var(--yellow)] md:text-5xl">CONTROL THE JOBS. NO CHASING. NO COMPETING.</h2>
        <p className="mt-4 max-w-2xl text-lg font-black text-white/90">
          Official UK signals scored before they reach your phone. Gold jobs to WhatsApp. Weak noise blocked. Free to scan — £39/month to unlock.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">ENTER THE INTAKE →</Link>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
        </div>
      </section>

      {/* ── Cross-Tool Navigation ─────────────────── */}
      <section className="jf-box bg-white p-5">
        <p className="micro-label text-[var(--muted)]">TRY ANOTHER FREE TOOL</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/free-tools">
            ALL FREE TOOLS
          </Link>
          <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/smart-quote">
            SMART QUOTE STARTER
          </Link>
          <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/vantage">
            VANTAGE — BID DECKS
          </Link>
        </div>
      </section>
    </main>
  );
}

