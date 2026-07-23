import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { evaluateCoverageGate, type BenchmarkReport } from './lib/ftsBenchmark';

const reportIndex = process.argv.indexOf('--report');
const reportPath = reportIndex >= 0 ? process.argv[reportIndex + 1] : undefined;
let report: BenchmarkReport | null = null;
if (reportPath) {
  try {
    report = JSON.parse(await readFile(reportPath, 'utf8')) as BenchmarkReport;
  } catch (error) {
    console.error(`FTS coverage report unavailable at ${path.resolve(reportPath)}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const gate = evaluateCoverageGate(report);
console.log(JSON.stringify(gate, null, 2));
if (gate.status !== 'GO') process.exitCode = 1;
