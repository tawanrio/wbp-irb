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
import Products from '@/components/Products';
import Faq from '@/components/Faq';

// Context Api
import { useContext } from 'react';
import { PageData } from '@/context/pageData';

export default function Fabrica() {
  const { factory, products } = useContext(PageData);

  const banners = factory.banners
  const title = factory.title
  const description = factory.description
  const imgDescription = factory.imgDescription
  const faq = factory.faq

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
       <Products products={products}/>
       <ContentImgDescription content={imgDescription}/>
       <Faq faq={faq}/>
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}