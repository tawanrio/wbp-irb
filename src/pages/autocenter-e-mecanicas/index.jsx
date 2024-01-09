// SEO
import Head from 'next/head'

// Template / Layout
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Banner from "@/components/Banner";
import Title from '@/components/Title';

// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import ContentImgDescription from '@/components/ContentImgDescription';
import ProductFaq from '@/components/ProductFaq';

// Others
import { useContext, useState} from 'react';
import { PageData } from '@/context/pageData';
import  Router  from 'next/router';

export default function Autocenter({products}) {
  const { _autocenters } = useContext(PageData);

  const pageUrl = Router.asPath.replace('/','')
  const [banners] = useState(_autocenters.banners)
  const [title] = useState(_autocenters.title)
  const [description] = useState(_autocenters.contentDescription)
  const [metaTitle] = useState(_autocenters.metaTitle)
  const [metaDescription] = useState(_autocenters.metaDescription)
  const [imgDescription] = useState(_autocenters.imgDescription)
  const [faq] = useState(_autocenters.faq)

   
  return (
    <>
    <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
   <Header/>
   <main>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       <ContentDescription content={description}/>
       <ContentImgDescription content={imgDescription}/>
       <ProductFaq products={products} faq={faq} baseUrl={`/${pageUrl}/`}/>
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://irb.webfoco.com/api/products',{
  // const res = await fetch('http://localhost:3000/api/products',{
    method: 'GET'
  });
  const data = await res.json()
  
  const products = data.products

  return {props :{
    products
  }
}
}