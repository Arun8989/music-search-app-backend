import express from 'express'
import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
  getTrackById,
  savePlaylist,
} from '../store/mockStore.js'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ success: true, data: getPlaylists() })
})

router.post('/', (req, res) => {
  if (!req.body.name?.trim()) {
    return res.status(400).json({ success: false, message: 'Playlist name is required' })
  }

  const playlist = createPlaylist({
    name: req.body.name.trim(),
    description: req.body.description,
  })

  return res.status(201).json({ success: true, data: playlist })
})

router.post('/:playlistId/tracks', (req, res) => {
  const playlist = getPlaylistById(req.params.playlistId)
  const track = getTrackById(req.body.trackId)

  if (!playlist || !track) {
    return res.status(404).json({ success: false, message: 'Playlist or track not found' })
  }

  const trackIds = playlist.trackIds.includes(track._id)
    ? playlist.trackIds
    : [...playlist.trackIds, track._id]

  const updatedPlaylist = {
    ...playlist,
    trackIds,
  }

  savePlaylist(updatedPlaylist)
  return res.json({ success: true, data: updatedPlaylist })
})

router.delete('/:playlistId/tracks/:trackId', (req, res) => {
  const playlist = getPlaylistById(req.params.playlistId)
  if (!playlist) {
    return res.status(404).json({ success: false, message: 'Playlist not found' })
  }

  const updatedPlaylist = {
    ...playlist,
    trackIds: playlist.trackIds.filter((trackId) => trackId !== req.params.trackId),
  }

  savePlaylist(updatedPlaylist)
  return res.json({ success: true, data: updatedPlaylist })
})

router.post('/:playlistId/like', (req, res) => {
  const playlist = getPlaylistById(req.params.playlistId)
  if (!playlist) {
    return res.status(404).json({ success: false, message: 'Playlist not found' })
  }

  const updatedPlaylist = {
    ...playlist,
    liked: !playlist.liked,
    likes: playlist.liked ? playlist.likes - 1 : playlist.likes + 1,
  }

  savePlaylist(updatedPlaylist)
  return res.json({ success: true, data: updatedPlaylist })
})

export default router
