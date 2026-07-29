"use client";
import Link from 'next/link';

import { ShieldCheck, Target, Database, Lock, FileText, CheckCircle, Mail, AlertTriangle, Crown, Medal, Trophy } from 'lucide-react';

const privacyPoints = [
  { label: 'What we collect', value: 'Name, trade, contact, postcode' },
  { label: 'What we do NOT collect', value: 'Financial info, location tracking, browsing history' },
  { label: 'Your rights', value: 'Access, delete, cancel anytime' },
  { label: 'Data retention', value: '12 months after cancellation' },
  { label: 'Third parties', value: 'We do not sell your data. Period.' },
];

const qualityFilterSteps = [
  {
    num: '01',
    title: 'Official data only',
    body: 'Find a Tender is the primary current procurement source — the UK government\'s official public procurement register. Additional verified public sources may appear in results where enabled. No scraped directories. No user-submitted enquiries.',
    icon: Database,
  },
  {
    num: '02',
    title: 'Firm-aware qualification',
    body: 'Results are filtered and scored against your trade, delivery region, contract range and delivery model — not served as a generic list.',
    icon: Target,
  },
  {
    num: '03',
    title: 'Evidence before commitment',
    body: 'You see buyer, scope, value, deadline and missing requirements before deciding whether to commit bid time. Gaps are shown, not hidden.',
    icon: FileText,
  },
  {
    num: '04',
    title: 'Honest empty results',
    body: 'If no current notices match your firm, the result is empty. That is a valid outcome — not a failure. Coverage varies by trade, region and timing.',
    icon: ShieldCheck,
  },
];

const sourcePoints = [
  'Find a Tender (FTS) — official UK public procurement register',
  'Notices from UK public buyers: councils, NHS trusts, housing associations',
  'CPV trade codes — buyer-defined, not assigned by JobFilter',
  'Published contract values and response deadlines',
  'Open Government Licence v3.0 data',
  'Official source links in paid results',
];

