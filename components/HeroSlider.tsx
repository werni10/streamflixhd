"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { posterUrl } from "@/lib/utils";

interface HeroSliderProps {
  items: Array<{
    id: number;
    title: string;
    description?: string | null;
    photo?: string | null;
    type: string;
  }>;
}

export function HeroSlider({ items }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const item = items[current];

  return (
    <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
      <img
        src={posterUrl(item.photo)}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-dark/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/40 to-transparent" />

      <div className="relative z-10 h-full max-w-[1700px] mx-auto flex flex-col justify-center px-6 sm:px-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-brand font-extrabold text-xl tracking-widest">S</span>
            <span className="text-gray-300 text-xs tracking-[0.3em] uppercase">
              {item.type === "series" ? "Series" : "Movie"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] mb-4 drop-shadow-2xl">
            {item.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="text-green-400 font-semibold">Recommended</span>
            <span className="border border-gray-500 px-1.5 rounded text-xs">HD</span>
          </div>
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-7 line-clamp-3 drop-shadow">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/details/${item.id}`}
              className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-white/85 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <Link
              href={`/details/${item.id}`}
              className="flex items-center gap-2 bg-gray-500/40 backdrop-blur text-white font-semibold px-7 py-3 rounded hover:bg-gray-500/60 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-28 right-6 sm:right-12 z-20 flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === current ? "w-8 bg-brand" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />
    </section>
  );
}
