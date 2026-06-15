import { z } from "zod";
import { chatJSON } from "./openai";

export const LISTING_GEN_PROMPT = `You are an expert eBay/Facebook Marketplace copywriter.
Write a high-converting resale listing for the following item.

Title: {{title}}
Description: {{description}}
Category: {{category}}
Condition Notes: {{conditionNotes}}

Respond with a JSON object matching this shape:
{
  "ebayTitle": string, // optimized title, <= 80 chars
  "description": string,
  "keywords": string[],
  "pricingStrategy": string,
  "urgencyFraming": string
}`;

const listingGenSchema = z.object({
  ebayTitle: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  pricingStrategy: z.string(),
  urgencyFraming: z.string(),
});

export type ListingCopyResult = {
  ebayTitle: string;
  description: string;
  keywords: string[];
  pricingStrategy: string;
  urgencyFraming: string;
};

/**
 * Generates marketplace-ready listing copy (title, description, keywords,
 * pricing strategy, urgency framing) for an item being flipped. Falls back
 * to a templated mock when AI is unavailable.
 */
export async function generateListingCopy(item: {
  title: string;
  description?: string | null;
  category?: string;
  conditionNotes?: string;
}): Promise<ListingCopyResult> {
  const prompt = LISTING_GEN_PROMPT.replace("{{title}}", item.title)
    .replace("{{description}}", item.description ?? "")
    .replace("{{category}}", item.category ?? "")
    .replace("{{conditionNotes}}", item.conditionNotes ?? "");

  try {
    return await chatJSON(prompt, listingGenSchema);
  } catch {
    return generateListingCopyMock(item);
  }
}

/** Templated mock used when AI is unavailable. */
function generateListingCopyMock(item: {
  title: string;
  description?: string | null;
  category?: string;
  conditionNotes?: string;
}): ListingCopyResult {
  const title = item.title.slice(0, 80);

  return {
    ebayTitle: title,
    description:
      `${item.title}\n\n` +
      `${item.description ?? "Great condition, ready to use."}\n\n` +
      `Condition: ${item.conditionNotes ?? "Used - Good"}\n` +
      `Fast dispatch, careful packaging, smoke-free home.`,
    keywords: [item.category ?? "general", "used", "deal", "fast shipping"].filter(Boolean),
    pricingStrategy:
      "List slightly above target price and accept offers to create negotiation room while " +
      "anchoring buyer expectations near your target.",
    urgencyFraming:
      "Mention limited stock / high interest to encourage quick decisions, e.g. " +
      "\"Selling fast - multiple people interested.\"",
  };
}
