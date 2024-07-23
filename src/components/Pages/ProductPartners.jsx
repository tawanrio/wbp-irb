/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Banner from '@/components/Banner/index'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import Faq from '@/components/Faq'
import ProductModels from '@/components/Products/ProductModels'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Products({ products, produto }) {
  const route = useRouter()
  const pageUrl = route.asPath

  const [product, setProduct] = useState(produto)

  useEffect(() => {
    setProduct(getProductFromUrl(products, pageUrl))
  }, [pageUrl, products, product])

  return (
    <>
      <Head>
        <title>{product?.metaTitle || product?.title}</title>
        <meta
          name="description"
          content={product?.metaDescription || product?.ContentDescription}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Header />
      <main>
        <Banner banners={product?.banners} />
      </main>
      <Footer />
      <Copyright />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch('http://irb.webfoco.com/api/products', {
    // const res = await fetch('http://localhost:3000/api/products',{
    method: 'GET',
  })
  const data = await res.json()

  const products = data.products

  const url = context.resolvedUrl

  const produto = getProductFromUrl(products, url) || null

  return {
    props: {
      products,
      produto,
    },
  }
}

//  FUNÇÃO UTIL
function getProductFromUrl(products, pageUrl) {
  const product = products?.collection.filter((item) => {
    const produto = formatString(item.title) === formatUrl(pageUrl)
    return produto
  })
  return product[0]
}

const formatString = (string) => {
  const formatedString =
    string && string.toLowerCase().trim().replace('/', '').replaceAll(' ', '-')
  return formatedString
}
const formatUrl = (string) => {
  const formatedString =
    string && string.toLowerCase().trim().slice(1).split('/')

  return formatedString[1]
}
// fim FUNÇÃO UTIL
