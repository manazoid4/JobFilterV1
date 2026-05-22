#!/usr/bin/env node
// Activate all JobFilter workflows in n8n via public API.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

for (const line of fs.readFileSync(path.join(repoRoot, '.env.n8n'), 'utf-8').split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const API_URL = process.env.N8N_API_URL;
const API_KEY = process.env.N8N_API_KEY;
const headers = { 'X-N8N-API-KEY': API_KEY, 'Accept': 'application/json' };

const log = JSON.parse(fs.readFileSync(path.join(repoRoot, 'n8n-workflows', '.last-push.json'), 'utf-8'));
const results = [];
for (const r of log.results) {
  if (r.error || !r.id) { results.push({ ...r, activate: 'skip' }); continue; }
  const res = await fetch(`${API_URL}/workflows/${r.id}/activate`, { method: 'POST', headers });
  const body = await res.text();
  const ok = res.ok;
  console.log(`${ok ? '+' : 'X'} ${r.name} (${r.id}) -- ${res.status}${ok ? '' : ' ' + body.slice(0, 200)}`);
  results.push({ id: r.id, name: r.name, status: res.status, ok, body: ok ? null : body.slice(0, 400) });
}

const okCount = results.filter(r => r.ok).length;
console.log(`\n${okCount}/${results.length} workflows activated.`);
fs.writeFileSync(path.join(repoRoot, 'n8n-workflows', '.last-activate.json'), JSON.stringify({ activated_at: new Date().toISOString(), results }, null, 2));
