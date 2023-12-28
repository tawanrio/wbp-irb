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

// Context Api
import { useContext } from 'react';
import { PageData } from '@/context/pageData';

export default function paraseunegocio() {
  const { paraOSeuNegocio } = useContext(PageData);

  const banners = paraOSeuNegocio.banners
  const title = paraOSeuNegocio.title
  const description = paraOSeuNegocio.description
  const imgDescription = paraOSeuNegocio.imgDescription

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
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}