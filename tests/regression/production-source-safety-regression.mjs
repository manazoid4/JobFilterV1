import assert from 'node:assert/strict';

process.env.NODE_ENV = 'production';
process.env.VERCEL_ENV = 'production';
process.env.DEMO_MODE = 'true';
process.env.SOURCE_DIRECTORY_SIGNAL = 'true';

const { isSourceEnabled } = await import('../../leadEngine/sourceConfig.ts');

assert.equal(
  isSourceEnabled('DirectorySignal'),
  false,
  'internal sample records must stay disabled in production',
);

console.log('PASS production source safety: DirectorySignal is disabled in production');
