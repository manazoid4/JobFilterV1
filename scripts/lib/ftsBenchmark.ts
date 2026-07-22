import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fetchFindATender } from '../../leadEngine/fetchers/contractsFetcher';
import { normalise } from '../../leadEngine/normaliser';
import { getOutward, regionFromOutward, regionSimilarity } from '../../leadEngine/postcode';
import { classifyFinalLead, scoreFactorsFromReasons, SCORING_POLICY_VERSION } from '../../leadEngine/decisionPolicy';
import { scoreLeadBreakdown } from '../../leadEngine/scorer';

export const BENCHMARK_SCHEMA_VERSION = 'fts-benchmark-v1';
export const DEFAULT_GATE_THRESHOLDS = Object.freeze({
  minimumLabels: 100,
  minimumPrecisionAt10: 0.8,
  minimumLocalityResolutionRate: 0.8,
  minimumActionableLocalOpportunities: 1,
});

export type BenchmarkLabel = {
  ocid: string;
  relevant: boolean;
  reason: string;
};

export type LabelBundle = {
  schemaVersion: 'fts-human-labels-v1';
  provenance: {
    reviewer: string;
    labelledAt: string;
    source: string;
    synthetic: boolean;
  };
  labels: BenchmarkLabel[];
};

export type EvidenceItem = {
  path: string;
  value: string;
  kind: 'cpv' | 'delivery_postcode' | 'delivery_locality' | 'delivery_nuts';
};

export type ReviewRow = {
  rank: number;
  ocid: string;
  releaseId: string;
  sourceUrl: string;
  publishedAt: string;
  title: string;
  trade: string;
  cpvCodes: string[];
  cpvEvidence: EvidenceItem[];
  location: string;
  postcodeOutward: string;
  localityResolution: 'delivery_postcode' | 'delivery_nuts' | 'delivery_locality' | 'unresolved';
  localityEvidence: EvidenceItem[];
  localMatch: boolean;
  score: number;
  scoringPolicyVersion: string;
  scoreReasons: string[];
  scoreFactors: Array<{ reason: string; provenance: string }>;
  decision: string;
  label: boolean | null;
  labelReason: string;
};

export type BenchmarkReport = {
  schemaVersion: typeof BENCHMARK_SCHEMA_VERSION;
  generatedAt: string;
  input: {
    source: string;
    sha256: string;
    releaseCount: number;
    releasesInWindow: number;
    windowDays: 90;
    windowStart: string;
    windowEnd: string;
  };
  query: {
    trade: string;
    postcodeOutward: string;
    locality: string;
  };
  labels: {
    count: number;
    externalEvidence: boolean;
    provenance: LabelBundle['provenance'] | null;
  };
  metrics: {
    mappedTradeCandidates: number;
    localityResolvedCount: number;
    localityResolutionRate: number | null;
    localCandidateCount: number;
    actionableLocalCount: number;
    fullyLabelledTop10: boolean;
    precisionAt10: number | null;
  };
  gate: CoverageGateResult;
  reviewSet: ReviewRow[];
};

export type CoverageGateResult = {
  status: 'GO' | 'NO_GO';
  evaluatedAt: string;
  thresholds: typeof DEFAULT_GATE_THRESHOLDS;
  checks: Array<{ id: string; passed: boolean; actual: string | number | boolean | null; required: string | number | boolean }>;
  blockers: string[];
};

type ReplayOptions = {
  packagePayload: unknown;
  packageSource: string;
  packageSha256: string;
  trade: string;
  asOf: Date;
  postcode?: string;
  locality?: string;
  labels?: LabelBundle;
};

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  return value == null ? [] : [value];
}

export function releasesFromPackage(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.releases)) return payload.releases;
  if (Array.isArray(payload?.packages)) {
    return payload.packages.flatMap((item: any) => asArray(item?.releases));
  }
  throw new Error('input must be an OCDS release package, an array of releases, or an object with packages[]');
}

function classificationEvidence(container: any, basePath: string): EvidenceItem[] {
  return [
    ...asArray(container?.classification).map((value, index) => ({ value, path: `${basePath}.classification${index ? `[${index}]` : ''}` })),
    ...asArray(container?.additionalClassifications).map((value, index) => ({ value, path: `${basePath}.additionalClassifications[${index}]` })),
  ]
    .filter(({ value }: any) => String(value?.scheme ?? '').toUpperCase() === 'CPV' && String(value?.id ?? '').trim())
    .map(({ value, path: evidencePath }: any) => ({
      path: `${evidencePath}.id`,
      value: String(value.id).trim(),
      kind: 'cpv' as const,
    }));
}

