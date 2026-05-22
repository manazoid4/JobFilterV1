#!/usr/bin/env node
// Agent 00 — Master Orchestrator.
// Reads JobFilter/Agent Schedule.md, parses cron column, syncs each
// workflow's cron expression in n8n. Vault-driven scheduling.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const vaultPath = path.join(repoRoot, 'Obsidian_Memory', 'Obsidian_Vault');
const schedulePath = path.join(vaultPath, 'JobFilter', 'Agent Schedule.md');

for (const line of fs.readFileSync(path.join(repoRoot, '.env.n8n'), 'utf-8').split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}
const API_URL = process.env.N8N_API_URL;
const API_KEY = process.env.N8N_API_KEY;
const headers = { 'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' };

function parseSchedule(md) {
  const rows = [];
  for (const line of md.split('\n')) {
    const m = line.match(/^\|\s*(\d{2})\s+([^|]+?)\s*\|\s*`([^`]+)`\s*\|\s*(cron|sub-workflow|webhook[^|]*)\s*\|\s*`([^`]+)`\s*\|/);
    if (!m) continue;
    rows.push({ num: m[1], name: m[2].trim(), cron: m[3].trim(), type: m[4].trim(), id: m[5].trim() });
  }
  return rows;
}

async function getWorkflow(id) {
  const res = await fetch(`${API_URL}/workflows/${id}`, { headers });
  if (!res.ok) throw new Error(`get ${id} failed ${res.status}`);
  return res.json();
}

async function putWorkflow(id, wf) {
  const STRIP = new Set(['active','id','versionId','tags','createdAt','updatedAt','triggerCount','pinData','meta','shared','staticData']);
  const clean = {};
  for (const [k, v] of Object.entries(wf)) if (!STRIP.has(k)) clean[k] = v;
  const res = await fetch(`${API_URL}/workflows/${id}`, { method: 'PUT', headers, body: JSON.stringify(clean) });
  const body = await res.text();
  if (!res.ok) throw new Error(`put ${id} failed ${res.status}: ${body.slice(0,200)}`);
  return JSON.parse(body);
}

function currentCron(wf) {
  for (const n of wf.nodes || []) {
    if (n.type === 'n8n-nodes-base.scheduleTrigger') {
      const exp = n.parameters?.rule?.interval?.[0]?.expression;
      if (exp) return { exp, nodeName: n.name };
    }
  }
  return null;
}

function setCron(wf, newCron) {
  for (const n of wf.nodes || []) {
    if (n.type === 'n8n-nodes-base.scheduleTrigger') {
      n.parameters = n.parameters || {};
      n.parameters.rule = n.parameters.rule || {};
      n.parameters.rule.interval = [{ field: 'cronExpression', expression: newCron }];
      return true;
    }
  }
  return false;
}

async function main() {
  const md = fs.readFileSync(schedulePath, 'utf-8');
  const desired = parseSchedule(md);
  console.log(`Parsed ${desired.length} schedule rows from ${path.basename(schedulePath)}`);

  const changes = [];
  for (const row of desired) {
    if (row.type !== 'cron') { changes.push({ ...row, op: 'skip', reason: row.type }); continue; }
    if (!row.id || row.id.includes('pending')) { changes.push({ ...row, op: 'skip', reason: 'no id' }); continue; }
    let wf;
    try { wf = await getWorkflow(row.id); }
    catch (e) { changes.push({ ...row, op: 'error', reason: e.message }); continue; }
    const cur = currentCron(wf);
    if (!cur) { changes.push({ ...row, op: 'skip', reason: 'no schedule node' }); continue; }
    if (cur.exp === row.cron) { changes.push({ ...row, op: 'unchanged', current: cur.exp }); continue; }
    if (!setCron(wf, row.cron)) { changes.push({ ...row, op: 'error', reason: 'setCron failed' }); continue; }
    try {
      await putWorkflow(row.id, wf);
      changes.push({ ...row, op: 'updated', from: cur.exp, to: row.cron });
      console.log(`  ~ ${row.num} ${row.name}: ${cur.exp} -> ${row.cron}`);
    } catch (e) {
      changes.push({ ...row, op: 'error', reason: e.message });
      console.log(`  X ${row.num} ${row.name}: ${e.message}`);
    }
  }

  const updated = changes.filter(c => c.op === 'updated').length;
  const unchanged = changes.filter(c => c.op === 'unchanged').length;
  const skipped = changes.filter(c => c.op === 'skip').length;
  const errored = changes.filter(c => c.op === 'error').length;
  console.log(`\n${updated} updated · ${unchanged} unchanged · ${skipped} skipped · ${errored} errored`);

  const now = new Date();
  const dateFolder = now.toISOString().slice(0, 10);
  const timeSlug = now.toISOString().slice(11, 16).replace(':', '');
  const runDir = path.join(vaultPath, 'JobFilter', 'Agent Runs', dateFolder);
  fs.mkdirSync(runDir, { recursive: true });
  const runFile = path.join(runDir, `master-orchestrator-${timeSlug}.md`);
  const md_out = `---
type: agent-run
agent: master-orchestrator
run_at: ${now.toISOString()}
trigger: script
status: ${errored ? 'failure' : 'success'}
counts: {"updated":${updated},"unchanged":${unchanged},"skipped":${skipped},"errored":${errored}}
tags: [jobfilter, agent-run, master-orchestrator]
---

# master-orchestrator — ${dateFolder} ${timeSlug.slice(0,2)}:${timeSlug.slice(2)}

## Summary
Synced ${desired.length} schedule rows from Agent Schedule.md to n8n. ${updated} cron changes applied, ${unchanged} unchanged, ${skipped} skipped, ${errored} errored.

## Raw payload

\`\`\`json
${JSON.stringify(changes, null, 2)}
\`\`\`
`;
  fs.writeFileSync(runFile, md_out);
  console.log(`Run logged: ${runFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
