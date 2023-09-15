import { atom } from "jotai";


export const colors = atom<string[]>([]);
export const styles = atom<string[]>([]);
export const genres = atom<string[]>([]);
export const artists = atom<string[]>([]);
export const assets = atom<string[]>([]);
export const audioFile = atom<string>(null);

export interface PromptConfig {
    artists: string[];
    colors: string[];
    genres: string[];
    styles: string[];
}

export interface PromptRequest extends PromptConfig {
    file: string,
    lyrics: string
}

export const coverIdx = atom<number>(-1);
export const selectedCoverUrl = atom<string>("");
export const albumCoverUrls = atom<PromptResponse>(null)
export const lyrics = atom<string>("");

export interface PromptResponse {
    imageUrls: string[];
    interpretation: string;
    imagePrompt: string;
}

export const socialMediaTypes = atom<PromptResponse>([]);
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

const dummyTshirtUrls = [
    "https://media.istockphoto.com/id/482948743/photo/blank-white-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=cJG_B0mOIG42FKtC_rqIeZCClYOj7UCFNNs9WTkYEEE="
]

export {
    AppState,
    dummyAssetTypes,
    dummySocialMediaTypes,
    dummyTshirtUrls
};