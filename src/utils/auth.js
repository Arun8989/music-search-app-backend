import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'music-app-secret'

export const signToken = (user) =>
  jwt.sign(
    {
      sub: user._id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  )

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET)

export const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
})
