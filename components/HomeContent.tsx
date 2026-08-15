import Link from "next/link";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { playlists, allSongs } from "@/data/playlists";

/**
 * The written half of the homepage, below the stage.
 *
 * The first screen is unchanged and always will be — you arrive at a lit stage
 * and a play button, and if you never scroll you never meet any of this. What
 * sits underneath is the part a search engine can actually read: what a mandai
 * orchestra was, what is in the archive, and a way through to each programme.
 *
 * This is deliberately visible rather than `sr-only`. An earlier version hid a
 * summary from sighted visitors, which is defensible for a sentence and
 * indefensible at this length — a large block of hidden keyword-carrying text
 * is the exact pattern Google's guidance on hidden text describes. Text worth
 * ranking for is text worth showing.
 */
export function HomeContent() {
  const total = allSongs.length;

  return (
    <section
      id="about"
      // Opaque, and no backdrop-filter. At 92% over a fixed background the blur
      // was doing almost nothing visible, while costing a composited layer over
      // a full-screen image on every scroll frame — and it rasterises badly
      // enough without GPU compositing to blank the text outright.
      className="relative z-10 border-t border-gold/10 bg-ink px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold-dim">
          {site.titleEn}
        </p>

        <h2 className="mt-4 font-display text-3xl leading-tight text-cream sm:text-4xl">
          What Mandai Orchestra is
        </h2>

        <div className="mt-6 space-y-5 font-body text-[15px] leading-relaxed text-cream-dim sm:text-base">
          <p>
            For a few weeks either side of Diwali, a lot of central India does
            not sleep much. A mandai — the old village fair, tied to a temple
            day and a market — puts up a stage at one end of a field, and an
            orchestra troupe plays on it until the light changes. This is an
            archive of {total} of those songs: Chhattisgarhi orchestra numbers,
            CG stage programme classics, Bhojpuri orchestra hits and the Hindi
            film songs that local bands learned because a crowd would not go
            home without them.
          </p>
          <p>
            The word orchestra means something specific here and nothing like
            what it means elsewhere. It is a keyboard doing the work of a
            string section, a dholak, a benjo, two or three singers taking
            turns, a dancer who comes forward when the tempo lifts, and a
            generator you can hear between songs. That set-up travelled from
            village to village on the back of a jeep for most of the year, and
            it is the sound this whole site is made of.
          </p>
          <p>
            These recordings were never properly released. They went out on
            cassette, then CD, then on whoever had the biggest memory card, and
            finally onto YouTube under titles typed by whoever happened to
            upload them. Nothing here is remastered and nothing is complete —
            it is simply the songs, gathered in one place and playing back to
            back, which is closer to how you would have heard them anyway.
          </p>
        </div>

        {/* ── Programmes ──────────────────────────────────────────────────────
            Every heading here is also a page, so this is both the table of
            contents for a visitor and the link graph that gets those pages
            found in the first place. */}
        <div className="mt-14 space-y-10">
          {categories.map((category) => {
            const playlist = playlists.find((p) => p.id === category.slug);

            return (
              <article key={category.slug}>
                <h2 className="font-display text-2xl text-cream sm:text-[26px]">
                  <Link
                    href={`/${category.slug}`}
                    className="transition-colors duration-200 hover:text-amber"
                  >
                    {category.heading}
                  </Link>
                </h2>

                <p className="mt-1 font-body text-[12.5px] text-gold-dim">
                  {category.headingHi}
                  {playlist ? ` · ${playlist.songs.length} songs` : ""}
                </p>

                <p className="mt-3 font-body text-[15px] leading-relaxed text-cream-dim">
                  {category.body[0]}
                </p>

                <Link
                  href={`/${category.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 font-body text-[13px] font-medium text-amber transition-colors duration-200 hover:text-gold"
                >
                  {category.heading}
                  <span aria-hidden>→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
