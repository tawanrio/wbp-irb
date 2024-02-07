import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  id : Object,
  label: String,
  name:String,
  phone: Array,
  addresses: Array,
  colors: Object
  });
  
export const Address = mongoose?.models?.components || mongoose?.model('components', addressSchema);
 