/* eslint-disable @typescript-eslint/no-unused-vars */
// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import LogoContact from '@/components/LogoContact'
import Banner from '@/components/Banner/index'

// Database // Schema
import Address from '@/components/Address'

// Context Api
import { useEffect, useState } from 'react'
// import ServiceAddress from '@/components/ServiceAddress'
import ContactForm from './Forms'
import CategoryGrid from '@/components/CategoryGrid'

import { sortByKey } from '@/utils/functions'

export default function Contato({ content }) {
  const [metaTitle, setMetaTitle] = useState(content?.page.metaTitle)
  const [metaDescription, setMetaDescription] = useState(
    content?.page.metaDescription,
  )
  const [banners, setBanners] = useState(content?.page.banners)
  const [title, setTitle] = useState(content?.page.title)
  const [categories, setCategories] = useState(
    sortByKey(content.categories, 'title'),
  )
  const [categoriesComponent, setCategoriesComponent] = useState(
    content?.page.components.categories,
  )
  const [formComponent, setFormComponent] = useState(
    content?.page.components.form,
  )
  const [componentAddress, setComponentAddress] = useState(
    content?.page.components?.address,
  )
  const [description, setDescription] = useState(
    content?.page.contentDescription,
  )
  const [logoContact, setLogoContact] = useState(
    content?.page.components.logoContact,
  )
  const [arrButton, setArrButton] = useState(logoContact?.arrButton)

  useEffect(() => {
    setMetaTitle(content?.page.metaTitle)
    setMetaDescription(content?.page.metaDescription)
    setBanners(content?.page.banners)
    setTitle(content?.page.title)
    setCategories(sortByKey(content.categories, 'title'))
    setCategoriesComponent(content?.page.components.categories)
    setFormComponent(content?.page.components.form)
    setComponentAddress(content?.page.components?.address)
    setDescription(content?.page.contentDescription)
    setLogoContact(content?.page.components.logoContact)
    setArrButton(content?.page.components.logoContact?.arrButton)
  }, [content])

  // const whatsappNumber = logoContact.button.whatsapp
  // const phoneNumber = logoContact.button.phone
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
        <Address address={address} title={componentAddress?.title} />
        <CategoryGrid
          categories={categories}
          title={categoriesComponent?.title}
        />
        <ContactForm
          categories={content.categories}
          title={formComponent.title}
        />
      </Templates>
    </>
  )
}
