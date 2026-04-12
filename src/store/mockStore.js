import bcrypt from 'bcryptjs'
import { genres, playlists, tracks } from '../data/seed.js'

const state = {
  genres: [...genres],
  tracks: structuredClone(tracks),
  playlists: structuredClone(playlists),
  users: [
    {
      _id: 'user-1',
      name: 'Demo Listener',
      email: 'demo@musicapp.com',
      passwordHash: bcrypt.hashSync('demo1234', 10),
    },
  ],
}

export const getTracks = () => state.tracks
export const getTrackById = (trackId) => state.tracks.find((track) => track._id === trackId)
export const getRecommendedTracks = () =>
  [...state.tracks].sort((a, b) => b.likes + b.streams - (a.likes + a.streams)).slice(0, 4)
export const getGenres = () => state.genres
export const getPlaylists = () => state.playlists
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
