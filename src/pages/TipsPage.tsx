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
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">TIPS FOR TRADESMEN</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">KEEP YOUR EVENINGS.</h1>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">Practical rules for avoiding tyre-kickers.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {tips.map(([title, body]) => (
          <article key={title} className="jf-box bg-white p-5">
            <h2 className="headline text-3xl">{title}</h2>
            <p className="mt-2 text-lg font-black text-[var(--muted)]">{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
