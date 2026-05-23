import type { ContractsFinderNotice } from './contractsFinder.js';
import { scoreNotice } from './leadScoring.js';
import { outwardFromPostcode } from '../utils/postcode.js';

export type NormalizedLead = {
  id: string;
  title: string;
  trade: string;
  buyer: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  urgency: 'high' | 'medium' | 'low';
  publishedAt: string;
  deadlineAt: string;
  url: string;
  source: 'Contracts Finder';
  sourceConfidence: number;
  contactSignal: 'strong' | 'weak' | 'none';
  status: 'new';
  reasons: string[];
  revenueTier: 'gold' | 'worth-checking' | 'low-signal';
  tradeMatch: string;
  score: number;
};

export function normalizeNotice(notice: ContractsFinderNotice, trade: string, outward: string, region: string): NormalizedLead {
  const { score, sourceConfidence, urgency, contactSignal, reasons } = scoreNotice(notice, trade, outward, region);
  return {
    id: `cf-${slug(notice.id || notice.ocid || notice.title)}`,
    title: notice.title,
    trade,
    buyer: notice.buyer,
    location: notice.location || region || 'United Kingdom',
    postcodeOutward: outwardFromPostcode(notice.postcode) || outward,
    estimatedValue: formatValue(notice.value),
    urgency,
    publishedAt: normalizeDate(notice.publishedAt),
    deadlineAt: normalizeDate(notice.deadlineAt),
    url: notice.url,
    source: 'Contracts Finder',
    sourceConfidence,
    contactSignal,
    status: 'new',
    reasons,
    revenueTier: score >= 80 ? 'gold' : score >= 55 ? 'worth-checking' : 'low-signal',
    tradeMatch: trade,
    score,
  };
}

function formatValue(value?: number) {
  if (!value) return 'Unknown';
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
