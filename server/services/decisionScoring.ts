export type IntakeScoreInput = {
  jobType: string;
  urgency: 'Emergency' | 'This week' | 'Later';
  details: string;
  postcode: string;
  hasPhotos: boolean;
  budget?: string;
};

export function scoreIntake(input: IntakeScoreInput) {
  const flags: string[] = [];
  let score = 40;

  if (input.urgency === 'Emergency') {
    score += 30;
    flags.push('Urgent');
  } else if (input.urgency === 'This week') {
    score += 20;
    flags.push('Urgent');
  }

  if (input.postcode.trim()) {
    score += 20;
    flags.push('Local');
  }

  if (input.hasPhotos) {
    score += 10;
    flags.push('Photos');
  }

  const text = input.details.toLowerCase();
  if (text.length >= 20) {
    flags.push('Clear');
  } else {
    score -= 20;
    flags.push('Risk');
  }

  if (text.includes('cheap') || text.includes('low budget') || text.includes('small budget')) {
    score -= 50;
    flags.push('Budget');
  }

  if (input.budget === 'Under £500') {
    score = 0;
    flags.push('Budget');
  } else if (input.budget === '£500–£2,000') {
    score += 5;
    flags.push('GoodBudget');
  } else if (input.budget === '£2,000–£5,000') {
    score += 15;
    flags.push('GoodBudget');
  } else if (input.budget === '£5,000+') {
    score += 25;
    flags.push('GoodBudget');
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const tier = finalScore >= 80 ? 'GOLD' : finalScore >= 50 ? 'SILVER' : 'BIN';

  return {
    score: finalScore,
    flags: flags.slice(0, 4),
    tier,
  };
}
