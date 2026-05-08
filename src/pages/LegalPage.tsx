const copy = {
  privacy: {
    title: 'PRIVACY POLICY',
    sections: [
      { heading: 'What we collect', body: 'We collect information you provide when joining our waitlist or using JobFilter: your name, trade, email address or phone number, and postcode. When you use the lead scanner, we process your search inputs (postcode and trade type) to return results.' },
      { heading: 'How we use it', body: 'We use your contact details to send you information about JobFilter, including lead alerts, service updates, and account information. We use your search data solely to operate the lead engine and improve result quality. We do not sell your data to third parties.' },
      { heading: 'WhatsApp alerts', body: 'If you opt into WhatsApp alerts, your number is used to deliver lead notifications via Twilio. You can opt out at any time by replying STOP.' },
      { heading: 'Your rights (UK GDPR)', body: 'You have the right to access, correct, or delete your personal data at any time. You can request a copy of your data or ask us to stop processing it. Contact us at the details below.' },
      { heading: 'Data retention', body: 'Waitlist data is kept until you ask us to remove it. Lead scan inputs are not stored beyond the session. If you become a paying customer, account data is kept for the duration of your subscription plus 12 months.' },
      { heading: 'Cookies', body: 'JobFilter uses no tracking cookies. We do not use Google Analytics or any third-party analytics on this site. We may use a single session cookie for functional purposes only.' },
      { heading: 'Contact', body: 'To exercise any rights or ask about your data: contact@jobfilter.uk. We respond within 5 business days.' },
    ],
  },
  terms: {
    title: 'TERMS OF USE',
    sections: [
      { heading: 'Service', body: 'JobFilter provides a lead filtering and scoring service for UK tradesmen. Lead data is sourced from publicly available government and commercial databases. We do not guarantee the accuracy or availability of any specific lead.' },
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
              <p className="mt-2 text-lg font-black text-[var(--muted)]">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
