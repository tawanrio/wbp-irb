import mongoose from 'mongoose'

let isConnected = false // Rastreia o estado da conexão

const connectMongoDB = async () => {
  if (isConnected) {
    console.log('Já está conectado ao MongoDB.')
    return // Retorna se já estiver conectado
  }

  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
    })
    isConnected = true // Atualiza o estado da conexão
    console.log('Conexão estabelecida com sucesso.')
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    throw error
  }
}

const disconnectMongoDB = async () => {
  if (!isConnected) {
    console.log('Não está conectado ao MongoDB.')
    return // Retorna se não estiver conectado
  }

  try {
    await mongoose.disconnect()
    isConnected = false // Atualiza o estado da conexão
    console.log('Desconectado do MongoDB.')
  } catch (error) {
    console.error('Erro ao desconectar do MongoDB:', error)
    throw error
  }
}

export { connectMongoDB, disconnectMongoDB }
