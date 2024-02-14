import mongoose from 'mongoose';

const menusSchema = new mongoose.Schema({
    id : Object,
    label: String,
    links: Array,
    colors: Object,
    icon: String,
    title: String,
    separateIcon: String,
  });
  
export const Menus = mongoose?.models?.menus || mongoose?.model('menus', menusSchema);