export function collectCpvEvidence(releases: any[]): EvidenceItem[] {
  const evidence = releases.flatMap((release, releaseIndex) => {
    const tender = release?.tender ?? {};
    return [
      ...classificationEvidence(tender, `releases[${releaseIndex}].tender`),
      ...asArray(tender?.items).flatMap((item, index) => classificationEvidence(item, `releases[${releaseIndex}].tender.items[${index}]`)),
      ...asArray(tender?.lots).flatMap((lot, index) => classificationEvidence(lot, `releases[${releaseIndex}].tender.lots[${index}]`)),
    ];
  });
  return uniqueEvidence(evidence);
}

function locationValues(location: any, evidencePath: string): EvidenceItem[] {
  if (!location || typeof location !== 'object') return [];
  const classification = location.classification;
  const nutsId = /NUTS/i.test(String(classification?.scheme ?? '')) ? String(classification?.id ?? '').trim() : '';
  const values: EvidenceItem[] = [];
  if (nutsId) values.push({ path: `${evidencePath}.classification.id`, value: nutsId, kind: 'delivery_nuts' });
  for (const [field, kind] of [
    ['postalCode', 'delivery_postcode'],
    ['locality', 'delivery_locality'],
    ['region', 'delivery_nuts'],
    ['description', 'delivery_locality'],
  ] as const) {
    const value = String(location[field] ?? '').trim();
    if (!value) continue;
    values.push({
      path: `${evidencePath}.${field}`,
      value,
      kind: kind === 'delivery_nuts' || /^UK[A-Z0-9]{1,3}$/i.test(value) ? 'delivery_nuts' : kind,
    });
  }
  return values;
}

export function collectDeliveryLocationEvidence(releases: any[]): EvidenceItem[] {
  const evidence = releases.flatMap((release, releaseIndex) => {
    const tender = release?.tender ?? {};
    const locations: Array<{ value: any; path: string }> = [];
    for (const [field, value] of Object.entries(tender)) {
      if (!['deliveryAddresses', 'deliveryAddress', 'deliveryLocations', 'deliveryLocation'].includes(field)) continue;
      asArray(value).forEach((item, index) => locations.push({ value: item, path: `releases[${releaseIndex}].tender.${field}[${index}]` }));
    }
    asArray(tender?.items).forEach((item, itemIndex) => {
      for (const field of ['deliveryAddresses', 'deliveryAddress', 'deliveryLocations', 'deliveryLocation']) {
        asArray(item?.[field]).forEach((value, index) => locations.push({
          value,
          path: `releases[${releaseIndex}].tender.items[${itemIndex}].${field}[${index}]`,
        }));
      }
    });
    return locations.flatMap(({ value, path: evidencePath }) => locationValues(value, evidencePath));
  });
  return uniqueEvidence(evidence);
}

function uniqueEvidence(items: EvidenceItem[]): EvidenceItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.path}|${item.value}|${item.kind}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function hasResolvedLocality(row: Pick<ReviewRow, 'localityResolution'>): boolean {
  return row.localityResolution !== 'unresolved';
}

function resolveLocalityKind(postcodeOutward: string, evidence: EvidenceItem[]): ReviewRow['localityResolution'] {
  if (postcodeOutward && postcodeOutward !== 'UK') return 'delivery_postcode';
  if (evidence.some(item => item.kind === 'delivery_nuts')) return 'delivery_nuts';
  if (evidence.some(item => item.kind === 'delivery_locality')) return 'delivery_locality';
  return 'unresolved';
}

function isLocalMatch(args: {
  postcodeOutward: string;
  location: string;
  resolution: ReviewRow['localityResolution'];
  targetOutward: string;
  targetRegion: string;
  targetLocality: string;
}): boolean {
  if (args.resolution === 'unresolved') return false;
  if (args.targetOutward && args.postcodeOutward === args.targetOutward) return true;
  const location = args.location.toLowerCase();
  if (args.targetLocality && location.includes(args.targetLocality.toLowerCase())) return true;
  if (args.targetRegion && regionSimilarity(args.location, args.targetRegion) >= 0.6) return true;
  return false;
}

export function calculatePrecisionAt10(rows: ReviewRow[]): { fullyLabelled: boolean; value: number | null } {
  const top10 = rows.filter(row => row.localMatch).slice(0, 10);
  const fullyLabelled = top10.length === 10 && top10.every(row => row.label !== null);
  if (!fullyLabelled) return { fullyLabelled: false, value: null };
  return { fullyLabelled: true, value: top10.filter(row => row.label === true).length / 10 };
}

