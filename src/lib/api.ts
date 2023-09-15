import {send} from "vite";
import {PromptConfig, PromptRequest} from "./state.ts";

class Api {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    createCover(file: string, lyrics: string) {
        const body = {
            file: file,
            lyrics: lyrics,
            artists: [],
            styles: [],
            genres: [],
            colors: []
        }
        return this.sendPostRequest(body);
    }

    recreateCover(file: string, lyrics: string, promptConfig: PromptConfig) {
        const body = {
            file: file,
            lyrics: lyrics,
            artists: promptConfig.artists,
            styles: promptConfig.styles,
            genres: promptConfig.genres,
            colors: promptConfig.colors
        }
        return this.sendPostRequest(body);
    }

    sendPostRequest(body: PromptRequest) {
        return fetch(`${this.baseUrl}/create`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    buildUrl(segments: string[]) {
        return [this.baseUrl, ...segments].join("/")
    }
}

export default Api;