"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create admin");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-brand">Flix</span>
            <span>Bix</span>
          </h1>
          <p className="text-gray-400">Admin Setup</p>
          <p className="text-gray-500 text-sm mt-2">Create your first admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-lg border border-white/10">
          {error && (
            <div className="bg-red-500/15 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/15 border border-green-500/40 text-green-300 px-4 py-3 rounded-lg">
              ✅ Admin account created! Redirecting to login...
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
              disabled={loading || success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
              disabled={loading || success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
              disabled={loading || success}
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-brand hover:bg-red-700 disabled:opacity-50 font-bold py-3 rounded-lg transition"
          >
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <Link href="/" className="text-brand hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