export function evaluateCoverageGate(report: Omit<BenchmarkReport, 'gate'> | null, evaluatedAt = new Date().toISOString()): CoverageGateResult {
  const metrics = report?.metrics;
  const checks: CoverageGateResult['checks'] = [
    { id: 'benchmark_report_present', passed: Boolean(report), actual: Boolean(report), required: true },
    { id: 'territory_defined', passed: Boolean(report?.query.postcodeOutward || report?.query.locality), actual: Boolean(report?.query.postcodeOutward || report?.query.locality), required: true },
    { id: 'external_label_provenance', passed: report?.labels.externalEvidence === true, actual: report?.labels.externalEvidence ?? false, required: true },
    { id: 'minimum_human_labels', passed: (report?.labels.count ?? 0) >= DEFAULT_GATE_THRESHOLDS.minimumLabels, actual: report?.labels.count ?? 0, required: DEFAULT_GATE_THRESHOLDS.minimumLabels },
    { id: 'top_10_fully_labelled', passed: metrics?.fullyLabelledTop10 === true, actual: metrics?.fullyLabelledTop10 ?? false, required: true },
    { id: 'precision_at_10', passed: (metrics?.precisionAt10 ?? -1) >= DEFAULT_GATE_THRESHOLDS.minimumPrecisionAt10, actual: metrics?.precisionAt10 ?? null, required: DEFAULT_GATE_THRESHOLDS.minimumPrecisionAt10 },
    { id: 'locality_resolution_rate', passed: (metrics?.localityResolutionRate ?? -1) >= DEFAULT_GATE_THRESHOLDS.minimumLocalityResolutionRate, actual: metrics?.localityResolutionRate ?? null, required: DEFAULT_GATE_THRESHOLDS.minimumLocalityResolutionRate },
    { id: 'actionable_local_opportunities', passed: (metrics?.actionableLocalCount ?? 0) >= DEFAULT_GATE_THRESHOLDS.minimumActionableLocalOpportunities, actual: metrics?.actionableLocalCount ?? 0, required: DEFAULT_GATE_THRESHOLDS.minimumActionableLocalOpportunities },
  ];
  const blockers = checks.filter(check => !check.passed).map(check => check.id);
  return {
    status: blockers.length ? 'NO_GO' : 'GO',
    evaluatedAt,
    thresholds: DEFAULT_GATE_THRESHOLDS,
    checks,
    blockers,
  };
}

