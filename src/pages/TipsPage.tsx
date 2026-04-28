const tips = [
  ['Ask budget early', 'If they dodge it twice, move on.'],
  ['Charge for site visits', 'Serious customers respect your time.'],
  ['Send proof first', 'Photos beat long explanations.'],
  ['Avoid shared leads', 'They turn good trades into cheap bidders.'],
  ['Quote the risk', 'Unclear jobs need a buffer or a no.'],
];

export function TipsPage() {
  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">TIPS FOR TRADESMEN</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">KEEP YOUR EVENINGS.</h1>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">Practical rules for avoiding tyre-kickers.</p>
      </section>
      <section className="grid gap-4">
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
