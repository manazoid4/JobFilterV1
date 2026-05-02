import assert from 'node:assert/strict';
import fs from 'node:fs';

const types = fs.readFileSync('src/lib/types.ts', 'utf8');
const detail = fs.readFileSync('src/pages/LeadDetailPage.tsx', 'utf8');
const list = fs.readFileSync('src/pages/LeadListPage.tsx', 'utf8');
const store = fs.readFileSync('src/lib/leadStore.ts', 'utf8');

for (const status of ['won', 'lost', 'no_answer']) {
  assert.match(types, new RegExp(`'${status}'`), `LeadDecision status must include ${status}`);
  assert.match(detail, new RegExp(`'${status}'`), `Lead detail must expose ${status} action`);
  assert.match(list, new RegExp(status), `Lead list must account for ${status}`);
}

assert.match(store, /updateStoredLead/, 'lead store must support status patching');
assert.match(detail, /WON/, 'detail page must show WON action');
assert.match(detail, /LOST/, 'detail page must show LOST action');
assert.match(detail, /NO ANSWER/, 'detail page must show NO ANSWER action');
assert.match(list, /OUTCOMES/, 'lead list must show outcome summary');

console.log('outcome tracking regression passed');
