// SEO
import Head from 'next/head'

// Template / Layout
import Header from "@/layouts/irb/Header";
import Banner from "@/components/Banner";
import Footer from "@/layouts/irb/Footer";
import Title from '@/components/Title';
import Copyright from '@/layouts/irb/Copyright';

// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import Faq from '@/components/Faq';
import ProductModels from '@/components/Products/ProductModels';
import Error from '@/components/Error';


// Context Api
import { useContext, useEffect, useState } from 'react';
import { PageData } from '@/context/pageData';

// Others
import { useRouter } from 'next/router';

export default function Products({ products }) {

  const route = useRouter()

  const pageUrl = route.asPath.replace('/','')

  //  FUNÇÃO UTIL
  function getProductFromUrl(products, pageUrl){
    const product = products?.filter((item) => formatString(item.title) === formatString(pageUrl) )
   return product[0]
  }
  
  function formatString(string){
  let formatedString = string && string.toLowerCase().trim().replace('/', '').replaceAll(' ','-')
  return formatedString
  }
// fim FUNÇÃO UTIL
  


  const product = getProductFromUrl(products, pageUrl)

  
  const productName = product?.title[0].toUpperCase() + product?.title.slice(1)
  const title = `IRB Automotive - ${productName}`



  return (
  <>
    <Head>
       <title>{title}</title>
       <meta name="description" content={product?.metaDescription ? product?.metaDescription : product?.description} />
      
     </Head>
   <Header/>
   <main>
    {(product) && (
      <>
    <Banner banners={product?.banners}/>
    <BreadCrumb/>
    <Title title={product?.title}/>
    <ContentDescription content={product?.description}/>
    <ProductModels products={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/>
    <Faq faq={product?.faq}/>
      </>
    )
    }
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}


export const getServerSideProps = async ({ url }) => {
  const res = await fetch('http://irb.webfoco.com/api/products',{
    method: 'get'
  });
  const data = await res.json()
  
  const products = data.products.collection
  


  return {props :{
    products
  }
}
}