
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { formatStrToUrl, formatStrToNoDash } from '@/utils/functions';
// Schema
import Page from '@/service/model/schemas/pageSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Address} from '@/service/model/schemas/addressSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Collection} from '@/service/model/schemas/collectionsSchema'
import {Geo} from '@/service/model/schemas/geoSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'



  
  const singlePartner = async (arrRoute,collection)=>{
  
    let page = await Page.findOne({label:'contato'}).lean();
    if(page){
      const address = await Address.findOne({label:"info"})
      const products = await ProductsDb.find().lean().limit(9);
      const categories = await CategoriesProducts.find().lean();
      const partners = await Categories.findOne({label:"partners"}).lean();
      const template = await Template.find();
      const menu = await Menu.findOne({label:"menu"}).lean();
      
    
      return {
        type: arrRoute[0],
        page: JSON.parse(JSON.stringify(page)),
        address: address && JSON.parse(JSON.stringify(address)),
        categories: categories && JSON.parse(JSON.stringify(categories)),
        products: products && JSON.parse(JSON.stringify(products)),
        template: template && JSON.parse(JSON.stringify(template)),
        menu: menu && JSON.parse(JSON.stringify(menu)),
        partners: partners && JSON.parse(JSON.stringify(partners)),
        collection: collection && JSON.parse(JSON.stringify(collection)),
        
      }
    }
  }
  

  
  
  const routePartnerProduct = async (arrRoute,category) =>{
  
    const page = await Page.findOne({label:"produtos"}).lean();
    const products = await ProductsDb.find().lean();
    const categories = await CategoriesProducts.find().lean();
    const template = await Template.find();
    // const collection = await Collection.find({"products.label": arrRoute[1]}).lean();
    const collection = await Collection.find({
      label: { $regex: new RegExp(arrRoute[0], 'i') },
      "products.label": arrRoute[1]
    }).lean();
    const partners = await Categories.findOne({label:"partners"}).lean();
  
      const menu = await Menu.findOne({label:"menu"}).lean();
     
        return {
          type: 'product',
          arrRoute:JSON.parse(JSON.stringify(arrRoute)),
          partners: partners && JSON.parse(JSON.stringify(partners)),
          page: JSON.parse(JSON.stringify(page)),
          category: category && JSON.parse(JSON.stringify(category)),
          categories: categories && JSON.parse(JSON.stringify(categories)),
          template: template && JSON.parse(JSON.stringify(template)),
          menu: menu && JSON.parse(JSON.stringify(menu)),
          collection: collection && JSON.parse(JSON.stringify(collection)),
          products: products && JSON.parse(JSON.stringify(products)),
        }
  }

  const routeGeo = async (arrRoute,geo, geoName) => {


    // se a rota encontrar um estado
  
    const page = await Page.findOne({label:arrRoute[0]}).lean();
    const template = await Template.find();
    const menu = await Menu.findOne({label:"menu"}).lean();
    // const products = await ProductsDb.find().lean();
    const partners = await Categories.findOne({label:"partners"}).lean();
    const categories = await CategoriesProducts.find().lean();

    page.title = `${page.title} em ${geoName}`;
return {
  type: `geo-${arrRoute[0]}`,
  arrRoute:JSON.parse(JSON.stringify(arrRoute)),
 page: JSON.parse(JSON.stringify(page)),
 partners: partners && JSON.parse(JSON.stringify(partners)),
 categories: categories && JSON.parse(JSON.stringify(categories)),
 template: template && JSON.parse(JSON.stringify(template)),
 collection: geo && JSON.parse(JSON.stringify(geo)),
 menu: menu && JSON.parse(JSON.stringify(menu)),
//  products: products && JSON.parse(JSON.stringify(products)),
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

const routePartner = async (arrRoute) =>{
  const routeOne = formatStrToNoDash(arrRoute[0]);
  const routeTwo = formatStrToNoDash(arrRoute[1]);

  if(arrRoute[0] !== 'mecanicas'){
    // rota categoria
    const categories = await CategoriesProducts.findOne({label:arrRoute[1]}).lean();
    // const product = await ProductsDb.findOne({label:arrRoute[1]}).lean();
    if(categories) return await routePartnerProduct(arrRoute, categories)
  }


// rota parceiro
  // const collection = await Collection.find().lean();
  // collection.filter(partner => {
  //   console.log(partner);
  // })

  let collection = await Collection.findOne({
    label: { $regex: new RegExp(arrRoute[0], 'i') },
    name: { $regex: new RegExp(`^${routeTwo}$`, 'i') }
  }).lean();

if(collection) return await singlePartner(arrRoute,collection)


// rota geo
// const geo = await Geo.findOne(
  //   { 'countries.name': 'brasil', 'states.name':  { $regex: new RegExp(routeGeoName, 'i') } },
  //   { 'states.$': 1 }
  // ).lean();
  
  // const routeGeoName = formatStrToNoDash(arrRoute[1]);
  
  const routeGeoName = formatStrToNoDash(arrRoute[1]);

  const partners = (arrRoute[0] === 'fabrica') 
  ? await Collection.find().lean()
  : await Collection.find({label: arrRoute[0]}).lean();
  let geoName = null

  const geo = partners.filter(partner => {
    const stateDb = formatStrToNoDash(partner.info.address[0].state)
    const cityDb = formatStrToNoDash(partner.info.address[0].city)
    if(stateDb === routeGeoName || cityDb === routeGeoName) {
      geoName = (stateDb === routeGeoName) ? partner.info.address[0].state : null

      if(!geoName) geoName = (cityDb === routeGeoName) ? partner.info.address[0].city : null

    
      return partner
    }
  });

  if(geo.length > 0) return await routeGeo(arrRoute, geo, geoName)

// name: { $regex: new RegExp(routeTwo, 'i') }

// rota inexistente
const  error = await Page.findOne({label:'error'}).lean();
if(error) return await routeError(error);
}

const singleProduct = async (product, arrRoute) => {
  const page = await Page.findOne({label:"produtos"}).lean();
  const products = await ProductsDb.find().lean();
  const partners = await Categories.findOne({label:"partners"}).lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find();

return {
 type: 'singleProduct',
 product:JSON.parse(JSON.stringify(product)),
 page: JSON.parse(JSON.stringify(page)),
 partners: partners && JSON.parse(JSON.stringify(partners)),
 template: template && JSON.parse(JSON.stringify(template)),
 menu: menu && JSON.parse(JSON.stringify(menu)),
 products: products && JSON.parse(JSON.stringify(products)),
 arrRoute:JSON.parse(JSON.stringify(arrRoute)),
}
}
  
  const getDataPage = async (arrRoute) => {
      try{
        await connectMongoDB();
  
  
      // se for a rota for distribuidor/ autopeça/ autocenter
      if(
        arrRoute[0] === 'distribuidoras' ||
        arrRoute[0] === 'autopecas' ||
        arrRoute[0] === 'fabrica' ||
        arrRoute[0] === 'mecanicas'
      ){
      return await routePartner(arrRoute)
    }


    // se a rota for um produto
     // categoria
    //  const category = await CategoriesProducts.findOne({label:route}).lean();
   const product = await ProductsDb.findOne({label:arrRoute[1],category:arrRoute[0]}).lean();
   if(product) return await singleProduct(product,arrRoute)
   

  // rota inexistente
    const  error = await Page.findOne({label:'error'}).lean();
      if(error) return await routeError(error);
  
  
      
      // if(!page && !product) error = await Page.findOne({label:'error'}).lean();
      // if(error){
      //   console.log('error');
   
       
  
      // }
      
      // }catch{
      //   console.log('error catch');
      //   const template = await Template.find();
      //   const menu = await Menu.findOne({label:"menu"}).lean();
      //   return {
      //     type: 'error',
      //     page:JSON.parse(JSON.stringify(error)),
      //     template: template && JSON.parse(JSON.stringify(template)),
      //     menu: menu && JSON.parse(JSON.stringify(menu)),
      //   }
      }
      finally{
        disconnectMongoDB();
      }
    }

  export { getDataPage };