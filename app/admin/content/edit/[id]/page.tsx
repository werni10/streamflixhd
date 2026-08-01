"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { posterUrl } from "@/lib/utils";

interface ContentItem {
  id: number;
  type: string;
  title: string;
  description?: string | null;
  actors?: string | null;
  link?: string | null;
  photo?: string | null;
  isTop: number;
}

export default function EditContentPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<ContentItem>({
    id: 0,
    type: "movie",
    title: "",
    description: "",
    actors: "",
    link: "",
    photo: "",
    isTop: 0,
  });
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/content/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setFormData(data);
        if (data.photo) setPhotoPreview(posterUrl(data.photo));
      } catch (error) {
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    if (id && status === "authenticated") {
      fetchContent();
    }
  }, [id, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const data = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        actors: formData.actors,
        link: formData.link,
        isTop: formData.isTop,
      };

      const res = await fetch(`/api/admin/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Failed to update");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">Edit: {formData.title}</h1>
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-lg border border-white/10">
          {error && (
            <div className="bg-red-500/15 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Actors</label>
            <input
              type="text"
              value={formData.actors || ""}
              onChange={(e) => setFormData({ ...formData, actors: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Watch Link</label>
            <input
              type="url"
              value={formData.link || ""}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          {photoPreview && (
            <div>
              <p className="text-sm font-semibold mb-2">Current Poster</p>
              <img src={photoPreview} alt="Preview" className="w-32 h-48 object-cover rounded" />
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isTop"
              checked={formData.isTop === 1}
              onChange={(e) => setFormData({ ...formData, isTop: e.target.checked ? 1 : 0 })}
              className="w-4 h-4"
            />
            <label htmlFor="isTop" className="ml-2 text-sm font-semibold">
              Featured (Show in hero slider)
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand hover:bg-red-700 disabled:opacity-50 font-bold py-3 rounded-lg transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </div>
  );
}
