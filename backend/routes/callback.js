import express from 'express'
import querystring from 'querystring'
import axios from 'axios'
import dotenv from 'dotenv'
import { Console } from 'console'

dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const frontend_uri = process.env.FRONTEND_URI

const router = express.Router()

let token = undefined
let refreshToken = undefined

router.get('/', async (req, res) => {
    const code = req.query.code || null
    const state = req.query.state || null

    if (state === null) {
        res.redirect(
            '/#' +
                querystring.stringify({
                    error: 'state_mismatch',
                })
        )
    } else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            data: querystring.stringify({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer.from(clientId + ':' + clientSecret).toString(
                        'base64'
                    ),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }

        await axios
            .request(authOptions)
            .then((response) => {
                const { access_token, refresh_token, expires_in, token_type } =
                    response.data

                console.log('Access Token:', access_token)
                console.log('Refresh Token:', refresh_token)
                console.log('Token Type:', token_type)
                console.log('Expires In:', expires_in)

                token = access_token
                refreshToken = refresh_token

                res.redirect(frontend_uri)
            })
            .catch((error) => {
                console.error(
                    'Error exchanging authorization code for access token:',
                    error
                )
            })
    }
})

router.get('/token', (req, res) => {
    if (!token) {
        return res.status(401).json({ message: 'Access token not found' })
    }
    // Send the access token to the frontend
    res.json({ access_token: token })
})

router.get('/refresh-token', async (req, res) => {
    console.log(refreshToken)
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization:
                'Basic ' +
                new Buffer.from(clientId + ':' + clientSecret).toString(
                    'base64'
                ),
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        },
        json: true,
    }

    await axios
        .post(authOptions)
        .then((response) => {
            token = response.data.access_token
            res.json({ access_token: token })
        })
        .catch((error) => {
            console.error('Error refreshing access token', error)
        })
})

export default router
