import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "StreamFlixHD - Movies & Series",
  description: "Watch your favorite movies and series online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
