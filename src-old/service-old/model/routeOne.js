
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { formatStrToUrl } from '@/utils/functions';
// Schema
import Page from '@/service/model/schemas/pageSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Address} from '@/service/model/schemas/addressSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Collection} from '@/service/model/schemas/collectionsSchema'

const routePage = async (page, route) => {
    
     const menu = await Menu.findOne({label:"menu"}).lean();
     const address = await Address.findOne({label:"info"})
     const products = await ProductsDb.find().lean().limit(9);
     const partners = await Categories.findOne({label:"partners"}).lean();
     const collection = await Collection.find({label:route}).lean();
     const template = await Template.find();

     return {
       type: 'page',
       page: JSON.parse(JSON.stringify(page)),
       address: address && JSON.parse(JSON.stringify(address)),
       products: products && JSON.parse(JSON.stringify(products)),
       template: template && JSON.parse(JSON.stringify(template)),
       menu: menu && JSON.parse(JSON.stringify(menu)),
       partners: partners && JSON.parse(JSON.stringify(partners)),
       collection: collection && JSON.parse(JSON.stringify(collection)),
     }
}

const routeProduct = async (product) =>{
       const page = await Page.findOne({label:"produtos"}).lean();
       const products = await ProductsDb.find().lean();
       const partners = await Categories.findOne({label:"partners"}).lean();
       const menu = await Menu.findOne({label:"menu"}).lean();
       const template = await Template.find();

    return {
      type: 'product',
      product:JSON.parse(JSON.stringify(product)),
      page: JSON.parse(JSON.stringify(page)),
      partners: partners && JSON.parse(JSON.stringify(partners)),
      template: template && JSON.parse(JSON.stringify(template)),
      menu: menu && JSON.parse(JSON.stringify(menu)),
      products: products && JSON.parse(JSON.stringify(products)),
    }
}


const routeError = async (error) => {
  const template = await Template.find();
  const menu = await Menu.findOne({label:"menu"}).lean();
  return {
    type: 'error',
    page:JSON.parse(JSON.stringify(error)),
    template: template && JSON.parse(JSON.stringify(template)),
    menu: menu && JSON.parse(JSON.stringify(menu)),
  }
}

const getDataPage = async (resolvedUrl) => {
try{
      await connectMongoDB();
      
      const route = formatStrToUrl(resolvedUrl)
     

      // página
      const page = await Page.findOne({label: route}).lean();
      if (page) return await routePage(page, route);
      

       // produtos
      const product = await ProductsDb.findOne({label:route}).lean();
      if(product) return await routeProduct(product, route);
     
  
      // rota inexistente
      const  error = await Page.findOne({label:'error'}).lean();
      if(error) return await routeError(error);
  
}finally{
  await disconnectMongoDB();
}

  }

  export { getDataPage };