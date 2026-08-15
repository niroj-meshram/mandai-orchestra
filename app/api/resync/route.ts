/**
 * Nudges Vercel into rebuilding, which is what actually picks up new songs:
 * `npm run build` re-reads the YouTube playlist, so a fresh deploy is a fresh
 * tracklist. Vercel Cron calls this on the schedule in `vercel.json`.
 *
 * Two environment variables, both set in the Vercel dashboard:
 *
 *   DEPLOY_HOOK_URL   Project → Settings → Git → Deploy Hooks. Creating one
 *                     gives you a URL that starts a build when POSTed to.
 *   CRON_SECRET       Any random string. Vercel automatically sends it as a
 *                     bearer token on cron requests, which is the only thing
 *                     separating the scheduler from anyone who guesses this
 *                     path — without it, a stranger could spend your build
 *                     minutes for you.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const hook = process.env.DEPLOY_HOOK_URL;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hook) {
    return Response.json({ error: "DEPLOY_HOOK_URL is not set" }, { status: 500 });
  }

  const res = await fetch(hook, { method: "POST" });
  if (!res.ok) {
    return Response.json(
      { error: `Deploy hook returned ${res.status}` },
      { status: 502 }
    );
  }

  return Response.json({ triggered: true });
}
