#!/usr/bin/env node
// Push all n8n-workflows/*.json to local n8n via public API.
// Strips API-rejected fields. Idempotent: updates existing workflow w/ same name.
// Reads N8N_API_URL + N8N_API_KEY from .env.n8n (gitignored).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const envPath = path.join(repoRoot, '.env.n8n');
const workflowsDir = path.join(repoRoot, 'n8n-workflows');

if (!fs.existsSync(envPath)) {
  console.error('Missing .env.n8n at', envPath);
  process.exit(1);
}
for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const API_URL = process.env.N8N_API_URL || 'http://localhost:5678/api/v1';
const API_KEY = process.env.N8N_API_KEY;
if (!API_KEY) { console.error('N8N_API_KEY not set'); process.exit(1); }

const headers = {
  'X-N8N-API-KEY': API_KEY,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const STRIP_TOP = new Set([
  'active', 'id', 'versionId', 'tags', 'createdAt', 'updatedAt',
  'triggerCount', 'pinData', 'meta', 'shared', 'staticData'
]);

function sanitize(wf) {
  const out = {};
  for (const [k, v] of Object.entries(wf)) {
    if (STRIP_TOP.has(k)) continue;
    if (k.startsWith('_')) continue;
    out[k] = v;
  }
  if (!out.settings) out.settings = { executionOrder: 'v1' };
  if (Array.isArray(out.nodes)) {
    out.nodes = out.nodes.map(n => {
      const { _comment, ...rest } = n;
      return rest;
    });
  }
  return out;
}

async function listWorkflows() {
  const res = await fetch(`${API_URL}/workflows?limit=250`, { headers });
  if (!res.ok) throw new Error(`list failed ${res.status}: ${await res.text()}`);
  return (await res.json()).data || [];
}

async function createWorkflow(wf) {
  const res = await fetch(`${API_URL}/workflows`, { method: 'POST', headers, body: JSON.stringify(wf) });
  const body = await res.text();
  if (!res.ok) throw new Error(`create failed ${res.status}: ${body}`);
  return JSON.parse(body);
}

async function updateWorkflow(id, wf) {
  const res = await fetch(`${API_URL}/workflows/${id}`, { method: 'PUT', headers, body: JSON.stringify(wf) });
  const body = await res.text();
  if (!res.ok) throw new Error(`update failed ${res.status}: ${body}`);
  return JSON.parse(body);
}

async function main() {
  const files = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.json') && !f.startsWith('.')).sort();
  console.log(`Found ${files.length} workflow files in ${workflowsDir}`);

  const existing = await listWorkflows();
  const byName = new Map(existing.map(w => [w.name, w]));
  console.log(`n8n has ${existing.length} existing workflows`);

  const results = [];
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(workflowsDir, f), 'utf-8'));
    const wf = sanitize(raw);
    const prior = byName.get(wf.name);
    try {
      const saved = prior
        ? await updateWorkflow(prior.id, wf)
        : await createWorkflow(wf);
      results.push({ file: f, name: wf.name, id: saved.id, op: prior ? 'updated' : 'created' });
      console.log(`  ${prior ? '~' : '+'} ${f} -> ${wf.name} (${saved.id})`);
    } catch (e) {
      results.push({ file: f, name: wf.name, error: String(e.message).slice(0, 400) });
      console.log(`  X ${f} -> ${e.message.slice(0, 300)}`);
    }
  }

  const ok = results.filter(r => !r.error).length;
  console.log(`\n${ok}/${results.length} workflows synced.`);

  const outPath = path.join(workflowsDir, '.last-push.json');
  fs.writeFileSync(outPath, JSON.stringify({ pushed_at: new Date().toISOString(), results }, null, 2));
  console.log(`Result log: ${outPath}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
