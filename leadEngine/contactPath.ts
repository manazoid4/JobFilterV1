import type { ContactPath, Lead } from './types';

const SCRIPTS = {
  planningAgentEmail:
    'Hi, I saw the planning record for this project and can help with the relevant trade package. If the applicant wants contractor pricing, I can send availability and examples of similar work.',
  compliantLetter:
    'Hello, I saw the public planning record for your property. If you are comparing quotes for the approved works, we can help. If not useful, please ignore this letter and we will not contact you again.',
  tenderChecklist:
    'Check deadline, contract value, insurance levels, accreditations, site visit rules, and whether the package matches your trade before responding through the portal.',
  companyEmail:
    'Hi, I noticed a public business/property signal that may need trade support. If you are arranging works, I can send availability and a short capability note.',
  tradesmanAlert:
    'Review the proof link, contact route, deadline, and value band before spending time on a quote.',
};

export function buildContactPath(lead: Lead): ContactPath {
  const source = String(lead.source ?? '').toLowerCase();
  const isTender = source.includes('contract') || source.includes('fts') || source.includes('pcs') || source.includes('sell2wales');
  const isPlanning = source.includes('planning') || source.includes('plan');
  const isCompany = source.includes('companies') || source.includes('company');
  const isEpc = source.includes('epc') || source.includes('retrofit');
  const isLand = source.includes('land') || source.includes('registry');
  const isAgent = /agent|architect|consultant|planning/i.test(`${lead.buyerName ?? ''} ${lead.description ?? ''}`);
  const hasProof = Boolean(lead.sourceUrl);

  if (isTender) {
    return {
      recommendedChannel: 'tender_portal',
      allowedChannels: ['tender_portal', 'buyer_email', 'buyer_phone'],
      blockedChannels: ['cold_homeowner_whatsapp', 'cold_homeowner_sms'],
      complianceRisk: 'low',
      reason: 'Public procurement opportunities should be answered through the official portal or named buyer contact.',
      script: SCRIPTS.tenderChecklist,
      optOutRequired: false,
      tpsCheckRequired: false,
      evidenceNeeded: ['official tender URL', 'deadline', 'buyer name'],
    };
  }

  if (isPlanning && isAgent) {
    return {
      recommendedChannel: 'planning_agent_email',
      allowedChannels: ['planning_agent_email', 'planning_agent_phone', 'postal_letter'],
      blockedChannels: ['cold_homeowner_whatsapp', 'cold_homeowner_sms'],
      complianceRisk: 'medium',
      reason: 'A planning agent or professional contact is a safer first route than direct homeowner messaging.',
      script: SCRIPTS.planningAgentEmail,
      optOutRequired: true,
      tpsCheckRequired: true,
      evidenceNeeded: ['planning source URL', 'agent or professional contact', 'planning reference'],
    };
  }

  if (isPlanning) {
    return {
      recommendedChannel: 'postal_letter',
      allowedChannels: ['postal_letter'],
      blockedChannels: ['cold_homeowner_whatsapp', 'cold_homeowner_sms', 'cold_homeowner_email'],
      complianceRisk: 'high',
      reason: 'Homeowner planning signals can be useful, but cold WhatsApp/SMS/email needs consent. Use proof-led postal outreach or wait for a lawful contact route.',
      script: SCRIPTS.compliantLetter,
      optOutRequired: true,
      tpsCheckRequired: true,
      evidenceNeeded: ['planning source URL', 'site address', 'planning reference'],
    };
  }

  if (isCompany) {
    return {
      recommendedChannel: 'business_email',
      allowedChannels: ['business_email', 'business_phone', 'postal_letter'],
      blockedChannels: ['cold_homeowner_whatsapp', 'cold_homeowner_sms'],
      complianceRisk: 'medium',
      reason: 'Business contacts can be approached more safely than consumers, but live calls should be screened against TPS/CTPS and opt-outs honoured.',
      script: SCRIPTS.companyEmail,
      optOutRequired: true,
      tpsCheckRequired: true,
      evidenceNeeded: ['company source URL', 'company name', 'business contact route'],
    };
  }

  if (isEpc || isLand) {
    return {
      recommendedChannel: 'research_then_postal_letter',
      allowedChannels: ['postal_letter'],
      blockedChannels: ['cold_homeowner_whatsapp', 'cold_homeowner_sms', 'cold_homeowner_email'],
      complianceRisk: 'high',
      reason: 'Property signals need extra evidence before outreach; do not use cold electronic marketing to householders without consent.',
      script: SCRIPTS.compliantLetter,
      optOutRequired: true,
      tpsCheckRequired: true,
      evidenceNeeded: ['source URL', 'property signal date', 'address evidence'],
    };
  }

  return {
    recommendedChannel: hasProof ? 'verify_source_then_call' : 'do_not_contact_yet',
    allowedChannels: hasProof ? ['source_verified_phone', 'postal_letter'] : [],
    blockedChannels: ['cold_homeowner_whatsapp', 'cold_homeowner_sms'],
    complianceRisk: hasProof ? 'medium' : 'high',
    reason: hasProof ? 'Proof exists, but contact route must be verified before outreach.' : 'No practical lawful contact path is visible yet.',
    script: SCRIPTS.tradesmanAlert,
    optOutRequired: true,
    tpsCheckRequired: true,
    evidenceNeeded: ['source URL', 'named buyer or official contact route'],
  };
}

export function contactPathScoreAdjustment(contactPath: ContactPath): { points: number; reason: string } {
  if (contactPath.allowedChannels.length === 0 || contactPath.recommendedChannel === 'do_not_contact_yet') {
    return { points: -25, reason: 'No lawful/practical contact path (-25)' };
  }
  if (contactPath.complianceRisk === 'high') {
    return { points: -10, reason: 'High compliance-risk contact path (-10)' };
  }
  if (contactPath.complianceRisk === 'medium') {
    return { points: -4, reason: 'Medium compliance-risk contact path (-4)' };
  }
  return { points: 5, reason: 'Low-risk actionable contact path (+5)' };
}
