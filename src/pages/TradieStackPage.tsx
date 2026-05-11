import { Link } from 'react-router-dom';

const features = [
  ['Trade website', 'Mobile-first website with quote form, proof, gallery, reviews, call buttons and postcode coverage.'],
  ['Public intake', 'A clean job form you can send to customers, landlords and neighbours. No shared lead market.'],
  ['CRM pipeline', 'New, contacted, quoted, won and lost jobs in one board. Works with JobFilter lead imports.'],
  ['WhatsApp inbox', 'Keep lead alerts, customer replies and follow-ups in the same work rhythm trades already use.'],
  ['Quote and invoice flow', 'Simple trade quotes, invoice handoff, deposit links and job notes without agency bloat.'],
  ['Review engine', 'Ask for Google reviews after won jobs and route complaints privately before they become public.'],
  ['Neighbour Signal campaigns', 'Turn one completed job into nearby leaflets, letters and local remarketing.'],
  ['PatchLock ready', 'Connect your JobFilter patch so Gold leads, letters and follow-ups land in your own system.'],
];

const revenueHooks = [
  ['First-month guerilla kit', 'Stickers, local QR cards and site-board copy that pushes homeowners into your public intake.', 'from £99'],
  ['Direct letter setup', 'Your company details, tone, offer and letterhead built once so every lead pack is ready.', '£49 once'],
  ['Neighbour Signal campaign', 'Door-drop and letter campaign around a live or completed job.', 'from £99'],
  ['Patch expansion', 'Add another postcode cluster when your first patch starts paying.', '+£19/mo'],
];

export function TradieStackPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-16">
      <section className="ops-panel bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">TRADIESTACK</p>
        <h1 className="headline mt-4 text-5xl leading-none md:text-7xl">
          OWN THE SYSTEM THAT TURNS LOCAL ATTENTION INTO BOOKED WORK.
        </h1>
        <p className="mt-5 max-w-3xl text-xl font-black text-[var(--ink)]">
          Website, public intake, CRM, WhatsApp follow-up, reviews, quotes and neighbour campaigns. Built to catch homeowners, route jobs, and keep customers coming back.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="jf-button bg-[var(--ink)] text-white" href="#buy">Buy TradieStack — £450 once</a>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/post-job">See Public Intake</Link>
        </div>
      </section>

      <section className="ops-panel bg-white p-6">
        <p className="micro-label text-[var(--orange)]">WHY IT MATTERS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-6xl">JOBFILTER FINDS DEMAND. TRADIESTACK CAPTURES IT.</h2>
        <p className="mt-4 max-w-3xl text-lg font-black text-[var(--muted)]">
          Tradesmen need more than a website. They need a simple capture system: someone sees a sticker, leaflet, letter, neighbour job, or Google result, then submits a proper job request into your pipeline.
        </p>
      </section>

      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FEATURES</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map(([title, body]) => (
            <article key={title} className="border-2 border-white/20 bg-white/8 p-5">
              <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
              <p className="mt-2 font-black text-white/72">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">FIRST MONTH MARKETING</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">LAUNCH YOUR PATCH LIKE A LOCAL OPERATOR.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {revenueHooks.map(([title, body, price]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--paper)] p-5">
              <h3 className="headline text-2xl">{title}</h3>
              <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              <p className="mt-4 border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 text-center font-black">{price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-[var(--yellow)] p-8" id="buy">
        <p className="micro-label text-[var(--ink)]">ONE PAYMENT</p>
        <h2 className="headline mt-3 text-6xl leading-none">£450 ONCE</h2>
        <p className="mt-3 max-w-2xl text-xl font-black text-[var(--ink)]">
          No agency retainer. No monthly website tax. Own the capture system, then plug in JobFilter monthly when you want intelligence and routed leads.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="jf-button bg-[var(--ink)] text-white" href="mailto:contact@jobfilter.uk?subject=TradieStack%20Purchase">Buy Now — Email Us</a>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">Add JobFilter Monthly</Link>
        </div>
      </section>
    </main>
  );
}
