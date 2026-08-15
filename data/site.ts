/**
 * Branding and copy. Everything the visitor reads that is not a song title
 * lives here, so wording changes never mean touching a component.
 */

export const site = {
  titleHi: "मंडई ऑर्केस्ट्रा",
  titleEn: "Mandai Orchestra",
  taglineHi: "छत्तीसगढ़ी • भोजपुरी • स्टेज क्लासिक्स",

  /**
   * Where this is served from. Canonical URLs, the sitemap and the social card
   * all need an absolute address, and they have to agree — two hostnames for
   * one page is how a site ends up competing with itself in search results.
   * Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is attached.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mandai-orchestra.vercel.app")
    .replace(/\/$/, ""),

  /**
   * What someone types when they are looking for exactly this. The long, plain
   * ones matter most — a phrase nobody else has written a page for is winnable
   * in a way that a single common word never is.
   */
  /** The homepage title tag, front-loaded with the phrase it is written for. */
  metaTitle:
    "Mandai Orchestra – Chhattisgarhi Orchestra Songs, CG Stage Program & Bhojpuri Orchestra",

  /** Kept to roughly 155 characters, which is about where Google truncates. */
  description:
    "मंडई ऑर्केस्ट्रा — Chhattisgarhi orchestra songs, CG stage program classics and Bhojpuri orchestra nights, playing back to back all night. No sign-up.",
  descriptionShort:
    "CG, Bhojpuri and stage-classic orchestra songs, playing all night.",
  /** Printed on the banner in the stage artwork; repeated for screen readers. */
  stageBanner: "मंडई ऑर्केस्ट्रा आपका हार्दिक स्वागत करता है",
  footer: "MANDAI ORCHESTRA • STAGE CLASSICS • DESI VIBES",
  /**
   * Search terms, in both scripts. Google ignores the keywords meta tag
   * outright — these earn their keep by being the vocabulary the visible copy
   * and the structured data are written in, which is what actually gets read.
   */
  keywords: [
    "chhattisgarhi orchestra songs",
    "cg orchestra songs",
    "chhattisgarhi stage program songs",
    "bhojpuri orchestra songs",
    "mela orchestra songs",
    "mandai orchestra songs",
    "chhattisgarhi live orchestra",
    "cg live stage songs",
    "orchestra night songs",
    "diwali mandai orchestra",
    "chhattisgarhi cultural music",
    "mandai orchestra",
    "मंडई ऑर्केस्ट्रा",
    "छत्तीसगढ़ी ऑर्केस्ट्रा",
    "भोजपुरी ऑर्केस्ट्रा",
    "cg archestra",
    "स्टेज प्रोग्राम",
  ],

  /** Credit in the top-left corner, under the live lamp. */
  author: {
    name: "Niroj Meshram",
    linkedin: "https://www.linkedin.com/in/nirojmeshram/",
    x: "https://x.com/nrjmeshram1998",
  },
} as const;

/**
 * The nostalgic quote in the corner card. One shows at a time; it changes
 * slowly, and only while nobody is reading it mid-sentence.
 */
export const quotes: string[] = [
  "पुरानी यादें, पुराने गाने — ऑर्केस्ट्रा की वो बात ही कुछ और थी!",
  "अगली कुर्सी वाली प्लास्टिक की सीट, और रात भर बजते स्पीकर।",
  "जनरेटर की आवाज़ में भी वो गाना साफ़ सुनाई देता था।",
  "दस रुपये का टिकट, और पूरी रात का प्रोग्राम।",
  "स्टेज के साइड वाला स्पीकर — वहीं से सबसे अच्छा सुनाई देता था।",
  "घर लौटते हुए वही गाना, पूरे रास्ते।",
];
