import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    id : Object,
    label: String,
    title: String,
    metaTitle: String,
    metaDescription: Array,
    contentDescription: Array,
    location: Object,
    banners: Object,
    colors: Object,
    companyValues: Array,
    faq: Array
    
  });
  
 const Page = mongoose?.models?.pages || mongoose?.model('pages', pageSchema);

 export default Page