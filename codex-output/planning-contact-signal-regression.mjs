import assert from 'node:assert/strict';
import { normalise } from '../leadEngine/normaliser.ts';

const lead = normalise({
  rawId: 'planning-proof-1',
  rawTitle: 'Planning Approval: Rear extension',
  rawDescription: 'Approved single-storey rear extension with source proof and named applicant.',
  rawValue: 40000,
  rawLocation: 'Birmingham, B15',
  rawPostcode: 'B15',
  rawDeadline: new Date(Date.now() + 30 * 86_400_000).toISOString(),
  rawPublished: new Date().toISOString(),
  rawBuyer: 'Local Authority',
  rawCpvCodes: [],
  sourceSystem: 'PlanningData',
  sourceUrl: 'https://www.planning.data.gov.uk/entity/123',
}, 'building');

assert.ok(lead, 'planning lead must normalise');
assert.equal(lead.contactSignal, 'strong', 'planning lead with buyer, deadline, and source URL must be a strong action signal');

console.log('planning contact signal regression passed');
