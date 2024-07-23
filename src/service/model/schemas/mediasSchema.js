import mongoose from 'mongoose'

const mediasSchemas = new mongoose.Schema(
  {
    id: Object,
    path: String,
    _createdAt: String,
    trash: Boolean,
    origin: String,
    domain: String,
    alt: String,
    title: String,
    legend: String,
    type: String,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const Medias =
  mongoose?.models?.medias || mongoose?.model('medias', mediasSchemas)
