import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    id : Object,
    label: String,
    menus: Array,
    links: Array,
    colors: Object,
    icon: String,
    title: String,
    separateIcon: String,
  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
export const Menu = mongoose?.models?.components || mongoose?.model('components', menuSchema);
