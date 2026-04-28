export type Trade = 'plumbing' | 'electrical' | 'roofing' | 'building';

export type Lead = {
  id: string;
  title: string;
  buyerName: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  deadlineAt?: string;
  sourceUrl?: string;
  source: string;
  sourceConfidence: number;
  score?: number;
  urgency?: 'low' | 'medium' | 'high';
  contactSignal?: 'none' | 'weak' | 'strong';
};

export type LeadSearchResponse = {
  total: number;
  region: string;
  outward: string;
  lockedCount?: number;
  leads: Lead[];
  errors: string[];
};
