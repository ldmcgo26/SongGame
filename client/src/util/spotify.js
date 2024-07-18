import axios from 'axios'
import { getAccessToken } from './auth'

export const playSong = async (uri) => {
    const playEndpoint = 'https://api.spotify.com/v1/me/player/play';
    const trackUri = uri;
    const requestData = {
        uris: [trackUri],
    };

    const access_token = await getAccessToken();

    const headers = {
        Authorization: `Bearer ${access_token}`,
    };

    try {
        const response = await axios.put(playEndpoint, requestData, { headers });
    } catch (error) {
        if (error.response && error.response.status === 404 && error.response.data.error.reason === 'NO_ACTIVE_DEVICE') {
            console.error('No active device found. Prompting user to activate a device.');
            // Implement logic to prompt the user to activate a device
            // For example, redirect to Spotify Connect or show a message to the user
            alert('No active device found. Please open the Spotify app or activate a device and begin playing music before playing Song Game.');

            // You can also redirect to Spotify Connect using the following line:
            // window.location.href = 'https://www.spotify.com/connect/';
        } else {
            console.error('Error starting playback:', error);
        }
    }
};

export const getTopGenres = async () => {
    const endpoint = 'https://api.spotify.com/v1/me/top/artists'

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    try {
        const response = await axios.get(endpoint, { headers })
        return response.data // Return the fetched data
    } catch (error) {
        console.error('Error getting genres:', error)
        throw error // Re-throw the error if needed
    }
}

export const generatePlaylist = async (artists, genres) => {
    const endpoint = 'https://api.spotify.com/v1/recommendations'
    const requestData = {
        limit: 100,
        seed_artists: artists,
        seed_genres: genres,
        market: 'US',
    }

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    try {
        const response = await axios.get(endpoint, {
            params: requestData,
            headers,
        })
        return response.data.tracks // Return the fetched data
    } catch (error) {
        console.error('Error generating playlist:', error)
        throw error // Re-throw the error if needed
    }
}

export const setRepeat = async () => {
    const endpoint = 'https://api.spotify.com/v1/me/player/repeat'

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    const requestData = {
        state: 'track',
    }

    try {
        const response = await axios.put(endpoint, null, {
            params: requestData,
            headers: headers,
        })
        return response.data // Return the fetched data
    } catch (error) {
        console.error('Error setting repeat:', error)
        throw error // Re-throw the error if needed
    }
}
