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

    const totalContent = await db.content.count();
    const movies = await db.content.count({ where: { type: "movie" } });
    const series = await db.content.count({ where: { type: "series" } });
    const featured = await db.content.count({ where: { isTop: 1 } });
    const posted = await db.content.count({ where: { postedAt: { not: null } } });

    const recentContent = await db.content.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, type: true, createdAt: true, postCount: true },
    });

    const scheduledPosts = await db.scheduledUpload.count({ where: { status: "pending" } });
    const failedPosts = await db.scheduledUpload.count({ where: { status: "failed" } });
    const completedPosts = await db.scheduledUpload.count({ where: { status: "done" } });

    return NextResponse.json({
      content: { total: totalContent, movies, series, featured, posted },
      posts: { scheduled: scheduledPosts, failed: failedPosts, completed: completedPosts },
      recent: recentContent,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
