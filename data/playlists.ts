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

/** Which tradition a song comes out of. "hindi" means the film songs the
    local bands covered, rather than anything sung in a village dialect. */
export type Lang = "cg" | "bhojpuri" | "hindi";

export interface Song {
  title: string;
  singer: string;
  youtubeUrl: string;
  duration: string;
  mood: Mood;
  lang: Lang;
  year: number;
}

export interface Playlist {
  /** Also the URL slug: /<id> is this programme's page. */
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
    id: "chhattisgarhi-orchestra-songs",
    name: "Chhattisgarhi Orchestra Hits",
    nameHi: "छत्तीसगढ़ी ऑर्केस्ट्रा",
    tagline: "गाँव के मंच से, सीधे",
    songs: [
      { title: "Mai Balaghat Ka Tura", singer: "Santosh Thakrele", youtubeUrl: "https://youtu.be/EHh-RNIrvYk", duration: "5:15", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Dei De O Mola De De Maya", singer: "Dilip Lahariya, Rajkumari Chauhan", youtubeUrl: "https://youtu.be/51aNj2-yrTc", duration: "6:00", mood: "romantic", lang: "cg", year: 2021 },
      { title: "Mai Tore Chanda Suraj Gonda", singer: "Santosh Thakrele", youtubeUrl: "https://youtu.be/MMtVEPl5EOQ", duration: "4:08", mood: "late-night", lang: "cg", year: 2023 },
      { title: "Bhaji Tore La Aabe", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/zu7g7Y5IQfQ", duration: "6:24", mood: "dhun", lang: "cg", year: 2022 },
      { title: "A Mor Rongobati Galara Bai O De De Mola Chume la Gorelal barman Cg Rajesh Sahu", singer: "Rajesh RS", youtubeUrl: "https://youtu.be/JERYeqtynBI", duration: "5:16", mood: "dhun", lang: "cg", year: 2019 },
      { title: "नीबू चाट ले उतारा मार ले", singer: "Hemlal Chaturvedi", youtubeUrl: "https://youtu.be/KRZiY0Lf5lY", duration: "5:05", mood: "dhun", lang: "cg", year: 2020 },
      { title: "ए मोर रंगोबती गलारा बाई", singer: "Vinod Raja Suman Kurrey", youtubeUrl: "https://youtu.be/aSqwSiCe4eE", duration: "4:14", mood: "romantic", lang: "cg", year: 2025 },
      { title: "गर्मी के दिन माँ पीपर तरी", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/eStBJ543t9c", duration: "5:03", mood: "dance", lang: "cg", year: 2017 },
      { title: "तड़पेला मोरा चढल जवानी", singer: "Shobha Mishra", youtubeUrl: "https://youtu.be/B53LtEwuaQo", duration: "6:29", mood: "romantic", lang: "cg", year: 2014 },
      { title: "ले ले मजा", singer: "Dj Sameer Mandla", youtubeUrl: "https://youtu.be/tVBN2dXKRC8", duration: "1:40", mood: "dhun", lang: "cg", year: 2023 },
      { title: "Tor Mor Maya Ke Reil Gadi", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/FfXhsNACzKg", duration: "4:21", mood: "romantic", lang: "cg", year: 2023 },
      { title: "MONGRA KE MAYA- 3", singer: "Mongra Vishkarma", youtubeUrl: "https://youtu.be/1cycWhr4Xy4", duration: "3:41", mood: "romantic", lang: "cg", year: 2023 },
      { title: "टूरा नई जाने रे", singer: "Sima Kaoushik, Chhaya Chanrakar, Anupma Mishra & others", youtubeUrl: "https://youtu.be/NvAE8LA7pMU", duration: "4:20", mood: "romantic", lang: "cg", year: 2017 },
      { title: "बम्बई वाली लड़की", singer: "Preetam", youtubeUrl: "https://youtu.be/YXNNEkDRI-8", duration: "5:11", mood: "dhun", lang: "cg", year: 2017 },
      { title: "Rinki Aayi Hamare Ganv", singer: "प्रीतम पड़वार, सुमन कुर्रे", youtubeUrl: "https://youtu.be/6gaQ07Dc1Fc", duration: "4:28", mood: "dhun", lang: "cg", year: 2021 },
      { title: "Gobar La Jhan Chube", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/11rinU6xvug", duration: "5:24", mood: "dhun", lang: "cg", year: 2013 },
      { title: "Mai turi fuljhadi re", singer: "Seema Kaushik", youtubeUrl: "https://youtu.be/qNmmPhvITsk", duration: "4:06", mood: "dhun", lang: "cg", year: 2019 },
      { title: "Turi Fataka O", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/9jVpFi6gV2s", duration: "4:49", mood: "dhun", lang: "cg", year: 2020 },
      { title: "ये पान वाला बाबू", singer: "Album - Lali Bindiya", youtubeUrl: "https://youtu.be/FZpz1qD4LLw", duration: "6:07", mood: "dhun", lang: "cg", year: 2017 },
      { title: "ऐसो मोरो बिहाव करादे वो दाई", singer: "बीरस", youtubeUrl: "https://youtu.be/RDLN0SUnC4s", duration: "4:45", mood: "dhun", lang: "cg", year: 2021 },
      { title: "Tana Tan Turi Tor Baal Khula Khula", singer: "Sanjay Surila", youtubeUrl: "https://youtu.be/Xu5sJHlVzYI", duration: "7:40", mood: "dhun", lang: "cg", year: 2017 },
      { title: "Paan Khai Lebe Mor Raja", singer: "Miss Tannu Ji", youtubeUrl: "https://youtu.be/f2er4otukqU", duration: "4:53", mood: "romantic", lang: "cg", year: 2023 },
      { title: "ATARIYA LE KHADE", singer: "Laxmi Narayan Pandey, Mamta Sahu", youtubeUrl: "https://youtu.be/ggios7SrhEY", duration: "4:46", mood: "dhun", lang: "cg", year: 2018 },
      { title: "San Sana San Say Say", singer: "लक्ष्मी सरगुजिहा, सुनीता देवांगन", youtubeUrl: "https://youtu.be/TDsCqZaPTSA", duration: "6:48", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Tor Fule Fule Gal La Chuman Dena Vo", singer: "Kripal Das Manikpuri", youtubeUrl: "https://youtu.be/labsgYFfwG4", duration: "6:29", mood: "dhun", lang: "cg", year: 2020 },
      { title: "Patel ki turi bigad gai se kotwar sangma sab pad gai se", singer: "DJ Ankit Balaghat", youtubeUrl: "https://youtu.be/sDr52u4Bq6c", duration: "3:34", mood: "dhun", lang: "cg", year: 2023 },
      { title: "Hore Hore", singer: "Kripal Das Manikpuri", youtubeUrl: "https://youtu.be/6TEhBSIVk5M", duration: "4:47", mood: "dhun", lang: "cg", year: 2020 },
      { title: "हमर पारा तुहर पारा", singer: "Master Sunil Manikpuri", youtubeUrl: "https://youtu.be/R2Pm2HPNO28", duration: "5:46", mood: "dhun", lang: "cg", year: 2017 },
      { title: "TURI FATAKA WO", singer: "डिजे परिहार सिवनी", youtubeUrl: "https://youtu.be/jvE6gev5kwg", duration: "5:55", mood: "dhun", lang: "cg", year: 0 },
    ],
  },
  {
    id: "cg-stage-program-songs",
    name: "CG Stage Program Classics",
    nameHi: "स्टेज प्रोग्राम",
    tagline: "साउंड चेक से सुबह तक",
    songs: [
      { title: "Mai Balaghat Ka Tura", singer: "Santosh Thakrele", youtubeUrl: "https://youtu.be/EHh-RNIrvYk", duration: "5:15", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Dei De O Mola De De Maya", singer: "Dilip Lahariya, Rajkumari Chauhan", youtubeUrl: "https://youtu.be/51aNj2-yrTc", duration: "6:00", mood: "romantic", lang: "cg", year: 2021 },
      { title: "Bhaji Tore La Aabe", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/zu7g7Y5IQfQ", duration: "6:24", mood: "dhun", lang: "cg", year: 2022 },
      { title: "A Mor Rongobati Galara Bai O De De Mola Chume la Gorelal barman Cg Rajesh Sahu", singer: "Rajesh RS", youtubeUrl: "https://youtu.be/JERYeqtynBI", duration: "5:16", mood: "dhun", lang: "cg", year: 2019 },
      { title: "नीबू चाट ले उतारा मार ले", singer: "Hemlal Chaturvedi", youtubeUrl: "https://youtu.be/KRZiY0Lf5lY", duration: "5:05", mood: "dhun", lang: "cg", year: 2020 },
      { title: "ए मोर रंगोबती गलारा बाई", singer: "Vinod Raja Suman Kurrey", youtubeUrl: "https://youtu.be/aSqwSiCe4eE", duration: "4:14", mood: "romantic", lang: "cg", year: 2025 },
      { title: "गर्मी के दिन माँ पीपर तरी", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/eStBJ543t9c", duration: "5:03", mood: "dance", lang: "cg", year: 2017 },
      { title: "तड़पेला मोरा चढल जवानी", singer: "Shobha Mishra", youtubeUrl: "https://youtu.be/B53LtEwuaQo", duration: "6:29", mood: "romantic", lang: "cg", year: 2014 },
      { title: "ऊपर के 32 निचे के 36", singer: "Sammer Singh", youtubeUrl: "https://youtu.be/PHbx6tQrl9E", duration: "4:15", mood: "dhun", lang: "bhojpuri", year: 2017 },
      { title: "ले ले मजा", singer: "Dj Sameer Mandla", youtubeUrl: "https://youtu.be/tVBN2dXKRC8", duration: "1:40", mood: "dhun", lang: "cg", year: 2023 },
      { title: "Tor Mor Maya Ke Reil Gadi", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/FfXhsNACzKg", duration: "4:21", mood: "romantic", lang: "cg", year: 2023 },
      { title: "Laundiya London Se Layenge", singer: "Ritesh Pandey", youtubeUrl: "https://youtu.be/GiVxUKbIy0w", duration: "3:09", mood: "dhun", lang: "bhojpuri", year: 2020 },
      { title: "MONGRA KE MAYA- 3", singer: "Mongra Vishkarma", youtubeUrl: "https://youtu.be/1cycWhr4Xy4", duration: "3:41", mood: "romantic", lang: "cg", year: 2023 },
      { title: "Chumma", singer: "Pawan Singh, Rupali Jagga, Rupesh Mishra & others", youtubeUrl: "https://youtu.be/Cf67EL0FkOE", duration: "2:46", mood: "romantic", lang: "bhojpuri", year: 2024 },
      { title: "टूरा नई जाने रे", singer: "Sima Kaoushik, Chhaya Chanrakar, Anupma Mishra & others", youtubeUrl: "https://youtu.be/NvAE8LA7pMU", duration: "4:20", mood: "romantic", lang: "cg", year: 2017 },
      { title: "बम्बई वाली लड़की", singer: "Preetam", youtubeUrl: "https://youtu.be/YXNNEkDRI-8", duration: "5:11", mood: "dhun", lang: "cg", year: 2017 },
      { title: "Rinki Aayi Hamare Ganv", singer: "प्रीतम पड़वार, सुमन कुर्रे", youtubeUrl: "https://youtu.be/6gaQ07Dc1Fc", duration: "4:28", mood: "dhun", lang: "cg", year: 2021 },
      { title: "Gobar La Jhan Chube", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/11rinU6xvug", duration: "5:24", mood: "dhun", lang: "cg", year: 2013 },
      { title: "Mai turi fuljhadi re", singer: "Seema Kaushik", youtubeUrl: "https://youtu.be/qNmmPhvITsk", duration: "4:06", mood: "dhun", lang: "cg", year: 2019 },
      { title: "Lahariya Luta A Raja", singer: "Indu Sonali", youtubeUrl: "https://youtu.be/DYO_GLIWlRA", duration: "4:47", mood: "romantic", lang: "bhojpuri", year: 2019 },
      { title: "Turi Fataka O", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/9jVpFi6gV2s", duration: "4:49", mood: "dhun", lang: "cg", year: 2020 },
      { title: "ये पान वाला बाबू", singer: "Album - Lali Bindiya", youtubeUrl: "https://youtu.be/FZpz1qD4LLw", duration: "6:07", mood: "dhun", lang: "cg", year: 2017 },
      { title: "चालू कर जरनेटर", singer: "Sakal Balmua", youtubeUrl: "https://youtu.be/71yzX1SA56A", duration: "6:32", mood: "romantic", lang: "bhojpuri", year: 2014 },
      { title: "Bhojpuri में तहलका मचाने वाला गाना", singer: "Badal Bawali", youtubeUrl: "https://youtu.be/ayLRDypkFfI", duration: "6:28", mood: "dance", lang: "bhojpuri", year: 2019 },
      { title: "Odhaniya Wali Se Ho Gail Ba Pyar", singer: "Kumar Mohit", youtubeUrl: "https://youtu.be/fedVbU26Gv0", duration: "5:14", mood: "romantic", lang: "bhojpuri", year: 2023 },
      { title: "ऐसो मोरो बिहाव करादे वो दाई", singer: "बीरस", youtubeUrl: "https://youtu.be/RDLN0SUnC4s", duration: "4:45", mood: "dhun", lang: "cg", year: 2021 },
      { title: "Tana Tan Turi Tor Baal Khula Khula", singer: "Sanjay Surila", youtubeUrl: "https://youtu.be/Xu5sJHlVzYI", duration: "7:40", mood: "dhun", lang: "cg", year: 2017 },
      { title: "Paan Khai Lebe Mor Raja", singer: "Miss Tannu Ji", youtubeUrl: "https://youtu.be/f2er4otukqU", duration: "4:53", mood: "romantic", lang: "cg", year: 2023 },
      { title: "ATARIYA LE KHADE", singer: "Laxmi Narayan Pandey, Mamta Sahu", youtubeUrl: "https://youtu.be/ggios7SrhEY", duration: "4:46", mood: "dhun", lang: "cg", year: 2018 },
      { title: "San Sana San Say Say", singer: "लक्ष्मी सरगुजिहा, सुनीता देवांगन", youtubeUrl: "https://youtu.be/TDsCqZaPTSA", duration: "6:48", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Lal Yadav एवं Kajal Raghwani", singer: "IVY Yashi Films Bhojpuri", youtubeUrl: "https://youtu.be/kfdplJ49_f0", duration: "4:14", mood: "dhun", lang: "bhojpuri", year: 2019 },
      { title: "Tor Fule Fule Gal La Chuman Dena Vo", singer: "Kripal Das Manikpuri", youtubeUrl: "https://youtu.be/labsgYFfwG4", duration: "6:29", mood: "dhun", lang: "cg", year: 2020 },
      { title: "Patel ki turi bigad gai se kotwar sangma sab pad gai se", singer: "DJ Ankit Balaghat", youtubeUrl: "https://youtu.be/sDr52u4Bq6c", duration: "3:34", mood: "dhun", lang: "cg", year: 2023 },
      { title: "Hore Hore", singer: "Kripal Das Manikpuri", youtubeUrl: "https://youtu.be/6TEhBSIVk5M", duration: "4:47", mood: "dhun", lang: "cg", year: 2020 },
      { title: "हमर पारा तुहर पारा", singer: "Master Sunil Manikpuri", youtubeUrl: "https://youtu.be/R2Pm2HPNO28", duration: "5:46", mood: "dhun", lang: "cg", year: 2017 },
      { title: "TURI FATAKA WO", singer: "डिजे परिहार सिवनी", youtubeUrl: "https://youtu.be/jvE6gev5kwg", duration: "5:55", mood: "dhun", lang: "cg", year: 0 },
    ],
  },
  {
    id: "bhojpuri-orchestra-songs",
    name: "Bhojpuri Orchestra Dance Songs",
    nameHi: "भोजपुरी ऑर्केस्ट्रा",
    tagline: "स्पीकर फटने तक",
    songs: [
      { title: "ऊपर के 32 निचे के 36", singer: "Sammer Singh", youtubeUrl: "https://youtu.be/PHbx6tQrl9E", duration: "4:15", mood: "dhun", lang: "bhojpuri", year: 2017 },
      { title: "Laundiya London Se Layenge", singer: "Ritesh Pandey", youtubeUrl: "https://youtu.be/GiVxUKbIy0w", duration: "3:09", mood: "dhun", lang: "bhojpuri", year: 2020 },
      { title: "Chumma", singer: "Pawan Singh, Rupali Jagga, Rupesh Mishra & others", youtubeUrl: "https://youtu.be/Cf67EL0FkOE", duration: "2:46", mood: "romantic", lang: "bhojpuri", year: 2024 },
      { title: "Lahariya Luta A Raja", singer: "Indu Sonali", youtubeUrl: "https://youtu.be/DYO_GLIWlRA", duration: "4:47", mood: "romantic", lang: "bhojpuri", year: 2019 },
      { title: "चालू कर जरनेटर", singer: "Sakal Balmua", youtubeUrl: "https://youtu.be/71yzX1SA56A", duration: "6:32", mood: "romantic", lang: "bhojpuri", year: 2014 },
      { title: "Bhojpuri में तहलका मचाने वाला गाना", singer: "Badal Bawali", youtubeUrl: "https://youtu.be/ayLRDypkFfI", duration: "6:28", mood: "dance", lang: "bhojpuri", year: 2019 },
      { title: "राते दिया बुताके", singer: "Pawan Singh, Indu Sonali", youtubeUrl: "https://youtu.be/Q3sS5v2kQQU", duration: "3:36", mood: "late-night", lang: "bhojpuri", year: 2017 },
      { title: "Odhaniya Wali Se Ho Gail Ba Pyar", singer: "Kumar Mohit", youtubeUrl: "https://youtu.be/fedVbU26Gv0", duration: "5:14", mood: "romantic", lang: "bhojpuri", year: 2023 },
      { title: "Lal Yadav एवं Kajal Raghwani", singer: "IVY Yashi Films Bhojpuri", youtubeUrl: "https://youtu.be/kfdplJ49_f0", duration: "4:14", mood: "dhun", lang: "bhojpuri", year: 2019 },
    ],
  },
  {
    id: "mela-orchestra-songs",
    name: "Mela Orchestra Collection",
    nameHi: "मेला ऑर्केस्ट्रा",
    tagline: "झूला, जलेबी, जनरेटर",
    songs: [
      { title: "Dei De O Mola De De Maya", singer: "Dilip Lahariya, Rajkumari Chauhan", youtubeUrl: "https://youtu.be/51aNj2-yrTc", duration: "6:00", mood: "romantic", lang: "cg", year: 2021 },
      { title: "ए मोर रंगोबती गलारा बाई", singer: "Vinod Raja Suman Kurrey", youtubeUrl: "https://youtu.be/aSqwSiCe4eE", duration: "4:14", mood: "romantic", lang: "cg", year: 2025 },
      { title: "गर्मी के दिन माँ पीपर तरी", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/eStBJ543t9c", duration: "5:03", mood: "dance", lang: "cg", year: 2017 },
      { title: "तड़पेला मोरा चढल जवानी", singer: "Shobha Mishra", youtubeUrl: "https://youtu.be/B53LtEwuaQo", duration: "6:29", mood: "romantic", lang: "cg", year: 2014 },
      { title: "Tor Mor Maya Ke Reil Gadi", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/FfXhsNACzKg", duration: "4:21", mood: "romantic", lang: "cg", year: 2023 },
      { title: "MONGRA KE MAYA- 3", singer: "Mongra Vishkarma", youtubeUrl: "https://youtu.be/1cycWhr4Xy4", duration: "3:41", mood: "romantic", lang: "cg", year: 2023 },
      { title: "Chumma", singer: "Pawan Singh, Rupali Jagga, Rupesh Mishra & others", youtubeUrl: "https://youtu.be/Cf67EL0FkOE", duration: "2:46", mood: "romantic", lang: "bhojpuri", year: 2024 },
      { title: "टूरा नई जाने रे", singer: "Sima Kaoushik, Chhaya Chanrakar, Anupma Mishra & others", youtubeUrl: "https://youtu.be/NvAE8LA7pMU", duration: "4:20", mood: "romantic", lang: "cg", year: 2017 },
      { title: "Lahariya Luta A Raja", singer: "Indu Sonali", youtubeUrl: "https://youtu.be/DYO_GLIWlRA", duration: "4:47", mood: "romantic", lang: "bhojpuri", year: 2019 },
      { title: "चालू कर जरनेटर", singer: "Sakal Balmua", youtubeUrl: "https://youtu.be/71yzX1SA56A", duration: "6:32", mood: "romantic", lang: "bhojpuri", year: 2014 },
      { title: "Bhojpuri में तहलका मचाने वाला गाना", singer: "Badal Bawali", youtubeUrl: "https://youtu.be/ayLRDypkFfI", duration: "6:28", mood: "dance", lang: "bhojpuri", year: 2019 },
      { title: "Dil Wali", singer: "Vivek Sharma", youtubeUrl: "https://youtu.be/1S9OHjlWov4", duration: "5:13", mood: "romantic", lang: "hindi", year: 2025 },
      { title: "Odhaniya Wali Se Ho Gail Ba Pyar", singer: "Kumar Mohit", youtubeUrl: "https://youtu.be/fedVbU26Gv0", duration: "5:14", mood: "romantic", lang: "bhojpuri", year: 2023 },
      { title: "Paan Khai Lebe Mor Raja", singer: "Miss Tannu Ji", youtubeUrl: "https://youtu.be/f2er4otukqU", duration: "4:53", mood: "romantic", lang: "cg", year: 2023 },
      { title: "Bandh Kamre Mein Pyar Karenge", singer: "Anuradha Sriram", youtubeUrl: "https://youtu.be/-QxqI8bFG_s", duration: "6:47", mood: "romantic", lang: "hindi", year: 2024 },
      { title: "Raja Raja Kareja Mein Samaja Raja Kareja Mein Samaja", singer: "Radhe Shyam Rasia", youtubeUrl: "https://youtu.be/1y57siuuoX8", duration: "8:19", mood: "romantic", lang: "hindi", year: 2011 },
    ],
  },
  {
    id: "mandai-orchestra-night",
    name: "Mandai Night Orchestra",
    nameHi: "मंडई नाइट",
    tagline: "बारह के बाद वाला प्रोग्राम",
    songs: [
      { title: "Dei De O Mola De De Maya", singer: "Dilip Lahariya, Rajkumari Chauhan", youtubeUrl: "https://youtu.be/51aNj2-yrTc", duration: "6:00", mood: "romantic", lang: "cg", year: 2021 },
      { title: "Mai Tore Chanda Suraj Gonda", singer: "Santosh Thakrele", youtubeUrl: "https://youtu.be/MMtVEPl5EOQ", duration: "4:08", mood: "late-night", lang: "cg", year: 2023 },
      { title: "ए मोर रंगोबती गलारा बाई", singer: "Vinod Raja Suman Kurrey", youtubeUrl: "https://youtu.be/aSqwSiCe4eE", duration: "4:14", mood: "romantic", lang: "cg", year: 2025 },
      { title: "Son Ke Nathani", singer: "Diman Sen, Kanchan Joshi", youtubeUrl: "https://youtu.be/QLgRe9gJqSY", duration: "5:24", mood: "late-night", lang: "hindi", year: 2022 },
      { title: "तड़पेला मोरा चढल जवानी", singer: "Shobha Mishra", youtubeUrl: "https://youtu.be/B53LtEwuaQo", duration: "6:29", mood: "romantic", lang: "cg", year: 2014 },
      { title: "Tor Mor Maya Ke Reil Gadi", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/FfXhsNACzKg", duration: "4:21", mood: "romantic", lang: "cg", year: 2023 },
      { title: "MONGRA KE MAYA- 3", singer: "Mongra Vishkarma", youtubeUrl: "https://youtu.be/1cycWhr4Xy4", duration: "3:41", mood: "romantic", lang: "cg", year: 2023 },
      { title: "Chumma", singer: "Pawan Singh, Rupali Jagga, Rupesh Mishra & others", youtubeUrl: "https://youtu.be/Cf67EL0FkOE", duration: "2:46", mood: "romantic", lang: "bhojpuri", year: 2024 },
      { title: "टूरा नई जाने रे", singer: "Sima Kaoushik, Chhaya Chanrakar, Anupma Mishra & others", youtubeUrl: "https://youtu.be/NvAE8LA7pMU", duration: "4:20", mood: "romantic", lang: "cg", year: 2017 },
      { title: "Lahariya Luta A Raja", singer: "Indu Sonali", youtubeUrl: "https://youtu.be/DYO_GLIWlRA", duration: "4:47", mood: "romantic", lang: "bhojpuri", year: 2019 },
      { title: "चालू कर जरनेटर", singer: "Sakal Balmua", youtubeUrl: "https://youtu.be/71yzX1SA56A", duration: "6:32", mood: "romantic", lang: "bhojpuri", year: 2014 },
      { title: "राते दिया बुताके", singer: "Pawan Singh, Indu Sonali", youtubeUrl: "https://youtu.be/Q3sS5v2kQQU", duration: "3:36", mood: "late-night", lang: "bhojpuri", year: 2017 },
      { title: "Dil Wali", singer: "Vivek Sharma", youtubeUrl: "https://youtu.be/1S9OHjlWov4", duration: "5:13", mood: "romantic", lang: "hindi", year: 2025 },
      { title: "Odhaniya Wali Se Ho Gail Ba Pyar", singer: "Kumar Mohit", youtubeUrl: "https://youtu.be/fedVbU26Gv0", duration: "5:14", mood: "romantic", lang: "bhojpuri", year: 2023 },
      { title: "Paan Khai Lebe Mor Raja", singer: "Miss Tannu Ji", youtubeUrl: "https://youtu.be/f2er4otukqU", duration: "4:53", mood: "romantic", lang: "cg", year: 2023 },
      { title: "Bandh Kamre Mein Pyar Karenge", singer: "Anuradha Sriram", youtubeUrl: "https://youtu.be/-QxqI8bFG_s", duration: "6:47", mood: "romantic", lang: "hindi", year: 2024 },
      { title: "चुरी लेवा दे", singer: "Album - Mayaru Dholna", youtubeUrl: "https://youtu.be/reCDAHKFANU", duration: "4:59", mood: "late-night", lang: "hindi", year: 0 },
      { title: "Raja Raja Kareja Mein Samaja Raja Kareja Mein Samaja", singer: "Radhe Shyam Rasia", youtubeUrl: "https://youtu.be/1y57siuuoX8", duration: "8:19", mood: "romantic", lang: "hindi", year: 2011 },
    ],
  },
  {
    id: "orchestra-classics",
    name: "Orchestra Classics & Live Performances",
    nameHi: "ऑर्केस्ट्रा क्लासिक्स",
    tagline: "फिल्मी गाना, लोकल बैंड",
    songs: [
      { title: "Mai Balaghat Ka Tura", singer: "Santosh Thakrele", youtubeUrl: "https://youtu.be/EHh-RNIrvYk", duration: "5:15", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Bhaji Tore La Aabe", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/zu7g7Y5IQfQ", duration: "6:24", mood: "dhun", lang: "cg", year: 2022 },
      { title: "A Mor Rongobati Galara Bai O De De Mola Chume la Gorelal barman Cg Rajesh Sahu", singer: "Rajesh RS", youtubeUrl: "https://youtu.be/JERYeqtynBI", duration: "5:16", mood: "dhun", lang: "cg", year: 2019 },
      { title: "नीबू चाट ले उतारा मार ले", singer: "Hemlal Chaturvedi", youtubeUrl: "https://youtu.be/KRZiY0Lf5lY", duration: "5:05", mood: "dhun", lang: "cg", year: 2020 },
      { title: "Son Ke Nathani", singer: "Diman Sen, Kanchan Joshi", youtubeUrl: "https://youtu.be/QLgRe9gJqSY", duration: "5:24", mood: "late-night", lang: "hindi", year: 2022 },
      { title: "ऊपर के 32 निचे के 36", singer: "Sammer Singh", youtubeUrl: "https://youtu.be/PHbx6tQrl9E", duration: "4:15", mood: "dhun", lang: "bhojpuri", year: 2017 },
      { title: "ले ले मजा", singer: "Dj Sameer Mandla", youtubeUrl: "https://youtu.be/tVBN2dXKRC8", duration: "1:40", mood: "dhun", lang: "cg", year: 2023 },
      { title: "Haradiya Kaam Na Kari Taza", singer: "Khesari Lal Yadav, Priyanka Singh", youtubeUrl: "https://youtu.be/iRNiFQToSuo", duration: "3:38", mood: "dhun", lang: "hindi", year: 2017 },
      { title: "Babuji Bahut Dukhta Hai", singer: "Alka Yagnik, Sanjay Dutt, Ajay Devgan", youtubeUrl: "https://youtu.be/GGuCCJOi28Q", duration: "6:10", mood: "dhun", lang: "hindi", year: 2011 },
      { title: "Laundiya London Se Layenge", singer: "Ritesh Pandey", youtubeUrl: "https://youtu.be/GiVxUKbIy0w", duration: "3:09", mood: "dhun", lang: "bhojpuri", year: 2020 },
      { title: "\"Main Aai Hoon U.P. Bihar Lootne\"", singer: "Sapna Awasthi, Chetan Shashitall", youtubeUrl: "https://youtu.be/etN8Pn-DK1U", duration: "4:37", mood: "dhun", lang: "hindi", year: 2022 },
      { title: "बम्बई वाली लड़की", singer: "Preetam", youtubeUrl: "https://youtu.be/YXNNEkDRI-8", duration: "5:11", mood: "dhun", lang: "cg", year: 2017 },
      { title: "Rinki Aayi Hamare Ganv", singer: "प्रीतम पड़वार, सुमन कुर्रे", youtubeUrl: "https://youtu.be/6gaQ07Dc1Fc", duration: "4:28", mood: "dhun", lang: "cg", year: 2021 },
      { title: "Gobar La Jhan Chube", singer: "Gorelal Barman", youtubeUrl: "https://youtu.be/11rinU6xvug", duration: "5:24", mood: "dhun", lang: "cg", year: 2013 },
      { title: "Gup Chup Gup Chup", singer: "Ila Arun, Alka Yagnik", youtubeUrl: "https://youtu.be/EvOAmbPkSVs", duration: "5:40", mood: "dhun", lang: "hindi", year: 2021 },
      { title: "Qayamat Qayamat", singer: "Sukhwinder Singh, Alka Yagnik", youtubeUrl: "https://youtu.be/hTCWy4LOReM", duration: "6:18", mood: "dhun", lang: "hindi", year: 2023 },
      { title: "Mai turi fuljhadi re", singer: "Seema Kaushik", youtubeUrl: "https://youtu.be/qNmmPhvITsk", duration: "4:06", mood: "dhun", lang: "cg", year: 2019 },
      { title: "Turi Fataka O", singer: "Gorelal Barman, Ratan Sabiha", youtubeUrl: "https://youtu.be/9jVpFi6gV2s", duration: "4:49", mood: "dhun", lang: "cg", year: 2020 },
      { title: "ये पान वाला बाबू", singer: "Album - Lali Bindiya", youtubeUrl: "https://youtu.be/FZpz1qD4LLw", duration: "6:07", mood: "dhun", lang: "cg", year: 2017 },
      { title: "Dil Wali", singer: "Vivek Sharma", youtubeUrl: "https://youtu.be/1S9OHjlWov4", duration: "5:13", mood: "romantic", lang: "hindi", year: 2025 },
      { title: "ऐसो मोरो बिहाव करादे वो दाई", singer: "बीरस", youtubeUrl: "https://youtu.be/RDLN0SUnC4s", duration: "4:45", mood: "dhun", lang: "cg", year: 2021 },
      { title: "Tana Tan Turi Tor Baal Khula Khula", singer: "Sanjay Surila", youtubeUrl: "https://youtu.be/Xu5sJHlVzYI", duration: "7:40", mood: "dhun", lang: "cg", year: 2017 },
      { title: "ATARIYA LE KHADE", singer: "Laxmi Narayan Pandey, Mamta Sahu", youtubeUrl: "https://youtu.be/ggios7SrhEY", duration: "4:46", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Bandh Kamre Mein Pyar Karenge", singer: "Anuradha Sriram", youtubeUrl: "https://youtu.be/-QxqI8bFG_s", duration: "6:47", mood: "romantic", lang: "hindi", year: 2024 },
      { title: "San Sana San Say Say", singer: "लक्ष्मी सरगुजिहा, सुनीता देवांगन", youtubeUrl: "https://youtu.be/TDsCqZaPTSA", duration: "6:48", mood: "dhun", lang: "cg", year: 2018 },
      { title: "Bandook Chalgi Sapna Chaudhary & Narender Bhagana", singer: "Nareder Bhadana, Punam Gosawmi", youtubeUrl: "https://youtu.be/85txbeyiXNI", duration: "4:41", mood: "dhun", lang: "hindi", year: 2019 },
      { title: "Lal Yadav एवं Kajal Raghwani", singer: "IVY Yashi Films Bhojpuri", youtubeUrl: "https://youtu.be/kfdplJ49_f0", duration: "4:14", mood: "dhun", lang: "bhojpuri", year: 2019 },
      { title: "Tor Fule Fule Gal La Chuman Dena Vo", singer: "Kripal Das Manikpuri", youtubeUrl: "https://youtu.be/labsgYFfwG4", duration: "6:29", mood: "dhun", lang: "cg", year: 2020 },
      { title: "Patel ki turi bigad gai se kotwar sangma sab pad gai se", singer: "DJ Ankit Balaghat", youtubeUrl: "https://youtu.be/sDr52u4Bq6c", duration: "3:34", mood: "dhun", lang: "cg", year: 2023 },
      { title: "Hore Hore", singer: "Kripal Das Manikpuri", youtubeUrl: "https://youtu.be/6TEhBSIVk5M", duration: "4:47", mood: "dhun", lang: "cg", year: 2020 },
      { title: "हमर पारा तुहर पारा", singer: "Master Sunil Manikpuri", youtubeUrl: "https://youtu.be/R2Pm2HPNO28", duration: "5:46", mood: "dhun", lang: "cg", year: 2017 },
      { title: "TURI FATAKA WO", singer: "डिजे परिहार सिवनी", youtubeUrl: "https://youtu.be/jvE6gev5kwg", duration: "5:55", mood: "dhun", lang: "cg", year: 0 },
      { title: "Paracetamol", singer: "Dipakshi Kalita, Roshni Saha", youtubeUrl: "https://youtu.be/PR-J1MSbwAo", duration: "3:01", mood: "dhun", lang: "hindi", year: 2022 },
      { title: "चुरी लेवा दे", singer: "Album - Mayaru Dholna", youtubeUrl: "https://youtu.be/reCDAHKFANU", duration: "4:59", mood: "late-night", lang: "hindi", year: 0 },
      { title: "रसगुल्ला गाल दिखे लाल", singer: "Laxmikant Nandvanshi, Anju Kuldeep", youtubeUrl: "https://youtu.be/XBHUn1GKtfM", duration: "4:11", mood: "dhun", lang: "hindi", year: 2024 },
      { title: "Raja Raja Kareja Mein Samaja Raja Kareja Mein Samaja", singer: "Radhe Shyam Rasia", youtubeUrl: "https://youtu.be/1y57siuuoX8", duration: "8:19", mood: "romantic", lang: "hindi", year: 2011 },
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
 * Every song, once, still carrying where it came from — the All Songs list
 * needs the programme and the position to hand playback back to the right
 * place. Programmes overlap on purpose, so this dedupes on the video: without
 * that, a song in three programmes would be listed three times and the count
 * under the heading would be a lie.
 */
export const allSongs: { song: Song; playlist: Playlist; index: number }[] =
  (() => {
    const seen = new Set<string>();
    return playlists.flatMap((playlist) =>
      playlist.songs.flatMap((song, index) => {
        if (seen.has(song.youtubeUrl)) return [];
        seen.add(song.youtubeUrl);
        return [{ song, playlist, index }];
      })
    );
  })();

/** The distinct songs on the site, in programme order. */
export const uniqueSongs: Song[] = allSongs.map((entry) => entry.song);

/** Look a programme up by its slug. */
export function playlistBySlug(slug: string): Playlist | undefined {
  return playlists.find((p) => p.id === slug);
}
