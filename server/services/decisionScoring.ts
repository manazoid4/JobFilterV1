export type IntakeScoreInput = {
  jobType: string;
  urgency: 'Emergency' | 'This week' | 'Later';
  details: string;
  postcode: string;
  hasPhotos: boolean;
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

  return {
    score: Math.max(0, Math.min(100, score)),
    flags: flags.slice(0, 4),
  };
}
