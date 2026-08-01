"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ScheduledPost {
  id: number;
  contentId: number;
  caption: string;
  scheduledAt: string;
  status: "pending" | "done" | "failed";
  contentTitle?: string;
}

export default function SchedulerPage() {
  const { status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [content, setContent] = useState<Array<{ id: number; title: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ contentId: "", caption: "", scheduledAt: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentRes = await fetch("/api/content?limit=1000");
        const contentData = await contentRes.json();
        setContent(contentData);

        const postsRes = await fetch("/api/admin/scheduler");
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (!form.contentId || !form.scheduledAt) {
      setError("Please select content and schedule date");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: parseInt(form.contentId),
          caption: form.caption,
          scheduledAt: form.scheduledAt,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to schedule");
        return;
      }

      setMessage("✅ Post scheduled successfully");
      setForm({ contentId: "", caption: "", scheduledAt: "" });

      const postsRes = await fetch("/api/admin/scheduler");
      const postsData = await postsRes.json();
      setPosts(postsData);

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this scheduled post?")) return;

    try {
      const res = await fetch(`/api/admin/scheduler/${id}`, { method: "DELETE" });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        setMessage("✅ Scheduled post deleted");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to delete");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

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

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">📅 TikTok Scheduler</h1>
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className="bg-green-500/15 border border-green-500/40 text-green-300 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/15 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8">
          <h2 className="text-lg font-bold mb-6">Schedule Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <select
                value={form.contentId}
                onChange={(e) => setForm({ ...form, contentId: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
                required
              >
                <option value="">Select a movie or series...</option>
                {content.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Caption</label>
              <textarea
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                placeholder="Add a caption for the TikTok post..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Schedule Date & Time</label>
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand hover:bg-red-700 disabled:opacity-50 font-bold py-3 rounded-lg transition"
            >
              {submitting ? "Scheduling..." : "Schedule Post"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-6">Scheduled Posts</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            {posts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/10 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Content</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Caption</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Scheduled</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-6 py-4 text-sm">{post.contentTitle}</td>
                        <td className="px-6 py-4 text-sm text-gray-400 line-clamp-2">{post.caption || "-"}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(post.scheduledAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              post.status === "pending"
                                ? "bg-orange-500/20 text-orange-300"
                                : post.status === "done"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          {post.status === "pending" && (
                            <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:underline">
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-gray-400">No scheduled posts yet</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
