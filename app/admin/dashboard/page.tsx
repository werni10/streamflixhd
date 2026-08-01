"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ContentItem {
  id: number;
  type: string;
  title: string;
  photo?: string | null;
  link?: string | null;
  isTop: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [stats, setStats] = useState({ movies: 0, series: 0 });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content?limit=1000");
        const data = await res.json();
        setItems(data);
        setStats({
          movies: data.filter((item: ContentItem) => item.type === "movie").length,
          series: data.filter((item: ContentItem) => item.type === "series").length,
        });
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchContent();
    }
  }, [status]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });

      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("An error occurred");
    } finally {
      setDeleting(null);
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
          <h1 className="font-bold text-lg">
            🎬 Admin <span className="text-brand">Dashboard</span>
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" target="_blank" className="text-gray-400 hover:text-white">
              View Site ↗
            </Link>
            <span className="text-gray-500">·</span>
            <Link href="/admin/analytics" className="text-gray-400 hover:text-white">
              Analytics
            </Link>
            <span className="text-gray-500">·</span>
            <Link href="/admin/scheduler" className="text-gray-400 hover:text-white">
              Scheduler
            </Link>
            <span className="text-gray-500">·</span>
            <Link href="/admin/settings" className="text-gray-400 hover:text-white">
              Settings
            </Link>
            <span className="text-gray-500">·</span>
            <Link href="/admin/profile" className="text-gray-400 hover:text-white">
              Profile
            </Link>
            <span className="text-gray-500">·</span>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-gray-400 hover:text-white">
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Items</p>
            <p className="text-3xl font-bold">{items.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Movies</p>
            <p className="text-3xl font-bold text-blue-400">{stats.movies}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Series</p>
            <p className="text-3xl font-bold text-purple-400">{stats.series}</p>
          </div>
        </div>

        <Link
          href="/admin/content/add"
          className="inline-flex items-center gap-2 bg-brand hover:bg-red-700 font-bold px-6 py-3 rounded-lg transition mb-6"
        >
          <span>+</span> Add Movie/Series
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Featured</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
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
                      <td className="px-6 py-4 text-sm">
                        {item.isTop === 1 ? (
                          <span className="text-yellow-400">⭐ Featured</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        <Link href={`/admin/content/edit/${item.id}`} className="text-brand hover:underline">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deleting === item.id}
                          className="text-red-400 hover:underline disabled:opacity-50"
                        >
                          {deleting === item.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-gray-400">
              No content yet.{" "}
              <Link href="/admin/content/add" className="text-brand hover:underline">
                Add your first movie
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
