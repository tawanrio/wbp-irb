import { connectMongoDB, disconnectMongoDB } from '@/service/db'

export const cbConnection = async (cb) => {
  try {
    await connectMongoDB()

    cb()
  } finally {
    await disconnectMongoDB()
  }
}
