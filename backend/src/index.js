import express from "express";
import cors from "cors"
import querystring from "querystring";
import axios from "axios";
import router from "./routes/auth"

const clientId = "179e2166da3644e5a6cafb1cb561ffd6";
const clientSecret = "455e56d5bb684e04bbb4e9d040dd12ed";
const redirectUri = "http://localhost:3000/callback";

const app = express();

app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", router)

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        }),
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "POST", // Specify the HTTP method explicitly
      data: querystring.stringify({
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .request(authOptions)
      .then((response) => {
        // Handle the response from Spotify's token endpoint
        const { access_token, refresh_token, expires_in, token_type } =
          response.data;

        // Access token can now be used to make authenticated requests to the Spotify API
        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);
        console.log("Token Type:", token_type);
        console.log("Expires In:", expires_in);

        localStorage.setItem('accessToken', access_token)

        // You can choose to redirect the user or perform other actions here
        // // The Spotify API endpoint for starting playback
        // const playEndpoint = "https://api.spotify.com/v1/me/player/play";

        // // The Spotify URI of the song or track you want to play
        // const trackUri = "spotify:track:7GhIk7Il098yCjg4BQjzvb"; // Replace with the URI of the song you want to play

        // // Create the request payload
        // const requestData = {
        //   uris: [trackUri],
        // };

        // // Set up the headers with the access token
        // const headers = {
        //   Authorization: `Bearer ${access_token}`,
        //   "Content-Type": "application/json",
        // };

        // // Make a POST request to start playback
        // axios
        //   .put(playEndpoint, requestData, { headers })
        //   .then((response) => {
        //     console.log("Playback started:", response.data);
        //   })
        //   .catch((error) => {
        //     console.error("Error starting playback:", error);
        //   });
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(
          "Error exchanging authorization code for access token:",
          error,
        );
        // You can choose to redirect the user or perform other error handling here
      });
  }
});

app.listen(3000, () => {
  console.log("App listening at port 3000");
});
