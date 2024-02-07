import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    id : Object,
    label: String,
    menus: Array,
    colors: Object
  });
  
export const Menu = mongoose?.models?.components || mongoose?.model('components', menuSchema);
