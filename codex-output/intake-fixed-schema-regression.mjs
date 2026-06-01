import fs from 'node:fs';
import assert from 'node:assert/strict';

const route = fs.readFileSync('server/routes/intakeScore.ts', 'utf8');

for (const field of [
  'postcodeOutward',
  'estimatedValue',
  'sourceConfidence',
  'contactSignal',
  "source: 'Intake'",
  'persistLeads',
]) {
  assert.match(route, new RegExp(field), `intake score route must include ${field}`);
}

assert.doesNotMatch(route, /lead:\s*\{[\s\S]*jobType,/m, 'intake response must not expose jobType as the primary lead trade field');
assert.match(route, /triggerGoldLeadWhatsApp\(\{[\s\S]*sourceSystem:\s*'Intake'/m, 'intake WhatsApp delivery must include sourceSystem for patch locking');

console.log('intake fixed-schema regression passed');
