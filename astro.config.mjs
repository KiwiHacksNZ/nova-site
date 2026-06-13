// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build
export default defineConfig({
  site: "https://nova.kiwihacks.org",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
