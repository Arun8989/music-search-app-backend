import express from 'express'
import requireAuth, { attachOptionalUser } from '../middleware/authMiddleware.js'
import {
  getRecommendedTracks,
  getTrackById,
  getTracks,
  saveTrack,
} from '../store/mockStore.js'

const router = express.Router()

router.get('/', attachOptionalUser, (req, res) => {
  const search = (req.query.search || '').toLowerCase()
  const tracks = getTracks(req.user?._id).filter((track) => {
    if (!search) return true

    return [track.title, track.artist, track.album, track.movie, track.genre, track.mood].some((value) =>
      value.toLowerCase().includes(search),
    )
  })

  res.json({ success: true, data: tracks })
})

router.get('/recommended', attachOptionalUser, (req, res) => {
  res.json({ success: true, data: getRecommendedTracks(req.user?._id) })
})

router.post('/:trackId/like', requireAuth, (req, res) => {
  const track = getTrackById(req.params.trackId)
  if (!track) {
    return res.status(404).json({ success: false, message: 'Track not found' })
  }

  const updatedTrack = {
    ...track,
    likedBy: track.likedBy.includes(req.user._id)
      ? track.likedBy.filter((userId) => userId !== req.user._id)
      : [...track.likedBy, req.user._id],
  }

  updatedTrack.likes = track.likedBy.includes(req.user._id) ? track.likes - 1 : track.likes + 1
  updatedTrack.liked = updatedTrack.likedBy.includes(req.user._id)

  saveTrack(updatedTrack)
  return res.json({ success: true, data: updatedTrack })
})

router.post('/:trackId/comments', requireAuth, (req, res) => {
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
        user: req.user.name,
        content: req.body.content || '',
        createdAtLabel: 'Just now',
      },
    ],
  }

  saveTrack(updatedTrack)
  return res.status(201).json({ success: true, data: updatedTrack })
})

export default router
