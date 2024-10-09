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
import SearchPartners from '@/components/SearchPartners'
import { formatStrToUrl, getGoogleMaps } from '@/utils/functions'
import { Maps } from '@/components/Maps'
import { FormContact } from './components/Form/'

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
import Container from '@/components/Container'

export default function Contato({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [newDescription] = useState(content?.page.components.description)
  const [logoContact] = useState(content?.page.components.logoContact)
  const [arrButton] = useState(logoContact?.arrButton)
  const [collections] = useState([content?.collection])
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )

  console.log(content)

  // const whatsappNumber = logoContact.button.whatsapp
  // const phoneNumber = logoContact.button.phone
  const address = content?.address.address.find(
    (address) => address.label === 'default',
  )

  const googleMapsUrl = getGoogleMaps(false)
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
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          {/* <SearchPartners
          partnerType="distribuidor"
          collections={collections}
          hiddenProductSearch
          products={content?.products}
          geo={content?.geo}
        /> */}
          <Container className={'mt-5'}>
            <h2 className="m-0 mb-10 w-full rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-2xl font-normal uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)]">
              NOSSOS ENDEREÇOS
            </h2>
            <Maps googleMapsUrl={googleMapsUrl} collections={collections} />
            <FormContact inputs={formDefault} />
          </Container>
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
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
