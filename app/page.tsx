import CityHome from "./components/CityHome";
import { DEFAULT_CITY } from "./lib/cities";

// Root "/" defaults to Auckland. Other cities live at "/wellington", "/christchurch", "/auckland".
export default function HomePage() {
  return <CityHome city={DEFAULT_CITY} />;
}
