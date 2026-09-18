import { geolocation, next } from "@vercel/edge";
// The .js extension is required, not optional. Vercel now runs this as
// serverless middleware under Node ESM, which does not resolve extensionless
// relative imports; dropping it fails every request with a 500
// MIDDLEWARE_INVOCATION_FAILED. TypeScript maps the .js back to the .ts source
// at build time, so this is correct in both places.
import {
  CITY_COOKIE,
  CITY_CHOICE_COOKIE,
  cityBySlug,
  cityFromGeo,
} from "./src/data/cities.js";

/*
 * Vercel middleware. The site is a static build, so it cannot look at the
 * request itself: this runs in front of the HTML and passes the visitor's
 * likely city down as a cookie, which the inline bootstrap script in
 * Layout.astro reads before first paint.
 *
 * The IP never leaves Vercel: `geolocation()` just parses the `x-vercel-ip-*`
 * headers Vercel already attached to the request.
 *
 * Everything downstream treats a missing cookie as "no guess", so if this ever
 * stops running the site quietly falls back to the default city.
 */

// Every HTML route, listed literally rather than as a pattern so there is no
// matcher syntax to get wrong. Static assets are left alone: they have no use
// for the cookie, and matching them would run this far more often than needed.
//
// Both slash forms are listed because either can be linked to from outside.
// A new page needs adding here, or its nav will show the default city.
export const config = {
  matcher: [
    "/",
    "/team",
    "/team/",
    "/faq",
    "/faq/",
    "/safety",
    "/safety/",
    "/leaderboard",
    "/leaderboard/",
  ],
};

function cookie(request: Request, name: string): string | undefined {
  const match = request.headers
    .get("cookie")
    ?.match(new RegExp("(?:^|; *)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function middleware(request: Request): Response {
  const detected = cityFromGeo(geolocation(request));
  const chosen = cityBySlug(cookie(request, CITY_CHOICE_COOKIE) ?? "");
  const url = new URL(request.url);

  // Auto-select: anyone we can place goes straight to their city page, so they
  // land on the venue, schedule and guides for the event they'd actually
  // attend rather than a national overview. An explicit choice outranks the IP
  // guess, so switching city in the nav sticks.
  //
  // Only "/" redirects, and only when we have a city. Visitors we cannot place
  // (anyone outside New Zealand, which includes most crawlers) still get the
  // overview, so "/" stays indexable. 307 keeps it non-cacheable: the right
  // answer depends on who is asking.
  // Escape hatch: /?all skips the redirect, so the three-city overview stays
  // reachable for someone we would otherwise send straight to one city.
  const wantsOverview = url.searchParams.has("all");

  const target = chosen ?? detected;
  if (
    !wantsOverview &&
    target &&
    (url.pathname === "/" || url.pathname === "")
  ) {
    url.pathname = `/${target.slug}`;
    return Response.redirect(url, 307);
  }

  if (!detected) return next();

  return next({
    headers: {
      // Readable from JS by design: the bootstrap script needs it. It holds a
      // city slug and nothing identifying.
      "set-cookie": `${CITY_COOKIE}=${detected.slug}; Path=/; Max-Age=86400; SameSite=Lax; Secure`,
    },
  });
}
