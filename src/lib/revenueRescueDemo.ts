export type RevenueRescueStage = {
  id: 'missed' | 'qualified' | 'quoted' | 'followed-up' | 'recovered';
  label: string;
  time: string;
  title: string;
  summary: string;
  evidence: string;
};

export const REVENUE_RESCUE_DEMO = {
  mode: 'simulation' as const,
  customer: 'Sarah Mitchell',
  firm: 'Oak & Ridge Roofing',
  job: 'Storm-damaged pitched roof',
  postcode: 'DE12',
  quoteMinorUnits: 348000,
  depositMinorUnits: 69600,
  currency: 'GBP' as const,
  stages: [
    {
      id: 'missed',
      label: 'Missed call',
      time: '09:12',
      title: 'The call was not answered',
      summary: 'A customer called while the owner was on a roof. The demo creates an enquiry and prepares a one-segment acknowledgement.',
      evidence: 'SIMULATED EVENT · No call or message has been sent',
    },
    {
      id: 'qualified',
      label: 'Qualified',
      time: '09:18',
      title: 'Enough detail to make a decision',
      summary: 'Roof damage, DE12, work needed this week, photos available and a £2,500–£4,000 budget range.',
      evidence: '5 required fields captured · Safety and opt-out rules passed',
    },
    {
      id: 'quoted',
      label: 'Quote sent',
      time: '10:04',
      title: 'A versioned quote is ready',
      summary: 'Quote v1 totals £3,480 including a £696 deposit. The customer would receive a secure acceptance link in the live product.',
      evidence: 'QUOTE v1 · £3,480.00 · Deposit £696.00',
    },
    {
      id: 'followed-up',
      label: 'Followed up',
      time: 'Next day',
      title: 'The quote did not disappear into a chat',
      summary: 'A bounded follow-up becomes due. In production it pauses immediately on reply, acceptance, decline or opt-out.',
      evidence: '1 reminder scheduled · 0 duplicate attempts · Budget protected',
    },
    {
      id: 'recovered',
      label: 'Recovered',
      time: '14:26',
      title: 'The customer accepted',
      summary: 'The accepted quote is attributed back to the original missed enquiry so the owner can see what progressed and why.',
      evidence: 'VALUE RECEIPT · £3,480 progressed · Source: missed enquiry',
    },
  ] satisfies RevenueRescueStage[],
};

export function clampDemoStage(index: number) {
  return Math.max(0, Math.min(Math.trunc(index), REVENUE_RESCUE_DEMO.stages.length - 1));
}

export function nextDemoStage(index: number) {
  return clampDemoStage(index + 1);
}

export function formatDemoMoney(minorUnits: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: REVENUE_RESCUE_DEMO.currency,
  }).format(minorUnits / 100);
}

