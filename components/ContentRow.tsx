import { MovieCard } from "./MovieCard";

interface ContentRowProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    photo?: string | null;
    type: string;
  }>;
}

export function ContentRow({ title, items }: ContentRowProps) {
  if (!items.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 px-6">{title}</h2>
      <div className="relative">
        <div className="overflow-x-auto pb-4 px-6 scroll-smooth">
          <div className="flex gap-4 min-w-min">
            {items.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-40">
                <MovieCard id={item.id} title={item.title} photo={item.photo} type={item.type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
