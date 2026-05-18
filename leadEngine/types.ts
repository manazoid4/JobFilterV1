export type TradeKey = 'plumbing' | 'electrical' | 'roofing' | 'building' | 'carpentry' | 'painting' | 'hvac' | 'landscaping' | 'all';
export type Urgency = 'low' | 'medium' | 'high';
export type ContactSignal = 'none' | 'weak' | 'strong';
export type LeadStatus = 'new' | 'saved' | 'ignored' | 'closed' | 'cancelled';
export type Tier = 'free' | 'paid';

export interface Lead {
  id: string;
  title: string;
  trade: TradeKey | string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  urgency: Urgency;
  source: string;
  sourceConfidence: number;
  sourceUrl?: string;
  contactSignal: ContactSignal;
  status: LeadStatus;
  description?: string;
  publishedAt?: string;
  deadlineAt?: string;
  buyerName?: string;
  cpvCodes?: string[];
  score?: number;
  scoreReasons?: string[];
  distanceMiles?: number;
  isCommercial?: boolean;
  fusionKey?: string;
  signalStack?: string[];
  signalClass?: 'homeowner_retrofit' | 'active_site' | 'commercial_fitout' | 'distressed_property' | 'public_contract' | 'internal_fallback';
  qualityLabel?: 'GOLD' | 'SILVER' | 'BRONZE' | 'CHECK' | 'SKIP';
  ghostRisk?: 'READY' | 'MAYBE' | 'WASTE';
  recommendedAction?: string;
  evidenceBadges?: string[];
}

export interface LeadStoreEntry {
  leads: Lead[];
  cachedAt: number;
  region: string;
}

export interface ScanResult {
  leads: Lead[];
  total: number;
  region: string;
  outward: string;
  lockedCount: number;
  sources: Record<string, SourceStats>;
  sourceHealth: Record<string, SourceHealth>;
  errors: string[];
}

export interface SourceStats {
  fetched: number;
  passed: number;
  dropped: number;
  failed: boolean;
  error?: string;
}

export interface SourceHealth {
  fetched: number;
  passed: number;
  dropped: number;
  failed: boolean;
  error?: string;
  latencyMs?: number;
  readiness: 'live' | 'key-required' | 'disabled' | 'demo';
}

export interface RawLead {
  rawId: string;
  rawTitle: string;
  rawDescription: string;
  rawTrade?: TradeKey;
  rawValue?: number;
  rawValueMin?: number;
  rawValueMax?: number;
  rawLocation?: string;
  rawPostcode?: string;
  rawDeadline?: string;
  rawPublished?: string;
  rawBuyer?: string;
  rawCpvCodes?: string[];
  rawContact?: { name?: string; phone?: string; email?: string };
  sourceSystem: string;
  sourceUrl?: string;
}
