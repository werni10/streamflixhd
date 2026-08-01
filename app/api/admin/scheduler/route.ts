import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.scheduledUpload.findMany({ orderBy: { scheduledAt: "desc" } });

    const postsWithTitles = await Promise.all(
      posts.map(async (post) => {
        const content = await db.content.findUnique({
          where: { id: post.contentId },
          select: { title: true },
        });
        return { ...post, contentTitle: content?.title || "Unknown" };
      })
    );

    return NextResponse.json(postsWithTitles);
  } catch (error) {
    console.error("Scheduler error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { contentId, caption, scheduledAt } = body;

    if (!contentId || !scheduledAt) {
      return NextResponse.json(
        { error: "Content ID and scheduled date are required" },
        { status: 400 }
      );
    }

    const content = await db.content.findUnique({ where: { id: contentId } });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const post = await db.scheduledUpload.create({
      data: {
        contentId,
        caption: caption || null,
        scheduledAt: new Date(scheduledAt),
        status: "pending",
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Create scheduled post error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
