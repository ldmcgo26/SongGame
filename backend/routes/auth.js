import express from 'express'
import querystring from 'querystring'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const clientId = process.env.CLIENT_ID
const redirectUri = process.env.REDIRECT_URI

router.get('/', (req, res) => {
    const state = (Math.random().toString(36) + '00000000000000000').slice(
        2,
        18
    )
    const scope =
        'user-read-private user-read-email user-modify-playback-state user-top-read'

    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
            })
    )
})

export default router
