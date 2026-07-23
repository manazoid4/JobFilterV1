"use client";
const copy = {
  privacy: {
    title: 'PRIVACY POLICY',
    sections: [
      { heading: 'What we collect', body: 'We collect information you provide when joining our waitlist or using JobFilter: your name, company, trade, email address or phone number, postcode, alert settings and opportunity outcomes. Scanner searches and delivery records may be stored to operate, secure and evaluate the service.' },
      { heading: 'How we use it', body: 'We use account and search data to authenticate you, qualify public-work opportunities, deliver requested alerts, manage billing, prevent abuse and measure product reliability. We do not sell your personal data.' },
      { heading: 'Service providers', body: 'JobFilter uses Supabase for authentication and application data, Stripe for billing, Resend for email, Vercel for hosting and privacy-conscious analytics, and—only after explicit opt-in—Meta WhatsApp Cloud API for approved message templates. These providers process the minimum data needed for their role.' },
      { heading: 'WhatsApp alerts', body: 'Proactive WhatsApp alerts remain disabled unless you explicitly opt in and an approved Meta template is configured. You can withdraw consent or opt out at any time; an opt-out stops future proactive WhatsApp delivery.' },
      { heading: 'Your rights (UK GDPR)', body: 'You have the right to access, correct, or delete your personal data at any time. You can request a copy of your data or ask us to stop processing it. Contact us at the details below.' },
      { heading: 'Data retention', body: 'Account, alert, outcome and delivery records are kept while your account is active and normally for up to 12 months after cancellation, unless a shorter deletion request or a legal billing/fraud-retention duty applies. Raw delivery errors and message content are minimised. Waitlist data is removed on request.' },
      { heading: 'Cookies and analytics', body: 'JobFilter uses essential Supabase session cookies. Vercel Analytics collects limited aggregated usage measurements; JobFilter does not use Google Analytics or sell behavioural profiles.' },
      { heading: 'Contact', body: 'To exercise any rights or ask about your data: contact@jobfilter.uk. We respond within 5 business days.' },
    ],
  },
  terms: {
    title: 'TERMS OF USE',
    sections: [
      { heading: 'Service', body: 'JobFilter qualifies public-work opportunities for UK contractors using public procurement data, including Find a Tender. Find a Tender access and its own saved-search alerts are free; JobFilter charges for additional company-aware qualification, workflow and evidence. We do not guarantee the accuracy, availability or award of any opportunity.' },
      { heading: 'Acceptable use', body: 'You may use JobFilter to find and evaluate work opportunities relevant to your trade. You may not submit false information, use the service to harass third parties, or attempt to reverse-engineer the scoring system.' },
      { heading: 'Free tools', body: 'Free calculators and tools are provided for guidance only. Results are estimates, not financial advice.' },
      { heading: 'Paid plans', body: 'Paid plans can be cancelled at any time. No cancellation fee. Cancellation stops future billing; it does not refund a current billing period.' },
      { heading: 'Liability', body: 'JobFilter is not liable for decisions made based on lead data. All lead signals are sourced from public records and scored automatically. Verify any lead before committing time or materials.' },
      { heading: 'Changes', body: 'We may update these terms. Continued use of JobFilter after changes are posted means you accept the updated terms.' },
    ],
  },
};

export function LegalPage({ type }: { type: keyof typeof copy }) {
  const page = copy[type];
  return (
    <main className="page-shell py-8 pb-8">
      <section className="jf-box bg-white p-6">
        <h1 className="headline text-4xl sm:text-5xl">{page.title}</h1>
        <div className="mt-6 grid gap-4">
          {page.sections.map((section) => (
            <section key={section.heading} className="border-t-2 border-[var(--line)] pt-4">
              <h2 className="headline text-2xl">{section.heading}</h2>
              <p className="mt-2 text-lg font-bold text-[var(--muted)]">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
