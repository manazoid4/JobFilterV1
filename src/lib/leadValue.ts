type LeadValueSource = {
  score: number;
  urgency: 'high' | 'medium' | 'low' | 'Emergency' | 'This week' | 'Later';
  sourceConfidence?: number;
  recommendedAction?: string;
  quoteFloor?: string;
  followUpCadence?: string[];
  estimatedValue?: string;
  budget?: string;
};

export type LeadValueKit = {
  quoteFloorLabel: string;
  quoteFloorNote: string;
  followUpCadence: string[];
  nextAction: string;
};

export function getLeadValueKit(lead: LeadValueSource): LeadValueKit {
  const moneyText = 'estimatedValue' in lead ? lead.estimatedValue : lead.budget;
  const quoteFloorLabel = lead.quoteFloor ?? buildQuoteFloorLabel(moneyText, lead.score, lead.urgency, lead.sourceConfidence);
  const followUpCadence = lead.followUpCadence ?? buildFollowUpCadence(lead.score, lead.urgency);
  const nextAction = lead.recommendedAction ?? buildNextAction(lead.score, lead.urgency);

  return {
    quoteFloorLabel,
    quoteFloorNote: moneyText ? 'Based on the lead value band and current score.' : 'Based on score, urgency, and source strength.',
    followUpCadence,
    nextAction,
  };
}

export function buildQuoteFloorLabel(
  valueText: string | undefined,
  score: number,
  urgency: LeadValueSource['urgency'],
  sourceConfidence = 0,
): string {
  const parsed = parseMoneyBand(valueText);
  if (!parsed) {
    return score >= 80 ? 'Use your normal floor and call fast' : 'Wait for scope before pricing hard';
  }

  const baseRatio = score >= 90 ? 0.78 : score >= 80 ? 0.72 : score >= 65 ? 0.64 : 0.56;
  const urgencyBoost = urgency === 'Emergency' || urgency === 'high' ? 0.04 : urgency === 'This week' || urgency === 'medium' ? 0.01 : -0.03;
  const confidenceBoost = sourceConfidence >= 80 ? 0.03 : sourceConfidence >= 60 ? 0.01 : -0.02;
  const ratio = clamp(baseRatio + urgencyBoost + confidenceBoost, 0.45, 0.9);
  const floor = Math.round(parsed * ratio / 50) * 50;

  return formatMoney(floor);
}

export function buildFollowUpCadence(score: number, urgency: LeadValueSource['urgency']): string[] {
  if (score >= 85) {
    return [
      urgency === 'Emergency' || urgency === 'high' ? 'Call within 24 hours' : 'Call today',
      'Send the quote the same day',
      'Recheck after 3 days if silent',
    ];
  }

  if (score >= 65) {
    return [
      'Call within 24 hours',
      'Confirm budget and decision maker',
      'Check back in 4 days',
    ];
  }

  return [
    'Verify scope before a visit',
    'Hold the quote until budget is clearer',
    'Revisit in a week if the lead stays live',
  ];
}

export function buildNextAction(score: number, urgency: LeadValueSource['urgency']): string {
  if (score >= 85 || urgency === 'Emergency' || urgency === 'high') {
    return 'Call within 24 hours';
  }
  if (score >= 65 || urgency === 'This week' || urgency === 'medium') {
    return 'Verify by phone before quoting';
  }
  return 'Do not spend site-visit time yet';
}

function parseMoneyBand(valueText: string | undefined): number | null {
  if (!valueText) return null;
  const cleaned = valueText.replace(/[, ]+/g, '').toLowerCase();
  const matches = cleaned.match(/\d+(?:\.\d+)?(?:k|m)?/g);
  if (!matches || matches.length === 0) return null;

  const values = matches.map((part) => {
    const multiplier = part.endsWith('m') ? 1_000_000 : part.endsWith('k') ? 1_000 : 1;
    const numeric = parseFloat(part.replace(/[km]$/, ''));
    return Number.isFinite(numeric) ? numeric * multiplier : 0;
  }).filter((value) => value > 0);

  if (values.length === 0) return null;
  return values.length === 1 ? values[0] : values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
