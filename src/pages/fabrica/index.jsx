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
import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Fabrica() {
  const { _factory, products } = useContext(PageData);

  const [banners] = useState(_factory.banners)
  const [title] = useState(_factory.title)
  const [description] = useState(_factory.contentDescription)
  const [metaTitle] = useState(_factory.metaTitle)
  const [metaDescription] = useState(_factory.metaDescription)
  const [imgDescription] = useState(_factory.imgDescription)
  const [faq] = useState(_factory.faq)

  return (
    <>
    <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
   <Header/>
   <main >
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