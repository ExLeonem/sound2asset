import { atom } from "jotai";


export const colors = atom<string[]>([]);
export const styles = atom<string[]>([]);
export const genres = atom<string[]>([]);
export const artists = atom<string[]>([]);
export const assets = atom<string[]>([]);
export const audio_file = atom<File>(null);


export const coverIdx = atom<number>(-1);
export const lyrics = atom<string>("");
export const socialMediaTypes = atom<string[]>([]);

export const assetsToCreate = atom<string[]>([]);
export const socialMediaIntegration = atom<string[]>([]);

enum AppState {
    LYRICS=1,
    COVER=2,
    ASSETS=3,
    PREVIEW=4
}

export const stage = atom<AppState>(AppState.LYRICS);


const dummyAssetTypes = [
    "Poster",
    "T-Shirt",
    "Booklet",
]

const dummySocialMediaTypes = [
    "Twitter",
    "Facebook",
    "Instagram",
    "Xing"
]

export {
    AppState,
    dummyAssetTypes,
    dummySocialMediaTypes
};