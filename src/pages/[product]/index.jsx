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
import Filter from '@/components/Filter';


// Others
import { useEffect, useState } from 'react';
import { PageData } from '@/context/pageData';
import { useRouter } from 'next/router';

export default function Products({ products, produto }) {

  const route = useRouter()
  const pageUrl = route.asPath.replace('/','')


  const [product, setProduct] = useState(produto)

  useEffect(()=>{
    setProduct(getProductFromUrl(products, pageUrl))

  },[pageUrl,products, product])


  return (
  <>
    <Head>
       <title>{product?.metaTitle || product?.title}</title>
       <meta name="description" content={product?.metaDescription || product?.ContentDescription} />
     </Head>
     <Header/>
   <main>
    
    { (product) ? (
      <>
    <Banner banners={product?.banners}/>
    <BreadCrumb/>
    <Title title={product?.title}/>
    <ContentDescription content={product?.contentDescription}/>
    {/* <ProductModels products={products} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}
    <Filter select={product?.models}  title={'Título h2 - Modelos Produtos'}/>
    <Faq faq={product?.faq}/>
      </>
    ): (
      <>
      <ContentDescription content={['Ops!','Página não encontrada']}/>
      </>
    )
    }
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}


export const getServerSideProps = async (context) => {
  const res = await fetch('http://irb.webfoco.com/api/products',{
  // const res = await fetch('http://localhost:3000/api/products',{
    method: 'GET'
  });
  const data = await res.json()
  
  const products = data.products

  const url = context.resolvedUrl

  const produto = getProductFromUrl(products, url) || null


  return {props :{
    products,
    produto
  }
}
}

 //  FUNÇÃO UTIL
 function getProductFromUrl(products, pageUrl) {
  const product = products?.collection.filter((item) => {
    let produto = formatString(item.title) === formatString(pageUrl)
    return produto
  } )
  return product[0]
}

const formatString = (string) =>{
  let formatedString = string && string.toLowerCase().trim().replace('/', '').replaceAll(' ','-')
  console.log();
return formatedString
}
// fim FUNÇÃO UTIL