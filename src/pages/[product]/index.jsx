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


  const [product] = useState(getProductFromUrl(products, pageUrl))
  

  const [banners] = useState(product?.banners)
  const [title] = useState(product?.title)
  const [description] = useState(product?.contentDescription)
  const [metaTitle] = useState(product?.metaTitle)
  const [metaDescription] = useState(product?.metaDescription)
  const [models] = useState(product?.models)
  const [faq] = useState(product?.faq)


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

  return (
  <>
    <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
   <main>
    {(product) && (
      <>
    <Banner banners={banners}/>
    <BreadCrumb/>
    <Title title={title}/>
    <ContentDescription content={description}/>
    <ProductModels products={models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/>
    <Faq faq={faq}/>
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
  // const res = await fetch('http://localhost:3000/api/products',{
    method: 'GET'
  });
  const data = await res.json()
  
  const products = data.products.collection
  


  return {props :{
    products
  }
}
}