import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runDailyPipeline } from "@/trigger/daily-pipeline";

/**
 * GET /api/cron/daily-pipeline
 * Invoked by Vercel Cron (see vercel.json, schedule "0 6 * * *"). Validates
 * the `Authorization: Bearer ${CRON_SECRET}` header, then runs the full
 * daily flow: recompute CategoryStats, detect MarketSignals, generate
 * DailyReports, export to Obsidian, and dispatch alert notifications.
 *
 * Scraping + per-listing ingestion runs on a tighter schedule via the
 * Trigger.dev `scrape-listings` task (every 30 min) - this cron focuses on
 * the daily roll-up.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runDailyPipeline(prisma);
  return NextResponse.json(result);
}
