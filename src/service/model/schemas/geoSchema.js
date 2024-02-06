import mongoose from 'mongoose';

const geoSchema = new mongoose.Schema({
    id : Object,
    countries: Array,
  });
  
export const Geo = mongoose?.models?.geo || mongoose?.model('geo', geoSchema, 'geo');
