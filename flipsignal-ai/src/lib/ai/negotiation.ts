import { z } from "zod";
import { chatJSON } from "./openai";
import { formatCents } from "@/lib/utils";

export const NEGOTIATION_PROMPT = `You are a savvy but friendly secondhand goods negotiator helping a buyer
secure the best possible price.

Item: {{title}}
Asking Price (cents): {{askingPriceCents}}
Target Price (cents): {{targetPriceCents}}

Write negotiation message scripts for each stage of the conversation. Respond with a JSON object
matching this shape:
{
  "opening": string,
  "lowball": string,
  "counter": string,
  "closing": string,
  "pickup": string
}`;

const negotiationSchema = z.object({
  opening: z.string(),
  lowball: z.string(),
  counter: z.string(),
  closing: z.string(),
  pickup: z.string(),
});

export type NegotiationScripts = {
  opening: string;
  lowball: string;
  counter: string;
  closing: string;
  pickup: string;
};

/**
 * Generates a set of negotiation message scripts (opening, lowball, counter,
 * closing, pickup) for a given deal. Falls back to templated mock scripts
 * when AI is unavailable.
 */
export async function generateNegotiationScripts(deal: {
  title: string;
  askingPriceCents: number;
  targetPriceCents: number;
}): Promise<NegotiationScripts> {
  const prompt = NEGOTIATION_PROMPT.replace("{{title}}", deal.title)
    .replace("{{askingPriceCents}}", String(deal.askingPriceCents))
    .replace("{{targetPriceCents}}", String(deal.targetPriceCents));

  try {
    return await chatJSON(prompt, negotiationSchema);
  } catch {
    return generateNegotiationScriptsMock(deal);
  }
}

/** Templated mock scripts used when AI is unavailable. */
function generateNegotiationScriptsMock(deal: {
  title: string;
  askingPriceCents: number;
  targetPriceCents: number;
}): NegotiationScripts {
  const asking = formatCents(deal.askingPriceCents);
  const target = formatCents(deal.targetPriceCents);
  const lowball = formatCents(Math.round(deal.targetPriceCents * 0.85));

  return {
    opening: `Hi, is your "${deal.title}" still available? I'm interested and can collect quickly.`,
    lowball: `Thanks for the info. Would you consider ${lowball} for a quick, no-hassle cash sale today?`,
    counter: `I understand ${asking} is your asking price, but based on similar listings I think ${target} is fair. Could we meet there?`,
    closing: `Great, let's go with ${target}. I can pay in cash and pick up at a time that suits you.`,
    pickup: `Perfect - I can come by today or tomorrow, whichever works best for you. Just send over the address and a good time.`,
  };
}
