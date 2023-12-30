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