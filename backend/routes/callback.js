import express from 'express'
import querystring from 'querystring'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const frontend_uri = process.env.FRONTEND_URI

const router = express.Router()

router.get('/', async (req, res) => {
    const code = req.query.code || null
    const state = req.query.state || null

    if (state === null || state !== req.query.state) {
        // Validate state
        res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }))
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
                    Buffer.from(clientId + ':' + clientSecret).toString(
                        'base64'
                    ),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            json: true
        }

        try {
            const response = await axios(authOptions)
            const { access_token, refresh_token } = response.data

            // Redirect to the frontend with the tokens
            res.redirect(
                frontend_uri +
                '#' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    timestamp: Date.now()
                })
            )
        } catch (error) {
            console.error(
                'Error exchanging authorization code for access token:',
                error
            )
            res.redirect(
                '/#' + querystring.stringify({ error: 'invalid_token' })
            )
        }
    }
})

router.get('/refresh-token', async (req, res) => {
    const refreshToken = req.query.refresh_token
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' })
    }

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    try {
        const response = await axios(authOptions)
        res.json({ access_token: response.data.access_token })
    } catch (error) {
        console.error('Error refreshing access token', error)
        res.status(500).json({ error: 'Failed to refresh access token' })
    }
})

export default router
