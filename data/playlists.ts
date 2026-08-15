/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PLAYLISTS — generated from a YouTube playlist. Safe to edit by hand.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Source: orchestra — https://www.youtube.com/playlist?list=PLS2iHXuLbS-w
 *
 *  Regenerate with:  npm run sync-playlist
 *  That overwrites this file, so make hand corrections after a sync, not before.
 *
 *  Titles and singers are lifted from what the uploaders typed and tidied up by
 *  a heuristic, so some will read oddly — the singer in particular is often the
 *  channel that posted the video rather than the person singing. Correcting a
 *  line here is the intended fix.
 *
 *  `duration` is only the label shown before YouTube reports the real length.
 *  `mood` is guessed from keywords; `year` is the upload date, not the year the
 *  song was recorded. Neither is displayed anywhere yet.
 */

export type Mood =
  | "dhun"
  | "dance"
  | "romantic"
  | "sad"
  | "bhakti"
  | "vidai"
  | "late-night";

export interface Song {
  title: string;
  singer: string;
  youtubeUrl: string;
  duration: string;
  mood: Mood;
  year: number;
}

export interface Playlist {
  id: string;
  name: string;
  /** Devanagari name, shown as the primary label in the panel. */
  nameHi: string;
  /** One quiet line under the name. */
  tagline: string;
  songs: Song[];
}

