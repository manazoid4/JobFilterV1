import { z } from "zod";
import { chatJSON } from "./openai";

export const COPILOT_PROMPT = `You are FlipSignal Copilot, an expert resale negotiation and valuation assistant.
A user is considering buying the following item to flip for profit.

URL: {{url}}
Description: {{description}}

Analyze the item and respond with a JSON object matching this shape:
{
  "productId": string,
  "marketValueRange": { "min": number, "max": number }, // cents
  "safeOfferCents": number,
  "maxBuyCents": number,
  "resaleChannels": string[],
  "riskFlags": string[],
  "negotiationStrategy": string
}`;

const copilotSchema = z.object({
  productId: z.string(),
  marketValueRange: z.object({ min: z.number(), max: z.number() }),
  safeOfferCents: z.number(),
  maxBuyCents: z.number(),
  resaleChannels: z.array(z.string()),
  riskFlags: z.array(z.string()),
  negotiationStrategy: z.string(),
});

export type CopilotResult = {
  productId: string;
  marketValueRange: { min: number; max: number };
  safeOfferCents: number;
  maxBuyCents: number;
  resaleChannels: string[];
  riskFlags: string[];
  negotiationStrategy: string;
};

/**
 * Runs the Flip Copilot analysis for an arbitrary item described by a URL
 * and/or free-text description. Falls back to a generic mock result when
 * OPENAI_API_KEY is missing or the AI call fails.
 */
export async function runFlipCopilot(input: {
  url?: string;
  description?: string;
}): Promise<CopilotResult> {
  const prompt = COPILOT_PROMPT.replace("{{url}}", input.url ?? "")
    .replace("{{description}}", input.description ?? "");

  try {
    return await chatJSON(prompt, copilotSchema);
  } catch {
    return runFlipCopilotMock(input);
  }
}

/** Generic mock response used when AI is unavailable. */
function runFlipCopilotMock(input: { url?: string; description?: string }): CopilotResult {
  return {
    productId: "mock-product",
    marketValueRange: { min: 5000, max: 9000 },
    safeOfferCents: 4000,
    maxBuyCents: 6000,
    resaleChannels: ["eBay", "Facebook Marketplace"],
    riskFlags: [],
    negotiationStrategy:
      "Start with a polite lowball offer around 40% below asking, citing similar sold listings, " +
      "and be prepared to meet near the midpoint if the seller seems firm." +
      (input.url || input.description ? "" : ""),
  };
}
