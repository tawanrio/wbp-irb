import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import Head from 'next/head'
import Header from '../layouts/irb/Header'
import Footer from '../layouts/irb/Footer'
import Copyright from '@/layouts/irb/Copyright'
import Banner from '@/components/Banner'

import Products from '@/components/Products';

import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Home({products}) {
  const { _home } = useContext(PageData);

  
    const [banners] = useState(_home.banners)

  return (
    <>
      <Head>
        <title>IRB Automotive</title>
        <meta name="description" content="IRB Automotive" />
      </Head>
        <Header/>
      <main >
        <Banner banners={banners}/>
        <Products products={products}/>
      </main>
         <Footer/>
        <Copyright/> 
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://irb.webfoco.com/api/products',{
  // const res = await fetch('http://localhost:3000/api/products',{
    method: 'GET'
  });
  const data = await res.json()
  
  const products = data.products


  return {props :{
    products
  }
}
}