import type { ChaseLead, NudgeEvent, ChaseStage } from './types';

const KEY = 'jobfilter.chase';

export function getChaseLeads(): ChaseLead[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ChaseLead[]) : [];
  } catch {
    return [];
  }
}

export function saveChaseLead(lead: ChaseLead) {
  const existing = getChaseLeads();
  const idx = existing.findIndex((l) => l.leadId === lead.leadId);
  if (idx >= 0) {
    existing[idx] = lead;
  } else {
    existing.unshift(lead);
  }
  localStorage.setItem(KEY, JSON.stringify(existing));
}

export function updateChaseStage(leadId: string, stage: ChaseStage) {
  const leads = getChaseLeads();
  const updated = leads.map((l) => {
    if (l.leadId !== leadId) return l;
    const now = new Date().toISOString();
    return {
      ...l,
      stage,
      lastContactAt: now,
      nextNudgeAt: stage === 'following_up' ? calcNextNudge(now, l.nudges.length) : null,
    };
  });
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function addNudgeEvent(leadId: string, event: NudgeEvent) {
  const leads = getChaseLeads();
  const updated = leads.map((l) => {
    if (l.leadId !== leadId) return l;
    const now = new Date().toISOString();
    return {
      ...l,
      nudges: [...l.nudges, event],
      lastContactAt: now,
      nextNudgeAt: calcNextNudge(now, l.nudges.length + 1),
    };
  });
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function removeChaseLead(leadId: string) {
  const leads = getChaseLeads().filter((l) => l.leadId !== leadId);
  localStorage.setItem(KEY, JSON.stringify(leads));
}

export function importLeadToChase(lead: {
  id: string;
  title: string;
  trade: string;
  location: string;
  estimatedValue: string;
  score: number;
}): ChaseLead {
  const now = new Date().toISOString();
  const chaseLead: ChaseLead = {
    leadId: lead.id,
    leadTitle: lead.title,
    trade: lead.trade,
    location: lead.location,
    estimatedValue: lead.estimatedValue,
    score: lead.score,
    stage: 'not_contacted',
    firstSeenAt: now,
    lastContactAt: null,
    nextNudgeAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    nudges: [],
    notes: '',
  };
  saveChaseLead(chaseLead);
  return chaseLead;
}

function calcNextNudge(now: string, nudgeCount: number): string | null {
  const base = new Date(now).getTime();
  if (nudgeCount === 0) return new Date(base + 2 * 60 * 60 * 1000).toISOString();
  if (nudgeCount === 1) return new Date(base + 24 * 60 * 60 * 1000).toISOString();
  if (nudgeCount === 2) return new Date(base + 48 * 60 * 60 * 1000).toISOString();
  return null;
}
