import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  id : Object,
  label: String,
  name:String,
  phone: Array,
  addresses: Array,
  colors: Object
  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
export const Address = mongoose?.models?.components || mongoose?.model('components', addressSchema);
 