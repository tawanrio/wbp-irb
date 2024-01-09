import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import Head from 'next/head'
import Header from '@/components/Templates/Header/HeaderHome'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import BannerHome from '@/components/Banner/BannerHome'

// Components
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Form from '@/components/Form';
import CompanyValues from '@/components/CompanyValues';
import Products from '@/components/Products';

import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Home() {
  const { _home, _about, products, partners, form  } = useContext(PageData);

  
    const [banners] = useState(_home.banners)
      const [metaTitle] = useState(_about?.metaTitle)
    const [metaDescription] = useState(_about?.metaDescription)
    const [title] = useState(_about?.title)
    const [cardsValues] = useState(_about?.companyValues)
    const [description] = useState(_about?.contentDescription)

  return (
    <>
      <Head>
        <title>IRB Automotive</title>
        <meta name="description" content="IRB Automotive" />
      </Head>
        <Header/>
      <main >
        <BannerHome banners={banners}/>
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
