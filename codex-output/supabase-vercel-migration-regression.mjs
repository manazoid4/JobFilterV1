import fs from 'node:fs';
import assert from 'node:assert/strict';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const waitlist = fs.readFileSync('server/routes/waitlist.ts', 'utf8');
const app = fs.readFileSync('server/app.ts', 'utf8');
const api = fs.readFileSync('api/index.ts', 'utf8');
const vercel = fs.readFileSync('vercel.json', 'utf8');
const schema = fs.readFileSync('supabase/schema.sql', 'utf8');
const firebaseMerge = fs.readFileSync('.github/workflows/firebase-hosting-merge.yml', 'utf8');

for (const dep of ['firebase', 'firebase-admin', 'firebase-functions']) {
  assert.ok(!pkg.dependencies?.[dep], `root app still depends on ${dep}`);
}

assert.ok(pkg.dependencies?.['@supabase/supabase-js'], 'missing Supabase client');
assert.ok(waitlist.includes('@supabase/supabase-js'), 'waitlist route does not use Supabase');
assert.ok(waitlist.includes("from('waitlist')"), 'waitlist route does not insert into waitlist');
assert.ok(app.includes('export async function createApp'), 'Express app is not exportable');
assert.ok(api.includes('createApp'), 'Vercel API does not use createApp');
assert.ok(vercel.includes('/api/(.*)'), 'Vercel API rewrite missing');
assert.ok(schema.includes('create table if not exists public.waitlist'), 'waitlist schema missing');
assert.ok(schema.includes('enable row level security'), 'waitlist RLS missing');
assert.ok(firebaseMerge.includes('workflow_dispatch'), 'Firebase merge workflow is still automatic');
assert.ok(!firebaseMerge.includes('branches:'), 'Firebase merge workflow still targets branches');

console.log('supabase vercel migration regression passed');
