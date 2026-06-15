import { z } from "zod";
import { chatJSON } from "./openai";
import type { ClassificationResult } from "./classify";

export const VALUATION_PROMPT = `You are a resale pricing expert. Estimate the realistic resale value range
for the following item if it were cleaned up and relisted on a marketplace like eBay.

Title: {{title}}
Description: {{description}}
Listed Price (cents): {{priceCents}}
Category: {{category}}
Subcategory: {{subcategory}}
Brand: {{brand}}
Model: {{model}}

Respond with a JSON object matching this shape:
{
  "expectedResaleCents": number,
  "worstCaseCents": number,
  "bestCaseCents": number,
  "confidence": number // 0-1
}`;

const valuationSchema = z.object({
  expectedResaleCents: z.number(),
  worstCaseCents: z.number(),
  bestCaseCents: z.number(),
  confidence: z.number().min(0).max(1),
});

export type ValuationResult = {
  expectedResaleCents: number;
  worstCaseCents: number;
  bestCaseCents: number;
  confidence: number;
};

/**
 * Estimates the resale value range for a listing using AI, falling back to
 * a heuristic based on multipliers of the listed price when AI is unavailable.
 */
export async function estimateValuation(
  listing: { title: string; description?: string | null; priceCents: number },
  analysis: ClassificationResult
): Promise<ValuationResult> {
  const prompt = VALUATION_PROMPT.replace("{{title}}", listing.title)
    .replace("{{description}}", listing.description ?? "")
    .replace("{{priceCents}}", String(listing.priceCents))
    .replace("{{category}}", analysis.category)
    .replace("{{subcategory}}", analysis.subcategory ?? "")
    .replace("{{brand}}", analysis.brand ?? "")
    .replace("{{model}}", analysis.model ?? "");

  try {
    return await chatJSON(prompt, valuationSchema);
  } catch {
    return estimateValuationHeuristic(listing);
  }
}

/**
 * Fallback heuristic: assumes a flipped item typically resells for ~1.5x
 * the listed (acquisition) price, with a worst case of ~1.1x and a best
 * case of ~2x. Confidence is deliberately low (0.3) since no AI was used.
 */
function estimateValuationHeuristic(listing: { priceCents: number }): ValuationResult {
  const base = listing.priceCents;

  return {
    expectedResaleCents: Math.round(base * 1.5),
    worstCaseCents: Math.round(base * 1.1),
    bestCaseCents: Math.round(base * 2.0),
    confidence: 0.3,
  };
}
