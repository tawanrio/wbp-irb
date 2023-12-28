import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import Head from 'next/head'
import Header from '../layouts/irb/Header'
import Footer from '../layouts/irb/Footer'
import Copyright from '@/layouts/irb/Copyright'
import Banner from '@/components/Banner'

import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Home() {
  const { dataRota, home } = useContext(PageData);
    const banners = home.banners

  return (
    <>
      <Head>
        <title>IRB Automotive</title>
        <meta name="description" content="IRB Automotive" />
      </Head>
        <Header/>
      <main >
        <Banner banners={banners}/>
      </main>
         <Footer/>
        <Copyright/> 
    </>
  )
}
