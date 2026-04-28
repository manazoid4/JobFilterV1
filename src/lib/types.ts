export type Trade = 'plumbing' | 'electrical' | 'roofing' | 'building';

export type DecisionFlag = 'Local' | 'Urgent' | 'Photos' | 'Clear' | 'Risk' | 'Budget';

export type LeadDecision = {
  id: string;
  title: string;
  score: number;
  jobType: string;
  urgency: 'Emergency' | 'This week' | 'Later';
  postcode: string;
  area: string;
  flags: DecisionFlag[];
  details?: string;
  phone?: string;
  status: 'new' | 'saved' | 'ignored';
  createdAt: string;
};

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
  tradeMatch: Trade;
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
