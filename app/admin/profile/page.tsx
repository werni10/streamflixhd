"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to change password");
        return;
      }

      setMessage("✅ Password changed successfully. Logging out...");
      setTimeout(() => {
        signOut({ callbackUrl: "/admin/login" });
      }, 2000);
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
          <h1 className="font-bold text-lg">Profile</h1>
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Username</p>
              <p className="font-semibold">{session?.user?.name || "Admin"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="font-semibold">Administrator</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6">Change Password</h2>

          {error && (
            <div className="bg-red-500/15 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/15 border border-green-500/40 text-green-300 px-4 py-3 rounded-lg mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand hover:bg-red-700 disabled:opacity-50 font-bold py-3 rounded-lg transition"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
