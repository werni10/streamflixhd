import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { ContentRow } from "@/components/ContentRow";

export default async function Home() {
  const topMovies = await db.content.findMany({
    where: { isTop: 1, type: "movie" },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const heroItems =
    topMovies.length > 0
      ? topMovies
      : await db.content.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
        });

  const movies = await db.content.findMany({
    where: { type: "movie" },
    orderBy: { createdAt: "desc" },
    take: 18,
  });

  const series = await db.content.findMany({
    where: { type: "series" },
    orderBy: { createdAt: "desc" },
    take: 18,
  });

  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />
      <HeroSlider items={heroItems} />
      <div className="relative z-20 -mt-24 pb-16">
        {movies.length > 0 && <ContentRow title="Movies" items={movies} />}
        {series.length > 0 && <ContentRow title="Series" items={series} />}
        {movies.length === 0 && series.length === 0 && (
          <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">
            No content yet. Add movies from the{" "}
            <a href="/admin/login" className="text-brand hover:underline">
              admin dashboard
            </a>
            .
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
