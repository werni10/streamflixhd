import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const content = await db.content.findUnique({ where: { id } });

    if (!content) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
