import type { ContractsFinderNotice } from './contractsFinder';
import { keywordsForTrade } from './contractsFinder';

export function scoreNotice(notice: ContractsFinderNotice, trade: string, outward: string, region: string) {
  const text = `${notice.title} ${notice.description}`.toLowerCase();
  const keywordHits = keywordsForTrade(trade).filter((keyword) => text.includes(keyword)).length;
  const keywordScore = Math.min(20, keywordHits * 8);
  const cpvScore = notice.cpvCodes.length ? 14 : 0;
  const urgencyScore = scoreUrgency(notice.deadlineAt, notice.publishedAt);
  const valueScore = scoreValue(notice.value);
  const locationScore = scoreLocation(notice, outward, region);
  const completenessScore = scoreCompleteness(notice);
  const reasons = buildReasons(notice, keywordHits, locationScore, urgencyScore, valueScore, completenessScore);
  const score = Math.max(20, Math.min(100, keywordScore + cpvScore + urgencyScore + valueScore + locationScore + completenessScore));
  const sourceConfidence = Math.max(55, Math.min(96, 52 + keywordScore + cpvScore + (notice.url ? 8 : 0) + (notice.buyer ? 6 : 0)));

  return {
    score,
    sourceConfidence,
    urgency: urgencyFromScores(notice.deadlineAt, notice.publishedAt, notice.value),
    contactSignal: contactSignalFor(notice),
    reasons,
  };
}

function scoreUrgency(deadlineValue: string, publishedValue: string) {
  const deadline = new Date(deadlineValue).getTime();
  if (deadline) {
    const daysLeft = (deadline - Date.now()) / 86_400_000;
    if (daysLeft >= 0 && daysLeft <= 7) return 22;
    if (daysLeft <= 21) return 16;
    if (daysLeft <= 45) return 10;
  }

  const freshness = scoreFreshness(publishedValue);
  return Math.min(12, freshness);
}

function scoreFreshness(value: string) {
  const published = new Date(value).getTime();
  if (!published) return 4;
  const days = (Date.now() - published) / 86_400_000;
  if (days <= 7) return 12;
  if (days <= 21) return 8;
  if (days <= 45) return 5;
  return 2;
}

function scoreValue(value?: number) {
  if (!value) return 0;
  if (value >= 25_000 && value <= 250_000) return 18;
  if (value >= 5_000 && value < 25_000) return 12;
  if (value > 250_000) return 8;
  return 4;
}

function scoreLocation(notice: ContractsFinderNotice, outward: string, region: string) {
  const location = `${notice.location} ${notice.postcode}`.toUpperCase();
  if (notice.postcode.toUpperCase().startsWith(outward)) return 20;
  if (region !== 'United Kingdom' && location.includes(region.toUpperCase())) return 14;
  if (location.includes('UNITED KINGDOM')) return 5;
  return 0;
}

function scoreCompleteness(notice: ContractsFinderNotice) {
  let score = 0;
  if (notice.buyer) score += 5;
  if (notice.url) score += 4;
  if (notice.value) score += 4;
  if (notice.deadlineAt) score += 4;
  if (notice.location || notice.postcode) score += 3;
  if (notice.description.length >= 80) score += 3;
  return Math.min(18, score);
}

function urgencyFromScores(deadlineValue: string, publishedValue: string, value?: number): 'high' | 'medium' | 'low' {
  const deadline = new Date(deadlineValue).getTime();
  if (deadline) {
    const daysLeft = (deadline - Date.now()) / 86_400_000;
    if (daysLeft >= 0 && daysLeft <= 10) return 'high';
    if (daysLeft <= 30) return 'medium';
  }

  const published = new Date(publishedValue).getTime();
  const daysOld = published ? (Date.now() - published) / 86_400_000 : 99;
  if (daysOld <= 7 && (value ?? 0) >= 25_000) return 'high';
  if (daysOld <= 21 || (value ?? 0) >= 50_000) return 'medium';
  return 'low';
}

function contactSignalFor(notice: ContractsFinderNotice): 'strong' | 'weak' | 'none' {
  if (notice.buyer && notice.url && notice.deadlineAt) return 'strong';
  if (notice.buyer || notice.url) return 'weak';
  return 'none';
}

function buildReasons(
  notice: ContractsFinderNotice,
  keywordHits: number,
  locationScore: number,
  urgencyScore: number,
  valueScore: number,
  completenessScore: number,
) {
  const reasons: string[] = [];
  if (urgencyScore >= 16) reasons.push('Deadline soon');
  if (valueScore >= 18) reasons.push('High value');
  if (locationScore >= 14) reasons.push(locationScore === 20 ? 'Outward postcode match' : 'Local region');
  if (notice.url) reasons.push('Official source');
  if (notice.buyer) reasons.push('Buyer named');
  if (notice.cpvCodes.length) reasons.push('CPV trade match');
  if (keywordHits) reasons.push('Trade keywords found');
  if (completenessScore < 10) reasons.push('Low detail risk');
  return reasons.slice(0, 6);
}
