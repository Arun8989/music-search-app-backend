import { getUserById } from '../store/mockStore.js'
import { verifyToken } from '../utils/auth.js'

export const attachOptionalUser = (req, _res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    req.user = null
    return next()
  }

  try {
    const payload = verifyToken(token)
    req.user = getUserById(payload.sub) || null
  } catch (_error) {
    req.user = null
  }

  return next()
}

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  try {
    const payload = verifyToken(token)
    const user = getUserById(payload.sub)

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    req.user = user
    return next()
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export default requireAuth
