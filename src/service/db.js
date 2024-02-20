import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    // await mongoose.connect('mongodb://191.252.214.76:25027/irb');
    await mongoose.connect('mongodb://186.202.57.154:27017/irb');
    // await mongoose.connect('mongodb://localhost:27017/irb');
    console.log('Conexão estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};

const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
  } catch (error) {
    console.error('Erro ao desconectar do MongoDB:', error);
    throw error;
  }
};

export { connectMongoDB, disconnectMongoDB };
