"use client";
import Link from 'next/link';

import { Mail } from 'lucide-react';

const faqs = [
  {
    q: 'What makes JobFilter different from Checkatrade or MyBuilder?',
    a: 'We do not sell shared leads. We scan verified official signals — planning approvals, energy efficiency data, and property information — and score every signal for intent. One trade partner per postcode. No bidding wars. No dead leads.',
  },
  {
    q: 'How does the lead scoring work?',
    a: 'Every signal scores 0–100 based on verified data: planning approval status, urgency, distance from your patch, estimated job value, and how closely it matches your trade. Leads land as GOLD (chase now), SILVER (worth watching), or BRONZE (add to quiet-week list). You see the evidence behind every score — not just a number.',
  },
  {
    q: 'What does GOLD, SILVER, BRONZE mean?',
    a: 'GOLD means first-mover window is open — most trades won\'t see this for 24–48 hours. Send a WhatsApp today. SILVER means the signal is verified but timing isn\'t confirmed. A two-minute call finds out if they\'re ready now. BRONZE means real signal, not urgent — revisit when your pipeline is light.',
  },
  {
    q: 'How fresh are the leads?',
    a: 'Most signals are detected within 24–48 hours of appearing on official registers. Planning approvals. Energy efficiency triggers. Business registrations. You get them before they appear on Checkatrade, Bark, or MyBuilder.',
  },
  {
    q: 'What do I actually get for £39/month?',
    a: 'WhatsApp alerts for GOLD leads, territory lock (one roofer per patch — no shared auction), full buyer context, quote floor estimate, six pre-written WhatsApp templates, pipeline tracking, and a 30-day money-back guarantee. Founder price locks in forever while your plan stays active.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts. No cancellation fees. Access continues until the end of your billing period.',
  },
  {
    q: 'What is the 30-day money-back guarantee?',
    a: 'Use JobFilter for 30 days. Set up your territory and WhatsApp alerts. View at least 10 scored leads. If you do not see one job worth quoting in that time, email us and we process the refund the same day. No forms, no argument.',
  },
  {
    q: 'How does territory exclusivity work?',
    a: 'One trade partner per postcode cluster per trade. If you lock B17 for roofing, no other roofer gets our leads in B17. You get first call on every signal.',
  },
  {
    q: 'Do I need to be VAT registered?',
    a: 'No. JobFilter is built for sole traders and small firms. No minimum turnover. No VAT requirement.',
  },
  {
    q: 'What trades do you cover?',
    a: 'Builders, electricians, plumbers, roofers, carpenters, painters, landscapers, HVAC, and heat pump installers.',
  },
  {
    q: 'Where does your data come from?',
    a: 'Verified official UK sources — planning approvals, energy signals, property ownership data, business registrations, and public contracts. All published under open government licences. We clean, score, and route the signals. You get ranked leads, not raw data.',
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
        <p className="mt-6 max-w-2xl text-lg font-black text-white/80">
          If you&apos;ve used Checkatrade, Bark, or MyBuilder and got burned — you probably have questions. Here are the straight answers.
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

      {/* Still Have Questions */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <h2 className="headline text-3xl">STILL HAVE QUESTIONS?</h2>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--ink)]/75">
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
