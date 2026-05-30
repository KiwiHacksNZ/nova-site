import { notFound } from "next/navigation";
import CityHome from "../components/CityHome";
import { CITIES, cityBySlug } from "../lib/cities";

// Pre-render one static page per city: /wellington, /christchurch, /auckland.
export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const found = cityBySlug(city);
  return {
    title: found ? `Nova ${found.name} | KiwiHacks` : "Nova | KiwiHacks",
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const found = cityBySlug(city);
  if (!found) notFound();
  return <CityHome city={found} />;
}
