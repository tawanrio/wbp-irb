import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
    id : Object,
    label: String,
    auth: Object,

  });
  
  export const Config = mongoose?.models?.config || mongoose?.model('config', configSchema, "config");
