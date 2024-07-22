
import { connectMongoDB, disconnectMongoDB } from '@/service/db';



// Schema
import Page from '@/service/model/schemas/pageSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Address} from '@/service/model/schemas/addressSchema'
import {Menus} from '@/service/model/schemas/menusSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Geo} from '@/service/model/schemas/geoSchema'
import {Collection} from '@/service/model/schemas/collectionsSchema'

// util
import {formatStrToNoDash, replaceShortcodePartner, updateMetatitleGeoRouteThree} from '@/utils/functions'

const resolveRoute = async (resolvedUrl) =>{
  const splittedUrl = resolvedUrl.split('/');
  splittedUrl.shift();
  // console.log(splittedUrl);
  return splittedUrl;
}


const singlePartner = async (route,collection)=>{

  let page = await Page.findOne({label:'contato'}).lean();
  if(page){
    // console.log('page');
    
    const address = await Address.findOne({label:"info"})
    const products = await ProductsDb.find().lean().limit(9);
    const partners = await Categories.findOne({label:"partners"}).lean();
    const template = await Template.find();
    // const menu = await Menu.findOne({label:"menu"}).lean();
    const menus = await Menus.find().lean();
  
    return {
      type: route[0],
      page: JSON.parse(JSON.stringify(page)),
      address: address && JSON.parse(JSON.stringify(address)),
      products: products && JSON.parse(JSON.stringify(products)),
      template: template && JSON.parse(JSON.stringify(template)),
      menus: menus && JSON.parse(JSON.stringify(menus)),
      partners: partners && JSON.parse(JSON.stringify(partners)),
      collection: collection && JSON.parse(JSON.stringify(collection)),
    }
  }
}

