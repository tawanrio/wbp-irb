import mongoose from 'mongoose'

const menusSchema = new mongoose.Schema(
  {
    id: Object,
    label: String,
    links: Array,
    colors: Object,
    icon: String,
    title: String,
    separateIcon: String,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const Menus =
  mongoose?.models?.menus || mongoose?.model('menus', menusSchema)
