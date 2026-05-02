export type Trade = 'plumbing' | 'electrical' | 'roofing' | 'building' | 'carpentry' | 'painting' | 'hvac' | 'landscaping';
export type LeadUrgency = 'high' | 'medium' | 'low';
export type ContactSignal = 'strong' | 'weak' | 'none';
export type LiveLeadStatus = 'new' | 'saved' | 'ignored';
export type LeadDecisionStatus = 'new' | 'saved' | 'ignored' | 'won' | 'lost' | 'no_answer';

export type DecisionFlag = 'Local' | 'Urgent' | 'Photos' | 'Clear' | 'Risk' | 'Budget' | 'GoodBudget';

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
  budget?: string;
  tier?: 'GOLD' | 'SILVER' | 'BIN';
  status: LeadDecisionStatus;
  createdAt: string;
};

export type Lead = {
  id: string;
  title: string;
  trade: Trade | string;
  buyer?: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  urgency: LeadUrgency;
  publishedAt: string;
  deadlineAt: string;
  url: string;
  source: string;
  sourceConfidence: number;
  contactSignal: ContactSignal;
  status: LiveLeadStatus;
  reasons?: string[];
  revenueTier?: 'gold' | 'worth-checking' | 'low-signal';
  tradeMatch?: Trade;
  score: number;
};

export type LeadSearchResponse = {
  ok: boolean;
  source: 'contracts_finder' | 'lead_engine';
  count: number;
  region: string;
  outward: string;
  leads: Lead[];
  errors: string[];
};
