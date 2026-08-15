import type { Metadata, Viewport } from "next";
import { Tiro_Devanagari_Hindi, Mukta } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

/**
 * Two faces, both drawn for Devanagari first:
 *   Tiro Devanagari Hindi — an elegant, calm serif; carries the title
 *   Mukta                 — humanist sans for everything you have to read
 */
const tiro = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-tiro",
  display: "swap",
});

const mukta = Mukta({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "devanagari"],
  variable: "--font-mukta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.titleHi} · ${site.titleEn}`,
  description:
    "छत्तीसगढ़ी • भोजपुरी • स्टेज क्लासिक्स — a mandai night that never got packed up.",
  openGraph: {
    title: `${site.titleHi} · ${site.titleEn}`,
    description: site.taglineHi,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0805",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${tiro.variable} ${mukta.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      </head>
      <body className="bg-ink antialiased">{children}</body>
    </html>
  );
}
