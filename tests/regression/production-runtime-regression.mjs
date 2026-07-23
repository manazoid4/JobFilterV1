import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:net';

async function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address();
      if (!address || typeof address === 'string') {
        probe.close(() => reject(new Error('failed to allocate a runtime-test port')));
        return;
      }
      probe.close(() => resolve(address.port));
    });
  });
}

const port = await getAvailablePort();
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)],
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
    ['tests/regression/free-preview-live-contract-regression.mjs'],
    {
      env: { ...process.env, JOBFILTER_TEST_BASE_URL: baseUrl },
      stdio: 'inherit',
    },
  );
  assert.equal(liveContract.status, 0, 'free preview live contract regression failed');

  console.log('PASS production runtime: internal routes are hidden and free preview contract is intact');
} finally {
  server.kill();
}
