import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
    id : Object,
    label: String,
    auth: Object,

  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
  export const Config = mongoose?.models?.config || mongoose?.model('config', configSchema, "config");
