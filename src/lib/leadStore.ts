import type { LeadDecision } from './types';

const KEY = 'jobfilter.leads';

export function getStoredLeads(): LeadDecision[] {
  try {
    const raw = (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(KEY);
    return raw ? JSON.parse(raw) as LeadDecision[] : [];
  } catch {
    return [];
  }
}

export function saveStoredLead(lead: LeadDecision) {
  const next = [lead, ...getStoredLeads().filter((item) => item.id !== lead.id)];
  (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(KEY, JSON.stringify(next));
}

export function updateStoredLead(id: string, patch: Partial<LeadDecision>) {
  const next = getStoredLeads().map((lead) => lead.id === id ? { ...lead, ...patch } : lead);
  (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(KEY, JSON.stringify(next));
}

export function countTodayLeads() {
  const today = new Date().toISOString().slice(0, 10);
  return getStoredLeads().filter((lead) => lead.createdAt.startsWith(today)).length;
}
