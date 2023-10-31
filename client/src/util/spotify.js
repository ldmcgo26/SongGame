import axios from "axios"
import { getAccessToken } from "./auth";

const access_token = getAccessToken()

export const playSong = () => {
    const playEndpoint = "https://api.spotify.com/v1/me/player/play";
    const trackUri = "spotify:track:7GhIk7Il098yCjg4BQjzvb"; 

    const requestData = {
        uris: [trackUri],
    };
    const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
    };

    axios
        .put(playEndpoint, requestData, { headers })
        .then((response) => {
            console.log("Playback started:", response.data);
        })
        .catch((error) => {
            console.error("Error starting playback:", error);
        });
}

export const getTopGenres = () => {
    const endpoint = "https://api.spotify.com/v1/me/top/artists";

    const headers = {
        Authorization: `Bearer ${access_token}`,
    };

    axios
        .get(endpoint, { headers })
        .then((response) => {
            console.log("Genres:", response.data);
        })
        .catch((error) => {
            console.error("Error getting genres:", error);
        });
}