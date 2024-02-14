
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { formatStrToUrl } from '@/utils/functions';
// Schema
import Page from '@/service/model/schemas/pageSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Address} from '@/service/model/schemas/addressSchema'
import {Menus} from '@/service/model/schemas/menusSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import {Collection} from '@/service/model/schemas/collectionsSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'

const routePage = async (page, route) => {
    
    //  const menu = await Menu.findOne({label:"menu"}).lean();
     const address = await Address.findOne({label:"info"})
    //  const products = await ProductsDb.find().lean().limit(9);
     const partners = await SchemaCategories.findOne({label:"partners"}).lean();
     const template = await Template.find();
     const collection = await Collection.find({label:route}).lean();
     const categories = await CategoriesProducts.find().lean();
     const menus = await Menus.find().lean();


    
     return {
       type: 'page',
       page: JSON.parse(JSON.stringify(page)),
       address: address && JSON.parse(JSON.stringify(address)),
       categories: categories && JSON.parse(JSON.stringify(categories)),
      //  products: products && JSON.parse(JSON.stringify(products)),
       template: template && JSON.parse(JSON.stringify(template)),
       menus: menus && JSON.parse(JSON.stringify(menus)),
       partners: partners && JSON.parse(JSON.stringify(partners)),
       collection: collection && JSON.parse(JSON.stringify(collection)),
     }
}

const routeCategory = async (category,route) =>{
       const page = await Page.findOne({label:"produtos"}).lean();
       const products = await ProductsDb.find({category:route}).lean();
       const partners = await SchemaCategories.findOne({label:"partners"}).lean();
      //  const menu = await Menu.findOne({label:"menu"}).lean();
       const template = await Template.find();
       const menus = await Menus.find().lean();

    return {
      type: 'category',
      // product:JSON.parse(JSON.stringify(product)),
      page: JSON.parse(JSON.stringify(page)),
      category: category && JSON.parse(JSON.stringify(category)),
      partners: partners && JSON.parse(JSON.stringify(partners)),
      template: template && JSON.parse(JSON.stringify(template)),
      
      menus: menus && JSON.parse(JSON.stringify(menus)),
      products: products && JSON.parse(JSON.stringify(products)),
    }
}


const routeError = async (error, route) => {
  const template = await Template.find();
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const menus = await Menus.find().lean();
  return {
    type: 'error',
    route,
    page:JSON.parse(JSON.stringify(error)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
  }
}

const getDataPage = async (resolvedUrl) => {
try{
      await connectMongoDB();
      
      const route = formatStrToUrl(resolvedUrl)
     

      // página
      const page = await Page.findOne({label: route}).lean();
      if (page) return await routePage(page, route);
      

       // categoria
      const category = await CategoriesProducts.findOne({label:route}).lean();
      // const category = await CategoriesProducts.find(
      //   { "types.label": route },
      //   { "types.$": 1, "banners":1 }
      // ).lean();
      if(category) return await routeCategory(category, route);
     
  
      // rota inexistente
      const  error = await Page.findOne({label:'error'}).lean();
      if(error) return await routeError(error, route);
  
}finally{
  await disconnectMongoDB();
}

  }

  export { getDataPage };