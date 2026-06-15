import { z } from "zod";
import { chatJSON } from "./openai";

export const CLASSIFY_PROMPT = `You are a product classification expert for a resale/flipping platform.
Given the listing details below, identify the product category, subcategory, brand, and model.

Title: {{title}}
Description: {{description}}
Price (cents): {{priceCents}}

Respond with a JSON object matching this shape:
{
  "category": string,
  "subcategory": string | null,
  "brand": string | null,
  "model": string | null
}`;

const classifySchema = z.object({
  category: z.string(),
  subcategory: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
});

export type ClassificationResult = {
  category: string;
  subcategory?: string;
  brand?: string;
  model?: string;
};

/**
 * Classifies a listing into category/subcategory/brand/model using AI,
 * falling back to a simple keyword-based heuristic when OPENAI_API_KEY
 * is missing or the AI call fails.
 */
export async function classifyListing(listing: {
  title: string;
  description?: string | null;
  priceCents: number;
}): Promise<ClassificationResult> {
  const prompt = CLASSIFY_PROMPT.replace("{{title}}", listing.title)
    .replace("{{description}}", listing.description ?? "")
    .replace("{{priceCents}}", String(listing.priceCents));

  try {
    const result = await chatJSON(prompt, classifySchema);
    return {
      category: result.category,
      subcategory: result.subcategory ?? undefined,
      brand: result.brand ?? undefined,
      model: result.model ?? undefined,
    };
  } catch {
    return classifyListingHeuristic(listing);
  }
}

/** Simple keyword-based fallback classifier used when AI is unavailable. */
function classifyListingHeuristic(listing: {
  title: string;
  description?: string | null;
}): ClassificationResult {
  const text = `${listing.title} ${listing.description ?? ""}`.toLowerCase();

  if (text.includes("iphone")) {
    return { category: "Electronics", subcategory: "Phones", brand: "Apple", model: "iPhone" };
  }
  if (text.includes("macbook")) {
    return { category: "Electronics", subcategory: "Laptops", brand: "Apple", model: "MacBook" };
  }
  if (text.includes("ipad")) {
    return { category: "Electronics", subcategory: "Tablets", brand: "Apple", model: "iPad" };
  }
  if (text.includes("samsung galaxy") || text.includes("galaxy")) {
    return { category: "Electronics", subcategory: "Phones", brand: "Samsung", model: "Galaxy" };
  }
  if (text.includes("ps5") || text.includes("playstation")) {
    return { category: "Electronics", subcategory: "Gaming Consoles", brand: "Sony", model: "PlayStation" };
  }
  if (text.includes("xbox")) {
    return { category: "Electronics", subcategory: "Gaming Consoles", brand: "Microsoft", model: "Xbox" };
  }
  if (text.includes("sofa") || text.includes("couch") || text.includes("table") || text.includes("chair")) {
    return { category: "Furniture" };
  }
  if (text.includes("bike") || text.includes("bicycle")) {
    return { category: "Sporting Goods", subcategory: "Bicycles" };
  }

  return { category: "General" };
}
