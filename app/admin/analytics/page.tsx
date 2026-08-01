"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Analytics {
  content: { total: number; movies: number; series: number; featured: number; posted: number };
  posts: { scheduled: number; failed: number; completed: number };
  recent: Array<{ id: number; title: string; type: string; createdAt: string; postCount: number }>;
}

export default function AnalyticsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-gray-400">Failed to load analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">📊 Analytics</h1>
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold mb-6">Content Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Items</p>
            <p className="text-3xl font-bold">{analytics.content.total}</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Movies</p>
            <p className="text-3xl font-bold text-blue-400">{analytics.content.movies}</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Series</p>
            <p className="text-3xl font-bold text-purple-400">{analytics.content.series}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Featured</p>
            <p className="text-3xl font-bold text-yellow-400">{analytics.content.featured}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Posted</p>
            <p className="text-3xl font-bold text-green-400">{analytics.content.posted}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <h2 className="text-xl font-bold mb-6">TikTok Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-500/10 border border-orange-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Scheduled</p>
            <p className="text-3xl font-bold text-orange-400">{analytics.posts.scheduled}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-400">{analytics.posts.completed}</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Failed</p>
            <p className="text-3xl font-bold text-red-400">{analytics.posts.failed}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          {analytics.recent.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Posts</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recent.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4 text-sm">{item.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            item.type === "movie"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{item.postCount}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-gray-400">No content yet</div>
          )}
        </div>
      </section>
    </div>
  );
}
