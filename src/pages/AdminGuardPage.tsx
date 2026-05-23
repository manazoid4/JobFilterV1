"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

import {
  type AdminProfile,
  type Deadline,
  type AdminScore,
  type TradeType,
  type SaStatus,
  type PaymentsOnAccount,
  type AccountantStatus,
  type Incomeband,
  type ReminderTiming,
  getDeadlines,
  getNextDeadline,
  calculateAdminScore,
  getMtdMessage,
  getMonthlyChecklist,
  ACCOUNTANT_CHECKLIST,
  downloadIcs,
  loadProfile,
  saveProfile,
  isPaidUser,
} from '../lib/adminGuard';

const DEFAULT_PROFILE: AdminProfile = {
  tradeType: 'sole_trader',
  saStatus: 'yes',
  paymentsOnAccount: 'not_sure',
  accountant: 'no',
  incomeBand: 'not_sure',
  reminderTiming: '14',
};

export function AdminGuardPage() {
  const paid = isPaidUser();
  const [profile, setProfile] = useState<AdminProfile>(loadProfile() ?? DEFAULT_PROFILE);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [adminScore, setAdminScore] = useState<AdminScore>({ score: 0, label: 'Needs attention', colour: 'var(--yellow)' });
  const [nextDeadline, setNextDeadline] = useState<Deadline | null>(null);
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [activeTab, setActiveTab] = useState<'deadlines' | 'checklist' | 'accountant'>('deadlines');

  const recompute = useCallback((p: AdminProfile) => {
    const dls = getDeadlines(p);
    setDeadlines(dls);
    setAdminScore(calculateAdminScore(p, dls));
    setNextDeadline(getNextDeadline(dls));
  }, []);

  useEffect(() => {
    recompute(profile);
  }, [profile, recompute]);

  function updateProfile(patch: Partial<AdminProfile>) {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      saveProfile(next);
      return next;
    });
  }

  function handleDownloadIcs() {
    downloadIcs(deadlines, profile.reminderTiming);
  }

  function handleCopyAccountantList() {
    const text = ACCOUNTANT_CHECKLIST.map((item) => `• ${item}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedChecklist(true);
      setTimeout(() => setCopiedChecklist(false), 2000);
    });
  }

  if (!paid) {
    return <LockedState />;
  }

  const monthlyChecklist = getMonthlyChecklist(profile);
  const mtdMessage = getMtdMessage(profile.incomeBand);

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      {/* Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="micro-label text-[var(--yellow)]">TRADE COMMAND CENTRE</p>
              <span className="bg-[var(--yellow)] px-2 py-0.5 text-[10px] font-black text-[var(--ink)] uppercase tracking-widest">
                PAID MEMBER
              </span>
            </div>
            <h1 className="headline mt-2 text-4xl leading-none sm:text-6xl">ADMIN GUARD</h1>
            <p className="mt-3 max-w-2xl font-black text-white/80">
              HMRC dates, trade admin checklists and reminder exports — built into your dashboard.
            </p>
            <p className="mt-1 text-xs font-bold text-white/75">
              No NI number. No UTR. No tax bill details. Just reminders and organisation.
            </p>
          </div>
          <Link href="/dashboard" className="jf-button bg-white/10 text-white text-sm border-white/20 shadow-none hover:bg-white/20">
            ← DASHBOARD
          </Link>
        </div>
      </section>

      {/* Admin Readiness Score */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--muted)]">ADMIN READINESS</p>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-shrink-0 text-center">
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center border-4"
              style={{ borderColor: adminScore.colour }}
            >
              <span className="headline text-4xl" style={{ color: adminScore.colour }}>
                {adminScore.score}
              </span>
            </div>
            <p className="mt-2 text-xs font-black uppercase tracking-widest" style={{ color: adminScore.colour }}>
              {adminScore.label}
            </p>
          </div>
          <div className="flex-1 grid gap-3">
            {nextDeadline ? (
              <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
                <p className="micro-label text-[var(--muted)]">NEXT DEADLINE</p>
                <p className="headline mt-1 text-xl leading-none">{nextDeadline.title}</p>
                <p className="mt-1 text-sm font-black text-[var(--muted)]">
                  {nextDeadline.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' '}·{' '}
                  {nextDeadline.daysUntil === 0
                    ? 'TODAY'
                    : nextDeadline.daysUntil < 0
                    ? `${Math.abs(nextDeadline.daysUntil)} days ago`
                    : `${nextDeadline.daysUntil} days away`}
                </p>
                <p className="mt-2 text-xs font-bold text-[var(--muted)]">{nextDeadline.appliesTo}</p>
              </div>
            ) : (
              <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
                <p className="font-black text-[var(--muted)]">No upcoming deadlines found — complete your setup below.</p>
              </div>
            )}
            <p className="text-xs font-bold text-[var(--muted)]">
              Score improves as you complete your setup and deadlines pass.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Form */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--muted)]">YOUR SETUP</p>
        <h2 className="headline mt-1 text-2xl leading-none">TELL US YOUR SITUATION</h2>
        <p className="mt-2 text-sm font-bold text-[var(--muted)]">
          Used only to show the deadlines and checklists that apply to you.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <RadioGroup
            label="What best describes your setup?"
            value={profile.tradeType}
            options={[
              { value: 'sole_trader', label: 'Sole trader' },
              { value: 'cis_sub', label: 'CIS subcontractor' },
              { value: 'ltd_director', label: 'Limited company director' },
              { value: 'landlord', label: 'Landlord / property income' },
              { value: 'small_company', label: 'Small trade company' },
              { value: 'not_sure', label: 'Not sure' },
            ]}
            onChange={(v) => updateProfile({ tradeType: v as TradeType })}
          />

          <RadioGroup
            label="Registered for Self Assessment?"
            value={profile.saStatus}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'not_sure', label: 'Not sure' },
            ]}
            onChange={(v) => updateProfile({ saStatus: v as SaStatus })}
          />

          <div>
            <RadioGroup
              label="Payments on account?"
              value={profile.paymentsOnAccount}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'not_sure', label: 'Not sure' },
              ]}
              onChange={(v) => updateProfile({ paymentsOnAccount: v as PaymentsOnAccount })}
            />
            <p className="mt-2 text-xs font-bold text-[var(--muted)]">
              Payments on account are advance payments HMRC may ask for towards your next tax bill.
            </p>
          </div>

          <RadioGroup
            label="Do you use an accountant?"
            value={profile.accountant}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'sometimes', label: 'Sometimes' },
              { value: 'planning', label: 'Planning to get one' },
            ]}
            onChange={(v) => updateProfile({ accountant: v as AccountantStatus })}
          />

          <div>
            <RadioGroup
              label="Self-employed / property income band?"
              value={profile.incomeBand}
              options={[
                { value: 'over_50k', label: 'Over £50,000' },
                { value: 'over_30k', label: 'Over £30,000' },
                { value: 'over_20k', label: 'Over £20,000' },
                { value: 'under_20k', label: 'Under £20,000' },
                { value: 'not_sure', label: 'Not sure' },
              ]}
              onChange={(v) => updateProfile({ incomeBand: v as Incomeband })}
            />
            <p className="mt-2 text-xs font-bold text-[var(--muted)]">
              Used only to show Making Tax Digital reminders. JobFilter does not calculate your tax.
            </p>
          </div>

          <RadioGroup
            label="When do you want reminders?"
            value={profile.reminderTiming}
            options={[
              { value: '7', label: '7 days before' },
              { value: '14', label: '14 days before' },
              { value: '30', label: '30 days before' },
              { value: 'all', label: 'All reminders' },
            ]}
            onChange={(v) => updateProfile({ reminderTiming: v as ReminderTiming })}
          />
        </div>

        <div className="mt-6 border-t-2 border-[var(--line)] pt-4">
          <p className="text-xs font-bold text-[var(--muted)]">
            Email reminders are being connected. Download calendar reminders for now.
          </p>
        </div>
      </section>

      {/* Tab: Deadlines / Checklist / Accountant */}
      <section className="jf-box overflow-hidden bg-white">
        <div className="flex border-b-2 border-[var(--line)]">
          {(['deadlines', 'checklist', 'accountant'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition ${
                activeTab === tab
                  ? 'bg-[var(--ink)] text-[var(--yellow)]'
                  : 'bg-white text-[var(--muted)] hover:bg-[var(--bg-main)]'
              }`}
            >
              {tab === 'deadlines' ? 'Deadlines' : tab === 'checklist' ? 'Monthly Checklist' : 'Accountant Pack'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'deadlines' && (
            <DeadlinesTab deadlines={deadlines} onDownload={handleDownloadIcs} />
          )}
          {activeTab === 'checklist' && <ChecklistTab items={monthlyChecklist} />}
          {activeTab === 'accountant' && (
            <AccountantTab onCopy={handleCopyAccountantList} copied={copiedChecklist} />
          )}
        </div>
      </section>

      {/* MTD Check */}
      <section className="jf-box bg-[var(--steel)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">MAKING TAX DIGITAL</p>
        <h2 className="headline mt-1 text-2xl leading-none">MTD CHECK</h2>
        <p className="mt-3 font-black text-white/90 max-w-2xl">{mtdMessage}</p>
        <p className="mt-3 text-xs font-bold text-white/75">
          Dates based on GOV.UK guidance. Always verify before filing or paying.
        </p>
        <a
          href="https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax"
          target="_blank"
          rel="noopener noreferrer"
          className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)] text-sm"
        >
          CHECK GOV.UK →
        </a>
      </section>

      {/* Calendar Export */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">CALENDAR EXPORT</p>
        <h2 className="headline mt-1 text-2xl leading-none text-[var(--ink)]">DOWNLOAD YOUR REMINDER DATES</h2>
        <p className="mt-3 font-black text-[var(--ink)] max-w-2xl">
          Download an .ics calendar file with your relevant HMRC deadlines. Opens in Google Calendar, Apple Calendar, Outlook — anything that reads .ics.
        </p>
        <p className="mt-1 text-xs font-bold text-[var(--ink)]/70">
          Reminders set to:{' '}
          {{ '7': '7 days before', '14': '14 days before', '30': '30 days before', all: '30, 14, 7 and 1 day before' }[profile.reminderTiming]}
          . Change above to update.
        </p>
        <button onClick={handleDownloadIcs} className="jf-button mt-4 bg-[var(--ink)] text-white">
          DOWNLOAD CALENDAR FILE →
        </button>
        <p className="mt-3 text-xs font-bold text-[var(--ink)]/60">
          Each calendar event includes: "JobFilter Admin Guard reminder. This is a general reminder only, not tax or accounting advice. Always check GOV.UK or speak to an accountant."
        </p>
      </section>

      {/* Locked future modules */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--muted)]">TRADE COMMAND CENTRE</p>
        <h2 className="headline mt-1 text-2xl leading-none">COMING NEXT</h2>
        <p className="mt-2 text-sm font-bold text-[var(--muted)]">More admin guard modules are being built for paid members.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {LOCKED_MODULES.map((mod) => (
            <div key={mod.id} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4 opacity-70">
              <div className="flex items-center justify-between">
                <p className="micro-label text-[var(--muted)]">{mod.label}</p>
                <span className="bg-[var(--steel)] px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-widest">
                  COMING SOON
                </span>
              </div>
              <p className="headline mt-2 text-lg leading-none">{mod.title}</p>
              <p className="mt-1 text-xs font-bold text-[var(--muted)]">{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="jf-box bg-[var(--offwhite)] p-5">
        <p className="text-xs font-bold text-[var(--muted)] leading-relaxed">
          <strong>Important:</strong> This is a reminder and organisation tool only. It is not tax, legal or accounting
          advice. Always check GOV.UK or speak to a qualified accountant before filing or paying tax. JobFilter does not
          ask for your National Insurance number, UTR, bank details or tax bill. Dates based on GOV.UK guidance — always
          verify before acting.
        </p>
      </section>
    </main>
  );
}

// --- Sub-components ---

function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-sm font-black text-[var(--ink)] mb-2">{label}</p>
      <div className="grid gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-3 border-2 px-3 py-2 text-left text-sm font-black transition ${
              value === opt.value
                ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                : 'border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'
            }`}
          >
            <span
              className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                value === opt.value ? 'border-[var(--yellow)] bg-[var(--yellow)]' : 'border-[var(--muted)] bg-white'
              }`}
            />
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DeadlinesTab({ deadlines, onDownload }: { deadlines: Deadline[]; onDownload: () => void }) {
  const relevant = deadlines.filter((d) => d.relevant);
  const other = deadlines.filter((d) => !d.relevant);

  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    upcoming: { bg: 'bg-[var(--navy)]', text: 'text-white', label: 'UPCOMING' },
    due_soon: { bg: 'bg-[var(--orange)]', text: 'text-white', label: 'DUE SOON' },
    passed: { bg: 'bg-[var(--steel-2)]', text: 'text-white', label: 'PASSED' },
    next_cycle: { bg: 'bg-[var(--muted)]', text: 'text-white', label: 'NEXT CYCLE' },
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <p className="micro-label text-[var(--muted)]">DEADLINE TIMELINE</p>
          <h3 className="headline mt-1 text-xl leading-none">YOUR RELEVANT DATES</h3>
        </div>
        <button onClick={onDownload} className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
          DOWNLOAD CALENDAR →
        </button>
      </div>

      {relevant.length === 0 && (
        <p className="text-sm font-bold text-[var(--muted)]">
          Complete your setup above to see your relevant deadlines.
        </p>
      )}

      <div className="grid gap-3">
        {relevant.map((dl) => {
          const cfg = statusConfig[dl.status] ?? statusConfig.upcoming;
          return (
            <DeadlineCard key={dl.id} dl={dl} cfg={cfg} />
          );
        })}
      </div>

      {other.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-xs font-black text-[var(--muted)] uppercase tracking-widest hover:text-[var(--ink)]">
            Show all deadlines ({other.length} not relevant to your setup)
          </summary>
          <div className="mt-3 grid gap-3 opacity-60">
            {other.map((dl) => {
              const cfg = statusConfig[dl.status] ?? statusConfig.upcoming;
              return <DeadlineCard key={dl.id} dl={dl} cfg={cfg} />;
            })}
          </div>
        </details>
      )}

      <p className="mt-4 text-xs font-bold text-[var(--muted)]">
        Dates based on GOV.UK guidance. Always verify at gov.uk before filing or paying tax.
      </p>
    </div>
  );
}

