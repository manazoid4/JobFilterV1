import assert from 'node:assert/strict';
import {
  REVENUE_RESCUE_DEMO,
  clampDemoStage,
  formatDemoMoney,
  nextDemoStage,
} from '../../src/lib/revenueRescueDemo.ts';

assert.equal(REVENUE_RESCUE_DEMO.mode, 'simulation');
assert.deepEqual(
  REVENUE_RESCUE_DEMO.stages.map((stage) => stage.id),
  ['missed', 'qualified', 'quoted', 'followed-up', 'recovered'],
);
assert.equal(nextDemoStage(0), 1);
assert.equal(nextDemoStage(4), 4);
assert.equal(clampDemoStage(-5), 0);
assert.equal(clampDemoStage(99), 4);
assert.equal(formatDemoMoney(REVENUE_RESCUE_DEMO.quoteMinorUnits), '£3,480.00');
assert.equal(
  REVENUE_RESCUE_DEMO.depositMinorUnits * 5,
  REVENUE_RESCUE_DEMO.quoteMinorUnits,
  'the demo deposit must remain exactly 20% of the quote',
);
assert.ok(
  REVENUE_RESCUE_DEMO.stages.every((stage) => stage.evidence.length > 0),
  'every demo stage must show evidence instead of an unsupported claim',
);

console.log('revenue rescue demo regression passed');
