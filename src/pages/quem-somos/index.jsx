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


import { useContext } from 'react';
import { PageData } from '@/context/pageData';


export default function QuemSomos() {
    const { about, partners, products, contact, distributors } = useContext(PageData);

   

    const banners = about.banners
    const title = about.title
    const cardsValues = about.companyValues
    const description = about.contentDescription

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