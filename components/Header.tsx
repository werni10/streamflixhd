import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-brand">Stream</span>
            <span className="text-white">Flix</span>
            <span className="text-brand">HD</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-semibold">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/movies" className="text-gray-300 hover:text-white transition">Movies</Link>
            <Link href="/series" className="text-gray-300 hover:text-white transition">Series</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
          </div>
        </div>
        <Link
          href="/admin/login"
          className="text-xs font-bold px-4 py-2 rounded bg-brand hover:bg-red-700 transition"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}
