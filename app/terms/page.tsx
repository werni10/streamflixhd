import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - FlixBix",
};

export default function TermsPage() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-5 py-24 prose prose-invert">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: January 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            By accessing or using{" "}
            <a href="https://flixbix.online" className="text-brand hover:underline">
              flixbix.online
            </a>{" "}
            (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not
            agree, please do not use the Site.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">1. Use of the Site</h2>
          <p>
            The Site provides information about movies and series for informational and
            entertainment purposes. You agree to use the Site only for lawful purposes and in a
            way that does not infringe the rights of others.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">2. Content &amp; Third-Party Links</h2>
          <p>
            The Site may display links to external content hosted by third parties. We do not
            control, host, or claim ownership of content hosted on third-party sites reachable
            through links on this Site. We are not responsible for the availability, accuracy, or
            legality of content on external sites.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">3. Accounts</h2>
          <p>
            Administrative accounts are restricted to authorized site operators. You are
            responsible for maintaining the confidentiality of your account credentials.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">4. Intellectual Property</h2>
          <p>
            Movie and series titles, descriptions, and artwork referenced on the Site may be the
            property of their respective owners and are referenced for identification purposes
            only.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">5. Disclaimer of Warranties</h2>
          <p>
            The Site is provided &quot;as is&quot; without warranties of any kind, express or
            implied. We do not guarantee that the Site will be uninterrupted, error-free, or
            secure.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, FlixBix shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the Site.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">7. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Site after changes
            constitutes acceptance of the revised Terms.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">8. Contact</h2>
          <p>
            Questions about these Terms? Reach us via our{" "}
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
