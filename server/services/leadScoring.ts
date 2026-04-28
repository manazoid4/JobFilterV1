import type { ContractsFinderNotice } from './contractsFinder';
import { keywordsForTrade } from './contractsFinder';

export function scoreNotice(notice: ContractsFinderNotice, trade: string, outward: string, region: string) {
  const text = `${notice.title} ${notice.description}`.toLowerCase();
  const keywordHits = keywordsForTrade(trade).filter((keyword) => text.includes(keyword)).length;
  const keywordScore = Math.min(35, keywordHits * 12);
  const cpvScore = notice.cpvCodes.length ? 15 : 0;
  const freshnessScore = scoreFreshness(notice.publishedAt);
  const valueScore = notice.value ? Math.min(20, Math.round(notice.value / 25000)) : 0;
  const locationScore = scoreLocation(notice, outward, region);
  const score = Math.max(25, Math.min(100, keywordScore + cpvScore + freshnessScore + valueScore + locationScore));
  const sourceConfidence = Math.max(55, Math.min(95, 50 + keywordScore + cpvScore + (notice.url ? 10 : 0)));

  return { score, sourceConfidence };
}

function scoreFreshness(value: string) {
  const published = new Date(value).getTime();
  if (!published) return 5;
  const days = (Date.now() - published) / 86_400_000;
  if (days <= 7) return 20;
  if (days <= 21) return 14;
  if (days <= 45) return 8;
  return 3;
}

function scoreLocation(notice: ContractsFinderNotice, outward: string, region: string) {
  const location = `${notice.location} ${notice.postcode}`.toUpperCase();
  if (notice.postcode.toUpperCase().startsWith(outward)) return 20;
  if (region !== 'United Kingdom' && location.includes(region.toUpperCase())) return 12;
  if (location.includes('UNITED KINGDOM')) return 5;
  return 0;
}
