/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CATEGORIES — the writing that sits on each programme's page.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  `data/playlists.ts` is generated and decides which songs land in which
 *  programme. This file is written by hand and decides what each page *says*,
 *  and a sync never touches it.
 *
 *  The split matters more than it looks. Thirty-nine songs cannot fill six
 *  pages without overlapping — a Chhattisgarhi dance number genuinely belongs
 *  both on the CG page and in the mela set. What keeps six overlapping
 *  tracklists from reading as one page duplicated six times is that each one is
 *  *written* about something different. So the prose here is the substance and
 *  the tracklist is the supporting evidence, not the other way round.
 *
 *  `slug` must match a playlist id in data/playlists.ts, or the page 404s.
 */

export interface Category {
  /** Matches a playlist id, and is the URL: /<slug> */
  slug: string;
  /** Page <title>. Front-loaded with the phrase the page is written for. */
  title: string;
  /** Meta description, kept to roughly 150–160 characters. */
  description: string;
  /** The visible H1. */
  heading: string;
  headingHi: string;
  /** One line under the H1. */
  standfirst: string;
  /** Body copy. Written to be read, not to be counted. */
  body: string[];
  /** Slugs of the two or three pages worth reading next. */
  related: string[];
}

export const categories: Category[] = [
  {
    slug: "chhattisgarhi-orchestra-songs",
    title:
      "Chhattisgarhi Orchestra Songs | Mandai Orchestra",
    description:
      "Chhattisgarhi orchestra songs from the mandai and mela stage — CG orchestra hits, live stage numbers and village programme classics, playing back to back.",
    heading: "Chhattisgarhi Orchestra Songs",
    headingHi: "छत्तीसगढ़ी ऑर्केस्ट्रा",
    standfirst: "गाँव के मंच से, सीधे — the songs the CG stage was built on.",
    body: [
      "An orchestra in Chhattisgarh was never an orchestra in the concert-hall sense. It was eight or nine people on a wooden platform behind a painted banner: a keyboard player doing the work of a whole string section, a drummer, a dholak, a benjo, two or three singers taking turns, and a dancer or two who came on when the tempo lifted. The generator sat at the side and you could hear it between songs. That arrangement is what these recordings come out of, and it is why they sound the way they do — loud, unhurried, and made to carry to the back of a field.",
      "The songs themselves are the ones that got requested until the band gave in. Gorelal Barman turns up more than anyone, because in most of Chhattisgarh he simply is what an orchestra night sounds like. Around him sit the numbers that every local troupe learned because a crowd would not let them leave without playing them — the teasing ones about a girl who will not look your way, the ones about somebody's village, the wedding songs that get played months away from any wedding.",
      "Nothing here is a studio-polished version of anything. These are the takes that circulated on cassette, then on CD, then on the phone of whoever had the biggest memory card, and finally onto YouTube where somebody uploaded them with the title in whatever mix of Hindi and English came to hand. That is the archive this is drawn from, and it is the only one there is.",
    ],
    related: ["cg-stage-program-songs", "mandai-orchestra-night", "orchestra-classics"],
  },

  {
    slug: "cg-stage-program-songs",
    title: "CG Stage Program Songs — Live Classics | Mandai Orchestra",
    description:
      "CG stage program songs in running order — Chhattisgarhi live stage numbers and Bhojpuri orchestra favourites, the way a village programme actually played out.",
    heading: "CG Stage Program Classics",
    headingHi: "स्टेज प्रोग्राम",
    standfirst: "साउंड चेक से सुबह तक — a programme, in the order it was played.",
    body: [
      "A stage programme had a shape, and everyone in the audience knew it. It opened with something devotional and short, because you do not start a night by asking people to dance. Then came the ones people had actually paid ten rupees for: the fast Chhattisgarhi numbers, the Bhojpuri hits that had come down from Bihar and been adopted wholesale, the film songs the band could do well enough. Somewhere past midnight the tempo dropped and stayed down.",
      "This is that middle stretch — the working part of the night, when the crowd is standing rather than sitting and the singer has stopped announcing every song. Chhattisgarhi and Bhojpuri sit side by side here for the same reason they sat side by side on the stage: no troupe in central India could afford to specialise. A band that could not play both did not get booked twice.",
      "What holds it together is not language but tempo. These are the songs a keyboard player could set a rhythm preset to and let run, the ones where the dancers came forward, the ones the sound man turned up. Played in sequence they still work as a set, which is the most honest test of whether a running order was any good.",
    ],
    related: ["chhattisgarhi-orchestra-songs", "bhojpuri-orchestra-songs", "mela-orchestra-songs"],
  },

  {
    slug: "bhojpuri-orchestra-songs",
    title: "Bhojpuri Orchestra Songs | Mandai Orchestra",
    description:
      "Bhojpuri orchestra songs from the stage programme circuit — the dance numbers, the singalongs and the late hits that travelled across into Chhattisgarh.",
    heading: "Bhojpuri Orchestra Nights",
    headingHi: "भोजपुरी ऑर्केस्ट्रा",
    standfirst: "स्पीकर फटने तक — the songs that came west and stayed.",
    body: [
      "Bhojpuri arrived in Chhattisgarh the way music usually travels: with the people who moved for work, on cassettes bought at a bus stand, and then through orchestra troupes who learned whatever was getting requested. By the time a Bhojpuri hit reached a mandai stage in Durg or Raipur it had usually lost its film and kept its chorus, which is all a crowd wanted from it anyway.",
      "The songs here are the ones that made that crossing. Pawan Singh and the Wave Music catalogue are heavily represented, because those were the records that got played until the tape wore thin. They are built for exactly this setting — a strong four-beat, a chorus that arrives early and often, and lyrics that are more a set of jokes than a story.",
      "It is worth saying that these are dance songs and were treated as such. Nobody stood still through them, nobody listened respectfully, and the band played them at whatever tempo the crowd was already moving at. Heard now on a phone they can seem relentless; heard at two in the morning on a field with the lights strung overhead, they were the point of the whole evening.",
    ],
    related: ["cg-stage-program-songs", "mela-orchestra-songs", "chhattisgarhi-orchestra-songs"],
  },

  {
    slug: "mela-orchestra-songs",
    title: "Mela Orchestra Songs — Fairground Sets | Mandai Orchestra",
    description:
      "Mela orchestra songs — the fairground set of Chhattisgarhi and Bhojpuri stage numbers, played between the wheel, the food stalls and the generator hum.",
    heading: "Mela & Mandai Music Collection",
    headingHi: "मेला ऑर्केस्ट्रा",
    standfirst: "झूला, जलेबी, जनरेटर — music heard while walking past.",
    body: [
      "A mela is not a concert, and its music was never meant to be listened to sitting down. The stage was one attraction among several — a hand-cranked wheel on one side, a row of stalls selling jalebi and plastic toys on the other, a shooting gallery with a speaker of its own. The orchestra had to win attention from all of that, which is why the set was built almost entirely out of songs with a chorus you could catch from fifty metres away.",
      "That is the selection here: the loud, immediate, singalong end of the repertoire. Nothing subtle survives a fairground. What survives is a strong rhythm, a familiar hook, and a singer willing to repeat it more times than a recording ever would.",
      "In central India the mela and the mandai overlap so much that the words get used for each other. A mandai is the older idea — a village fair on a fixed day, often tied to a temple, with the market and the stage as two halves of the same event. Diwali week was when the biggest ones happened, and when a troupe made most of its year's bookings. These are the songs that got them through those nights.",
    ],
    related: ["mandai-orchestra-night", "bhojpuri-orchestra-songs", "cg-stage-program-songs"],
  },

  {
    slug: "mandai-orchestra-night",
    title: "Mandai Orchestra Night — Late Night CG Stage Songs",
    description:
      "Mandai orchestra night songs — the slow, late part of the programme, when a Chhattisgarhi stage crowd thins out and the band plays for whoever stayed.",
    heading: "Late Night Orchestra Performances",
    headingHi: "मंडई नाइट",
    standfirst: "बारह के बाद वाला प्रोग्राम — for whoever was still there.",
    body: [
      "Every programme had a second half that most people missed. Families went home after the dance set, the stalls started packing up, and what was left was a thinner, older, quieter crowd sitting on plastic chairs that had been dragged into a rough half-circle. The band knew it and changed accordingly. The tempo came down, the keyboard swapped its rhythm preset for something with strings on it, and the singer stopped shouting.",
      "These are those songs — the slow ones, the sad ones, the devotional numbers that got held back for the hours when they would land, and the long romantic pieces that ran to six or seven minutes because nobody was waiting for them to end. Several of the recordings here are noticeably longer than the dance tracks, and that is not an accident of the upload.",
      "Mandai nights in Diwali week ran until the light changed. If you have a memory of walking home along a road with one song still going behind you, getting quieter but never quite stopping, it was probably something from this part of the evening.",
    ],
    related: ["mela-orchestra-songs", "orchestra-classics", "chhattisgarhi-orchestra-songs"],
  },

  {
    slug: "orchestra-classics",
    title: "Orchestra Classics — Film Songs, Local Bands | Mandai",
    description:
      "Orchestra classics from the CG stage circuit — the Hindi film songs every local band learned, plus the instrumental dhun that filled the gaps between sets.",
    heading: "Orchestra Classics",
    headingHi: "ऑर्केस्ट्रा क्लासिक्स",
    standfirst: "फिल्मी गाना, लोकल बैंड — the covers everybody could play.",
    body: [
      "No orchestra survived on regional songs alone. Every troupe carried a folder of Hindi film numbers, and it was roughly the same folder everywhere: whatever had been a hit in the nineties, plus a handful of older ones that had never gone away. A band was often judged on these rather than on its own repertoire, because these were the songs the audience could compare against the record.",
      "The versions that got played were rarely faithful and were not trying to be. A keyboard covered the orchestration, the key moved to wherever the singer was comfortable, and an instrumental section got extended or cut depending on how the night was going. What came out was recognisably the song and unmistakably a local band playing it, which is its own thing and is the reason people still look these up.",
      "Also gathered here is the instrumental end of the repertoire — the dhun a band played while a singer changed, while the compère talked, or while somebody sorted out a cable. Nobody applauded them and nobody asked for them, but a programme without them would have had holes in it.",
    ],
    related: ["chhattisgarhi-orchestra-songs", "mandai-orchestra-night", "cg-stage-program-songs"],
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
