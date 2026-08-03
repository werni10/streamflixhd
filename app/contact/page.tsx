"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [optIn, setOptIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setSubmitting(true);
    try {
      if (optIn) {
        const res = await fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to record consent");
          setSubmitting(false);
          return;
        }
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setOptIn(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />
      <section className="max-w-2xl mx-auto px-5 py-24">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-400 mb-8">
          Got a question? Send us a message and we'll get back to you soon.
        </p>

        {submitted && (
          <div className="bg-green-500/15 border border-green-500/40 text-green-300 px-4 py-3 rounded-lg mb-6">
            ✅ Your message has been sent successfully. Thank you!
          </div>
        )}

        {error && (
          <div className="bg-red-500/15 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition"
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="optIn"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="w-4 h-4 mt-1"
            />
            <label htmlFor="optIn" className="text-sm text-gray-400">
              I agree to receive occasional updates from FlixBix and consent to the processing of
              my email address as described in the{" "}
              <a href="/privacy" className="text-brand hover:underline">
                Privacy Policy
              </a>
              . (Optional &mdash; see our{" "}
              <a href="/consent" className="text-brand hover:underline">
                Consent &amp; Data Use
              </a>{" "}
              page for details.)
            </label>
          </div>
          <button
            disabled={submitting}
            className="bg-brand hover:bg-red-700 disabled:opacity-50 font-bold px-8 py-3 rounded-lg transition"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
