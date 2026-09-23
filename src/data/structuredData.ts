import type { City } from "./cities";
import { fullAddress } from "./cities";
import {
  CONTACT_EMAIL,
  KIWIHACKS_PHONE_TEL,
  DEFAULT_DESCRIPTION,
  ORGANISATION_NAME,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "./site";

export const organisationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORGANISATION_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/nova-logo.png`,
    width: 496,
    height: 272,
  },
  description:
    "KiwiHacks is New Zealand's first high school hackathon club, built and run by teenagers.",
  email: CONTACT_EMAIL,
  telephone: KIWIHACKS_PHONE_TEL,
  sameAs: SOCIAL_LINKS,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en-NZ",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function cityEventSchema(city: City) {
  const url = `${SITE_URL}/${city.slug}`;

  return {
    "@type": "Event",
    "@id": `${url}#event`,
    name: `KiwiHacks Nova ${city.name} 2026`,
    description: `A free, beginner-friendly ${city.hours}-hour hackathon at ${fullAddress(city.venue)} for New Zealand high school students aged 13 to 18.`,
    url,
    startDate: city.startDate,
    endDate: city.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: city.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: city.venue.address,
        addressLocality: city.venue.locality,
        postalCode: city.venue.postalCode,
        addressCountry: "NZ",
      },
      hasMap: city.venue.mapUrl,
    },
    image: [`${SITE_URL}/nova-logo.png`],
    typicalAgeRange: "13-18",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      url: "https://kiwihacks.fillout.com/nova",
      price: 0,
      priceCurrency: "NZD",
      availability: "https://schema.org/InStock",
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
