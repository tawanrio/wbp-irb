import mongoose from 'mongoose'

const collectionsSchema = new mongoose.Schema(
  {
    id: Object,
    category: String,
    companyName: String,
    label: String,
    tradingName: String,
    gallery: Array,
    logo: Object,
    whereToBuy: String,
    enabled: Boolean,
    cnpj: { type: String, unique: true, index: true },
    info: Object,
    geo: Object,
    banners: Object,
    requirements: Object,
    metaDescription: Array,
    metaTitle: String,
    products: Array,
    catalog: Array,
    idToValidationRegister: String,
    _createdAt: String,
    _updatedAt: String,
    contentDescription: Array,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const Collection =
  mongoose.models?.categories_collections ||
  mongoose?.model('categories_collections', collectionsSchema)
