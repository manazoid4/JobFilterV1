import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:3000';
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-p', '3000'],
  {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let serverLog = '';
server.stdout.on('data', chunk => { serverLog += chunk; });
server.stderr.on('data', chunk => { serverLog += chunk; });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`production server exited early\n${serverLog}`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error(`production server did not become ready\n${serverLog}`);
}

try {
  await waitForServer();

  for (const path of ['/test', '/test/intake', '/dev-portal', '/api/status']) {
    const response = await fetch(`${baseUrl}${path}`, { redirect: 'manual' });
    assert.equal(response.status, 404, `${path} must return 404 in production`);
  }

  const liveContract = spawnSync(
    process.execPath,
    ['codex-output/free-preview-live-contract-test.mjs'],
    { stdio: 'inherit' },
  );
  assert.equal(liveContract.status, 0, 'free preview live contract regression failed');

  console.log('PASS production runtime: internal routes are hidden and free preview contract is intact');
} finally {
  server.kill();
}