export const playlists: Playlist[] = [
  {
    id: "orchestra",
    name: "Orchestra",
    nameHi: "ऑर्केस्ट्रा",
    tagline: "पूरी रात का प्रोग्राम",
    songs: [
      { title: "तड़पेला मोरा चढल जवानी", singer: "भोजपुरी गाना", youtubeUrl: "https://youtu.be/B53LtEwuaQo", duration: "6:29", mood: "romantic", year: 2014 },
      { title: "A Mor Rongobati Galara Bai O De De Mola Chume la Gorelal barman Cg Rajesh Sahu", singer: "Rajesh RS", youtubeUrl: "https://youtu.be/JERYeqtynBI", duration: "5:16", mood: "dhun", year: 2019 },
      { title: "गर्मी के दिन माँ पीपर तरी", singer: "SUNDRANI", youtubeUrl: "https://youtu.be/eStBJ543t9c", duration: "5:03", mood: "dance", year: 2017 },
      { title: "Son Ke Nathani II सोन के नथनी II Chandan Deep II Diman Sen II Kanchan Joshi", singer: "Creative Vision", youtubeUrl: "https://youtu.be/QLgRe9gJqSY", duration: "5:24", mood: "late-night", year: 2022 },
      { title: "Raja Raja Kareja Mein Samaja Raja Kareja Mein Samaja", singer: "T-Series Regional", youtubeUrl: "https://youtu.be/1y57siuuoX8", duration: "8:19", mood: "romantic", year: 2011 },
      { title: "ए मोर रंगोबती गलारा बाई", singer: "Cg Arkestra Song", youtubeUrl: "https://youtu.be/aSqwSiCe4eE", duration: "4:14", mood: "romantic", year: 2025 },
      { title: "ऊपर के 32 निचे के 36", singer: "Sammer Singh", youtubeUrl: "https://youtu.be/PHbx6tQrl9E", duration: "4:15", mood: "dhun", year: 2017 },
      { title: "तुम सुसुक सुसुक के रोई थी मै घुसुक के ठेला था", singer: "Wave Music", youtubeUrl: "https://youtu.be/VSERQn_pIz0", duration: "4:55", mood: "sad", year: 2016 },
      { title: "Babuji Bahut Dukhta Hai", singer: "T-Series", youtubeUrl: "https://youtu.be/GGuCCJOi28Q", duration: "6:10", mood: "dhun", year: 2011 },
      { title: "Laundiya London Se Layenge", singer: "Worldwide Records Bhojpuri", youtubeUrl: "https://youtu.be/GiVxUKbIy0w", duration: "3:09", mood: "dhun", year: 2020 },
      { title: "MONGRA KE MAYA- 3", singer: "Music-Tech Digital Studio and Alkarha Tura", youtubeUrl: "https://youtu.be/1cycWhr4Xy4", duration: "3:41", mood: "romantic", year: 2023 },
      { title: "Chumma : Rajkummar, Triptii, Pawan Singh, Sachin-Jigar", singer: "T-Series", youtubeUrl: "https://youtu.be/Cf67EL0FkOE", duration: "2:46", mood: "romantic", year: 2024 },
      { title: "\"Main Aai Hoon U.P. Bihar Lootne\"", singer: "Sapna Awasthi", youtubeUrl: "https://youtu.be/etN8Pn-DK1U", duration: "4:37", mood: "dhun", year: 2022 },
      { title: "टूरा नई जाने रे", singer: "Bairi Sajan", youtubeUrl: "https://youtu.be/NvAE8LA7pMU", duration: "4:20", mood: "romantic", year: 2017 },
      { title: "बम्बई वाली लड़की", singer: "Natraj Cassette Barhi", youtubeUrl: "https://youtu.be/YXNNEkDRI-8", duration: "5:11", mood: "dhun", year: 2017 },
      { title: "Rinki Aayi Hamare Ganv", singer: "Pritam Padwar Suman Kurre", youtubeUrl: "https://youtu.be/6gaQ07Dc1Fc", duration: "4:28", mood: "dhun", year: 2021 },
      { title: "Gobar La Jhan Chube", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/11rinU6xvug", duration: "5:24", mood: "dhun", year: 2013 },
      { title: "Gup Chup Gup Chup", singer: "Mamta Kulkarni", youtubeUrl: "https://youtu.be/EvOAmbPkSVs", duration: "5:40", mood: "dhun", year: 2021 },
      { title: "Qayamat Qayamat", singer: "Ajay Devgan", youtubeUrl: "https://youtu.be/hTCWy4LOReM", duration: "6:18", mood: "dhun", year: 2023 },
      { title: "Mai turi fuljhadi re", singer: "सीमा कौशिक सुपर हिट गाना", youtubeUrl: "https://youtu.be/qNmmPhvITsk", duration: "4:06", mood: "dhun", year: 2019 },
      { title: "Turi Fataka O", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/9jVpFi6gV2s", duration: "4:49", mood: "dhun", year: 2020 },
      { title: "ऐसो मोरो बिहाव करादे वो दाई cg", singer: "SHORT_VIDEOS_", youtubeUrl: "https://youtu.be/RDLN0SUnC4s", duration: "4:45", mood: "dhun", year: 2021 },
      { title: "नीबू चाट ले उतारा मार ले", singer: "Hemlal Chaturvedi", youtubeUrl: "https://youtu.be/KRZiY0Lf5lY", duration: "5:05", mood: "dhun", year: 2020 },
      { title: "ये पान वाला बाबू", singer: "Album - Lali Bindiya", youtubeUrl: "https://youtu.be/FZpz1qD4LLw", duration: "6:07", mood: "dhun", year: 2017 },
      { title: "चालू कर जरनेटर", singer: "Sakal Balmua", youtubeUrl: "https://youtu.be/71yzX1SA56A", duration: "6:32", mood: "romantic", year: 2014 },
      { title: "Bhojpuri में तहलका मचाने वाला गाना", singer: "JMC Music Bhojpuri", youtubeUrl: "https://youtu.be/ayLRDypkFfI", duration: "6:28", mood: "dance", year: 2019 },
      { title: "राते दिया बुताके", singer: "Pawan Singh", youtubeUrl: "https://youtu.be/Q3sS5v2kQQU", duration: "3:36", mood: "late-night", year: 2017 },
      { title: "Dil Wali", singer: "Vivek Sharma - Topic", youtubeUrl: "https://youtu.be/1S9OHjlWov4", duration: "5:13", mood: "romantic", year: 2025 },
      { title: "Odhaniya Wali Se Ho Gail Ba Pyar", singer: "VikasHD REM", youtubeUrl: "https://youtu.be/fedVbU26Gv0", duration: "5:14", mood: "romantic", year: 2023 },
      { title: "ले ले मजा", singer: "Dj Sameer Mandla", youtubeUrl: "https://youtu.be/tVBN2dXKRC8", duration: "1:40", mood: "dhun", year: 2023 },
      { title: "Tana Tan Turi Tor Baal Khula Khula", singer: "Natraj Cassette Barhi", youtubeUrl: "https://youtu.be/Xu5sJHlVzYI", duration: "7:40", mood: "dhun", year: 2017 },
      { title: "Mai Tore Chanda Suraj Gonda CG", singer: "Dj Parihar Seoni", youtubeUrl: "https://youtu.be/MMtVEPl5EOQ", duration: "4:08", mood: "late-night", year: 2023 },
      { title: "Paan Khai Lebe Mor Raja CG", singer: "Miss Tannu Ji", youtubeUrl: "https://youtu.be/f2er4otukqU", duration: "4:53", mood: "romantic", year: 2023 },
      { title: "Lahariya Luta A Raja", singer: "लहरिया लुटा", youtubeUrl: "https://youtu.be/DYO_GLIWlRA", duration: "4:47", mood: "romantic", year: 2019 },
      { title: "ATARIYA LE KHADE", singer: "SUNDRANI ENTERTAINMENT", youtubeUrl: "https://youtu.be/ggios7SrhEY", duration: "4:46", mood: "dhun", year: 2018 },
      { title: "Bandh Kamre Mein Pyar Karenge", singer: "Kuch Khatti Kuch Meethi", youtubeUrl: "https://youtu.be/-QxqI8bFG_s", duration: "6:47", mood: "romantic", year: 2024 },
      { title: "San Sana San Say Say", singer: "Laxmi Sargujiha", youtubeUrl: "https://youtu.be/TDsCqZaPTSA", duration: "6:48", mood: "dhun", year: 2018 },
    ],
  },
];

export const moodLabels: Record<Mood, string> = {
  dhun: "धुन",
  dance: "डांस",
  romantic: "रोमांटिक",
  sad: "दर्द भरे",
  bhakti: "भक्ति",
  vidai: "विदाई",
  "late-night": "देर रात",
};

/**
 * Every song across every programme, flattened but still carrying where it came
 * from — the All Songs list needs the programme and the position to be able to
 * hand playback back to the right place.
 */
export const allSongs: { song: Song; playlist: Playlist; index: number }[] =
  playlists.flatMap((playlist) =>
    playlist.songs.map((song, index) => ({ song, playlist, index }))
  );
