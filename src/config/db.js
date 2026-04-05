import mongoose from 'mongoose'

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not provided. Starting API with seeded in-memory data.')
    return false
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
    return true
  } catch (_error) {
    console.log('MongoDB connection failed. Falling back to seeded in-memory data.')
    return false
  }
}

export default connectMongo
