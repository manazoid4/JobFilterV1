#!/usr/bin/env node
// Toggle FULL_ACCESS_TEST_MODE in server .env file.
// Usage: node scripts/test-mode.mjs on | off | status | toggle

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const envPath = path.join(repoRoot, '.env');

const arg = (process.argv[2] || 'status').toLowerCase();
if (!['on', 'off', 'status', 'toggle'].includes(arg)) {
  console.error('Usage: node scripts/test-mode.mjs on|off|status|toggle');
  process.exit(2);
}

let lines = [];
if (fs.existsSync(envPath)) lines = fs.readFileSync(envPath, 'utf-8').split('\n');

let idx = lines.findIndex(l => /^FULL_ACCESS_TEST_MODE\s*=/.test(l));
const current = idx >= 0 ? (lines[idx].split('=')[1] || '').trim() === 'true' : false;

if (arg === 'status') {
  console.log(`FULL_ACCESS_TEST_MODE = ${current ? 'on' : 'off'}`);
  process.exit(0);
}

const next = arg === 'toggle' ? !current : arg === 'on';
const newLine = `FULL_ACCESS_TEST_MODE=${next ? 'true' : 'false'}`;
if (idx >= 0) lines[idx] = newLine;
else lines.push(newLine);

fs.writeFileSync(envPath, lines.filter((l, i) => !(l === '' && i === lines.length - 1)).join('\n') + '\n');
console.log(`FULL_ACCESS_TEST_MODE: ${current ? 'on' : 'off'} -> ${next ? 'on' : 'off'}`);
console.log(`Restart server for change to take effect.`);
