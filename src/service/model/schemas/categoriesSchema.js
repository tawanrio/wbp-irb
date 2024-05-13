import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
    id : Object,
    label: String,
    types: Array
  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
export const Categories = mongoose?.models?.categories || mongoose?.model('categories', categoriesSchema);