export function TrustCenterPage() {
  return (
    <main className="page-shell grid gap-8 py-8 pb-24">
      {/* 1. Hero */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">TRUST CENTER</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-6xl">
          FIND A TENDER IS FREE AND PUBLIC.<br />
          JOBFILTER QUALIFIES WHAT'S IN IT.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-bold text-white/80">
          We do not control public tender notices, gate them, or sell access to them. Find a Tender is the UK government's official procurement register. JobFilter compares current notices against your firm's trade, region and evidence — and produces a BID, WATCH, SUBCONTRACT or SKIP decision.
        </p>
        <p className="mt-4 max-w-2xl text-lg font-bold text-white/80">
          Every opportunity in a result is accessible through its official public route. You pay for qualification and workflow, never privileged access.
        </p>
      </section>

      {/* 2. Decision Tiers */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">DECISION TIERS</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          BID. WATCH. SUBCONTRACT. SKIP.
        </h2>
        <p className="mt-4 max-w-2xl copy">
          Every qualified notice produces one of four decisions. The score (0–100) backs the decision — it does not replace your judgement or promise an award.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'BID', score: 'GOLD 80+', action: 'Evidence and contact route support a direct bid. Verify requirements before committing time.', color: 'bg-[var(--green)]/10 border-[var(--green)]', textColor: 'text-[var(--green)]', icon: Trophy },
            { label: 'WATCH', score: 'Score 30–79, or GOLD without contact path', action: 'Notice matched but missing evidence or contact route. Verify before committing bid time.', color: 'bg-[var(--yellow)]/10 border-[var(--yellow)]', textColor: 'text-[var(--ink)]', icon: Medal },
            { label: 'SUBCONTRACT', score: 'Large or awarded', action: 'Too large or already awarded for a direct bid — route in via the principal contractor.', color: 'bg-[var(--navy)]/10 border-[var(--navy)]', textColor: 'text-[var(--navy)]', icon: AlertTriangle },
            { label: 'SKIP', score: 'Below 30', action: 'Insufficient evidence for this opportunity. Move on — empty results save bid time.', color: 'bg-[var(--orange)]/10 border-[var(--orange)]', textColor: 'text-[var(--orange)]', icon: Crown },
          ].map(({ label, score, action, color, textColor, icon: Icon }) => (
            <div key={label} className={`jf-box border-2 p-5 ${color}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} strokeWidth={3} className={textColor} />
                <p className={`micro-label ${textColor}`}>{label}</p>
              </div>
              <p className="text-xs font-black text-[var(--muted)] uppercase mb-2">{score}</p>
              <p className="text-sm font-bold text-[var(--ink)]">{action}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 jf-box bg-[var(--bg-main)] p-6">
          <p className="micro-label text-[var(--muted)]">TRANSPARENCY NOTE</p>
          <p className="mt-2 font-bold text-[var(--muted)]">
            Every factor that contributed to the score is shown. You see what we see. The decision is qualification support — not a promise of work or an exclusive claim on the opportunity.
          </p>
        </div>
      </section>

      {/* 3. Data Source */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">DATA SOURCE</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          OFFICIAL SOURCE. OPEN LICENCE. NO MANUFACTURED INVENTORY.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-bold text-[var(--ink)]/75">
          JobFilter does not generate leads. It qualifies official public notices from Find a Tender and other enabled verified sources.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sourcePoints.map((point) => (
            <div key={point} className="flex items-center gap-3 jf-box bg-white p-4">
              <CheckCircle size={20} strokeWidth={3} className="text-[var(--green)] shrink-0" />
              <span className="font-black text-[var(--ink)] text-sm">{point}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border-2 border-[var(--ink)] bg-white">
          <p className="text-sm font-bold text-[var(--ink)]">
            Coverage is honest. An empty scan — when no current FTS notices match your trade and region — is a valid outcome, not a system failure. We show empty results rather than manufacturing volume.
          </p>
        </div>
      </section>

      {/* 4. Quality Filter */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">QUALIFICATION APPROACH</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          EVERY WASTED BID COSTS TIME AND OVERHEAD YOU DON'T GET BACK.
        </h2>
        <p className="mt-4 max-w-2xl copy">
          JobFilter qualifies before you commit bid time — not after you've spent hours on a tender that didn't fit.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {qualityFilterSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="jf-box bg-[var(--bg-main)] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-[var(--ink)] bg-[var(--yellow)]">
                    <Icon size={20} strokeWidth={2.5} className="text-[var(--ink)]" />
                  </div>
                  <div>
                    <p className="micro-label text-[var(--yellow)]">{step.num}</p>
                    <p className="headline text-lg">{step.title}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-bold text-[var(--muted)]">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Privacy */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">PRIVACY FIRST</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          WE COLLECT THE MINIMUM. YOU CONTROL THE REST.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {privacyPoints.map((point) => (
            <div key={point.label} className="border-2 border-white/20 p-4">
              <p className="micro-label text-[var(--yellow)]">{point.label}</p>
              <p className="mt-1 font-black text-white/90">{point.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border-2 border-[var(--green)] bg-[var(--green)]/10">
          <p className="text-sm font-black text-[var(--green)]">
            <Lock size={16} className="inline mr-2" />
            GDPR compliant. ICO registered. Right to erasure. Right to access. Right to portability.
          </p>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">VERIFY COVERAGE FIRST</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          SCAN THE CURRENT FEED BEFORE YOU PAY.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-bold text-[var(--ink)]/75">
          Check current coverage against your trade and region before activation. An honest empty result is better than manufactured volume.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/find-jobs" className="jf-button bg-[var(--ink)] text-white">
            SCAN FREE — NO CARD NEEDED →
          </Link>
          <Link href="/pricing" className="jf-button bg-white text-[var(--ink)]">
            CHECK PRICING →
          </Link>
        </div>
        <p className="mt-3 text-sm font-bold text-[var(--ink)]/70">Coverage varies by trade, region and timing. Check before committing.</p>
      </section>

      {/* 7. Contact */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">CONTACT</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          QUESTIONS? TALK TO US DIRECTLY.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-bold text-[var(--muted)]">
          No chatbots. No ticket systems. Direct contact with the team.
        </p>

        <div className="mt-8">
          <a href="mailto:support@jobfilter.uk" className="jf-box bg-[var(--bg-main)] p-5 flex items-center gap-3 hover:border-[var(--ink)]">
            <Mail size={24} strokeWidth={2.5} className="text-[var(--navy)]" />
            <div>
              <p className="headline text-lg">Email</p>
              <p className="text-sm font-black text-[var(--muted)]">support@jobfilter.uk — within 4 hours, Mon–Fri</p>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