export async function replayFtsBenchmark(options: ReplayOptions): Promise<BenchmarkReport> {
  if (!Number.isFinite(options.asOf.getTime())) throw new Error('asOf must be a valid date');
  const allReleases = releasesFromPackage(options.packagePayload);
  const windowEndMs = options.asOf.getTime();
  const windowStartMs = windowEndMs - 90 * 86_400_000;
  const releases = allReleases.filter((release) => {
    const timestamp = Date.parse(String(release?.date ?? ''));
    return Number.isFinite(timestamp) && timestamp >= windowStartMs && timestamp <= windowEndMs;
  });
  const packageForReplay = { releases, links: {} };
  const result = await fetchFindATender(options.trade, {
    now: options.asOf,
    maxPages: 1,
    useCache: false,
    fetchImpl: async () => new Response(JSON.stringify(packageForReplay), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  });

  const targetOutward = getOutward(options.postcode ?? '');
  const targetRegion = targetOutward ? regionFromOutward(targetOutward) : '';
  const targetLocality = String(options.locality ?? '').trim();
  const releaseGroups = new Map<string, any[]>();
  for (const release of releases) {
    const ocid = String(release?.ocid ?? release?.id ?? '').trim();
    if (!ocid) continue;
    releaseGroups.set(ocid, [...(releaseGroups.get(ocid) ?? []), release]);
  }
  const labelByOcid = new Map((options.labels?.labels ?? []).map(label => [label.ocid, label]));

  const rows: ReviewRow[] = [];
  for (const raw of result.leads) {
    const lead = normalise(raw, options.trade);
    if (!lead) continue;
    const revisions = releaseGroups.get(raw.rawId) ?? [];
    const cpvEvidence = collectCpvEvidence(revisions);
    const localityEvidence = collectDeliveryLocationEvidence(revisions);
    const localityResolution = resolveLocalityKind(lead.postcodeOutward, localityEvidence);
    const localMatch = isLocalMatch({
      postcodeOutward: lead.postcodeOutward,
      location: lead.location,
      resolution: localityResolution,
      targetOutward,
      targetRegion,
      targetLocality,
    });
    const breakdown = scoreLeadBreakdown(lead, targetLocality || targetRegion, targetOutward, options.trade as any);
    const decision = classifyFinalLead(lead, breakdown.score, breakdown.contactPath).decision;
    const label = labelByOcid.get(raw.rawId);
    const latestRelease = [...revisions].sort((a, b) => Date.parse(String(b?.date ?? '')) - Date.parse(String(a?.date ?? '')))[0] ?? {};
    rows.push({
      rank: 0,
      ocid: raw.rawId,
      releaseId: String(latestRelease?.id ?? ''),
      sourceUrl: raw.sourceUrl ?? '',
      publishedAt: raw.rawPublished ?? '',
      title: lead.title,
      trade: lead.trade,
      cpvCodes: raw.rawCpvCodes ?? [],
      cpvEvidence,
      location: lead.location,
      postcodeOutward: lead.postcodeOutward,
      localityResolution,
      localityEvidence,
      localMatch,
      score: breakdown.score,
      scoringPolicyVersion: SCORING_POLICY_VERSION,
      scoreReasons: breakdown.reasons,
      scoreFactors: scoreFactorsFromReasons(breakdown.reasons),
      decision,
      label: label?.relevant ?? null,
      labelReason: label?.reason ?? '',
    });
  }

  rows.sort((a, b) => Number(b.localMatch) - Number(a.localMatch) || b.score - a.score || a.ocid.localeCompare(b.ocid));
  rows.forEach((row, index) => { row.rank = index + 1; });
  const precision = calculatePrecisionAt10(rows);
  const localityResolvedCount = rows.filter(hasResolvedLocality).length;
  const labelCount = rows.filter(row => row.label !== null).length;
  const labelProvenance = options.labels?.provenance ?? null;
  const externalEvidence = Boolean(
    labelProvenance
    && labelProvenance.synthetic === false
    && labelProvenance.reviewer.trim()
    && labelProvenance.source.trim()
    && Number.isFinite(Date.parse(labelProvenance.labelledAt)),
  );

  const withoutGate: Omit<BenchmarkReport, 'gate'> = {
    schemaVersion: BENCHMARK_SCHEMA_VERSION,
    generatedAt: options.asOf.toISOString(),
    input: {
      source: options.packageSource,
      sha256: options.packageSha256,
      releaseCount: allReleases.length,
      releasesInWindow: releases.length,
      windowDays: 90,
      windowStart: new Date(windowStartMs).toISOString(),
      windowEnd: options.asOf.toISOString(),
    },
    query: { trade: options.trade, postcodeOutward: targetOutward, locality: targetLocality },
    labels: { count: labelCount, externalEvidence, provenance: labelProvenance },
    metrics: {
      mappedTradeCandidates: rows.length,
      localityResolvedCount,
      localityResolutionRate: rows.length ? localityResolvedCount / rows.length : null,
      localCandidateCount: rows.filter(row => row.localMatch).length,
      actionableLocalCount: rows.filter(row => row.localMatch && row.label === true).length,
      fullyLabelledTop10: precision.fullyLabelled,
      precisionAt10: precision.value,
    },
    reviewSet: rows,
  };
  return { ...withoutGate, gate: evaluateCoverageGate(withoutGate, options.asOf.toISOString()) };
}

function csvValue(value: unknown): string {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  return `"${String(stringValue ?? '').replaceAll('"', '""')}"`;
}

export function reviewSetCsv(rows: ReviewRow[]): string {
  const columns: Array<keyof ReviewRow> = [
    'rank', 'ocid', 'releaseId', 'sourceUrl', 'publishedAt', 'title', 'trade', 'cpvCodes', 'cpvEvidence',
    'location', 'postcodeOutward', 'localityResolution', 'localityEvidence', 'localMatch', 'score',
    'scoringPolicyVersion', 'scoreReasons', 'scoreFactors', 'decision', 'label', 'labelReason',
  ];
  return [
    columns.join(','),
    ...rows.map(row => columns.map(column => csvValue(row[column])).join(',')),
  ].join('\n') + '\n';
}

export async function readJsonWithSha256(filePath: string): Promise<{ payload: unknown; sha256: string }> {
  const bytes = await readFile(filePath);
  return {
    payload: JSON.parse(bytes.toString('utf8')),
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
}

export async function writeBenchmarkArtifacts(report: BenchmarkReport, outputDirectory: string): Promise<void> {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDirectory, 'fts-review-set.json'), JSON.stringify(report, null, 2) + '\n'),
    writeFile(path.join(outputDirectory, 'fts-review-set.csv'), reviewSetCsv(report.reviewSet)),
    writeFile(path.join(outputDirectory, 'fts-coverage-gate.json'), JSON.stringify(report.gate, null, 2) + '\n'),
  ]);
}
