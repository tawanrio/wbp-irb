import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
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

  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
  export const Products = mongoose?.models?.products || mongoose?.model('products', productsSchema);
