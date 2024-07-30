/* eslint-disable array-callback-return */
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import {
  replaceShortcodePartner,
  formatStrToNoDash,
  updateMetatitleGeo,
} from '@/utils/functions'

// Schema
import Page from '@/service/model/schemas/pageSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'
import { Address } from '@/service/model/schemas/addressSchema'
import { Menus } from '@/service/model/schemas/menusSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories } from '@/service/model/schemas/categoriesSchema'
import { Collection } from '@/service/model/schemas/collectionsSchema'
import { Geo } from '@/service/model/schemas/geoSchema'
import { CategoriesProducts } from '@/service/model/schemas/categoriesProductsSchema'

const singlePartner = async (arrRoute, collection) => {
  const page = await Page.findOne({ label: 'contato' }).lean()
  if (page) {
    const address = await Address.findOne({ label: 'info' })
    const products = await ProductsDb.find().lean().limit(9)
    const categories = await CategoriesProducts.find().lean()
    const partners = await Categories.findOne({ label: 'partners' }).lean()
    const template = await Template.find()
    // const menu = await Menu.findOne({label:"menu"}).lean();
    const menus = await Menus.find().lean()

    return {
      type: arrRoute[0],
      page: JSON.parse(JSON.stringify(page)),
      address: address && JSON.parse(JSON.stringify(address)),
      categories: categories && JSON.parse(JSON.stringify(categories)),
      products: products && JSON.parse(JSON.stringify(products)),
      template: template && JSON.parse(JSON.stringify(template)),
      menus: menus && JSON.parse(JSON.stringify(menus)),
      partners: partners && JSON.parse(JSON.stringify(partners)),
      collection: collection && JSON.parse(JSON.stringify(collection)),
    }
  }
}

