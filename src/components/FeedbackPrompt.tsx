import { Mail } from 'lucide-react';

const feedbackSubject = encodeURIComponent('JobFilter feedback from a tradesman');
const feedbackBody = encodeURIComponent(
  "Tell us what is wasting your time, what leads are rubbish, and what JobFilter should fix for your trade.\n\nTrade:\nArea:\nBiggest problem:\nWhat would make JobFilter worth paying for:\nPhone, if you want a reply:\n"
);

export function FeedbackPrompt({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`ops-panel bg-white text-[var(--ink)] ${compact ? 'p-4' : 'p-5 md:p-6'}`}>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="micro-label text-[var(--orange)]">TELL US STRAIGHT</p>
          <h2 className={`headline mt-2 leading-none ${compact ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            WE WANT YOUR FEEDBACK.
          </h2>
          <p className="mt-2 max-w-3xl text-base font-black leading-snug text-[var(--muted)] md:text-lg">
            We are not some techy company guessing from a desk. Tell us what wastes your time, what jobs you want more of, and what we can build to solve your problems.
          </p>
        </div>
        <a
          className="jf-button bg-[var(--yellow)] text-[var(--ink)]"
          href={`mailto:contact@jobfilter.uk?subject=${feedbackSubject}&body=${feedbackBody}`}
        >
          <Mail size={18} strokeWidth={3} />
          Email Feedback
        </a>
      </div>
    </aside>
  );
}
