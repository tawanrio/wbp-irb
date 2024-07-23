import mongoose from 'mongoose'

const connectMongoDB = async (locale) => {
  try {
    locale = (locale === 'pt') ? '' : locale;
    console.log();
    await mongoose.connect(`${process.env.DB_HOST}irb${locale}?authSource=admin`);
    console.log('Conexão estabelecida com sucesso.', locale);
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
