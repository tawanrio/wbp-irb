import mongoose from 'mongoose';

const formsSchema = new mongoose.Schema({
  id : Object,
  label: String,
  teste:String,
  forms: Object,
  colors: Object
  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
export const Form = mongoose?.models?.components || mongoose?.model('components', formsSchema);
 