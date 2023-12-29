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
import ContentImgDescription from '@/components/ContentImgDescription';
import ProductFaq from '@/components/ProductFaq';

// Context Api
import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Autoparts({products}) {
  const { _autoparts } = useContext(PageData);


  const [banners] = useState(_autoparts.banners)
  const [title] = useState(_autoparts.title)
  const [description] = useState(_autoparts.contentDescription)
  const [metaTitle] = useState(_autoparts.metaTitle)
  const [metaDescription] = useState(_autoparts.metaDescription)
  const [imgDescription] = useState(_autoparts.imgDescription)
  const [faq] = useState(_autoparts.faq)

   
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
       <ProductFaq products={products} faq={faq}/>
       
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