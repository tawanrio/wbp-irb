import mongoose from 'mongoose';


  const userSchema = new mongoose.Schema({
    cnpj: String,
    tradingName: String,
    companyName: String,
    phone: String,
    address:{
        street: String,
        city: String,
        state: String
    }
})
  
export const UsersModel = mongoose?.models?.users || mongoose?.model('users', userSchema);
