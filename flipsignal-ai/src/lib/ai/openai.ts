import OpenAI from "openai";
import { z } from "zod";

let client: OpenAI | null = null;

/**
 * Returns a singleton OpenAI client instance.
 * Throws a clear error if OPENAI_API_KEY is not configured.
 */
export function getOpenAI(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Configure it in your environment to enable AI features."
    );
  }

  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return client;
}

/**
 * Calls the OpenAI chat completions API requesting a JSON object response,
 * then validates the parsed JSON against the provided zod schema.
 *
 * NOTE: This function THROWS if OPENAI_API_KEY is missing or the request/
 * validation fails. Callers (classify, valuation, risk, copilot, etc.) are
 * expected to catch this error and fall back to local heuristic/mock data.
 * This keeps the "no API key" path explicit at the call site rather than
 * silently returning fabricated data from this low-level helper.
 */
export async function chatJSON<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  opts?: { model?: string }
): Promise<T> {
  const openai = getOpenAI();
  const model = opts?.model ?? "gpt-4o-mini";

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("OpenAI response was not valid JSON");
  }

  return schema.parse(parsed);
}
