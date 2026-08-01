import Link from "next/link";
import { posterUrl } from "@/lib/utils";

interface MovieCardProps {
  id: number;
  title: string;
  photo?: string | null;
  type: string;
}

export function MovieCard({ id, title, photo, type }: MovieCardProps) {
  return (
    <Link href={`/details/${id}`} className="group cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
        <img
          src={posterUrl(photo)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-sm font-bold line-clamp-2 group-hover:text-brand transition">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
