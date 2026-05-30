"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NovaLogo from "./NovaLogo";
import { CITIES, DEFAULT_CITY_SLUG, cityBySlug } from "@/app/lib/cities";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-6 w-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M5 9l7 7 7-7"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Current city is derived from the URL. "/" defaults to Auckland.
  // On non-city routes (e.g. /faq) there is no active city, so the button reads "Select City".
  const slug = pathname === "/" ? DEFAULT_CITY_SLUG : pathname.replace(/^\//, "");
  const activeCity = cityBySlug(slug) ?? null;

  // Close the dropdown when clicking outside it.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    // The bar plus its bright pink gradient underline strip.
    <header className="sticky top-0 z-50 w-full">
      <nav className="flex w-full flex-wrap items-center justify-between gap-3 bg-[#161a3d] px-5 py-2.5 sm:px-8">
        {/* Left: Nova wordmark, links home */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <NovaLogo className="h-8 sm:h-9" />
        </Link>

        {/* Right: Team, FAQ, Select City */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Team has no page yet, so it's a non-navigating button. */}
          <button
            type="button"
            className="rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5b52ee] sm:px-5"
          >
            Team
          </button>

          <Link
            href="/faq"
            className="rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-[#5b52ee] sm:px-5"
          >
            FAQ
          </Link>

          {/* Select City dropdown: each option navigates to /{slug} */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex items-center gap-3 rounded-xl bg-[#4f46e5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5b52ee] sm:px-5"
            >
              <span className="whitespace-nowrap">
                {activeCity ? activeCity.name : "Select City"}
              </span>
              <Chevron open={open} />
            </button>

            {open && (
              <div className="absolute right-0 top-[calc(100%+0.4rem)] z-50 w-64 overflow-hidden rounded-xl bg-[#4f4fc8] py-1 shadow-2xl ring-1 ring-black/20">
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-baseline justify-between gap-4 px-4 py-1.5 text-left no-underline transition-colors hover:bg-white/10"
                  >
                    <span className="text-lg text-white">{city.name}</span>
                    <span className="text-xs text-white/70">{city.date}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Bright pink gradient underline strip beneath the bar. */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#ff5ea0] via-[#ff7ab3] to-[#ff5ea0]" />
    </header>
  );
}
