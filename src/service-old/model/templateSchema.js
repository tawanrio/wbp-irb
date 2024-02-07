import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    id : Object,
    label: String,
    items: Array
 
  });
  
  export const Template = mongoose?.models?.templates || mongoose?.model('templates', templateSchema);

