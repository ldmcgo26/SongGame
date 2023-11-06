import axios from 'axios'
import { getAccessToken } from './auth'

const access_token = await getAccessToken()

const headers = {
    Authorization: `Bearer ${access_token}`,
}

export const playSong = async () => {
    const playEndpoint = 'https://api.spotify.com/v1/me/player/play'
    const trackUri = 'spotify:track:7GhIk7Il098yCjg4BQjzvb'
    const requestData = {
        uris: [trackUri],
    }
    await axios
        .put(playEndpoint, requestData, { headers })
        .then((response) => {
            console.log('Playback started:', response.data)
        })
        .catch((error) => {
            console.error('Error starting playback:', error)
        })
}

export const getTopGenres = async () => {
    const endpoint = 'https://api.spotify.com/v1/me/top/artists'

    try {
        const response = await axios
            .get(endpoint, { headers })
        console.log('Genres:', response.data)
        return response.data // Return the fetched data
            
    } catch (error) {
        console.error('Error getting genres:', error)
        throw error // Re-throw the error if needed
    }
}
