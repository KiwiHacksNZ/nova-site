import Link from "next/link";
import NovaLogo from "../components/NovaLogo";
import { SIGNUP_URL } from "../lib/cities";

type Faq = { q: string; a: string };

const FAQ_ITEMS: Faq[] = [
  {
    q: "Who can attend KiwiHacks Nova?",
    a: "Any high school student in New Zealand, years 9 to 13. Come on your own or bring a team of friends. No experience needed.",
  },
  {
    q: "I'm not a good coder. Can I come?",
    a: "Yes. Total beginners are welcome and a lot of KiwiHackers write their first line of code at the event. We run workshops and have mentors on hand all weekend. Designers, artists, and storytellers fit right in too.",
  },
  {
    q: "What should I bring to the hackathon?",
    a: "A laptop and charger, any devices you want to build with, a water bottle, and a sleeping bag if you want to rest. It runs 24 hours, so pack like a sleepover. We cover the food, wifi, and the space.",
  },
  {
    q: "All of this, for free?",
    a: "Yes, completely free to attend. Food, mentors, workshops, and swag are all covered by our sponsors. Cost is never a barrier at KiwiHacks.",
  },
  {
    q: "What can I make at KiwiHacks Nova?",
    a: "Anything you can build in 24 hours: a game, a website, an app, a hardware project, or something completely unexpected. Every team leaves with a real project they built themselves.",
  },
  {
    q: "What if my parents are concerned?",
    a: "We are happy to talk. We run parent info sessions before each event, the venue is supervised the whole time, and a signed waiver is required to take part. Email us and we will answer any questions.",
  },
  {
    q: "How about safety?",
    a: "The event is supervised by the KiwiHacks team around the clock. Secure venue with check-in and check-out, first aid on site, a clear code of conduct, and guardian contact details collected at signup.",
  },
  {
    q: "What if I have more questions?",
    a: "Email niko@kiwihacks.org or join the KiwiHackers Discord at kiwihacks.org/discord. We reply fast.",
  },
];

export const metadata = {
  title: "FAQ | Nova by KiwiHacks",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-6 pb-24">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-[#5b52ee]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path
            d="M15 19l-7-7 7-7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </Link>

      {/* Logo + FAQ heading */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:justify-start">
        <div className="flex flex-col items-center">
          <NovaLogo className="h-16 sm:h-24" />
          <a
            href="https://kiwihacks.org"
            className="-mt-4 self-end text-sm text-white/90 no-underline transition-colors hover:text-white"
          >
            By KiwiHacks
          </a>
        </div>
        <h1 className="text-5xl font-semibold text-white sm:text-7xl">FAQ</h1>
      </div>

      {/* 2-column card grid (stacks on mobile) */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.q}
            className="rounded-xl bg-[#5c2a42]/85 p-6 ring-1 ring-white/5"
          >
            <h3 className="text-lg font-semibold text-[#db74a8]">{item.q}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{item.a}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
          Ready for the experience of a lifetime?
        </h2>
        <a
          href={SIGNUP_URL}
          className="mt-6 inline-block rounded-2xl bg-[#4f46e5] px-10 py-3.5 text-base font-semibold text-white no-underline shadow-lg transition-colors hover:bg-[#5b52ee]"
        >
          Sign up for Nova!
        </a>
      </div>
    </div>
  );
}
