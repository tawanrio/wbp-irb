/* eslint-disable @typescript-eslint/no-unused-vars */
// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import LogoContact from '@/components/LogoContact'
import Banner from '@/components/Banner/index'
import Form from '@/components/Form'

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

export default function TrabalheConosco({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [logoContact] = useState(content?.page.logoContact)
  const [arrButton] = useState(logoContact?.arrButton)
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'trabalhe-conosco'),
  )
  const address = content?.address.address.find(
    (address) => address.label === 'default',
  )

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <LogoContact
          logo={logoContact?.logo}
          contentDescription={logoContact?.contentDescription}
          title={logoContact?.title}
          arrButton={arrButton}
        />
        <ServiceAddress products={content.categories} address={address} />
        <Form inputs={formDefault} colors={content?.form?.colors} />
      </Templates>
    </>
  )
}
