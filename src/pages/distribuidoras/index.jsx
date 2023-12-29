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

export default function Distribuidoras() {
  const { _distributors, products } = useContext(PageData);


  const [banners] = useState(_distributors.banners)
  const [title] = useState(_distributors.title)
  const [metaTitle] = useState(_distributors.metaTitle)
  const [metaDescription] = useState(_distributors.metaDescription)
  const [description] = useState(_distributors.contentDescription)
  const [imgDescription] = useState(_distributors.imgDescription)
  const [faq] = useState(_distributors.faq)

   
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