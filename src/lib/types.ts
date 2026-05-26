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
  qualityLabel?: 'GOLD' | 'SILVER' | 'BRONZE' | 'CHECK' | 'SKIP';
  ghostRisk?: 'READY' | 'MAYBE' | 'WASTE';
  leadReadiness?: 'READY' | 'MAYBE' | 'WASTE';
  recommendedAction?: string;
  quoteFloor?: string;
  followUpCadence?: string[];
  evidenceBadges?: string[];
  signalStack?: string[];
  signalClass?: string;
  fusionKey?: string;
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
  distanceMiles?: number;
  isCommercial?: boolean;
  qualityLabel?: 'GOLD' | 'SILVER' | 'BRONZE' | 'CHECK' | 'SKIP';
  ghostRisk?: 'READY' | 'MAYBE' | 'WASTE';
  leadReadiness?: 'READY' | 'MAYBE' | 'WASTE';
  recommendedAction?: string;
  quoteFloor?: string;
  followUpCadence?: string[];
  evidenceBadges?: string[];
  signalStack?: string[];
  signalClass?: string;
  fusionKey?: string;
  readiness?: 'READY' | 'MAYBE' | 'WASTE';
  evidenceCount?: number;
  whyNow?: string;
  sourceUrls?: string[];
  updatedAt?: string;
};

export type SourceStats = {
  fetched?: number;
  passed?: number;
  dropped?: number;
  failed?: boolean;
  error?: string;
  latencyMs?: number;
  readiness?: 'live' | 'key-required' | 'disabled' | 'demo';
};

export type LeadSearchResponse = {
  ok: boolean;
  source: 'contracts_finder' | 'lead_engine' | 'start_signal_engine';
  count: number;
  region: string;
  outward: string;
  leads: Lead[];
  lockedCount?: number;
  accessMode?: string;
  sources?: Record<string, SourceStats>;
  sourceHealth?: Record<string, SourceStats>;
  persistence?: {
    stored: boolean;
    count: number;
    provider: string;
    error?: string;
  };
  errors: string[];
};

export type ChaseStage = 'not_contacted' | 'contacted' | 'following_up' | 'won' | 'lost';

export type NudgeEvent = {
  id: string;
  stage: ChaseStage;
  templateKey: string;
  message: string;
  sentAt: string;
  channel: 'whatsapp' | 'draft';
};

export type ChaseLead = {
  leadId: string;
  leadTitle: string;
  trade: string;
  location: string;
  estimatedValue: string;
  score: number;
  stage: ChaseStage;
  firstSeenAt: string;
  lastContactAt: string | null;
  nextNudgeAt: string | null;
  nudges: NudgeEvent[];
  notes: string;
  coldOutreachNeeded: boolean;
};

export type LostReason = 'price' | 'timing' | 'competition' | 'not_interested' | 'went_elsewhere' | 'other';

export type WinJob = {
  id: string;
  leadId: string;
  title: string;
  trade: string;
  location: string;
  value: number;
  wonAt: string;
  source: 'chase' | 'manual';
};

export type LostJob = {
  id: string;
  leadId: string;
  title: string;
  trade: string;
  location: string;
  estimatedValue: string;
  lostAt: string;
  reason: LostReason;
  notes?: string;
  source: 'chase' | 'manual';
};

export type WinEngineData = {
  wins: WinJob[];
  losses: LostJob[];
};

export type MessageTemplate = {
  key: string;
  label: string;
  stage: ChaseStage;
  timing: string;
  body: string;
  purpose: string;
};
