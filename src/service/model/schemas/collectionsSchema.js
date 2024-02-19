import mongoose from 'mongoose';

const collectionsSchema = new mongoose.Schema({
  id : Object,
  category: String,
  label: String,
  name: String,
  gallery: Array,
  logo: Object,
  info: Object,
  catalog: Array,
  contentDescription: Array
  });
  
export const Collection = mongoose.models?.categories_collections || mongoose?.model('categories_collections', collectionsSchema);
