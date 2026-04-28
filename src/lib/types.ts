export type Trade = 'plumbing' | 'electrical' | 'roofing' | 'building';

export type Lead = {
  id: string;
  title: string;
  buyer: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  publishedAt: string;
  deadlineAt: string;
  url: string;
  source: string;
  sourceConfidence: number;
  tradeMatch: string;
  score: number;
};

export type LeadSearchResponse = {
  ok: boolean;
  source: 'contracts_finder';
  count: number;
  region: string;
  outward: string;
  leads: Lead[];
  errors: string[];
};
