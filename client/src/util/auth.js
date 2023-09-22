import axios from "axios"

export const setAccessToken = () => {
  axios.get("http://localhost:3000/callback/token")
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token)
      localStorage.setItem('access_token_timestamp', Date.now())
    })
    .catch((error) => {
      console.error(error, "Error storing access token")
    })
}

const refreshAccessToken = () => {
  axios.get("http://localhost:3000/callback/refresh-token")
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token)
      localStorage.setItem('access_token_timestamp', Date.now())
    })
}

export const getAccessToken = () => {
  const token = localStorage.getItem("access_token")

  if (Date.now() - getTokenTimestamp() > 3600 * 1000) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
    token = localStorage.getItem("access_token")
  }
  
  return token
}

export const logout = () => {
  localStorage.removeItem('access_token_timestamp');
  localStorage.removeItem('access_token');
  location.reload();
}