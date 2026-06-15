import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { AlertChannel, Prisma } from "@prisma/client";

/** GET /api/alerts - list the current user's alert rules. */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ data: [] });

  const rules = await prisma.alertRule.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: rules });
}

/**
 * POST /api/alerts
 * Body (form or JSON): { name, category?, minScore?, channel }
 * Creates a new alert rule with `filters: { category?, minScore? }`.
 */
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const contentType = req.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json") ? await req.json() : Object.fromEntries(await req.formData());

  const name = String(data.name ?? "");
  const category = data.category ? String(data.category) : undefined;
  const minScore = data.minScore ? Number(data.minScore) : undefined;
  const channel = (data.channel as AlertChannel) ?? AlertChannel.IN_APP;

  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

  const rule = await prisma.alertRule.create({
    data: {
      userId: user.id,
      name,
      filters: { category, minScore } as Prisma.InputJsonValue,
      channels: [channel],
    },
  });

  return NextResponse.json({ data: rule });
}

/** PATCH /api/alerts - update an alert rule (e.g. toggle isActive). */
export async function PATCH(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, isActive, name, filters, channels } = body as {
    id: string;
    isActive?: boolean;
    name?: string;
    filters?: Prisma.InputJsonValue;
    channels?: AlertChannel[];
  };

  const rule = await prisma.alertRule.update({ where: { id }, data: { isActive, name, filters, channels } });
  return NextResponse.json({ data: rule });
}

/** DELETE /api/alerts?id=... - remove an alert rule. */
export async function DELETE(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  await prisma.alertRule.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
