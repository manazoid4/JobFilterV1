import { promises as fs } from "fs";
import path from "path";
import type { FlipOpportunity, Listing, ListingAnalysis, ProfitEstimate, DealScore, DailyReport } from "@prisma/client";
import { formatCents } from "../utils";

const VAULT_SUBFOLDERS = ["Daily Reports", "Deals", "Portfolio", "Market Research", "User Performance"] as const;

function vaultRoot(): string {
  const vaultPath = process.env.OBSIDIAN_VAULT_PATH;
  if (!vaultPath) {
    throw new Error("OBSIDIAN_VAULT_PATH is not set. Configure it to enable Obsidian export.");
  }
  return path.join(vaultPath, "FlipSignal");
}

async function ensureFolders(): Promise<string> {
  const root = vaultRoot();
  for (const folder of VAULT_SUBFOLDERS) {
    await fs.mkdir(path.join(root, folder), { recursive: true });
  }
  return root;
}

type FlipExportInput = {
  flip: FlipOpportunity;
  listing: Listing;
  analysis: ListingAnalysis | null;
  profit: ProfitEstimate | null;
  dealScore: DealScore | null;
  relatedFlipIds?: string[];
};

/**
 * Exports a single FlipOpportunity to a markdown note under
 * `FlipSignal/Deals/`, with YAML frontmatter (score, profit, tags),
 * a profit breakdown table, a decision log section, and wikilinks to
 * related flips.
 */
export async function exportFlipToMarkdown(input: FlipExportInput): Promise<string> {
  const root = await ensureFolders();
  const { flip, listing, analysis, profit, dealScore } = input;

  const tags = [
    "flipsignal/deal",
    analysis?.category ? `category/${slugify(analysis.category)}` : null,
    ...flip.reasonTags.map((t) => `reason/${slugify(t)}`),
  ].filter(Boolean);

  const frontmatter = [
    "---",
    `title: "${escapeYaml(listing.title)}"`,
    `score: ${dealScore?.score ?? "n/a"}`,
    `roi_percent: ${profit?.roiPercent?.toFixed(1) ?? "n/a"}`,
    `expected_profit_cents: ${profit ? profit.expectedResaleCents - listing.priceCents : "n/a"}`,
    `platform: ${listing.platform}`,
    `url: ${listing.url}`,
    `surfaced_at: ${flip.surfacedAt.toISOString()}`,
    `tags: [${tags.map((t) => `"${t}"`).join(", ")}]`,
    "---",
  ].join("\n");

  const profitTable = profit
    ? [
        "| Metric | Value |",
        "| --- | --- |",
        `| Acquisition price | ${formatCents(listing.priceCents, listing.currency)} |`,
        `| Expected resale | ${formatCents(profit.expectedResaleCents, listing.currency)} |`,
        `| Worst case | ${formatCents(profit.worstCaseCents, listing.currency)} |`,
        `| Best case | ${formatCents(profit.bestCaseCents, listing.currency)} |`,
        `| Platform fees | ${formatCents(profit.platformFeeCents, listing.currency)} |`,
        `| Transport cost | ${formatCents(profit.transportCostCents, listing.currency)} |`,
        `| Refurb cost | ${formatCents(profit.refurbCostCents, listing.currency)} |`,
        `| Time to sell (days) | ${profit.timeToSellDays} |`,
        `| Liquidity score | ${profit.liquidityScore}/100 |`,
        `| ROI % | ${profit.roiPercent.toFixed(1)}% |`,
      ].join("\n")
    : "_No profit estimate available._";

  const relatedLinks = (input.relatedFlipIds ?? []).map((id) => `- [[${id}]]`).join("\n");

  const body = [
    frontmatter,
    "",
    `# ${listing.title}`,
    "",
    `**Category:** ${analysis?.category ?? "Unknown"}${analysis?.subcategory ? ` / ${analysis.subcategory}` : ""}`,
    `**Deal score:** ${dealScore?.score ?? "n/a"} / 100`,
    `**Risk:** ${analysis ? `${analysis.riskScore}/100` : "n/a"}`,
    "",
    "## Profit Breakdown",
    profitTable,
    "",
    "## Decision Log",
    "- [ ] Reviewed",
    "- [ ] Contacted seller",
    "- [ ] Purchased",
    "- [ ] Listed for resale",
    "- [ ] Sold",
    "",
    "## Related Flips",
    relatedLinks || "_None yet._",
    "",
  ].join("\n");

  const filePath = path.join(root, "Deals", `${slugify(listing.title)}-${flip.id}.md`);
  await fs.writeFile(filePath, body, "utf-8");
  return filePath;
}

/**
 * Exports a DailyReport to a markdown note under `FlipSignal/Daily Reports/`.
 */
export async function exportDailyReportToMarkdown(report: DailyReport): Promise<string> {
  const root = await ensureFolders();
  const dateStr = report.reportDate.toISOString().slice(0, 10);

  const body = [
    "---",
    `title: "FlipSignal Daily Report - ${dateStr}"`,
    `tags: ["flipsignal/daily-report"]`,
    "---",
    "",
    `# Daily Report — ${dateStr}`,
    "",
    "## Top Flips",
    "```json",
    JSON.stringify(report.topFlips, null, 2),
    "```",
    "",
    "## Emerging Categories",
    "```json",
    JSON.stringify(report.emergingCategories, null, 2),
    "```",
    "",
    "## Price Anomalies",
    "```json",
    JSON.stringify(report.priceAnomalies, null, 2),
    "```",
    "",
    "## Local Hotspots",
    "```json",
    JSON.stringify(report.localHotspots, null, 2),
    "```",
    "",
    "## Risk Warnings",
    "```json",
    JSON.stringify(report.riskWarnings, null, 2),
    "```",
    "",
  ].join("\n");

  const filePath = path.join(root, "Daily Reports", `${dateStr}.md`);
  await fs.writeFile(filePath, body, "utf-8");
  return filePath;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeYaml(input: string): string {
  return input.replace(/"/g, '\\"');
}
