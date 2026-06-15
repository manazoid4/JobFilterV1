import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { PlanTier } from "@prisma/client";
import { hasAccess } from "@/lib/plan-gates";
import { runFlipCopilot } from "@/lib/ai/copilot";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/copilot
 * Body: { url?: string, description?: string }
 * Gated to PRO+ plans.
 */
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  const planTier = user?.planTier ?? PlanTier.FREE;

  if (!hasAccess(planTier, "FLIP_COPILOT")) {
    return NextResponse.json({ error: "Flip Copilot requires the Pro plan or higher." }, { status: 403 });
  }

  const rate = checkRateLimit(`${clerkId}:copilot`, 30, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const { url, description } = body as { url?: string; description?: string };

  if (!url && !description) {
    return NextResponse.json({ error: "Provide a url or description" }, { status: 400 });
  }

  const result = await runFlipCopilot({ url, description });
  return NextResponse.json(result);
}
