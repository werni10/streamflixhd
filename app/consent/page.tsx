import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Consent & Data Use - FlixBix",
};

export default function ConsentPage() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-5 py-24 prose prose-invert">
        <h1 className="text-3xl font-bold mb-2">Consent &amp; Data Use</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: January 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            This page documents exactly how FlixBix obtains, records, and honors user consent. It
            is intended to be a transparent, technical description of our opt-in flow.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">1. Where Consent Is Collected</h2>
          <p>
            Consent is collected on our{" "}
            <a href="/contact" className="text-brand hover:underline">
              Contact page
            </a>
            . The form includes an unchecked, optional checkbox next to the following exact text:
          </p>
          <blockquote className="border-l-4 border-brand pl-4 italic text-gray-400">
            &quot;I agree to receive occasional updates from FlixBix and consent to the processing
            of my email address as described in the Privacy Policy.&quot;
          </blockquote>
          <p>
            The checkbox is <strong>never pre-checked</strong>. Submitting the contact form without
            checking this box does not opt you into anything beyond the one-time handling of your
            message.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">2. What Happens When You Opt In</h2>
          <p>When the checkbox is checked at the moment of form submission, we record:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The email address you provided</li>
            <li>The exact consent text shown to you at that time (quoted above)</li>
            <li>A timestamp of when consent was given</li>
            <li>The IP address the request originated from (for audit purposes)</li>
          </ul>
          <p>
            This record is stored in our database and is not used for any purpose beyond what is
            described in this page and our{" "}
            <a href="/privacy" className="text-brand hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          <h2 className="text-xl font-bold text-white mt-8">3. What Happens If You Don&apos;t Opt In</h2>
          <p>
            If the checkbox is left unchecked, no consent record is created. Your contact form
            submission (name, email, message) is still processed solely to respond to your
            inquiry, per our Privacy Policy.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">4. Withdrawing Consent</h2>
          <p>
            You may withdraw consent at any time by emailing us through our{" "}
            <a href="/contact" className="text-brand hover:underline">
              Contact page
            </a>{" "}
            and requesting removal. We will delete your consent record and stop any related
            communication.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">5. No Silent Re-Consent</h2>
          <p>
            We do not carry forward or assume consent from prior interactions. Each opt-in is
            explicit, tied to a single checkbox action, and independently recorded.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Related Pages</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <a href="/privacy" className="text-brand hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-brand hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" className="text-brand hover:underline">
                Contact / Opt-in Form
              </a>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}
