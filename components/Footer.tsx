import { AdBanner } from "./AdBanner";

export function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-6">
        <div className="hidden sm:block">
          <AdBanner adKey="2bf1e411fd6bcef83a923bba2278bf4c" width={728} height={90} />
        </div>
        <div className="block sm:hidden">
          <AdBanner adKey="18bf68c1d429d77fa924dec186568872" width={320} height={50} />
        </div>
        <p className="text-center text-gray-500 text-sm">&copy; 2024 FlixBix. All rights reserved.</p>
      </div>
    </footer>
  );
}
