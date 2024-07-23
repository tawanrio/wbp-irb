import mongoose from 'mongoose'

const categoriesProductsSchema = new mongoose.Schema(
  {
    id: Object,
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
    ebook: Array,
    faq: Object,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const CategoriesProducts =
  mongoose?.models?.categories_products ||
  mongoose?.model('categories_products', categoriesProductsSchema)
