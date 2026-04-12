# Music Search App Backend

Express backend API for a MERN-style music streaming application. It provides music catalog data, search, recommended tracks, playlist management, likes, and comments.

## Live API

```text
https://music-search-app-backend.onrender.com/api
```

## Features

- Track catalog with genres, moods, artists, albums, and movie names
- Search endpoint for tracks
- Recommended tracks endpoint
- Playlist listing, creation, and song add/remove actions
- Track likes
- Playlist likes
- Track comments
- Genre endpoint
- Register, login, and profile endpoints
- MongoDB-ready configuration with seeded in-memory fallback

## Tech Stack

- Node.js
- Express
- CORS
- Dotenv
- Mongoose

## Local Setup

```bash
npm install
npm start
```

The API runs at:

```text
http://localhost:5000/api
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=
JWT_SECRET=change-me
```

If `MONGO_URI` is empty, the API uses seeded in-memory data.

## API Routes

```text
GET    /api/health
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/genres
GET    /api/tracks
GET    /api/tracks?search=lofi
GET    /api/tracks/recommended
POST   /api/tracks/:trackId/like
POST   /api/tracks/:trackId/comments
GET    /api/playlists
POST   /api/playlists
POST   /api/playlists/:playlistId/tracks
DELETE /api/playlists/:playlistId/tracks/:trackId
POST   /api/playlists/:playlistId/like
```

## Render Deployment

Use these settings:

- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `CLIENT_URL=<your Netlify frontend URL>`
- Environment variable: `JWT_SECRET=<your secure random string>`

## Demo Account

```text
Email: demo@musicapp.com
Password: demo1234
```

## Frontend Repository

```text
https://github.com/Arun8989/music-search-app-frontend
```
