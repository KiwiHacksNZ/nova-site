import { atom } from "nanostores";

export type City = "Select Region" | "Auckland" | "Wellington" | "Christchurch";
export const city = atom<City>("Select Region");
