import axios from 'axios';
import { getAccessToken } from './auth';

const createAuthenticatedRequest = async (url, method, data) => {
  const access_token = await getAccessToken();

  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  try {
    const response = await axios({ url, method, data, headers });
    return response.data;
  } catch (error) {
    console.error(`Error: ${method} ${url}`, error);
    throw error;
  }
};

export const playSong = async (uri) => {
  const playEndpoint = 'https://api.spotify.com/v1/me/player/play';
  const trackUri = uri;
  const requestData = {
    uris: [trackUri],
  };

  return createAuthenticatedRequest(playEndpoint, 'put', requestData)
    .then((response) => {
      console.log('Playback started:', response);
    });
};

export const getTopGenres = async () => {
  const endpoint = 'https://api.spotify.com/v1/me/top/artists';
  return createAuthenticatedRequest(endpoint, 'get');
};

export const generatePlaylist = async (artists, genres) => {
  const endpoint = 'https://api.spotify.com/v1/recommendations';
  const requestData = {
    limit: 100,
    seed_artists: artists,
    seed_genres: genres,
    market: 'US',
  };

  const access_token = await getAccessToken();

  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

    try {
        const response = await axios.get(endpoint, {
            params: requestData,
            headers,
        })
        console.log(response.data.tracks)
        return response.data.tracks // Return the fetched data
    } catch (error) {
        console.error('Error generating playlist:', error)
        throw error // Re-throw the error if needed
    }
};

export const setRepeat = async () => {
  const endpoint = 'https://api.spotify.com/v1/me/player/repeat';
  const requestData = {
    state: 'track',
  };

  return createAuthenticatedRequest(endpoint, 'put', null, { params: requestData });
};
