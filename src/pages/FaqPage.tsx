"use client";
import Link from 'next/link';

import { Mail } from 'lucide-react';

const faqs = [
  {
    q: 'What makes JobFilter different from Checkatrade or MyBuilder?',
    a: 'JobFilter is not a shared-enquiry auction. It filters official opportunity data by evidence, trade, location, and timing. Coverage varies by patch, and an honest empty result is better than an invented job.',
  },
  {
    q: 'How does the lead scoring work?',
    a: 'Every signal scores 0–100 using source evidence, trade fit, location, freshness, value confidence, and contactability. GOLD means strongest evidence, not a guaranteed sale. You see why it scored — not just a number.',
  },
  {
    q: 'What does GOLD, SILVER, BRONZE mean?',
    a: 'GOLD means the available evidence is strongest and the opportunity is worth checking first. SILVER is worth reviewing but has weaker timing or completeness. BRONZE is lower confidence. The tier is a ranking, not a promise that the buyer is ready.',
  },
  {
    q: 'How fresh are the leads?',
    a: 'Freshness depends on when each official source publishes and when the scan runs. JobFilter shows the available date and ranks fresher evidence higher. We do not promise a fixed lead over competitors.',
  },
  {
    q: 'What do I actually get for £39/month?',
    a: 'Full opportunity context, value guidance, response templates, job tracking, and delivery features after your account and patch pass activation checks. Priority routing is being piloted; it is not sold as guaranteed exclusivity.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts. No cancellation fees. Access continues until the end of your billing period.',
  },
  {
    q: 'How is coverage checked before activation?',
    a: 'Run a free scan before paying. Coverage varies by trade, region and what buyers have published in the current Find a Tender feed. An empty result is a valid and honest outcome — not a system failure. Paid activation follows a coverage check, not a guaranteed volume promise.',
  },
  {
    q: 'Do I need to be VAT registered?',
    a: 'No. JobFilter is built for sole traders and small firms. No minimum turnover. No VAT requirement.',
  },
  {
    q: 'What trades do you cover?',
    a: 'Builders, electricians, EV charger installers, plumbers, gas engineers, roofers, scaffolders, decorators, landscapers, HVAC engineers, heat pump installers, solar PV installers, fire safety engineers, groundworkers, data cabling contractors, structural engineers, CCTV and security installers, and quantity surveyors.',
  },
  {
    q: 'Where does your data come from?',
    a: 'Official UK public-opportunity sources that are enabled and healthy for the scan. Coverage differs by area and some planned sources require provider access. Internal sample records are never allowed into production results.',
  },
  {
    q: 'Is my data safe?',
    a: 'We collect the minimum: name, trade, contact, postcode. We do not sell your data. We do not track your browsing. GDPR compliant. Right to deletion anytime.',
  },
];

export function FaqPage() {
  return (
    <main className="page-shell grid gap-8 py-8 pb-24">
      {/* Hero */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">FAQ</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-6xl">
          QUESTIONS? STRAIGHT ANSWERS.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-bold text-white/85">
          JobFilter qualifies current Find a Tender public works notices for 5–25-person contractors. Here are the straight answers on how it works, what it costs and what to expect.
        </p>
      </section>

      {/* FAQ Grid */}
      <section className="jf-box bg-white p-8">
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b-2 border-[var(--line)] pb-6 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <span className="micro-label text-[var(--yellow)] shrink-0 mt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="headline text-xl">{faq.q}</h3>
                  <p className="mt-2 text-base font-bold text-[var(--muted)] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free Scan CTA */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">READY TO TRY IT?</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">SCAN CURRENT FIND A TENDER NOTICES — FREE.</h2>
        <p className="mt-3 max-w-xl text-lg font-bold text-white/85">
          Check current coverage for your trade and region before deciding whether the pilot fits your firm. No card needed for the free scan.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">SCAN FREE — NO CARD NEEDED →</Link>
          <Link href="/pricing" className="jf-button bg-white text-[var(--ink)]">CHECK PRICING →</Link>
        </div>
        <p className="mt-3 text-sm font-black text-white/60">Coverage varies by trade, region and timing. An empty result is honest — not a failure.</p>
      </section>

      {/* Still Have Questions */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <h2 className="headline text-3xl">STILL HAVE QUESTIONS?</h2>
        <p className="mt-3 max-w-xl text-lg font-bold text-[var(--ink)]/80">
          Email us directly. Real person. No chatbot. We reply same day.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="mailto:support@jobfilter.uk" className="jf-button bg-[var(--navy)] text-white inline-flex items-center gap-2">
            <Mail size={18} strokeWidth={2.5} />
            EMAIL SUPPORT
          </a>
          <Link href="/trust" className="jf-button bg-white text-[var(--ink)]">
            TRUST CENTER →
          </Link>
        </div>
      </section>
    </main>
  );
}
