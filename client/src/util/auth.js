import axios from "axios"

export const setAccessToken = () => {
  axios.get("http://localhost:3000/get-access-token")
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token)
      res.send("Access token successfully stored")
    })
    .catch((error) => {
      console.error(error, "Error storing access token")
    })
}