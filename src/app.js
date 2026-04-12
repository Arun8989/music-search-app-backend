import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import playlistRoutes from './routes/playlistRoutes.js'
import trackRoutes from './routes/trackRoutes.js'
import { getGenres } from './store/mockStore.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Music streaming API is healthy',
  })
})

app.use('/api/tracks', trackRoutes)
app.use('/api/playlists', playlistRoutes)
app.use('/api/genres', (_req, res) => {
  res.json({ success: true, data: getGenres() })
})

export default app
