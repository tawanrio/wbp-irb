import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST)
    console.log('Conexão estabelecida com sucesso.')
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    throw error
  }
}

const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('Desconectado do MongoDB.')
  } catch (error) {
    console.error('Erro ao desconectar do MongoDB:', error)
    throw error
  }
}

export { connectMongoDB, disconnectMongoDB }
