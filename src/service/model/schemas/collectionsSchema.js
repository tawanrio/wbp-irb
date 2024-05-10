import mongoose from 'mongoose';

const collectionsSchema = new mongoose.Schema({
  id : Object,
  category: String,
  title: String,
  label: String,
  name: String,
  gallery: Array,
  logo: Object,
  enabled: Boolean,
  cnpj: String,
  info: Object,
  geo: Object,
  banners: Object,
  metaDescription: Array,
  metaTitle: String,
  products: Array,
  catalog: Array,
  contentDescription: Array
  });
  
export const Collection = mongoose.models?.categories_collections || mongoose?.model('categories_collections', collectionsSchema);
