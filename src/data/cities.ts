/**
 * ============================================================================
 * Nova Website Constants
 * ============================================================================
 */

export const SIGNUP_URL =
  "https://kiwihacks.fillout.com/nova" as const;

/**
 * City model
 */
export interface City {
  readonly name: string;
  readonly slug: string;
  readonly date: string;
}

/**
 * Supported cities
 */
export const CITIES = [
  {
    name: "Wellington",
    slug: "wellington",
    date: "28–29 Sep",
  },
  {
    name: "Christchurch",
    slug: "christchurch",
    date: "2–3 Oct",
  },
  {
    name: "Auckland",
    slug: "auckland",
    date: "10–11 Oct",
  },
] as const satisfies readonly City[];

/**
 * Default city
 */
export const DEFAULT_CITY_SLUG = "auckland" as const;

/**
 * Fast O(1) lookup map
 */
export const CITY_MAP = Object.freeze(
  Object.fromEntries(
    CITIES.map((city) => [city.slug, city])
  )
) as Record<(typeof CITIES)[number]["slug"], (typeof CITIES)[number]>;

/**
 * Get city by slug
 */
export function getCityBySlug(
  slug: string
): City | undefined {
  return CITY_MAP[slug as keyof typeof CITY_MAP];
}

/**
 * Default city object
 */
export const DEFAULT_CITY = CITY_MAP[DEFAULT_CITY_SLUG];
