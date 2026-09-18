import type { City } from "./cities";
import { fullAddress } from "./cities";

export type Faq = { q: string; a: string };

/** Questions that are true for every Nova event. */
export const FAQ_ITEMS: Faq[] = [
  {
    q: "Who can attend KiwiHacks Nova?",
    a: "Any high school student in New Zealand, aged 13 to 18. Come on your own or bring a team of friends. No experience is needed.",
  },
  {
    q: "I'm not a good coder. Can I come?",
    a: "Yes. Total beginners are welcome and a lot of KiwiHackers write their first line of code at the event. We run workshops and have mentors on hand all weekend. Designers, artists, and storytellers fit right in too.",
  },
  {
    q: "What should I bring to the hackathon?",
    a: "A laptop and charger, any devices you want to build with, a water bottle, toiletries including deodorant, a change of clothes, and a sleeping bag and small pillow. It runs for 24 hours, so pack like a sleepover. The full packing list is in the parent's guide on your city page. We cover the food, Wi-Fi, and the space.",
  },
  {
    q: "All of this, for free?",
    a: "Yes, completely free to attend. Food, mentors, workshops, and swag are all included. Cost is never a barrier at KiwiHacks.",
  },
  {
    q: "What can I make at KiwiHacks Nova?",
    a: "Anything you can build in 24 hours: a game, a website, an app, a hardware project, or something completely unexpected. Every team leaves with a real project they built themselves.",
  },
  {
    q: "Do I sleep at the venue?",
    a: "Yes, if you want the full experience. The event is closed-door and staffed with security for the whole 24 hours, and there are gender separated sleeping areas inside the venue, camping style on the floor. Bring a sleeping bag and a small pillow. There are no showers at any of the three venues.",
  },
  {
    q: "What if my parents are concerned?",
    a: "We are happy to talk. Every city page has a parent's guide covering cost, supervision, sleeping, food, the venue, and drop-off and pick-up times. The venue is supervised the whole time, a signed waiver is required to take part, and you can call or text Niko on 022 135 0419, or ring the KiwiHacks line on 09 243 0984, any time.",
  },
  {
    q: "How about safety?",
    a: "The event is supervised by the KiwiHacks team around the clock. There is a secure venue with sign-in and sign-out, first aid on site, police-vetted mentors and organisers, a clear code of conduct, and guardian contact details collected at sign-up. Our full safeguarding policy is on this site.",
  },
  {
    q: "What if I have more questions?",
    a: "Email niko@kiwihacks.org, call the KiwiHacks line on 09 243 0984, or join the KiwiHackers Discord at kiwihacks.org/discord. We reply fast.",
  },
];

/**
 * The shared questions plus three that only make sense once you know which
 * city you are looking at (venue, arrival time, and the guides).
 */
export function faqItemsForCity(city: City): Faq[] {
  const cityItems: Faq[] = [
    {
      q: `Where is Nova ${city.name} being held?`,
      a: `${fullAddress(city.venue)}. ${city.venue.gettingThere}`,
    },
    {
      q: `When do I need to arrive in ${city.name}?`,
      a: `${city.arriveBy} The event finishes at ${city.finishes}.`,
    },
    {
      q: "Is there a guide I can read before the event?",
      a: `Yes. There are two: an attendee guide with the schedule and venue, and a parent's guide covering cost, supervision, sleeping, food, and drop-off and pick-up. Both are linked near the top of this page.`,
    },
  ];

  return [...cityItems, ...FAQ_ITEMS];
}

/** schema.org FAQPage for a given set of questions. */
export function faqSchema(items: Faq[], pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
