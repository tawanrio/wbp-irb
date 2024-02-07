import mongoose from 'mongoose';

const categoriesProductsSchema = new mongoose.Schema({
    id : Object,
    title: String,
    label: String,
    metaTitle: String,
    metaDescription: Array,
    contentDescription: Array,
    category: String,
    banners: Object,
    thumbnail: Object,
    gallery: Array,
    models: Array,
    faq: Object

  });
  
  export const CategoriesProducts = mongoose?.models?.categories_products || mongoose?.model('categories_products', categoriesProductsSchema);
