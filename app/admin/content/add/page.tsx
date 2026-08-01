"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddContentPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    type: "movie",
    title: "",
    description: "",
    actors: "",
    link: "",
    isTop: false,
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let photoUrl = "";

      if (photo) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", photo);

        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadFormData });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json();
          setError(uploadError.error || "Photo upload failed");
          setLoading(false);
          return;
        }

        const uploadData = await uploadRes.json();
        photoUrl = uploadData.url;
      }

      const contentData = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        actors: formData.actors,
        link: formData.link,
        isTop: formData.isTop ? 1 : 0,
        photo: photoUrl,
      };

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Failed to add content");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">Add Movie/Series</h1>
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
              placeholder="Movie/Series title"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Actors</label>
            <input
              type="text"
              value={formData.actors}
              onChange={(e) => setFormData({ ...formData, actors: e.target.value })}
              placeholder="Actor 1, Actor 2, Actor 3"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Watch Link</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://example.com/movie"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand"
            />
            <p className="text-xs text-gray-500 mt-1">Video or iframe URL</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Poster Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand text-white"
            />
            {photoPreview && (
              <div className="mt-4">
                <img src={photoPreview} alt="Preview" className="w-32 h-48 object-cover rounded" />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isTop"
              checked={formData.isTop}
              onChange={(e) => setFormData({ ...formData, isTop: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isTop" className="ml-2 text-sm font-semibold">
              Featured (Show in hero slider)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-red-700 disabled:opacity-50 font-bold py-3 rounded-lg transition"
          >
            {loading ? "Adding..." : "Add Content"}
          </button>
        </form>
      </section>
    </div>
  );
}
