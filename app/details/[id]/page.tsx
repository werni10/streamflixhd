"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { posterUrl } from "@/lib/utils";

const INCEPTION_LOCKER_ID = 1; // Inception — locker on Watch/Download click
const SPIDERMAN_LOCKER_ID = 7; // Spider-Man — locker when video finishes

function openInceptionLocker() {
  const vr = (window as unknown as { _VR?: () => void })._VR;
  if (typeof vr === "function") vr();
}

function openSpidermanLocker() {
  const rp = (window as unknown as { _rp?: () => void })._rp;
  if (typeof rp === "function") rp();
}

export default function DetailsPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const [film, setFilm] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/content/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setFilm(data);

        const sugRes = await fetch(`/api/content?type=${data.type}&limit=6&exclude=${id}`);
        const sugData = await sugRes.json();
        setSuggestions(sugData);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="bg-dark text-white min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-5 py-20 text-center text-gray-400">
          Content not found.
        </div>
        <Footer />
      </div>
    );
  }

  const actors = (film.actors || "")
    .split(",")
    .map((a: string) => a.trim())
    .filter(Boolean);

  return (
    <div className="bg-dark text-white min-h-screen">
      <Header />

      <section className="relative min-h-[80vh]">
        <img
          src={posterUrl(film.photo)}
          alt={film.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-16 pb-12 flex flex-col md:flex-row gap-10 items-end min-h-[80vh]">
          <img
            src={posterUrl(film.photo)}
            alt={film.title}
            className="w-48 md:w-64 rounded-xl shadow-2xl object-cover aspect-[2/3] hidden md:block"
          />

          <div className="max-w-2xl">
            <span className="bg-brand text-xs font-bold px-2 py-1 rounded uppercase">
              {film.type === "movie" ? "Movie" : "Series"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4">{film.title}</h1>
            <p className="text-gray-300 leading-relaxed mb-6">{film.description}</p>

            {actors.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">Cast</p>
                <div className="flex flex-wrap gap-2">
                  {actors.map((actor: string, i: number) => (
                    <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {film.link ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (film.id === INCEPTION_LOCKER_ID) openInceptionLocker();
                    setPlayerOpen(true);
                  }}
                  className="inline-flex items-center gap-3 bg-white text-black font-bold text-lg px-8 py-3.5 rounded-md hover:bg-gray-200 transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Now
                </button>

                <a
                  href={film.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (film.id === INCEPTION_LOCKER_ID) openInceptionLocker();
                  }}
                  className="inline-flex items-center gap-3 bg-brand text-white font-bold text-lg px-8 py-3.5 rounded-md hover:bg-red-700 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                  </svg>
                  Download Full HD
                </a>
              </div>
            ) : (
              <span className="inline-flex items-center gap-2 bg-gray-700 text-gray-300 px-6 py-3 rounded-md">
                Link coming soon
              </span>
            )}
          </div>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-4">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {suggestions.map((m) => (
              <MovieCard key={m.id} id={m.id} title={m.title} photo={m.photo} type={m.type} />
            ))}
          </div>
        </section>
      )}

      {playerOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-3 sm:p-6">
          <button
            onClick={() => {
              setPlayerOpen(false);
              setIsPlaying(false);
            }}
            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="w-full max-w-6xl">
            <div className="group relative w-full aspect-video rounded-lg overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl cursor-pointer select-none">
              {!isPlaying ? (
                <>
                  <img
                    src={posterUrl(film.photo)}
                    alt={film.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
                  <button
                    onClick={() => {
                      if (film.id === SPIDERMAN_LOCKER_ID) openSpidermanLocker();
                      setIsPlaying(true);
                    }}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand/90 group-hover:bg-brand grid place-items-center shadow-2xl group-hover:scale-110 transition ring-4 ring-white/20">
                      <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                </>
              ) : film.link.match(/\.(mp4|webm|ogg|mov|m4v)$/i) ? (
                <video
                  src={film.link}
                  poster={posterUrl(film.photo)}
                  controls
                  autoPlay
                  className="w-full h-full bg-black"
                />
              ) : (
                <iframe
                  src={film.link}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
            <p className="text-center text-gray-500 text-xs mt-3">Click play to start watching</p>
          </div>
        </div>
      )}

      {film.id === INCEPTION_LOCKER_ID && (
        <>
          <Script id="locker-config-inception" strategy="afterInteractive">
            {`var Loshk_XKB_RXjMsc={"it":4622760,"key":"d8c37"};`}
          </Script>
          <Script src="https://d1g1lhd4vferpn.cloudfront.net/5a8ee65.js" strategy="afterInteractive" />
        </>
      )}

      {film.id === SPIDERMAN_LOCKER_ID && (
        <>
          <Script id="locker-config-spiderman" strategy="afterInteractive">
            {`var DNjXX_LTJ_JHLGLc={"it":4622871,"key":"a8e94"};`}
          </Script>
          <Script src="https://d19k1sh57v5k0g.cloudfront.net/0a4962b.js" strategy="afterInteractive" />
        </>
      )}

      <Footer />
    </div>
  );
}
