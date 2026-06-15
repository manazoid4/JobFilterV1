import { task } from "@trigger.dev/sdk/v3";
import { runIngestionPipeline } from "@/lib/ai/pipeline";
import type { NormalizedListing } from "@/lib/scrapers/types";

/**
 * Triggerable task wrapping `runIngestionPipeline` for a single normalized
 * listing. Used by `scrape-listings` (fan-out per listing) and by the
 * `/api/listings/ingest` route for synchronous single-listing calls when
 * Trigger.dev is unavailable (e.g. local dev without TRIGGER_API_KEY).
 */
export const ingestionPipelineTask = task({
  id: "ingestion-pipeline",
  run: async (payload: NormalizedListing) => {
    return runIngestionPipeline(payload);
  },
});
