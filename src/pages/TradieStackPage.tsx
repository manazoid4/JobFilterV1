import { Link } from 'react-router-dom';

export function TradieStackPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-16">
      <section className="jf-box bg-[var(--yellow)] border-b-4 border-[var(--line)] p-8">
        <p className="micro-label text-[var(--ink)]">NEW — ONE-OFF PURCHASE</p>
        <h1 className="headline mt-4 text-3xl leading-none sm:text-5xl md:text-7xl">
          EVERYTHING THE AGENCIES CHARGE YOU £1,000/MONTH FOR. NOW £450. ONCE.
        </h1>
        <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]/75">
          Website. CRM. Auto follow-up. Review requests. Quotes. Invoices. WhatsApp inbox. All in one place. No monthly fees. No agency middleman. No contract. One payment. Own it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="jf-button bg-[var(--ink)] text-white" href="#buy">BUY NOW — £450 ONCE</a>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">TRY JOBFILTER FREE</Link>
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">THE AGENCY RACKET</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">AGENCIES CHARGE £1,000-£5,500/MO FOR TOOLS THAT SHOULD COST £450 ONCE.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border-4 border-[var(--line)] bg-[var(--bg-main)] p-5">
            <h3 className="headline text-xl sm:text-2xl text-[var(--orange)]">THE OLD WAY</h3>
            <ul className="mt-3 grid gap-2 font-black text-[var(--muted)]">
              <li>✗ Agency builds your website — £197-497/mo</li>
              <li>✗ Agency runs your automations — £997-2,500/mo</li>
              <li>✗ Agency manages your reviews — bundled, opaque</li>
              <li>✗ 90-day minimum contract. Locked in.</li>
              <li>✗ If ads stop, leads stop. You're dependent.</li>
              <li>✗ Total: £1,500-£5,500+/mo. Every month. Forever.</li>
            </ul>
          </div>
          <div className="border-4 border-[var(--line)] bg-[var(--yellow)] p-5">
            <h3 className="headline text-xl sm:text-2xl text-[var(--ink)]">TRADIESTACK</h3>
            <ul className="mt-3 grid gap-2 font-black text-[var(--ink)]">
              <li>✓ Trade website — pick a template, live in 5 minutes</li>
              <li>✓ CRM + pipeline + WhatsApp inbox — all built in</li>
              <li>✓ Auto follow-ups + review requests — pre-configured</li>
              <li>✓ No contract. Cancel whenever. You own it.</li>
              <li>✓ Optional JobFilter signals — find work before anyone else</li>
              <li>✓ Total: £450. Once. Not monthly. Not yearly. Once.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="jf-box bg-[var(--navy)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">WHAT YOU GET</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl text-[var(--yellow)]">FULL TRADE OPERATING SYSTEM.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['Trade Website', '4 templates — Electrician, Plumber, Builder, Roofer. Mobile-first. Intake form, gallery, reviews, contact buttons. Your domain or ours. Live in 5 minutes.'],
            ['CRM + Pipeline', 'Every lead in one place. New → Contacted → Quoted → Won/Lost. WhatsApp inbox built in. No more spreadsheets.'],
            ['Auto Follow-Up', 'Missed a call? Auto-text back in 30 seconds. Lead gone cold? Nudge after 2 hours. Need to quote? Template ready in one tap.'],
            ['Review Engine', 'Auto-request after every won job. Happy customers → Google review. Unhappy → private feedback to you. Watch your stars climb.'],
            ['Quotes + Invoices', 'Trade-specific quote templates. Labour, materials, total, terms. Invoice from quote in one tap. Stripe payment link attached.'],
            ['JobFilter Ready', 'Optional: plug in JobFilter (£29-49/mo) and get planning signals, EPC leads, and council contracts fed straight into your CRM.'],
          ].map(([title, body]) => (
            <div key={title} className="jf-box bg-white/10 p-5">
              <h3 className="headline text-lg sm:text-xl text-[var(--yellow)]">{title}</h3>
              <p className="mt-2 font-black text-white/75">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">COMPARISON</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">ONE PRICE. NO GAMES.</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[700px] w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-[var(--line)] bg-[var(--navy)] text-white">
                <th className="p-4 font-black uppercase">Feature</th>
                <th className="p-4 font-black uppercase text-[var(--yellow)]">TradieStack</th>
                <th className="p-4 font-black uppercase text-white/60">Time To Scale</th>
                <th className="p-4 font-black uppercase text-white/60">Varga Media</th>
                <th className="p-4 font-black uppercase text-white/60">GoHighLevel</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[var(--line)]">
              {[
                ['Trade Website', '✓ 4 templates, 5-min', '✓ 14-day wait', '✗', '✓ Complex builder'],
                ['CRM / Pipeline', '✓ Built in', '✗', '✗', '✓ Agency CRM'],
                ['Auto Follow-Ups', '✓ WhatsApp native', '✓ SMS only', '✓ Human callers', '✓ Complex setup'],
                ['Review Engine', '✓ Auto-request', '✓ Manual', '✗', '✓ Add-on'],
                ['Quotes / Invoices', '✓ Built in', '✗', '✗', '✓ Add-on'],
                ['WhatsApp Inbox', '✓ Free', '✗', '✗', '✓ $10/mo extra'],
                ['JobFilter Signals', '✓ Optional', '✗', '✗', '✗'],
                ['Price', '£450 ONCE', '£197-497/mo', '£1,000-2,500/mo', '$97-497/mo'],
                ['Contract', 'None', '90-day min', 'Monthly', 'Monthly'],
              ].map(([feature, ts, tts, vm, ghl]) => (
                <tr key={feature} className="font-black">
                  <td className="p-4">{feature}</td>
                  <td className="p-4 bg-[var(--yellow)]/20 text-[var(--green)]">{ts}</td>
                  <td className="p-4 text-[var(--muted)]">{tts}</td>
                  <td className="p-4 text-[var(--muted)]">{vm}</td>
                  <td className="p-4 text-[var(--muted)]">{ghl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="buy" className="jf-box bg-[var(--yellow)] p-8 text-center">
        <p className="micro-label text-[var(--ink)]">ONE PAYMENT. OWN IT.</p>
        <h2 className="headline mt-3 text-4xl leading-none sm:text-5xl md:text-6xl">£450</h2>
        <p className="mt-3 text-xl font-black text-[var(--ink)]/75">
          No monthly fees. No per-lead costs. No contracts. One payment. Your trade operating system. Forever.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a className="jf-button bg-[var(--ink)] text-white text-lg px-8 py-4" href="mailto:contact@jobfilter.uk?subject=TradieStack%20Purchase">BUY NOW — EMAIL US</a>
          <Link className="jf-button bg-white text-[var(--ink)] text-lg px-8 py-4" to="/pricing">JOBFILTER PRICING</Link>
        </div>
        <p className="mt-4 text-sm font-black text-[var(--ink)]/60">
          Questions? contact@jobfilter.uk — Built in Birmingham. Launching June 2026.
        </p>
      </section>

      <section className="jf-box bg-[var(--ink)] p-8 text-center text-white">
        <h2 className="headline text-3xl leading-none sm:text-4xl text-[var(--yellow)] md:text-5xl">STOP PAYING AGENCY TAX.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl font-black text-white/80">
          Every month you pay an agency is a month you could have owned the tools yourself. £450 once. Never again.
        </p>
      </section>
    </main>
  );
}
