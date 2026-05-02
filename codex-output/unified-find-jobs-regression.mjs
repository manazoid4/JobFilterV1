import assert from 'node:assert/strict';
import fs from 'node:fs';

const route = fs.readFileSync('server/routes/leadsSearch.ts', 'utf8');

assert.match(route, /import \{ scan \} from '..\/..\/leadEngine\/scan'/, 'find-jobs API must use the unified lead engine');
assert.doesNotMatch(route, /fetchContractsFinderNotices/, 'find-jobs API must not use the old Contracts Finder-only fetcher');
assert.doesNotMatch(route, /normalizeNotice/, 'find-jobs API must not use the old Contracts Finder-only normalizer');
assert.match(route, /toFreePreviewLead/, 'find-jobs API must still use server-side free preview redaction');
assert.match(route, /buyer:\s*''/, 'free preview must lock buyer');
assert.match(route, /deadlineAt:\s*''/, 'free preview must lock deadline');
assert.match(route, /url:\s*''/, 'free preview must lock source URL');
assert.match(route, /contactSignal:\s*'none'/, 'free preview must lock contact signal');
assert.match(route, /Paid preview - unlock buyer, deadline, exact value, and action route/, 'free preview must explain paid depth');
assert.match(route, /source:\s*'lead_engine'/, 'response should identify the unified engine');

console.log('unified find-jobs regression passed');
