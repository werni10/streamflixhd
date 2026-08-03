import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - FlixBix",
};

export default function PrivacyPage() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-5 py-24 prose prose-invert">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: January 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            This Privacy Policy explains how FlixBix (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
            operating at{" "}
            <a href="https://flixbix.online" className="text-brand hover:underline">
              flixbix.online
            </a>
            , collects, uses, and protects information when you visit our site or interact with our
            services.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Contact form data:</strong> name, email address, and message content you
              voluntarily submit through our Contact page.
            </li>
            <li>
              <strong>Opt-in data:</strong> if you check the consent box on our Contact form, we
              record your email, the timestamp of consent, and the specific consent text you agreed
              to.
            </li>
            <li>
              <strong>Usage data:</strong> standard server logs (IP address, browser type, pages
              visited, referring URL) collected automatically by our hosting provider (Vercel) and
              database provider (Supabase).
            </li>
            <li>
              <strong>Cookies:</strong> session cookies for admin authentication (httpOnly, not
              accessible to third parties).
            </li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">2. How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To respond to messages submitted via the Contact form.</li>
            <li>To send updates or communications you have explicitly opted in to receive.</li>
            <li>To operate, secure, and improve the site.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">3. Third-Party Services</h2>
          <p>We use the following third-party services to operate this site:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Vercel</strong> — hosting and content delivery.
            </li>
            <li>
              <strong>Supabase</strong> — database storage (PostgreSQL).
            </li>
            <li>
              <strong>Vercel Blob</strong> — image storage for content posters.
            </li>
          </ul>
          <p>
            Each of these providers has its own privacy policy governing how it processes data on
            our behalf. We do not sell personal information to third parties.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">4. Data Retention</h2>
          <p>
            Contact form submissions and opt-in records are retained until you request deletion.
            You may request deletion of your data at any time by emailing us (see Contact section
            below).
          </p>

          <h2 className="text-xl font-bold text-white mt-8">5. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Withdraw consent at any time (see our Consent &amp; Data Use page for details).</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">6. Children&apos;s Privacy</h2>
          <p>
            This site is not directed at children under 13, and we do not knowingly collect
            personal information from children under 13.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated &quot;Last updated&quot; date.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">8. Contact Us</h2>
          <p>
            Questions about this Privacy Policy or your data? Contact us through our{" "}
            <a href="/contact" className="text-brand hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
