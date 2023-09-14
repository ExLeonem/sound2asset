import { atom } from "jotai";

export const colors = atom<string[]>([]);
export const styles = atom<string[]>([]);
export const genres = atom<string[]>([]);
export const artists = atom<string[]>([]);

export const assetsToCreate = atom<string[]>([]);
export const socialMediaIntegration = atom<string[]>([]);