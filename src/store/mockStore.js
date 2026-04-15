import bcrypt from 'bcryptjs'
import { genres, playlists, tracks } from '../data/seed.js'

const serializeTrack = (track, userId) => ({
  ...track,
  liked: Boolean(userId && track.likedBy?.includes(userId)),
})

const serializePlaylist = (playlist, userId) => ({
  ...playlist,
  liked: Boolean(userId && playlist.likedBy?.includes(userId)),
})

const state = {
  genres: [...genres],
  tracks: structuredClone(tracks).map((track) => ({
    ...track,
    likedBy: track.liked ? ['user-1'] : [],
    liked: false,
  })),
  playlists: structuredClone(playlists).map((playlist) => ({
    ...playlist,
    likedBy: playlist.liked ? ['user-1'] : [],
    liked: false,
  })),
  users: [
    {
      _id: 'user-1',
      name: 'Demo Listener',
      email: 'demo@musicapp.com',
      passwordHash: bcrypt.hashSync('demo1234', 10),
    },
  ],
}

export const getTracks = (userId) => state.tracks.map((track) => serializeTrack(track, userId))
export const getTrackById = (trackId) => state.tracks.find((track) => track._id === trackId)
export const getRecommendedTracks = (userId) =>
  [...state.tracks]
    .sort((a, b) => b.likes + b.streams - (a.likes + a.streams))
    .slice(0, 4)
    .map((track) => serializeTrack(track, userId))
export const getGenres = () => state.genres
export const getPlaylists = (userId) =>
  state.playlists.map((playlist) => serializePlaylist(playlist, userId))
export const getPlaylistById = (playlistId) =>
  state.playlists.find((playlist) => playlist._id === playlistId)
export const getUserById = (userId) => state.users.find((user) => user._id === userId)
export const getUserByEmail = (email) =>
  state.users.find((user) => user.email.toLowerCase() === email.toLowerCase())

export const saveTrack = (updatedTrack) => {
  state.tracks = state.tracks.map((track) => (track._id === updatedTrack._id ? updatedTrack : track))
  return updatedTrack
}

export const savePlaylist = (updatedPlaylist) => {
  state.playlists = state.playlists.map((playlist) =>
    playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist,
  )
  return updatedPlaylist
}

export const createPlaylist = (payload) => {
  const newPlaylist = {
    _id: `playlist-${Date.now()}`,
    name: payload.name,
    description: payload.description || 'A custom collection built by the listener.',
    trackIds: [],
    likes: 0,
    liked: false,
    likedBy: [],
  }

  state.playlists.unshift(newPlaylist)
  return newPlaylist
}

export const createUser = ({ name, email, password }) => {
  const newUser = {
    _id: `user-${Date.now()}`,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
  }

  state.users.unshift(newUser)
  return newUser
}
