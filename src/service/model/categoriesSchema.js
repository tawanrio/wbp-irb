import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
    id : Object,
    label: String,
    types: Array
  });
  
export const Categories = mongoose?.models?.categories || mongoose?.model('categories', categoriesSchema);
