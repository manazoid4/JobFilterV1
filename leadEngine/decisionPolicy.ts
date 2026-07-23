import type { ContactPath, Lead, OpportunityDecision, ScoreFactorProvenance } from './types';

export const SCORING_POLICY_VERSION = '2026-07-22.v1';

export const SCORE_THRESHOLDS = Object.freeze({
  gold: 80,
  silver: 50,
  bronze: 30,
});

type DecisionResult = {
  qualityLabel: NonNullable<Lead['qualityLabel']>;
  decision: OpportunityDecision;
  ghostRisk: NonNullable<Lead['ghostRisk']>;
  leadReadiness: NonNullable<Lead['leadReadiness']>;
  recommendedAction: string;
};

export function qualityLabelForScore(score: number): DecisionResult['qualityLabel'] {
  if (score >= SCORE_THRESHOLDS.gold) return 'GOLD';
  if (score >= SCORE_THRESHOLDS.silver) return 'SILVER';
  if (score >= SCORE_THRESHOLDS.bronze) return 'BRONZE';
  return 'SKIP';
}

export function classifyFinalLead(
  lead: Lead,
  score: number,
  contactPath: ContactPath,
): DecisionResult {
  const qualityLabel = qualityLabelForScore(score);
  const sourceLower = (lead.source ?? '').toLowerCase();
  const isDirectorySource = sourceLower.includes('directory');
  const isLargePublicContract = lead.signalClass === 'public_contract' && (
    lead.projectScale === 'large'
    || /award|awarded/i.test(lead.procurementStage ?? '')
  );

  let ghostRisk: DecisionResult['ghostRisk'];
  if (
    score >= SCORE_THRESHOLDS.gold
    && lead.sourceConfidence >= 60
    && lead.contactSignal !== 'none'
    && !isDirectorySource
    && contactPath.allowedChannels.length > 0
  ) {
    ghostRisk = 'READY';
  } else if (
    score < SCORE_THRESHOLDS.bronze
    || (isDirectorySource && lead.sourceConfidence < 50)
    || (lead.urgency === 'low' && lead.contactSignal === 'none')
    || contactPath.recommendedChannel === 'do_not_contact_yet'
  ) {
    ghostRisk = 'WASTE';
  } else {
    ghostRisk = 'MAYBE';
  }

  let decision: OpportunityDecision;
  if (qualityLabel === 'SKIP') decision = 'SKIP';
  else if (isLargePublicContract) decision = 'SUBCONTRACT';
  else if (qualityLabel === 'GOLD' && ghostRisk === 'READY') decision = 'BID';
  else decision = 'WATCH';

  const recommendedAction =
    decision === 'SUBCONTRACT' ? 'Identify the main bidder or framework contractor and qualify a subcontract route' :
    decision === 'SKIP' ? 'Skip unless new evidence materially changes the fit' :
    decision === 'WATCH' ? `Watch and verify missing evidence: ${contactPath.reason}` :
    contactPath.reason;

  return { qualityLabel, decision, ghostRisk, leadReadiness: ghostRisk, recommendedAction };
}

export function scoreFactorsFromReasons(reasons: string[]) {
  return reasons.map((reason) => {
    let provenance: ScoreFactorProvenance = 'derived';
    if (/multi-source/i.test(reason)) provenance = 'fusion';
    else if (/outcome|win rate|loss|feedback/i.test(reason)) provenance = 'outcome';
    else if (/source|tender|planning|companies house|directory/i.test(reason)) provenance = 'source';
    return { reason, provenance };
  });
}
