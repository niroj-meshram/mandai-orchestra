import type { Metadata, Viewport } from "next";
import { Tiro_Devanagari_Hindi, Mukta } from "next/font/google";
import { site } from "@/data/site";
import { StructuredData } from "@/components/StructuredData";
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
  // Every relative URL below resolves against this, so the canonical tag, the
  // sitemap and the social card all point at one hostname.
  metadataBase: new URL(site.url),

  title: {
    default: site.metaTitle,
    // Category pages write their own full title, so this only catches anything
    // that forgets to — better a branded suffix than a bare page name.
    template: `%s · ${site.titleEn}`,
  },
  description: site.description,
  // Copied out of the readonly `as const` tuple that `site` is declared as.
  keywords: [...site.keywords],
  applicationName: site.titleEn,
  category: "music",
  authors: [{ name: site.author.name, url: site.author.linkedin }],
  creator: site.author.name,
  publisher: site.author.name,

  alternates: {
    canonical: "/",
    languages: { "hi-IN": "/", "en-IN": "/" },
  },

  openGraph: {
    type: "website",
    siteName: site.titleEn,
    locale: "hi_IN",
    url: site.url,
    title: `${site.titleHi} · ${site.titleEn}`,
    description: site.description,
    images: [
      {
        url: "/stage/scene.png",
        width: 1672,
        height: 941,
        alt: "मंडई ऑर्केस्ट्रा — the lit stage at a mandai night",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.titleHi} · ${site.titleEn}`,
    description: site.descriptionShort,
    images: ["/stage/scene.png"],
    creator: "@nrjmeshram1998",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <StructuredData />
        {/* Decides before the first paint whether the curtain runs, so a
            returning visitor never sees a closed curtain flash up and vanish.
            `?curtain` forces it back on for a look. Wrapped in try/catch
            because sessionStorage throws outright in some private modes, and
            an unhandled throw here would take the page down with it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var f=location.search.indexOf('curtain')>-1;var s=sessionStorage.getItem('mo-curtain');document.documentElement.dataset.curtain=(s&&!f)?'skip':'play';sessionStorage.setItem('mo-curtain','1')}catch(e){document.documentElement.dataset.curtain='play'}`,
          }}
        />
      </head>
      <body className="bg-ink antialiased">{children}</body>
    </html>
  );
}
