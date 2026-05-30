# KiwiHacks Nova

The site for KiwiHacks Nova, New Zealand's first high school hackathon national tour. Three cities, three free 24 hour hackathons.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) (v4 via the `@tailwindcss/vite` plugin).

## Getting Started

Install dependencies, then run the dev server:

```bash
npm install
npm run dev
```

Open the printed local URL (default http://localhost:4321) in your browser.

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build locally |

## Routes

- `/` Auckland (default city)
- `/auckland`, `/wellington`, `/christchurch` per-city pages
- `/faq` frequently asked questions

## Structure

```
src/
  components/   NovaLogo, NavBar, Footer, CityHome
  data/         cities.ts (SIGNUP_URL, CITIES, default city)
  layouts/      Layout.astro (html/body, nav + slot + footer)
  pages/        index.astro, [city].astro, faq.astro
  styles/       global.css (Tailwind + brand palette + Geist fonts)
public/
  nova-logo.png Nova wordmark
```

City names, dates, and the signup link all live in `src/data/cities.ts`. Update them there.
