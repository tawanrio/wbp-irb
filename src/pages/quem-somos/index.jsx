// SEO
import Head from 'next/head'

// Template / Layout
import Banner from "@/components/Banner";
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Title from '@/components/Title';

// Components
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Form from '@/components/Form';
import CompanyValues from '@/components/CompanyValues';
import Products from '@/components/Products';
import BreadCrumb from '@/components/BreadCrumb';


// Others
import { useContext, useState} from 'react';
import { PageData } from '@/context/pageData';



export default function QuemSomos({}) {
    const { _about, partners, form, products } = useContext(PageData);

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
        <Products products={products} />
        <Form form={form} />
        
    </main>
    <Footer/>
    <Copyright/>
    </>
  )
}