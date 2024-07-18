import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import callbackRouter from './routes/callback.js'
import dotenv from 'dotenv'
import serverless from 'serverless-http'

dotenv.config()

const app = express()

app.use(cors())

app.use('/auth', authRouter)
app.use('/callback', callbackRouter)

// Export your app for serverless-http
export const handler = serverless(app)
