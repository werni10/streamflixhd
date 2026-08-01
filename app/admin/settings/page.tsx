"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    contact_email: "",
    tiktok_url: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSettings({
          site_name: data.site_name || "",
          site_description: data.site_description || "",
          contact_email: data.contact_email || "",
          tiktok_url: data.tiktok_url || "",
        });
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchSettings();
    }
  }, [status]);

  const handleSave = async (key: string, value: string) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage(`✅ "${key}" updated successfully`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to save setting");
    } finally {
      setSaving(false);
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
          <h1 className="font-bold text-lg">Settings</h1>
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
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

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <label className="block text-sm font-semibold mb-2">Site Name</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              placeholder="StreamFlixHD"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand mb-4"
            />
            <button
              onClick={() => handleSave("site_name", settings.site_name)}
              disabled={saving}
              className="bg-brand hover:bg-red-700 disabled:opacity-50 font-bold px-6 py-2 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              placeholder="Your site description..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand mb-4"
            />
            <button
              onClick={() => handleSave("site_description", settings.site_description)}
              disabled={saving}
              className="bg-brand hover:bg-red-700 disabled:opacity-50 font-bold px-6 py-2 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <label className="block text-sm font-semibold mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              placeholder="admin@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand mb-4"
            />
            <button
              onClick={() => handleSave("contact_email", settings.contact_email)}
              disabled={saving}
              className="bg-brand hover:bg-red-700 disabled:opacity-50 font-bold px-6 py-2 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <label className="block text-sm font-semibold mb-2">TikTok Profile URL</label>
            <input
              type="url"
              value={settings.tiktok_url}
              onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
              placeholder="https://tiktok.com/@username"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand mb-4"
            />
            <button
              onClick={() => handleSave("tiktok_url", settings.tiktok_url)}
              disabled={saving}
              className="bg-brand hover:bg-red-700 disabled:opacity-50 font-bold px-6 py-2 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
