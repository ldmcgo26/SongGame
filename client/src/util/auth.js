import axios from "axios"

export const setAccessToken = async () => {
  await axios.get("http://localhost:3000/callback/token")
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token)
      localStorage.setItem('access_token_timestamp', Date.now())
    })
    .catch((error) => {
      console.error(error, "Error storing access token")
    })
}

const refreshAccessToken = async () => {
  await axios.get("http://localhost:3000/callback/refresh-token")
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token)
      localStorage.setItem('access_token_timestamp', Date.now())
    })
    .catch((error) => {
      console.error(error, "Error storing access token")
    })
}

export const getAccessToken = async () => {
  let token = localStorage.getItem("access_token")
  const timestamp = localStorage.getItem("access_token_timestamp")

  if (!token) {
    await setAccessToken()
    token = localStorage.getItem("access_token")
  } 
  else if (Date.now() - timestamp > 3600 * 1000) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
    token = localStorage.getItem("access_token")
  }
  return token
}

export const logout = async () => {
  localStorage.removeItem('access_token_timestamp');
  localStorage.removeItem('access_token');
  location.reload()
  location.replace("http://localhost:5173/login")
}