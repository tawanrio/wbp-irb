// SEO
import Head from 'next/head'

// Template / Layout
import Header from "@/layouts/irb/Header";
import Banner from "@/components/Banner";
import Footer from "@/layouts/irb/Footer";
import Title from '@/components/Title';
import Copyright from '@/layouts/irb/Copyright';

// Components
import BreadCrumb from '@/components/BreadCrumb';

// Context Api
import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Contato() {
  const { contact, products } = useContext(PageData);


  const [banners] = useState(contact.banners)
  const [title] = useState(contact.title)
  const [metaTitle] = useState(contact.metaTitle)
  const [metaDescription] = useState(contact.metaDescription)

   
  return (
    <>
    <Head>
       <title>{metaTitle}</title>
       <meta name="description" content={metaDescription} />
      
     </Head>
   <Header/>
   <main>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}