// Shared constants for the Nova site.

// Single source of truth for the sign-up link. Used by every "Sign up for Nova!" button.
export const SIGNUP_URL = "https://kiwihacks.fillout.com/nova";

// "A Parent's Guide to KiwiHacks Nova" lives in the KiwiHacks shared drive and is
// shared read-only with anyone who has the link. We link the Doc rather than a PDF
// export, because exporting mangles the layout. Each city links its own tab.
const PARENTS_GUIDE_DOC =
  "https://docs.google.com/document/d/1fkSjAZLdvRb5VWTdEZXx6ky70l8bCy3nyrS-q9Hi4cE/edit";

function parentsGuideTab(tabId: string): string {
  return `${PARENTS_GUIDE_DOC}?tab=${tabId}`;
}

export type Venue = {
  /** Display name of the building or host. */
  name: string;
  /** Street address, without the venue name. */
  address: string;
  /** Suburb and city. */
  locality: string;
  postalCode: string;
  /** Google Maps search link for directions. */
  mapUrl: string;
  /** One line on how attendees actually get there. */
  gettingThere: string;
};

export type ScheduleEntry = { time: string; what: string };

export type City = {
  name: string;
  slug: string;
  date: string;
  /** The same range without the year, for the city selector. */
  shortDate: string;
  startDate: string;
  endDate: string;
  /** Plain-language arrival instruction shown above the schedule. */
  arriveBy: string;
  /** When the event finishes, for the pick-up line. */
  finishes: string;
  venue: Venue;
  /** Day-by-day running order, taken from the city attendee fact sheet. */
  schedule: { day: string; entries: ScheduleEntry[] }[];
  guides: {
    /** Local PDF, served from public/guides/. */
    attendee: string;
    /** Google Doc, deep-linked to this city's tab. */
    parents: string;
  };
};

// Dropdown order.
export const CITIES: City[] = [
  {
    name: "Wellington",
    slug: "wellington",
    date: "26 to 27 September 2026",
    shortDate: "26 to 27 September",
    startDate: "2026-09-26T10:30:00+12:00",
    endDate: "2026-09-27T11:00:00+13:00",
    arriveBy: "Arrive before 10:30am on Saturday to make the opening ceremony.",
    finishes: "Sunday 27 September, 11:00am",
    venue: {
      name: "NEC House, Level 4",
      address: "40 Taranaki Street",
      locality: "Te Aro, Wellington",
      postalCode: "6011",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=NEC+House%2C+40+Taranaki+Street%2C+Te+Aro%2C+Wellington+6011",
      gettingThere:
        "On Taranaki Street in Te Aro, a short walk from Courtenay Place and on most Wellington bus routes. There is paid street and building parking nearby for drop-off.",
    },
    schedule: [
      {
        day: "Saturday 26 September",
        entries: [
          { time: "10:30am", what: "Opening ceremony and workshops" },
          { time: "12:00pm", what: "Building starts" },
          { time: "2:00pm", what: "Lunch" },
          { time: "7:00pm", what: "Dinner" },
          { time: "10:00pm", what: "Quiet building starts" },
        ],
      },
      {
        day: "Sunday 27 September",
        entries: [
          { time: "7:00am", what: "Wake up" },
          { time: "8:00am", what: "Breakfast served" },
          { time: "9:00am", what: "Project submission" },
          { time: "10:00am", what: "Judges expo" },
          { time: "10:30am", what: "Prizegiving" },
          { time: "11:00am", what: "Closing ceremony" },
        ],
      },
    ],
    guides: {
      attendee: "/guides/nova-wellington-attendee-guide.pdf",
      parents: parentsGuideTab("t.km9mby6vm6bd"),
    },
  },
  {
    name: "Christchurch",
    slug: "christchurch",
    date: "2 to 3 October 2026",
    shortDate: "2 to 3 October",
    startDate: "2026-10-02T18:00:00+13:00",
    endDate: "2026-10-03T18:00:00+13:00",
    arriveBy: "Arrive before 6:30pm on Friday to make the opening ceremony.",
    finishes: "Saturday 3 October, 6:00pm",
    venue: {
      name: "Partly HQ",
      address: "210 Armagh Street",
      locality: "Christchurch Central City",
      postalCode: "8011",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=210+Armagh+Street%2C+Christchurch+Central+City%2C+Christchurch+8011",
      gettingThere:
        "In the central city, a short walk from the Christchurch Bus Interchange. Partly are hosting us.",
    },
    schedule: [
      {
        day: "Friday 2 October",
        entries: [
          { time: "6:00pm", what: "Doors open" },
          { time: "6:30pm", what: "Opening ceremony and workshops" },
          { time: "8:00pm", what: "Building starts" },
          { time: "8:30pm", what: "Dinner" },
          { time: "10:00pm", what: "Quiet building starts" },
        ],
      },
      {
        day: "Saturday 3 October",
        entries: [
          { time: "7:00am", what: "Wake up" },
          { time: "8:00am", what: "Breakfast served" },
          { time: "1:00pm", what: "Lunch" },
          { time: "5:00pm", what: "Judges expo" },
          { time: "5:30pm", what: "Prizegiving" },
          { time: "6:00pm", what: "Closing ceremony" },
        ],
      },
    ],
    guides: {
      attendee: "/guides/nova-christchurch-attendee-guide.pdf",
      parents: parentsGuideTab("t.ay5cro80wonl"),
    },
  },
  {
    name: "Auckland",
    slug: "auckland",
    date: "9 to 10 October 2026",
    shortDate: "9 to 10 October",
    startDate: "2026-10-09T09:00:00+13:00",
    endDate: "2026-10-10T11:00:00+13:00",
    arriveBy:
      "Arrive before 9:00am on Friday for the pōwhiri, the formal welcome onto the marae.",
    finishes: "Saturday 10 October, 11:00am",
    venue: {
      name: "MIT Ngā Kete Wānanga Marae",
      address: "53 Otara Road",
      locality: "Ōtara, Auckland",
      postalCode: "2023",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Ng%C4%81+Kete+W%C4%81nanga+Marae%2C+53+Otara+Road%2C+%C5%8Ctara%2C+Auckland+2023",
      gettingThere:
        "On the Manukau Institute of Technology Otara campus, who are hosting us. There is parking on campus for the Friday morning drop-off.",
    },
    schedule: [
      {
        day: "Friday 9 October",
        entries: [
          { time: "9:00am", what: "Pōwhiri" },
          { time: "10:00am", what: "Morning tea" },
          { time: "10:30am", what: "Opening ceremony and workshops" },
          { time: "12:00pm", what: "Building starts" },
          { time: "2:00pm", what: "Lunch" },
          { time: "7:00pm", what: "Dinner" },
          { time: "10:00pm", what: "Quiet building starts" },
        ],
      },
      {
        day: "Saturday 10 October",
        entries: [
          { time: "7:00am", what: "Wake up" },
          { time: "8:00am", what: "Breakfast served" },
          { time: "9:00am", what: "Project submission" },
          { time: "9:30am", what: "Judges expo" },
          { time: "10:30am", what: "Prizegiving" },
          { time: "11:00am", what: "Closing ceremony" },
        ],
      },
    ],
    guides: {
      attendee: "/guides/nova-auckland-attendee-guide.pdf",
      parents: parentsGuideTab("t.ccl9nqn4le5p"),
    },
  },
];

