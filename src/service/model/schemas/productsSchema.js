import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema(
  {
    id: Object,
    productId: Number,
    title: String,
    label: String,
    metaTitle: String,
    metaDescription: String,
    contentDescription: String,
    category: String,
    banners: Object,
    _createdAt: String,
    _updatedAt: String,
    thumbnail: Object,
    faq: Object,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const Products =
  mongoose?.models?.products || mongoose?.model('products', productsSchema)
