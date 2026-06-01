import { atom } from "nanostores";

export type City = "Select City" | "Auckland" | "Wellington" | "Christchurch";
export const city = atom<City>("Select City");
