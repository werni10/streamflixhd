import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <span className="text-gray-600">·</span>
          <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          <span className="text-gray-600">·</span>
          <Link href="/consent" className="hover:text-white transition">Consent & Data Use</Link>
        </div>
        <p className="text-center text-gray-500 text-sm">&copy; 2024 FlixBix. All rights reserved.</p>
      </div>
    </footer>
  );
}
