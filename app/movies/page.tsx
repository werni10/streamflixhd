import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";

export const dynamic = "force-dynamic";

export default async function MoviesPage() {
  const movies = await db.content.findMany({
    where: { type: "movie" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-5 py-24">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {movies.map((m) => (
              <MovieCard key={m.id} id={m.id} title={m.title} photo={m.photo} type={m.type} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No movies available.</p>
        )}
      </section>
      <Footer />
    </div>
  );
}
