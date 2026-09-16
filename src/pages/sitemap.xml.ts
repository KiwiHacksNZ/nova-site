import type { APIRoute } from "astro";
import { CITIES } from "../data/cities";
import { SITE_URL } from "../data/site";

const paths = [
  "/",
  ...CITIES.map((city) => `/${city.slug}`),
  "/faq",
  "/team",
  "/safety",
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${escapeXml(new URL(path, SITE_URL).href)}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
