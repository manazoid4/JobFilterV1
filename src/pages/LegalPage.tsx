const copy = {
  privacy: {
    title: 'PRIVACY POLICY',
    lines: [
      'We collect waitlist details you submit: name, trade, email or phone.',
      'We use that to contact you about JobFilter.',
      'We do not sell your details.',
      'Lead data may be processed to score and filter job requests.',
      'Ask us to delete your data by contacting JobFilter.',
    ],
  },
  terms: {
    title: 'TERMS',
    lines: [
      'Use JobFilter to filter work enquiries and check public job data.',
      'Do not submit false, illegal, or abusive requests.',
      'Free tools are guidance, not financial advice.',
      'Paid plans can be cancelled anytime.',
      'Public lead data depends on source availability.',
    ],
  },
};

export function LegalPage({ type }: { type: keyof typeof copy }) {
  const page = copy[type];
  return (
    <main className="page-shell py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-6">
        <h1 className="headline text-5xl">{page.title}</h1>
        <div className="mt-6 grid gap-4">
          {page.lines.map((line) => (
            <p key={line} className="text-lg font-black text-[var(--muted)]">{line}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
