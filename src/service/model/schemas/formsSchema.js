import mongoose from 'mongoose';

const formsSchema = new mongoose.Schema({
  id : Object,
  label: String,
  teste:String,
  forms: Object,
  colors: Object
  });
  
export const Form = mongoose?.models?.components || mongoose?.model('components', formsSchema);
 