const routePartnerProduct = async (arrRoute, category) => {
  const page = await Page.findOne({ label: 'produtos' }).lean()
  const products = await ProductsDb.find().lean()
  const categories = await CategoriesProducts.find().lean()
  const template = await Template.find()
  // const collection = await Collection.find({"products.label": arrRoute[1]}).lean();
  const collection = await Collection.find({
    label: { $regex: new RegExp(arrRoute[0], 'i') },
    'products.label': arrRoute[1],
    enabled: true,
  }).lean()
  const partners = await Categories.findOne({ label: 'partners' }).lean()

  // const menu = await Menu.findOne({label:"menu"}).lean();
  const menus = await Menus.find().lean()
  const geoDb = await Geo.findOne({ 'countries.name': 'brasil' })
  const geo = geoDb.countries.find(
    (country) => country.name.toLowerCase() === 'brasil',
  )

  // Encontrou o documento, agora vamos filtrar o array countries

  let partnerName
  if (arrRoute[0] !== 'fabrica') {
    // eslint-disable-next-line eqeqeq
    partnerName = partners.types.find((item) => item.label == arrRoute[0])
  } else {
    partnerName = { title: 'Fábrica' }
  }

  let description = category.partner.description
  description = replaceShortcodePartner(
    description,
    `das nossas ${partnerName.title}`,
  )

  let metaTitle = category?.partner.metaTitle
  metaTitle = replaceShortcodePartner(metaTitle, partnerName.title)

  category.partner.metaTitle = category.partner.metaTitle
    ? metaTitle
    : category.partner.metaTitle
  category.partner.description = description

  return {
    type: 'product',
    arrRoute: JSON.parse(JSON.stringify(arrRoute)),
    partners: partners && JSON.parse(JSON.stringify(partners)),
    page: JSON.parse(JSON.stringify(page)),
    geo: geo && JSON.parse(JSON.stringify(geo)),
    category: category && JSON.parse(JSON.stringify(category)),
    categories: categories && JSON.parse(JSON.stringify(categories)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
    collection: collection && JSON.parse(JSON.stringify(collection)),
    products: products && JSON.parse(JSON.stringify(products)),
  }
}

const routeGeo = async (arrRoute, hasPartner, geo, geoName) => {
  // se a rota encontrar um estado
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routeGeoName = formatStrToNoDash(arrRoute[1])

  const page = await Page.findOne({ label: arrRoute[0] }).lean()
  const template = await Template.find()
  // const menu = await Menu.findOne({label:"menu"}).lean();
  // const products = await ProductsDb.find().lean();
  const partners = await Categories.findOne({ label: 'partners' }).lean()
  const categories = await CategoriesProducts.find().lean()
  const menus = await Menus.find().lean()

  page.title = `${page.title} em ${geoName}`

  page.metaTitle = updateMetatitleGeo(page.metaTitle, geoName)
  page.metaDescription[0] = updateMetatitleGeo(page.metaDescription[0], geoName)
  return {
    type: `geo-${arrRoute[0]}`,
    arrRoute: JSON.parse(JSON.stringify(arrRoute)),
    page: JSON.parse(JSON.stringify(page)),
    geo: geo && JSON.parse(JSON.stringify(geo)),
    geoName,
    partners: partners && JSON.parse(JSON.stringify(partners)),
    categories: categories && JSON.parse(JSON.stringify(categories)),
    template: template && JSON.parse(JSON.stringify(template)),
    collection: hasPartner && JSON.parse(JSON.stringify(hasPartner)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
    //  products: products && JSON.parse(JSON.stringify(products)),
  }
}

const routeError = async (error) => {
  const template = await Template.find()
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const menus = await Menus.find().lean()
  return {
    type: 'error',
    page: JSON.parse(JSON.stringify(error)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
  }
}

const routePartner = async (arrRoute) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routeOne = formatStrToNoDash(arrRoute[0])
  const routeTwo = formatStrToNoDash(arrRoute[1])

  if (arrRoute[0] !== 'mecanicas') {
    // rota categoria
    const categories = await CategoriesProducts.findOne({
      label: arrRoute[1],
    }).lean()
    // const product = await ProductsDb.findOne({label:arrRoute[1]}).lean();
    if (categories) return await routePartnerProduct(arrRoute, categories)
  }

  // rota parceiro

  const collection = await Collection.findOne({
    label: { $regex: new RegExp(arrRoute[0], 'i') },
    tradingName: { $regex: new RegExp(`^${routeTwo}$`, 'i') },
    enabled: true,
  }).lean()

  console.log(collection)

  if (collection) return await singlePartner(arrRoute, collection)

  // rota geo

  const routeGeoName = formatStrToNoDash(arrRoute[1])

  // const partners = (arrRoute[0] === 'fabrica')
  // ? await Collection.find().lean()
  // : await Collection.find({label: arrRoute[0]}).lean();
  const partners = await Collection.find({
    label: arrRoute[0],
    enabled: true,
  }).lean()

  let stateName = null
  let cityName = null
  const geoDb = await Geo.findOne({ 'countries.name': 'brasil' })
  let countries
  if (geoDb) {
    // Encontrou o documento, agora vamos filtrar o array countries
    countries = geoDb.countries.find(
      (country) => country.name.toLowerCase() === 'brasil',
    )
    countries?.states.find((state) => {
      if (stateName || cityName) return
      if (formatStrToNoDash(state.name) === routeGeoName) {
        stateName = state.name
      }
      if (!stateName) {
        state.cities.find((city) => {
          if (formatStrToNoDash(city) === routeGeoName) {
            cityName = city
          }
        })
      }
    })

    const hasPartner = partners.filter((partner) => {
      if (partner) {
        const statesGeoDb = []
        partner.geo?.states.filter((states) => {
          statesGeoDb.push(states.name)
        })

        if (statesGeoDb.includes('*') || statesGeoDb.includes(stateName)) {
          return partner
        }
      }

      if (cityName) {
        const citiesGeoDb = []
        partner.geo?.cities.filter((cities) => {
          citiesGeoDb.push(cities.name)
        })
        if (citiesGeoDb.includes('*') || citiesGeoDb.includes(cityName)) {
          return partner
        }
      }
    })

    // console.log(hasPartner);

    const geoName = stateName || cityName || null
    if (geoName) {
      if (hasPartner.length > 0)
        return await routeGeo(arrRoute, hasPartner, countries, geoName)
    }
  }

  // name: { $regex: new RegExp(routeTwo, 'i') }

  // rota inexistente
  const error = await Page.findOne({ label: 'error' }).lean()
  if (error) return await routeError(error)
}

const singleProduct = async (product, arrRoute) => {
  const page = await Page.findOne({ label: 'produtos' }).lean()
  const products = await ProductsDb.find().lean()
  const partners = await Categories.findOne({ label: 'partners' }).lean()
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find()
  const menus = await Menus.find().lean()

  return {
    type: 'singleProduct',
    product: JSON.parse(JSON.stringify(product)),
    page: JSON.parse(JSON.stringify(page)),
    partners: partners && JSON.parse(JSON.stringify(partners)),
    template: template && JSON.parse(JSON.stringify(template)),
    menus: menus && JSON.parse(JSON.stringify(menus)),
    products: products && JSON.parse(JSON.stringify(products)),
    arrRoute: JSON.parse(JSON.stringify(arrRoute)),
  }
}

const getDataPage = async (arrRoute, locale) => {
  try {
    await connectMongoDB(locale)

    // se for a rota for distribuidor/ autopeça/ autocenter
    if (
      arrRoute[0] === 'distribuidoras' ||
      arrRoute[0] === 'autopecas' ||
      arrRoute[0] === 'fabrica' ||
      arrRoute[0] === 'mecanicas'
    ) {
      return await routePartner(arrRoute)
    }

    // se a rota for um produto
    // categoria
    //  const category = await CategoriesProducts.findOne({label:route}).lean();
    const product = await ProductsDb.findOne({
      label: arrRoute[1],
      category: arrRoute[0],
    }).lean()
    if (product) return await singleProduct(product, arrRoute)

    // rota inexistente
    const error = await Page.findOne({ label: 'error' }).lean()
    if (error) return await routeError(error)

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
  } finally {
    disconnectMongoDB()
  }
}

export { getDataPage }
