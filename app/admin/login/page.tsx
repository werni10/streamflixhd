"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", { username, password, redirect: false });

      if (result?.error) {
        setError("Invalid username or password");
      } else if (result?.ok) {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
          <p className="text-gray-400">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-lg border border-white/10">
          {error && (
            <div className="bg-red-500/15 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-red-700 disabled:opacity-50 font-bold py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
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