// localStorage key holding the slug of the city the visitor explicitly picked.
// Read by the inline bootstrap script in Layout.astro before first paint.
export const CITY_STORAGE_KEY = "selectedCity";

// Cookie set by the Vercel edge middleware (middleware.ts) holding the slug it
// guessed from the request IP. Only consulted when there is no stored choice.
export const CITY_COOKIE = "detectedCity";

// Shown to visitors who haven't picked a city, alongside a banner offering the
// other two. A stored choice always wins over this.
export const DEFAULT_CITY_SLUG = "auckland";

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export const DEFAULT_CITY = cityBySlug(DEFAULT_CITY_SLUG)!;

/** "NEC House, Level 4, 40 Taranaki Street, Te Aro, Wellington 6011" */
export function fullAddress(venue: Venue): string {
  return `${venue.name}, ${venue.address}, ${venue.locality} ${venue.postalCode}`;
}

// ISO 3166-2 subdivision codes (minus the "NZ-" prefix, which is how Vercel
// reports them) for the regions each city serves. Matching on region rather
// than city name means the suburbs count too: someone in Manukau or Lower Hutt
// gets Auckland or Wellington rather than falling through to the default.
const REGION_TO_SLUG: Record<string, string> = {
  AUK: "auckland",
  WGN: "wellington",
  CAN: "christchurch",
};

// Fallback for when the region is missing but the city name isn't.
const CITY_NAME_TO_SLUG: Record<string, string> = {
  auckland: "auckland",
  wellington: "wellington",
  "lower hutt": "wellington",
  "upper hutt": "wellington",
  porirua: "wellington",
  christchurch: "christchurch",
};

/**
 * Best guess at a Nova city from a request's geo headers, or undefined if the
 * visitor isn't near one. Anyone outside New Zealand falls through to
 * undefined, and so gets the default city: region codes are only unique within
 * a country, so they are meaningless without the country check.
 */
export function cityFromGeo(geo: {
  country?: string;
  city?: string;
  countryRegion?: string;
}): City | undefined {
  if (geo.country?.toUpperCase() !== "NZ") return undefined;

  const byRegion =
    geo.countryRegion && REGION_TO_SLUG[geo.countryRegion.toUpperCase()];
  if (byRegion) return cityBySlug(byRegion);

  const byName = geo.city && CITY_NAME_TO_SLUG[geo.city.trim().toLowerCase()];
  if (byName) return cityBySlug(byName);

  return undefined;
}
