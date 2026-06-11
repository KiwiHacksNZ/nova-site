import { atom } from "nanostores";
import { DEFAULT_CITY, type City as CityType } from "./data/cities";

export const city = atom<CityType>(DEFAULT_CITY);
