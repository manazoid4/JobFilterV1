import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/reports/daily
 * Returns the most recent DailyReport for the authenticated user, falling
 * back to the global report (userId: null) if the user has no personalised
 * report yet.
 */
export async function GET(_req: NextRequest) {
  const { userId: clerkId } = await auth();
  const user = clerkId ? await prisma.user.findUnique({ where: { clerkId } }) : null;

  const report =
    (user && (await prisma.dailyReport.findFirst({ where: { userId: user.id }, orderBy: { reportDate: "desc" } }))) ??
    (await prisma.dailyReport.findFirst({ where: { userId: null }, orderBy: { reportDate: "desc" } }));

  if (!report) {
    return NextResponse.json({ error: "No reports available yet" }, { status: 404 });
  }

  return NextResponse.json({ data: report });
}
