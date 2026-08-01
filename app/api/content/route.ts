import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "18");
    const top = searchParams.get("top") === "true";
    const exclude = searchParams.get("exclude");

    let query: any = {};
    if (type) query.type = type;
    if (top) query.isTop = 1;
    if (exclude) query.id = { not: parseInt(exclude) };

    const content = await db.content.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
