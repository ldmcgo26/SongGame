import axios from "axios"
import { getAccessToken } from "./auth";

const access_token = getAccessToken()

export const playSong = () => {
    console.log(access_token)
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