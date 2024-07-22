import mongoose from 'mongoose'

const geoSchema = new mongoose.Schema(
  {
    id: Object,
    countries: Array,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const Geo =
  mongoose?.models?.geo || mongoose?.model('geo', geoSchema, 'geo')
