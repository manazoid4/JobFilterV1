import { z } from "zod";
import { chatJSON } from "./openai";
import type { ClassificationResult } from "./classify";

export const RISK_PROMPT = `You are a fraud and risk analyst for a secondhand goods marketplace.
Assess the risk of the following listing being a scam, fake/counterfeit item, damaged goods,
or stolen property.

Title: {{title}}
Description: {{description}}
Listed Price (cents): {{priceCents}}
Category: {{category}}
Subcategory: {{subcategory}}
Brand: {{brand}}
Model: {{model}}

Respond with a JSON object matching this shape:
{
  "riskScore": number, // 0-100
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "flags": string[] // e.g. "scam", "fake", "damaged", "stolen_risk"
}`;

const riskSchema = z.object({
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  flags: z.array(z.string()),
});

export type RiskResult = {
  riskScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  flags: string[];
};

/**
 * Assesses scam/fraud/condition risk for a listing using AI, falling back
 * to a simple price-vs-description sanity check heuristic when AI is
 * unavailable.
 */
export async function assessRisk(
  listing: { title: string; description?: string | null; priceCents: number },
  analysis: ClassificationResult
): Promise<RiskResult> {
  const prompt = RISK_PROMPT.replace("{{title}}", listing.title)
    .replace("{{description}}", listing.description ?? "")
    .replace("{{priceCents}}", String(listing.priceCents))
    .replace("{{category}}", analysis.category)
    .replace("{{subcategory}}", analysis.subcategory ?? "")
    .replace("{{brand}}", analysis.brand ?? "")
    .replace("{{model}}", analysis.model ?? "");

  try {
    return await chatJSON(prompt, riskSchema);
  } catch {
    return assessRiskHeuristic(listing);
  }
}

/**
 * Fallback heuristic: flags listings with very short/missing descriptions
 * (possible low-effort scam) and suspiciously low prices (possible stolen
 * goods or fake items). Combines these into a basic risk score.
 */
function assessRiskHeuristic(listing: {
  title: string;
  description?: string | null;
  priceCents: number;
}): RiskResult {
  const flags: string[] = [];
  let riskScore = 10; // baseline low risk

  const descLength = (listing.description ?? "").trim().length;
  if (descLength === 0) {
    flags.push("scam");
    riskScore += 30;
  } else if (descLength < 20) {
    flags.push("scam");
    riskScore += 15;
  }

  if (listing.priceCents <= 0) {
    flags.push("scam");
    riskScore += 40;
  } else if (listing.priceCents < 500) {
    // Under £5 for an item being listed at all is suspicious
    flags.push("stolen_risk");
    riskScore += 25;
  }

  const text = `${listing.title} ${listing.description ?? ""}`.toLowerCase();
  if (text.includes("damaged") || text.includes("broken") || text.includes("for parts") || text.includes("spares or repair")) {
    flags.push("damaged");
    riskScore += 10;
  }
  if (text.includes("replica") || text.includes("copy") || text.includes("inspired by")) {
    flags.push("fake");
    riskScore += 20;
  }

  riskScore = Math.min(100, riskScore);

  let riskLevel: RiskResult["riskLevel"];
  if (riskScore >= 75) riskLevel = "CRITICAL";
  else if (riskScore >= 50) riskLevel = "HIGH";
  else if (riskScore >= 25) riskLevel = "MEDIUM";
  else riskLevel = "LOW";

  return { riskScore, riskLevel, flags };
}
