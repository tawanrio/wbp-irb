import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    id : Object,
    label: String,
    items: Array
 
  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
  export const Template = mongoose?.models?.templates || mongoose?.model('templates', templateSchema);

