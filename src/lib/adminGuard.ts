// Admin Guard: All tax deadline logic, scoring, checklist and ICS generation.
// GOV.UK sources used for dates - these are reminders only, not tax advice.

export type TradeType = 'sole_trader' | 'cis_sub' | 'ltd_director' | 'landlord' | 'small_company' | 'not_sure';
export type SaStatus = 'yes' | 'no' | 'not_sure';
export type PaymentsOnAccount = 'yes' | 'no' | 'not_sure';
export type AccountantStatus = 'yes' | 'no' | 'sometimes' | 'planning';
export type Incomeband = 'over_50k' | 'over_30k' | 'over_20k' | 'under_20k' | 'not_sure';
export type ReminderTiming = '7' | '14' | '30' | 'all';

export interface AdminProfile {
  tradeType: TradeType;
  saStatus: SaStatus;
  paymentsOnAccount: PaymentsOnAccount;
  accountant: AccountantStatus;
  incomeBand: Incomeband;
  reminderTiming: ReminderTiming;
  email?: string;
}

export type DeadlineStatus = 'upcoming' | 'due_soon' | 'passed' | 'next_cycle';

export interface Deadline {
  id: string;
  title: string;
  date: Date;
  appliesTo: string;
  explanation: string;
  sourceLabel: string;
  status: DeadlineStatus;
  daysUntil: number;
  relevant: boolean;
}

// --- Current tax cycle: filing 2025/26 tax year (today = May 2026) ---

const TODAY = new Date();

function daysFromToday(d: Date): number {
  return Math.ceil((d.getTime() - TODAY.getTime()) / 86_400_000);
}

function getStatus(d: Date): DeadlineStatus {
  const days = daysFromToday(d);
  if (days < 0) return 'passed';
  if (days <= 7) return 'due_soon';
  if (days <= 30) return 'due_soon';
  return 'upcoming';
}

const ALL_DEADLINES: Omit<Deadline, 'status' | 'daysUntil' | 'relevant'>[] = [
  {
    id: 'sa_register',
    title: 'Register for Self Assessment',
    date: new Date(2026, 9, 5), // 5 October 2026
    appliesTo: 'Sole traders, landlords, CIS subcontractors — new to SA',
    explanation:
      'If you started self-employment or received untaxed income in the 2025/26 tax year, you must tell HMRC by 5 October 2026. Missing this can lead to a penalty.',
    sourceLabel: 'GOV.UK — Self Assessment deadlines',
  },
  {
    id: 'paper_return',
    title: 'Paper Tax Return Deadline',
    date: new Date(2026, 9, 31), // 31 October 2026
    appliesTo: 'Anyone filing a paper Self Assessment return',
    explanation:
      'If you file your 2025/26 Self Assessment on paper rather than online, the deadline is 31 October 2026. Most tradespeople file online.',
    sourceLabel: 'GOV.UK — Self Assessment deadlines',
  },
  {
    id: 'online_return',
    title: 'Online Tax Return Deadline',
    date: new Date(2027, 0, 31), // 31 January 2027
    appliesTo: 'Anyone with a Self Assessment obligation',
    explanation:
      'Your 2025/26 tax return must be filed online by midnight 31 January 2027. Missing this triggers an automatic £100 penalty, with further daily penalties after 3 months.',
    sourceLabel: 'GOV.UK — Self Assessment deadlines',
  },
  {
    id: 'tax_payment',
    title: 'Tax Payment Deadline',
    date: new Date(2027, 0, 31), // 31 January 2027
    appliesTo: 'Anyone with a Self Assessment tax bill',
    explanation:
      'Any outstanding tax for 2025/26 must be paid by 31 January 2027. Interest charges apply from the day after this deadline.',
    sourceLabel: 'GOV.UK — Self Assessment deadlines',
  },
  {
    id: 'poa_first',
    title: 'First Payment on Account',
    date: new Date(2027, 0, 31), // 31 January 2027
    appliesTo: 'Sole traders / self-employed with a tax bill over £1,000',
    explanation:
      'Payments on account are advance payments towards your next tax year\'s bill. The first is due 31 January. HMRC sets this automatically if your bill is over £1,000 and less than 80% was collected via PAYE.',
    sourceLabel: 'GOV.UK — Payments on account',
  },
  {
    id: 'poa_second',
    title: 'Second Payment on Account',
    date: new Date(2026, 6, 31), // 31 July 2026
    appliesTo: 'Sole traders / self-employed with payments on account set up',
    explanation:
      'The second payment on account for the 2025/26 tax year is due 31 July 2026. Check your HMRC online account for the amount.',
    sourceLabel: 'GOV.UK — Payments on account',
  },
  {
    id: 'mtd_50k',
    title: 'Making Tax Digital — Start Date (£50k+)',
    date: new Date(2026, 3, 6), // 6 April 2026
    appliesTo: 'Self-employed / landlords with qualifying income over £50,000',
    explanation:
      'If your qualifying income was over £50,000, MTD for Income Tax applies from 6 April 2026. You need compatible software and must send quarterly updates to HMRC. Check GOV.UK or speak to your accountant.',
    sourceLabel: 'GOV.UK — Making Tax Digital for Income Tax',
  },
  {
    id: 'mtd_30k',
    title: 'Making Tax Digital — Start Date (£30k+)',
    date: new Date(2027, 3, 6), // 6 April 2027
    appliesTo: 'Self-employed / landlords with qualifying income over £30,000',
    explanation:
      'MTD for Income Tax is planned for those with qualifying income over £30,000 from 6 April 2027. Check GOV.UK for confirmation or speak to your accountant.',
    sourceLabel: 'GOV.UK — Making Tax Digital for Income Tax',
  },
  {
    id: 'mtd_20k',
    title: 'Making Tax Digital — Start Date (£20k+)',
    date: new Date(2028, 3, 6), // 6 April 2028
    appliesTo: 'Self-employed / landlords with qualifying income over £20,000',
    explanation:
      'MTD for Income Tax is planned for those with qualifying income over £20,000 from 6 April 2028. Check GOV.UK for confirmation or speak to your accountant.',
    sourceLabel: 'GOV.UK — Making Tax Digital for Income Tax',
  },
];

