import express from 'express'
import {
  getRecommendedTracks,
  getTrackById,
  getTracks,
  saveTrack,
} from '../store/mockStore.js'

const router = express.Router()

router.get('/', (req, res) => {
  const search = (req.query.search || '').toLowerCase()
  const tracks = getTracks().filter((track) => {
    if (!search) return true

    return [track.title, track.artist, track.album, track.movie].some((value) =>
      value.toLowerCase().includes(search),
    )
  })

  res.json({ success: true, data: tracks })
})

router.get('/recommended', (_req, res) => {
  res.json({ success: true, data: getRecommendedTracks() })
})

router.post('/:trackId/like', (req, res) => {
  const track = getTrackById(req.params.trackId)
  if (!track) {
    return res.status(404).json({ success: false, message: 'Track not found' })
  }

  const updatedTrack = {
    ...track,
    liked: !track.liked,
    likes: track.liked ? track.likes - 1 : track.likes + 1,
  }

  saveTrack(updatedTrack)
  return res.json({ success: true, data: updatedTrack })
})

router.post('/:trackId/comments', (req, res) => {
  const track = getTrackById(req.params.trackId)
  if (!track) {
    return res.status(404).json({ success: false, message: 'Track not found' })
  }

  const updatedTrack = {
    ...track,
    comments: [
      ...track.comments,
      {
        _id: `comment-${Date.now()}`,
        user: req.body.user || 'Anonymous',
        content: req.body.content || '',
        createdAtLabel: 'Just now',
      },
    ],
  }

  saveTrack(updatedTrack)
  return res.status(201).json({ success: true, data: updatedTrack })
})

export default router
