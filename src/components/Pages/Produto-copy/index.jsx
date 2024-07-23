/* eslint-disable react-hooks/exhaustive-deps */
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

  const [product, setProduct] = useState(content?.product)

  useEffect(() => {
    setProduct(getProductFromUrl(content.products, pageUrl))
  }, [pageUrl])

  return (
    <>
      <Head>
        <title>{product?.metaTitle || product?.title}</title>
        <meta
          name="description"
          content={product?.metaDescription || product?.contentDescription}
        />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={product?.banners} />
        <BreadCrumb />
        <Title title={product?.title} />
        <ContentDescription content={product?.contentDescription} />
        {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}
        <Filter select={product?.models} title={'Modelos de Produtos'} />
        {/* <FindPartners partners={content?.partners} /> */}
        <FindPartners
          title={content?.partners?.title}
          product={product}
          partners={content?.partners?.types}
          colors={content?.partners?.colors}
          hiddenTitle
        />
        <Faq faq={product?.faq} />
      </Templates>
    </>
  )
}
