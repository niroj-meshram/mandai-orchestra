import { site } from "@/data/site";
import { playlists } from "@/data/playlists";

/**
 * The page in words.
 *
 * The interface is a single canvas: a stage, a title and a play button, with
 * the tracklist behind a panel that returns null until it is opened. Everything
 * a person can eventually read is therefore absent from the served HTML, and a
 * crawler arriving at this page sees an image and a heading. This is the same
 * information, written out — what the site is, and what is actually on it.
 *
 * It is `sr-only` rather than `display: none`: screen readers get a plain
 * summary of a page that is otherwise a canvas to them, which is the reason to
 * write it at all. It says only what the page genuinely offers — the moment
 * this stops describing what is really here, it is worth less than nothing.
 */
export function PageCopy() {
  const total = playlists.reduce((n, p) => n + p.songs.length, 0);

  return (
    <section className="sr-only">
      <h2>
        {site.titleHi} — {site.titleEn}
      </h2>

      <p>
        {site.description} {total} songs play back to back, the way a stage
        programme ran at a mandai: Chhattisgarhi and Bhojpuri orchestra numbers,
        DJ and dance songs, and Hindi film classics as the local bands covered
        them. Press play and it keeps going; nothing to install, no account.
      </p>

      <p>
        छत्तीसगढ़ी और भोजपुरी ऑर्केस्ट्रा के गाने, स्टेज प्रोग्राम और मंडई नाइट
        की पूरी प्लेलिस्ट — एक जगह, बिना रुके।
      </p>

      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>
            {playlist.nameHi} — {playlist.name} ({playlist.songs.length} songs)
          </h3>
          <ul>
            {playlist.songs.map((song) => (
              <li key={song.youtubeUrl}>
                {song.title} — {song.singer} ({song.duration})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
