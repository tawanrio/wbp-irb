// SEO
import Head from 'next/head'

// Template / Layout
import Banner from "@/components/Banner";
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Title from '@/components/Title';

// Components
import BreadCrumb from '@/components/BreadCrumb';
import IrbContact from '@/components/IrbContact'

// Context Api
import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';
import ServiceAddress from '@/components/ServiceAddress';

export default function Contato() {
  const { _contact, products } = useContext(PageData);


  const [banners] = useState(_contact?.banners)
  const [title] = useState(_contact?.title)
  const [metaTitle] = useState(_contact?.metaTitle)
  const [metaDescription] = useState(_contact?.metaDescription)
  const [logoContact] = useState(_contact?.logoContact)

   
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
       <IrbContact data={logoContact} />
       <ServiceAddress products={products} address={_contact?.address}/>
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}