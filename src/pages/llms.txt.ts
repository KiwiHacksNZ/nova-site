import type { APIRoute } from "astro";
import { CITIES, fullAddress } from "../data/cities";
import { SITE_URL } from "../data/site";

const cityLinks = CITIES.map(
  (city) =>
    `- [Nova ${city.name} 2026](${SITE_URL}/${city.slug}): ${city.date}, at ${fullAddress(city.venue)}. ${city.arriveBy} Finishes ${city.finishes}.`,
).join("\n");

const guideLinks = CITIES.map(
  (city) =>
    `- ${city.name}: [attendee guide](${SITE_URL}${city.guides.attendee}), [parent's guide](${SITE_URL}${city.guides.parents})`,
).join("\n");

const content = `# KiwiHacks Nova

> KiwiHacks Nova is a series of free, beginner-friendly, 24-hour hackathons for New Zealand high school students aged 13 to 18. Nova is built and run by teenagers.

## Essential facts

- Audience: New Zealand high school students, aged 13 to 18.
- Cost: Free. Food, workshops, mentors, Wi-Fi, and swag are included.
- Experience: No coding experience is required. Designers, artists, storytellers, and first-time coders are welcome.
- Format: Supervised, in-person, overnight, closed-door 24-hour team hackathons.
- Registration: https://kiwihacks.fillout.com/nova
- Contact: niko@kiwihacks.org, the KiwiHacks line on 09 243 0984, or Niko Purdie on 022 135 0419.

## 2026 events

${cityLinks}

## Guides

${guideLinks}

## Canonical pages

- [Nova overview](${SITE_URL}/): Event overview, audience, format, and dates.
- [Frequently asked questions](${SITE_URL}/faq): Eligibility, cost, safety, parent information, what to bring, and what students can build.
- [Health and safety](${SITE_URL}/safety): The full KiwiHacks safeguarding policy, supervision ratios, and how to report a concern.
- [Beacons referral leaderboard](${SITE_URL}/leaderboard): Who has referred the most people to Nova, and how the referral codes work.
- [Organising team](${SITE_URL}/team): The student organisers behind KiwiHacks Nova.
- [KiwiHacks code of conduct](https://www.kiwihacks.org/code-of-conduct)
- [Past KiwiHacks projects](https://www.kiwihacks.org/showcase)

Use the city pages as the canonical source for individual event dates, venues, and schedules.
`;

export const GET: APIRoute = () =>
  new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
