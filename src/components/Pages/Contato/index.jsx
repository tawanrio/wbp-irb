/* eslint-disable @typescript-eslint/no-unused-vars */
// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import LogoContact from '@/components/LogoContact'
import Banner from '@/components/Banner/index'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Description from './components/Description'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menu } from '@/service/model/schemas/menuSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Address } from '@/service/model/schemas/addressSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'

// Context Api
import { useState } from 'react'
import ServiceAddress from '@/components/ServiceAddress'
import ContactForm from './Forms'
import TellButton from './components/TellButton'

export default function Contato({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [newDescription] = useState(content?.page.components.description)
  const [logoContact] = useState(content?.page.components.logoContact)
  const [arrButton] = useState(logoContact?.arrButton)

  console.log(arrButton)

  // const whatsappNumber = logoContact.button.whatsapp
  // const phoneNumber = logoContact.button.phone
  const address = content?.address.address.find(
    (address) => address.label === 'default',
  )
  const arrHeader = content?.template?.find((item) => item?.label === 'header')

  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )

  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )
  const newBanner = {
    colors: {
      bg: '#fff',
      text: '#fff',
      controllers: '#fff',
    },
    size: {
      height: 415,
    },
    carousel: [
      {
        title: '',
        description: '',
        textWidth: 100,
        url: '/images/pages/contact/banner-contact.png',
        alt: 'banner dois',
        position: 'start',
      },
    ],
  }

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
        banner={content.page.banners}
        style={true}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Banner banners={newBanner} page={content?.page} />
          <Description content={newDescription} />
          <TellButton buttons={arrButton} />
        </BackgroundImageFirst>
        {/* <Banner banners={banners} />
        <BreadCrumb />
        <LogoContact
          logo={logoContact?.logo}
          contentDescription={logoContact?.contentDescription}
          title={logoContact?.title}
          arrButton={arrButton}
        />
        <ServiceAddress products={content.categories} address={address} />
        <ContactForm /> */}
      </Templates>
    </>
  )
}
