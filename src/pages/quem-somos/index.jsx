import Head from 'next/head'
import Header from "@/layouts/irb/Header";
import Banner from "@/components/Banner";
import Footer from "@/layouts/irb/Footer";
import Title from '@/components/Title';
import Copyright from '@/layouts/irb/Copyright';
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import CompanyValues from '@/components/CompanyValues';
import Products from '@/components/Products';
import BreadCrumb from '@/components/BreadCrumb';


import { useContext, useState} from 'react';
import { PageData } from '@/context/pageData';


export default function QuemSomos({products}) {
    const { _about, partners, contact } = useContext(PageData);

    const [metaTitle] = useState(_about?.metaTitle)
    const [metaDescription] = useState(_about?.metaDescription)
    const [banners] = useState(_about?.banners)
    const [title] = useState(_about?.title)
    const [cardsValues] = useState(_about?.companyValues)
    const [description] = useState(_about?.contentDescription)


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
        <CompanyValues cards={cardsValues}/>
        <InsertVideo/>
        <ContentDescription content={description}/>
        <Partners title={partners.title} partners={partners.cards}  colors={partners.colors}/>
        <Products products={products}/>
        <Contact contact={contact} />
        
    </main>
    <Footer/>
    <Copyright/>
    </>
  )
}

export const getServerSideProps = async () => {
  // const res = await fetch('http://irb.webfoco.com/api/products',{
  const res = await fetch('http://localhost:3000/api/products',{
    method: 'GET'
  });
  const data = await res.json()
  
  const products = data.products

  return {props :{
    products
  }
}
}