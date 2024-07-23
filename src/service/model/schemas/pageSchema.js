import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
  {
    id: Object,
    label: String,
    title: String,
    metaTitle: String,
    metaDescription: Array,
    contentDescription: Array,
    location: Object,
    banners: Object,
    colors: Object,
    companyValues: Array,
    certificate: Array,
    servicesOverview: Array,
    faq: Array
    
  }, {
    versionKey: false // Isso impede que o campo "__v" seja incluído nos documentos
  });
  
 const Page = mongoose?.models?.pages || mongoose?.model('pages', pageSchema);

 export default Page