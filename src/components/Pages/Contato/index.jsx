// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import LogoContact from '@/components/LogoContact'
import Banner from '@/components/Banner/index'
import ServiceAddress from '@/components/ServiceAddress'
import ContactForm from './Forms'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Contato({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const {
    metaTitle,
    metaDescription,
    banners,
    title,
    contentDescription: description,
    logoContact,
  } = content?.page || {}

  const [arrButton] = useState(logoContact?.arrButton)
  const address = content?.address.address.find(
    (address) => address.label === 'default',
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
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
        <ContactForm />
      </Templates>
    </>
  )
}
