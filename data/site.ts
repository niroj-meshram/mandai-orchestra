/**
 * Branding and copy. Everything the visitor reads that is not a song title
 * lives here, so wording changes never mean touching a component.
 */

export const site = {
  titleHi: "मंडई ऑर्केस्ट्रा",
  titleEn: "Mandai Orchestra",
  taglineHi: "छत्तीसगढ़ी • भोजपुरी • स्टेज क्लासिक्स",
  /** Printed on the banner in the stage artwork; repeated for screen readers. */
  stageBanner: "मंडई ऑर्केस्ट्रा आपका हार्दिक स्वागत करता है",
  footer: "MANDAI ORCHESTRA • STAGE CLASSICS • DESI VIBES",
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
