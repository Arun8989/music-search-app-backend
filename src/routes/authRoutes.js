import bcrypt from 'bcryptjs'
import express from 'express'
import requireAuth from '../middleware/authMiddleware.js'
import { createUser, getUserByEmail } from '../store/mockStore.js'
import { sanitizeUser, signToken } from '../utils/auth.js'

const router = express.Router()

router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' })
  }

  if (password.trim().length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
  }

  if (getUserByEmail(email.trim())) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' })
  }

  const user = createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
  })

  return res.status(201).json({
    success: true,
    data: {
      token: signToken(user),
      user: sanitizeUser(user),
    },
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = getUserByEmail(email?.trim() || '')

  if (!user || !bcrypt.compareSync(password || '', user.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  return res.json({
    success: true,
    data: {
      token: signToken(user),
      user: sanitizeUser(user),
    },
  })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({
    success: true,
    data: sanitizeUser(req.user),
  })
})

export default router
