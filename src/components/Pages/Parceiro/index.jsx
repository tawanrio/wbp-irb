// Template / Layout
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import IrbContact from '@/components/IrbContact'
import Banner from '@/components/Banner/index'
import ServiceAddress from '@/components/ServiceAddress'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Contato({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const [partner] = useState(content?.collection)
  const [metaTitle] = useState(partner?.metaTitle)
  const [metaDescription] = useState(partner?.metaDescription)
  const [banners] = useState(partner?.banners)
  const [title] = useState(partner?.title)

  let whatsappNumber =
    partner.info.phone.find((number) => number.label === 'Whatsapp') || null
  let phoneNumber =
    partner.info.phone.find((number) => number.label === 'Telefone') || null
  const address = partner.info.address.find(
    (address) => address.label === 'default',
  )

  if (phoneNumber) {
    if (!whatsappNumber) {
      whatsappNumber = phoneNumber
    }
  }
  if (whatsappNumber) {
    if (!phoneNumber) {
      phoneNumber = whatsappNumber
    }
  }
  if (!whatsappNumber) whatsappNumber = '11994412805'
  if (!phoneNumber) phoneNumber = '11994412805'

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
        <meta name="description" content={metaDescription} />
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
        <IrbContact
          layout={partner}
          logo={partner.logo}
          contentDescription={partner.contentDescription}
          title={partner.tradingName}
          whatsapp={whatsappNumber}
          phone={phoneNumber}
        />
        <ServiceAddress products={content.categories} address={address} />
      </Templates>
    </>
  )
}
