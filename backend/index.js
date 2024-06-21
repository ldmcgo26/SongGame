import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import callbackRouter from './routes/callback.js'
import dotenv from 'dotenv'
import session from 'express-session'
import serverless from 'serverless-http'

dotenv.config()

const app = express()

app.use(
    session({
        secret: (Math.random().toString(36) + '00000000000000000').slice(2, 18),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
)

app.use(cors())

app.use('/auth', authRouter)
app.use('/callback', callbackRouter)

// Export your app for serverless-http
export const handler = serverless(app)