function DeadlineCard({
  dl,
  cfg,
}: {
  dl: Deadline;
  cfg: { bg: string; text: string; label: string };
}) {
  const [expanded, setExpanded] = useState(false);

  function handleCopyDate() {
    const dateStr = dl.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    navigator.clipboard.writeText(`${dl.title}: ${dateStr}`);
  }

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--bg-main)]">
      <div
        className="flex flex-wrap items-start justify-between gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${cfg.bg} ${cfg.text}`}>
              {cfg.label}
            </span>
            <span className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest">
              {dl.sourceLabel}
            </span>
          </div>
          <p className="headline text-lg leading-none">{dl.title}</p>
          <p className="mt-1 text-sm font-black text-[var(--muted)]">
            {dl.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            {dl.daysUntil >= 0 ? ` · ${dl.daysUntil} days away` : ` · ${Math.abs(dl.daysUntil)} days ago`}
          </p>
          <p className="mt-0.5 text-xs font-bold text-[var(--muted)]">{dl.appliesTo}</p>
        </div>
        <span className="text-[var(--muted)] text-lg font-black select-none">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="border-t-2 border-[var(--line)] p-4 bg-white">
          <p className="text-sm font-bold text-[var(--muted)]">{dl.explanation}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={handleCopyDate} className="jf-button bg-white text-[var(--ink)] text-xs">
              COPY DATE
            </button>
            <a
              href="https://www.gov.uk/self-assessment-tax-returns/deadlines"
              target="_blank"
              rel="noopener noreferrer"
              className="jf-button bg-[var(--navy)] text-white text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              GOV.UK →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function ChecklistTab({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function toggle(i: number) {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="micro-label text-[var(--muted)]">MONTHLY TRADE ADMIN</p>
          <h3 className="headline mt-1 text-xl leading-none">THIS MONTH'S CHECKLIST</h3>
        </div>
        <div className="text-right">
          <p className="headline text-2xl leading-none">{doneCount}/{items.length}</p>
          <p className="text-xs font-black text-[var(--muted)]">done</p>
        </div>
      </div>

      <div className="grid gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-start gap-3 border-2 p-3 text-left text-sm font-black transition ${
              checked[i]
                ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--muted)] line-through'
                : 'border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'
            }`}
          >
            <span
              className={`mt-0.5 h-4 w-4 shrink-0 border-2 flex items-center justify-center ${
                checked[i] ? 'border-[var(--green)] bg-[var(--green)]' : 'border-[var(--muted)] bg-white'
              }`}
            >
              {checked[i] && <span className="text-white text-[10px] font-black">✓</span>}
            </span>
            {item}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs font-bold text-[var(--muted)]">
        Checklist adapts to your setup. Resets each session — tick as you go.
      </p>
    </div>
  );
}

function AccountantTab({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <p className="micro-label text-[var(--muted)]">ACCOUNTANT HANDOFF</p>
          <h3 className="headline mt-1 text-xl leading-none">WHAT TO SEND YOUR ACCOUNTANT</h3>
        </div>
        <button
          onClick={onCopy}
          className={`jf-button text-sm ${copied ? 'bg-[var(--green)] text-white' : 'bg-[var(--yellow)] text-[var(--ink)]'}`}
        >
          {copied ? 'COPIED ✓' : 'COPY LIST →'}
        </button>
      </div>
      <div className="grid gap-2">
        {ACCOUNTANT_CHECKLIST.map((item, i) => (
          <div key={i} className="flex items-start gap-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
            <span className="mt-0.5 h-4 w-4 shrink-0 border-2 border-[var(--muted)] bg-white" />
            <p className="text-sm font-black text-[var(--ink)]">{item}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-bold text-[var(--muted)]">
        Copy this list and share it with your accountant at handoff time. PDF export coming soon.
      </p>
    </div>
  );
}

function LockedState() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      <section className="jf-box bg-[var(--ink)] p-8 text-white text-center">
        <p className="micro-label text-[var(--yellow)]">TRADE COMMAND CENTRE</p>
        <h1 className="headline mt-2 text-4xl sm:text-6xl leading-none">ADMIN GUARD</h1>
        <p className="mt-4 max-w-xl mx-auto font-black text-white/80 text-lg">
          HMRC dates, trade admin checklists and reminder exports — for paid JobFilter members.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border-2 border-[var(--yellow)]/40 bg-[var(--yellow)]/10 px-4 py-2">
          <span className="text-[var(--yellow)] text-lg">🔒</span>
          <span className="font-black text-[var(--yellow)] text-sm uppercase tracking-widest">Paid Member Feature</span>
        </div>
        <p className="mt-6 max-w-lg mx-auto text-sm font-bold text-white/60">
          Don't let admin ambush your trade business. Set the reminders once. Get back to pricing real jobs.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] jf-button-lg">
            SEE PRICING →
          </Link>
          <Link href="/features/admin-guard" className="jf-button bg-white/10 text-white border-white/20 shadow-none">
            PREVIEW FEATURE
          </Link>
        </div>
      </section>

      {/* Preview cards - blurred/locked */}
      <div className="relative">
        <div className="grid gap-4 sm:grid-cols-2 blur-sm pointer-events-none select-none opacity-50">
          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--muted)]">ADMIN READINESS</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="h-20 w-20 border-4 border-[var(--green)] flex items-center justify-center">
                <span className="headline text-3xl text-[var(--green)]">85</span>
              </div>
              <div>
                <p className="headline text-xl">On track</p>
                <p className="text-sm font-bold text-[var(--muted)]">Online return: 234 days away</p>
              </div>
            </div>
          </div>
          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--muted)]">NEXT DEADLINE</p>
            <p className="headline mt-2 text-xl">Second Payment on Account</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">31 July 2026 · 74 days away</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-2 border-[var(--yellow)] bg-[var(--ink)] px-6 py-4 text-center shadow-[4px_4px_0_var(--yellow)]">
            <p className="headline text-xl text-white">UNLOCK WITH PAID PLAN</p>
            <Link href="/pricing" className="jf-button mt-3 bg-[var(--yellow)] text-[var(--ink)] text-sm block">
              GET ACCESS →
            </Link>
          </div>
        </div>
      </div>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--muted)]">WHAT YOU GET</p>
        <h2 className="headline mt-1 text-2xl">ADMIN GUARD INCLUDES</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            'Self Assessment deadline tracker',
            'Making Tax Digital check',
            'CIS-aware monthly checklist',
            'Accountant handoff pack',
            'Calendar reminder export (.ics)',
            'Lead follow-up prompts',
            'Admin readiness score',
            'Connected to your JobFilter pipeline',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
              <span className="text-[var(--yellow)] font-black">→</span>
              <p className="text-sm font-black">{item}</p>
            </div>
          ))}
        </div>
        <Link href="/pricing" className="jf-button mt-6 bg-[var(--ink)] text-white block text-center">
          BECOME A PAID MEMBER →
        </Link>
      </section>
    </main>
  );
}

const LOCKED_MODULES = [
  {
    id: 'insurance',
    label: 'ADMIN GUARD',
    title: 'Insurance Renewal Guard',
    description: 'Track your public liability, tool and van insurance renewal dates.',
  },
  {
    id: 'mot',
    label: 'ADMIN GUARD',
    title: 'Van MOT Guard',
    description: 'Never miss a van MOT or service date. Set reminders in one place.',
  },
  {
    id: 'gas_safe',
    label: 'ADMIN GUARD',
    title: 'Gas Safe / NICEIC Renewal',
    description: 'Track trade body registrations and certification renewals.',
  },
  {
    id: 'invoice',
    label: 'ADMIN GUARD',
    title: 'Invoice Chase Guard',
    description: 'Automatic reminders for unpaid invoices past your payment terms.',
  },
  {
    id: 'quotes',
    label: 'ADMIN GUARD',
    title: 'Quote Expiry Tracker',
    description: 'Know when your quotes are about to expire before leads go cold.',
  },
  {
    id: 'vat',
    label: 'ADMIN GUARD',
    title: 'VAT Return Reminder',
    description: 'Quarterly VAT return dates if you are VAT-registered.',
  },
];
