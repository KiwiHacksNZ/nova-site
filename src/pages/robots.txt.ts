import type { APIRoute } from "astro";
import { SITE_URL } from "../data/site";

const robots = `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