function isRelevant(dl: Omit<Deadline, 'status' | 'daysUntil' | 'relevant'>, profile: AdminProfile): boolean {
  const { id, date } = dl;

  if (id === 'poa_first' || id === 'poa_second') {
    return profile.paymentsOnAccount !== 'no';
  }
  if (id === 'sa_register') {
    return profile.saStatus === 'no' || profile.saStatus === 'not_sure';
  }
  if (id === 'mtd_50k') return profile.incomeBand === 'over_50k';
  if (id === 'mtd_30k') return profile.incomeBand === 'over_30k' || profile.incomeBand === 'over_50k';
  if (id === 'mtd_20k') return profile.incomeBand === 'over_20k' || profile.incomeBand === 'over_30k' || profile.incomeBand === 'over_50k';
  if (id === 'paper_return') return false; // most tradespeople file online

  return true;
}

export function getDeadlines(profile: AdminProfile): Deadline[] {
  return ALL_DEADLINES.map((dl) => {
    const days = daysFromToday(dl.date);
    return {
      ...dl,
      daysUntil: days,
      status: getStatus(dl.date),
      relevant: isRelevant(dl, profile),
    };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getNextDeadline(deadlines: Deadline[]): Deadline | null {
  return (
    deadlines
      .filter((d) => d.relevant && d.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil)[0] ?? null
  );
}

export type AdminScore = {
  score: number;
  label: 'On track' | 'Needs attention' | 'Deadline close' | 'Action needed';
  colour: string;
};

export function calculateAdminScore(profile: AdminProfile, deadlines: Deadline[]): AdminScore {
  let score = 100;

  if (profile.saStatus === 'no' || profile.saStatus === 'not_sure') score -= 20;
  if (profile.accountant === 'no' && profile.paymentsOnAccount === 'not_sure') score -= 10;
  if (profile.paymentsOnAccount === 'not_sure') score -= 10;
  if (profile.incomeBand === 'not_sure') score -= 10;
  if (!profile.reminderTiming) score -= 10;

  const next = getNextDeadline(deadlines);
  if (next) {
    if (next.daysUntil <= 7) score -= 25;
    else if (next.daysUntil <= 30) score -= 15;
  }

  score = Math.max(0, Math.min(100, score));

  let label: AdminScore['label'];
  let colour: string;
  if (score >= 80) { label = 'On track'; colour = 'var(--green)'; }
  else if (score >= 60) { label = 'Needs attention'; colour = 'var(--yellow)'; }
  else if (score >= 40) { label = 'Deadline close'; colour = 'var(--orange)'; }
  else { label = 'Action needed'; colour = 'var(--orange)'; }

  return { score, label, colour };
}

export function getMtdMessage(band: Incomeband): string {
  switch (band) {
    case 'over_50k':
      return 'You may need to use Making Tax Digital for Income Tax from 6 April 2026. If you have qualifying income over £50,000, check GOV.UK or speak to your accountant now.';
    case 'over_30k':
      return 'Making Tax Digital for Income Tax is planned from 6 April 2027 for qualifying income over £30,000. Check GOV.UK or speak to your accountant before then.';
    case 'over_20k':
      return 'Making Tax Digital for Income Tax is planned from 6 April 2028 for qualifying income over £20,000. Check GOV.UK for updates.';
    case 'under_20k':
      return 'MTD for Income Tax may not apply yet based on this income band, but check GOV.UK if your income increases.';
    default:
      return 'MTD for Income Tax is being phased in by income level. Check your qualifying income or speak to your accountant.';
  }
}

export function getMonthlyChecklist(profile: AdminProfile): string[] {
  const base = [
    'Gather all invoices issued this month',
    'Gather all receipts and expense records',
    'Check bank statements match your records',
    'Put money aside for your tax bill',
    'Chase any unpaid invoices',
    'Review quotes sent this month',
    'Follow up warm leads from the last 2 weeks',
    'Check your upcoming HMRC dates',
    'Download or save calendar reminders for deadlines',
  ];

  const cis = profile.tradeType === 'cis_sub'
    ? [
        'Collect CIS deduction statements from contractors',
        'Match CIS deductions to your payment records',
        'Keep evidence of contractor payments',
      ]
    : [];

  const noAccountant =
    profile.accountant === 'no' || profile.accountant === 'planning'
      ? [
          'Decide if you will file yourself or get an accountant this year',
          'Keep records cleaner than you think you need to',
          'Do not leave everything until January',
        ]
      : profile.accountant === 'sometimes'
      ? ['Send monthly records to your accountant if using one this year']
      : ['Send records or updates to your accountant if required'];

  const mtd =
    profile.incomeBand === 'over_50k' || profile.incomeBand === 'over_30k'
      ? [
          'Check if Making Tax Digital for Income Tax applies to you',
          'Check compatible MTD software with your accountant',
        ]
      : [];

  const leads = [
    'Review your most serious leads from this month',
    'Follow up any quotes that are more than 3 days old',
    'Mark tyre-kicker leads as low priority — focus on budget-confirmed jobs',
    'Chase jobs with a clear budget and timeline first',
  ];

  return [...base, ...cis, ...noAccountant, ...mtd, ...leads];
}

export const ACCOUNTANT_CHECKLIST = [
  'Sales invoices (all issued this period)',
  'Expense receipts',
  'Bank statements',
  'Mileage and fuel records',
  'CIS deduction statements (if applicable)',
  'Loan or finance records (if applicable)',
  'Previous tax return (if available)',
  'Any letters or notices from HMRC',
  'JobFilter job and lead export (if available)',
  'Notes on large material purchases',
  'List of unpaid invoices',
];

// --- ICS calendar generation (client-side) ---

function fmt(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

function buildVEvent(dl: Deadline, reminderDays: number[]): string {
  const start = new Date(dl.date);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0);

  const alarms = reminderDays
    .map(
      (days) =>
        `BEGIN:VALARM\r\nTRIGGER:-P${days}D\r\nACTION:DISPLAY\r\nDESCRIPTION:JobFilter Admin Guard — ${dl.title}\r\nEND:VALARM`
    )
    .join('\r\n');

  const desc =
    `${dl.explanation}\\n\\nJobFilter Admin Guard reminder. This is a general reminder only, not tax or accounting advice. Always check GOV.UK or speak to an accountant.`;

  return [
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${fmt(start).slice(0, 8)}`,
    `DTEND;VALUE=DATE:${fmt(end).slice(0, 8)}`,
    `DTSTAMP:${fmt(new Date())}Z`,
    `UID:jf-admin-${dl.id}-2026@jobfilter.co.uk`,
    `SUMMARY:${dl.title}`,
    `DESCRIPTION:${desc}`,
    alarms,
    'END:VEVENT',
  ].join('\r\n');
}

export function generateIcs(deadlines: Deadline[], timing: ReminderTiming): string {
  const reminderMap: Record<ReminderTiming, number[]> = {
    '7': [7],
    '14': [14],
    '30': [30],
    all: [30, 14, 7, 1],
  };
  const reminderDays = reminderMap[timing];

  const relevant = deadlines.filter((d) => d.relevant);
  const events = relevant.map((d) => buildVEvent(d, reminderDays)).join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JobFilter//Admin Guard//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:JobFilter Admin Guard — Tax Deadlines',
    events,
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs(deadlines: Deadline[], timing: ReminderTiming): void {
  const content = generateIcs(deadlines, timing);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'jobfilter-admin-guard-deadlines.ics';
  a.click();
  URL.revokeObjectURL(url);
}

// --- Local storage persistence ---

const STORAGE_KEY = 'jf.adminGuard.profile';

export function loadProfile(): AdminProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: AdminProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function isPaidUser(): boolean {
  return localStorage.getItem('jobfilter.isPaid') === 'true';
}
