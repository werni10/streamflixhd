"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
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
          <button className="bg-brand hover:bg-red-700 font-bold px-8 py-3 rounded-lg transition">
            Send Message
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
