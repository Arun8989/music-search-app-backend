import app from './src/app.js'
import connectMongo from './src/config/db.js'

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectMongo()

  app.listen(PORT, () => {
    console.log(`Music API running on port ${PORT}`)
  })
}

startServer()