const routeError = async (error) => {
  const template = await Template.find();
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const menus = await Menus.find().lean();
  return {
    type: 'error',
    page:JSON.parse(JSON.stringify(error)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
  }
}


const routePartner = async (arrRoute) =>{
  const partner = formatStrToNoDash(arrRoute[1]);

  const collection = await Collection.findOne({
    label: { $regex: new RegExp(arrRoute[0], 'i') },
    name: { $regex: new RegExp(partner, 'i') }, 
    enabled:true
  }).lean();

  // se existir um parceiro
if(collection){
    console.log('é um parceiro');
  const partner = await singlePartner(arrRoute)
  return partner
}

// se existir um produto
if(arrRoute[0] !== 'mecanicas'){
// const product = await ProductsDb.findOne({label:arrRoute[1]}).lean();
const category = await CategoriesProducts.findOne({label:arrRoute[1]}).lean();
if(category) return await routeProduct(category,arrRoute)
}


// rota inexistente
const  error = await Page.findOne({label:'error'}).lean();
if(error) return await routeError(error);


}

const routeGeo = async (hasPartner,arrRoute,category, countries, geoName)=>{
  const partner = formatStrToNoDash(arrRoute[1]);
  const stateName = formatStrToNoDash(arrRoute[2]);
  const page = await Page.findOne({label:"produtos"}).lean();
  const products = await ProductsDb.find().lean();
  const template = await Template.find();
  const categories = await CategoriesProducts.find().lean();
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const partners = await Categories.findOne({label:"partners"}).lean();
  const menus = await Menus.find().lean();
 
  
  categories.title = `${categories.title}s em ${geoName}`;

  let partnerName
  if(arrRoute[0] !== 'fabrica'){
   partnerName = partners.types.find(item => item.label == arrRoute[0]);
  }else{
    partnerName ={ title: 'Fábrica'}
  }

 let description = category.partner.description
 description = replaceShortcodePartner(description, partnerName.title )

 let metaTitle = category?.partner.metaTitle
 metaTitle = replaceShortcodePartner(metaTitle, partnerName.title)
 metaTitle = updateMetatitleGeoRouteThree(metaTitle, ` em ${geoName} -`)

 category.partner.metaTitle = category.partner.metaTitle ? metaTitle : category.partner.metaTitle
 category.partner.description = description
 category.title = `${category.title} em ${geoName}`;

  
      return {
        type: 'product-geo',
        category:JSON.parse(JSON.stringify(category)),
        categories: categories && JSON.parse(JSON.stringify(categories)),
        page: JSON.parse(JSON.stringify(page)),
        geo: countries && JSON.parse(JSON.stringify(countries)),
        geoName,
        arrRoute:JSON.parse(JSON.stringify(arrRoute)),
        template: template && JSON.parse(JSON.stringify(template)),
        collection: hasPartner && JSON.parse(JSON.stringify(hasPartner)),
        menus: menus && JSON.parse(JSON.stringify(menus)),
        partners: partners && JSON.parse(JSON.stringify(partners)),
        products: products && JSON.parse(JSON.stringify(products)),
      }
    
}

const routeProduct = async (category,arrRoute) =>{
  

     // const collection = await Collection.findOne({
  //   label: { $regex: new RegExp(route[0], 'i') },
  //   name: { $regex: new RegExp(partner, 'i') }
  // }).lean();

  // const geoDocument = await Geo.findOne().lean();
  // const country = geoDocument.countries.find(country => country.name === 'brasil');


  // se a rota encontrar um estado
  // let states = country.states.filter((state) => {
  //     const formattedName = formatStrToNoDash(state.name);
  //     return formattedName === stateName;
  //   })[0];

    // if(states){

      let countries;
      let stateNameDb = null;
      let cityNameDb = null;
      
    const geo = await Geo.findOne({"countries.name": "brasil"});

    if (geo) {
      
    const routeGeoName = formatStrToNoDash(arrRoute[2]);
      countries = geo.countries.find(country => country.name.toLowerCase() === "brasil");

      countries.states.find(state => {
        if(stateNameDb  || cityNameDb) return
        if(formatStrToNoDash(state.name) === routeGeoName){
          stateNameDb = state.name
        }

        if(!stateNameDb){
          state.cities.find(city =>{
            if(formatStrToNoDash(city) === routeGeoName){
              cityNameDb = city
            }
          })
        }
        
    })

    

    const collection = await Collection.find({label:arrRoute[0], enabled:true}).lean();

    const hasPartner = collection.filter(partner => {
      if(partner){
      let statesGeoDb = []
      partner.geo?.states.filter(states=>{
         statesGeoDb.push(states.name);
        })
  
        if (statesGeoDb.includes("*") || statesGeoDb.includes(stateNameDb)) {
          return partner
        }
      }
  
      if(cityNameDb){
      let citiesGeoDb = []
      partner.geo?.cities.filter(cities=>{
         citiesGeoDb.push(cities.name);
        })
        if (citiesGeoDb.includes("*") || citiesGeoDb.includes(cityNameDb)) {
          return partner
        }
      }
  
    });


    
    let geoName = stateNameDb ? stateNameDb : cityNameDb ? cityNameDb : null;
    
    if(geoName) return await routeGeo(hasPartner,arrRoute,category, countries, geoName)
  }
   
    // }

    // // se a rota encontrar uma cidade
    // states = country.states.filter(state => 1 === 1);

    // let cityName = null
    // collection?.filter(partner => {
    //   partner.info.address.find(address => {
    //     if(address.label === 'default'){
    //       if(formatStrToUrl(address.city) === arrRoute[2]){
    //         cityName = address.city
    //    }
    //     }
    //   });
    // });

    // let cityName = null
    // for (const state of states) {
    //   for (const city of state.cities) {
    //     if (stateName === formatStrToNoDash(city)) {
    //       cityName = city ;
    //       break;
    //     }
    //   }
    //   if (cityName) break;
    // }

  //   if(cityName) {

  //     categories.title = `${categories.title}s em ${cityName}`;
  //     const geo = await Geo.findOne({"countries.name": "brasil"});
  //     let countries;
  //     if (geo) {
  //         // Encontrou o documento, agora vamos filtrar o array countries
  //         countries = geo.countries.find(country => country.name.toLowerCase() === "brasil");
  //       }
       
  // return {
  //   type: 'product-geo',
  //   categories: categories && JSON.parse(JSON.stringify(categories)),
  //       page: JSON.parse(JSON.stringify(page)),
  //       arrRoute:JSON.parse(JSON.stringify(arrRoute)),
  //       category:JSON.parse(JSON.stringify(category)),
  //       geo: geo && JSON.parse(JSON.stringify(countries)),
  //       partners: partners && JSON.parse(JSON.stringify(partners)),
  //       collection: collection && JSON.parse(JSON.stringify(collection)),
  //       // product:JSON.parse(JSON.stringify(product)),
  //       template: template && JSON.parse(JSON.stringify(template)),
  //       menus: menus && JSON.parse(JSON.stringify(menus)),
  //       products: products && JSON.parse(JSON.stringify(products)),
  // }



// rota inexistente
const  error = await Page.findOne({label:'error'}).lean();
if(error) return await routeError(error);


}

async function getDataPage(arrRoute, locale){
    try{

    // const route = await resolveRoute(arrRoute)
    await connectMongoDB(locale);

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
    // const product = await ProductsDb.findOne({label:route[1]}).lean();
    // if(product){
    //    const data = await routeProduct(product)
    //    return data;
    // }

    
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