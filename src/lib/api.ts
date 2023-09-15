import {send} from "vite";
import {PromptParameters} from "./state.ts";

class Api {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    createCover(file: File, lyrics: string) {
        const body = {
            file: file,
            lyrics: lyrics
        }
        this.sendPostRequest(body);
    }

    recreateCover(file: File, lyrics: string, promptConfig: PromptParameters) {
        const body = {
            file: file,
            lyrics: lyrics,
            artists: promptConfig.artists,
            styles: promptConfig.styles,
            genres: promptConfig.genres,
            colors: promptConfig.colors
        }
        this.sendPostRequest(body);
    }

    sendPostRequest(body: object) {
        fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
}

export default Api;