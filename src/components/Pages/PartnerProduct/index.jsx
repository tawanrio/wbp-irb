/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription'
import Title from '@/components/Title'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import ProductModels from '@/components/Products/ProductModels'
import Faq from '@/components/Faq'
import Filter from '@/components/Filter'
import FindPartners from '@/components/FindPartners'
import Partners from '@/components/Partners'
import Categories from '@/components/Categories'
import SearchPartners from '@/components/SearchPartners'
import Products from '@/components/Products'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menu } from '@/service/model/schemas/menuSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProductFromUrl, insertMenuInTemplate } from '@/utils/functions'

export default function Produto({ content }) {
  const route = useRouter()
  let pageUrl = route.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const [product, setProduct] = useState(content?.arrRoute)
  const [arrRoute, setArrRoute] = useState(content?.arrRoute)
  const [partnerDescription, setPartnerDescription] = useState(
    content?.category?.partner?.description,
  )
  const [metaTitle, setMetaTitle] = useState(
    content?.category?.partner?.metaTitle,
  )
  const [metaKeywords] = useState(content?.category?.metaKeywords)

  switch (arrRoute[0]) {
    case 'distribuidoras':

    case 'mecanicas':
    case 'autopecas':
      break

    default:
      break
  }

  let partnerName
  if (content?.arrRoute[0] !== 'fabrica') {
    partnerName = content?.partners.types.find(
      (item) => item.label == content?.arrRoute[0],
    )
  } else {
    partnerName = { title: 'Fábricas' }
  }
  useEffect(() => {
    setProduct(content.categories)
    setMetaTitle(content?.category?.partner?.metaTitle)
    // const replacedText = replaceShortcodePartner(partnerDescription,partnerName.title)
    // partnerDescription && setPartnerDescription(replacedText)
  }, [pageUrl])

  const replaceShortcodeProduct = (text, product) => {
    const shortcode = '{{product}}'
    const hasShortcode = text.includes(shortcode)
    if (hasShortcode) {
      return text.replace(shortcode, product)
    }
    return text
  }

  // (product.partner?.description) && (product.partner.description[0] = replaceShortcodeProduct(product?.partner?.description[0], `${content?.arrRoute[1]}s` ));

  // console.log(partnerName.title);
  // (content?.category.partner.description) && (content?.category?.partner.description[0] = replaceShortcodePartner( content?.category.partner.description[0] , `das nossas ${partnerName?.title}`));

  // content?.category?.partner?.description = ['teste'];

  // content?.category.partner.description[0] = replaceShortcodePartner(content?.category.partner.description[0] , `das nossas ${partnerName?.title}`);

  return (
    <>
      <Head>
        <title>{metaTitle || content?.category?.title}</title>
        <meta
          name="description"
          content={
            content?.category?.metaDescription ||
            content?.category?.contentDescription
          }
        />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={content?.category.banners} />
        <BreadCrumb />
        <Title title={content?.category.title} />
        <ContentDescription content={partnerDescription} />
        {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}
        {/* <Filter select={product?.models}  title={'Modelos de Produtos'}/> */}
        {/* <FindPartners title={content?.partners?.title} product={product} partners={content?.partners?.types}  colors={content?.partners?.colors} hiddenTitle /> */}
        <SearchPartners
          geo={content?.geo}
          title={`Encontre um(a) ${partnerName.title}`}
          arrRoute={content?.arrRoute}
          collections={content?.collection}
          products={content?.products}
          hiddenProductSearch
        />
        {/* <Faq faq={product?.faq}/> */}
        {/* <Products products={content?.products} colors={content?.page?.colors.products} title /> */}
        <Categories
          baseUrl={`/${content?.arrRoute[0]}/`}
          categories={content?.categories}
          colors={content?.page?.colors.products}
          title
        />

        {/* <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`/${content?.arrRoute[0]}/`} title /> */}
        <Partners
          title={'Nossos parceiros'}
          partners={content?.partners?.types}
          colors={content?.partners?.colors}
        />
      </Templates>
    </>
  )
}
