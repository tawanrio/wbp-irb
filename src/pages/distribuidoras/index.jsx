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

export default function distribuidoras() {
  const { distributors, products } = useContext(PageData);

  const banners = distributors.banners
  const title = distributors.title
  const description = distributors.description
  const imgDescription = distributors.imgDescription
  const faq = distributors.faq

   
  return (
    <>
    <Head>
       <title>IRB Automotive - Quem Somos</title>
       <meta name="description" content="IRB Automotive" />
      
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