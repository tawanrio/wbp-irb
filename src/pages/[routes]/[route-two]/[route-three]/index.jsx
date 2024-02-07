import React from 'react'
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { formatStrToUrl } from '@/utils/functions';

// Pages
import Contato from '@/components/Pages/Contato'
import QuemSomos from '@/components/Pages/QuemSomos'
import Fabrica from '@/components/Pages/Fabrica'
import Distribuidoras from '@/components/Pages/Distribuidoras'
import Autopecas from '@/components/Pages/Autopecas'
import AutocenterEMecanicas from '@/components/Pages/Mecanicas'
import Parceiro from '@/components/Pages/Parceiro'
import Produtos from '@/components/Pages/Produtos'
import ProdutoGeo from '@/components/Pages/ProdutoGeo'
import Error from '@/components/Pages/Error'

// Schema
import Page from '@/service/model/schemas/pageSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Address} from '@/service/model/schemas/addressSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Geo} from '@/service/model/schemas/geoSchema'
import {Collection} from '@/service/model/schemas/collectionsSchema'

// util
import {formatStrToNoDash} from '@/utils/functions'

export default function index({content}) {
  // const page = content.page.label;
  console.log(content);
  return (
    <>
    {content?.type === 'product' && (
      <>
        <ProdutoGeo content={content}/>

      </>
      )}
 {(content?.type === 'distribuidoras' || content?.type === 'autopecas' || content?.type === 'autocenter-e-mecanicas') && (
   <>
        <Parceiro content={content}/>
      </>
      )}

      {content?.type === 'error' && (
        <>
          <Error content={content}/>
   
        </>
        )}
      
    </>
  )
}

const resolveRoute = async (resolvedUrl) =>{
  const splittedUrl = resolvedUrl.split('/');
  splittedUrl.shift();
  // console.log(splittedUrl);
  return splittedUrl;
}


const singlePartner = async (route,collection)=>{

  let page = await Page.findOne({label:'contato'}).lean();
  if(page){
    console.log('page');
    
    const address = await Address.findOne({label:"info"})
    const products = await ProductsDb.find().lean().limit(9);
    const partners = await Categories.findOne({label:"partners"}).lean();
    const template = await Template.find();
    const menu = await Menu.findOne({label:"menu"}).lean();
    
  
    return {
      type: route[0],
      page: JSON.parse(JSON.stringify(page)),
      address: address && JSON.parse(JSON.stringify(address)),
      products: products && JSON.parse(JSON.stringify(products)),
      template: template && JSON.parse(JSON.stringify(template)),
      menu: menu && JSON.parse(JSON.stringify(menu)),
      partners: partners && JSON.parse(JSON.stringify(partners)),
      collection: collection && JSON.parse(JSON.stringify(collection)),
    }
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
  const partner = formatStrToNoDash(arrRoute[1]);

  const collection = await Collection.findOne({
    label: { $regex: new RegExp(arrRoute[0], 'i') },
    name: { $regex: new RegExp(partner, 'i') }
  }).lean();

  // se existir um parceiro
if(collection){
    console.log('é um parceiro');
  const partner = await singlePartner(arrRoute,collection)
  return partner
}

// se existir um produto
if(arrRoute[0] !== 'mecanicas'){
// const product = await ProductsDb.findOne({label:arrRoute[1]}).lean();
const category = await CategoriesProducts.findOne({label:arrRoute[1]}).lean();
if(category) return await singleProduct(category,arrRoute)
}


// rota inexistente
const  error = await Page.findOne({label:'error'}).lean();
if(error) return await routeError(error);


}

const singleProduct = async (category,arrRoute) =>{
  
  const partner = formatStrToNoDash(arrRoute[1]);
  const stateName = formatStrToNoDash(arrRoute[2]);
  const page = await Page.findOne({label:"produtos"}).lean();
  const products = await ProductsDb.find().lean();
  const template = await Template.find();
  const categories = await CategoriesProducts.find().lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const partners = await Categories.findOne({label:"partners"}).lean();
    
  const geoDocument = await Geo.findOne().lean();
  const country = geoDocument.countries.find(country => country.name === 'brasil');
  const collection = await Collection.find({label:arrRoute[0]}).lean();
  
  // const collection = await Collection.findOne({
  //   label: { $regex: new RegExp(route[0], 'i') },
  //   name: { $regex: new RegExp(partner, 'i') }
  // }).lean();
    

  // se a rota encontrar um estado
  let states = country.states.filter((state) => {
      const formattedName = formatStrToNoDash(state.name);
      return formattedName === stateName;
    })[0];

    if(states){
      categories.title = `${categories.title}s em ${states.name}`;
      return {
        type: 'product',
        category:JSON.parse(JSON.stringify(category)),
        categories: categories && JSON.parse(JSON.stringify(categories)),
        page: JSON.parse(JSON.stringify(page)),
        arrRoute:JSON.parse(JSON.stringify(arrRoute)),
        template: template && JSON.parse(JSON.stringify(template)),
        collection: collection && JSON.parse(JSON.stringify(collection)),
        menu: menu && JSON.parse(JSON.stringify(menu)),
        partners: partners && JSON.parse(JSON.stringify(partners)),
        products: products && JSON.parse(JSON.stringify(products)),
      }
    }


    // se a rota encontrar uma cidade
    states = country.states.filter(state => 1 === 1);

    let cityName = null
    collection?.filter(partner => {
      partner.info.address.find(address => {
        if(address.label === 'default'){
          if(formatStrToUrl(address.city) === arrRoute[2]){
            cityName = address.city
       }
        }
      });
    });

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

    if(cityName) {

      categories.title = `${categories.title}s em ${cityName}`;
  return {
    type: 'product',
    categories: categories && JSON.parse(JSON.stringify(categories)),
        page: JSON.parse(JSON.stringify(page)),
        arrRoute:JSON.parse(JSON.stringify(arrRoute)),
        category:JSON.parse(JSON.stringify(category)),
        partners: partners && JSON.parse(JSON.stringify(partners)),
        collection: collection && JSON.parse(JSON.stringify(collection)),
        // product:JSON.parse(JSON.stringify(product)),
        template: template && JSON.parse(JSON.stringify(template)),
        menu: menu && JSON.parse(JSON.stringify(menu)),
        products: products && JSON.parse(JSON.stringify(products)),
  }
}


// rota inexistente
const  error = await Page.findOne({label:'error'}).lean();
if(error) return await routeError(error);


}

async function getDataPage(arrRoute){
    try{

    // const route = await resolveRoute(arrRoute)
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
    // const product = await ProductsDb.findOne({label:route[1]}).lean();
    // if(product){
    //    const data = await singleProduct(product)
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

export const getServerSideProps  = async (context) => {
  try {
    const arrRoute = context.resolvedUrl.replace('/', '').split('/');
   
    const content = await getDataPage(arrRoute);

    return {
      props: {
        content
      }
    };
  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        content: null
      },
    };
  }
}
