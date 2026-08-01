import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const type = body.type as string;
    const title = body.title as string;
    const description = body.description as string;
    const actors = body.actors as string;
    const link = body.link as string;
    const isTop = body.isTop === 1 ? 1 : 0;
    const photo = body.photo as string | undefined;

    if (!type || !title) {
      return NextResponse.json({ error: "Type and title are required" }, { status: 400 });
    }

    const content = await db.content.create({
      data: {
        type,
        title,
        description: description || null,
        actors: actors || null,
        link: link || null,
        photo: photo || null,
        isTop,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}
