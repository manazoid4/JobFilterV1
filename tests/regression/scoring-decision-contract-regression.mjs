import assert from 'node:assert/strict';
import {
  classifyFinalLead,
  qualityLabelForScore,
  SCORE_THRESHOLDS,
  SCORING_POLICY_VERSION,
} from '../../leadEngine/decisionPolicy.ts';

assert.equal(SCORING_POLICY_VERSION, '2026-07-22.v1');
assert.deepEqual(SCORE_THRESHOLDS, { gold: 80, silver: 50, bronze: 30 });
assert.equal(qualityLabelForScore(80), 'GOLD');
assert.equal(qualityLabelForScore(79), 'SILVER');
assert.equal(qualityLabelForScore(50), 'SILVER');
assert.equal(qualityLabelForScore(49), 'BRONZE');
assert.equal(qualityLabelForScore(30), 'BRONZE');
assert.equal(qualityLabelForScore(29), 'SKIP');

const contactPath = {
  recommendedChannel: 'procurement_portal',
  allowedChannels: ['procurement_portal'],
  blockedChannels: [],
  complianceRisk: 'low',
  reason: 'Review the procurement documents and submit through the named portal',
  script: '',
  optOutRequired: false,
  tpsCheckRequired: false,
  evidenceNeeded: [],
};
const baseLead = {
  id: 'fts-1', title: 'Electrical maintenance framework', trade: 'electrical',
  location: 'Birmingham', postcodeOutward: 'B14', estimatedValue: '£100k',
  urgency: 'high', source: 'FTS', sourceConfidence: 88, contactSignal: 'strong',
  status: 'new', signalClass: 'public_contract', projectScale: 'medium',
};

assert.equal(classifyFinalLead(baseLead, 80, contactPath).decision, 'BID');
assert.equal(classifyFinalLead({ ...baseLead, projectScale: 'large' }, 80, contactPath).decision, 'SUBCONTRACT');
assert.equal(classifyFinalLead(baseLead, 79, contactPath).decision, 'WATCH');
assert.equal(classifyFinalLead(baseLead, 29, contactPath).decision, 'SKIP');

console.log('scoring decision contract regression passed');
