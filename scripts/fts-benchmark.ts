import path from 'node:path';
import { readJsonWithSha256, replayFtsBenchmark, writeBenchmarkArtifacts, type LabelBundle } from './lib/ftsBenchmark';

function argumentsByName(argv: string[]): Map<string, string> {
  const result = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith('--')) continue;
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`${key} requires a value`);
    result.set(key.slice(2), value);
    index += 1;
  }
  return result;
}

const args = argumentsByName(process.argv.slice(2));
const inputPath = args.get('input');
const trade = args.get('trade');
if (!inputPath || !trade) {
  throw new Error('usage: tsx scripts/fts-benchmark.ts --input <ocds.json> --trade <trade> [--postcode B14] [--locality "West Midlands"] [--labels labels.json] [--as-of ISO_DATE] [--out-dir path]');
}

const asOf = new Date(args.get('as-of') ?? new Date().toISOString());
const input = await readJsonWithSha256(inputPath);
const labelsPath = args.get('labels');
const labels = labelsPath ? (await readJsonWithSha256(labelsPath)).payload as LabelBundle : undefined;
const report = await replayFtsBenchmark({
  packagePayload: input.payload,
  packageSource: path.resolve(inputPath),
  packageSha256: input.sha256,
  trade,
  asOf,
  postcode: args.get('postcode'),
  locality: args.get('locality'),
  labels,
});
const outputDirectory = path.resolve(args.get('out-dir') ?? path.join('artifacts', 'fts-benchmark'));
await writeBenchmarkArtifacts(report, outputDirectory);

console.log(JSON.stringify({
  outputDirectory,
  gate: report.gate.status,
  blockers: report.gate.blockers,
  metrics: report.metrics,
}, null, 2));
