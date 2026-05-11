import { Link } from 'react-router-dom';

export function ActivationPendingPage() {
  return (
    <main className="page-shell py-10">
      <section className="ops-panel bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">PAYMENT RECEIVED</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">PATCHLOCK ACTIVATION PENDING.</h1>
        <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]">
          Your account is being activated. Next step: confirm your trade, postcode cluster, company details, WhatsApp number, and letterhead details.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">Run First Scan</Link>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/territories">View PatchLock</Link>
        </div>
      </section>
    </main>
  );
}
