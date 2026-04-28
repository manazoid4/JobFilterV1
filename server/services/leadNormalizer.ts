import type { ContractsFinderNotice } from './contractsFinder';
import { scoreNotice } from './leadScoring';
import { outwardFromPostcode } from '../utils/postcode';

export type NormalizedLead = {
  id: string;
  title: string;
  buyer: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  publishedAt: string;
  deadlineAt: string;
  url: string;
  source: 'Contracts Finder';
  sourceConfidence: number;
  tradeMatch: string;
  score: number;
};

export function normalizeNotice(notice: ContractsFinderNotice, trade: string, outward: string, region: string): NormalizedLead {
  const { score, sourceConfidence } = scoreNotice(notice, trade, outward, region);
  return {
    id: `cf-${slug(notice.id || notice.ocid || notice.title)}`,
    title: notice.title,
    buyer: notice.buyer,
    location: notice.location || region || 'United Kingdom',
    postcodeOutward: outwardFromPostcode(notice.postcode) || '',
    estimatedValue: formatValue(notice.value),
    publishedAt: normalizeDate(notice.publishedAt),
    deadlineAt: normalizeDate(notice.deadlineAt),
    url: notice.url,
    source: 'Contracts Finder',
    sourceConfidence,
    tradeMatch: trade,
    score,
  };
}

function formatValue(value?: number) {
  if (!value) return '';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}
