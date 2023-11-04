import axios from "axios"

let token = undefined
let timestamp = undefined

const refreshAccessToken = async () => {
  await axios.get("http://localhost:3000/callback/refresh-token")
  .then((res)=> {token = res.data.access_token})
  .catch((error)=> {console.error(error, "Error refreshing token")})
}

export const getAccessToken = async () => {
  if (!token) {
    await axios.get("http://localhost:3000/callback/token")
    .then((res) => {
      token = res.data.access_token
      timestamp = Date.now()
    })
    .catch((error) => {
      console.error(error, "Error getting access token")
    })
  } 
  else if (Date.now() - timestamp > 3600 * 1000) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }
  return token
}

export const logout = async () => {
  token = undefined
  timestamp = undefined
  location.replace("http://localhost:5173/login")
}