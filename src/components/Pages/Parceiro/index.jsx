// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import Banner from '@/components/Banner/index'
import { Telephones } from './components/Telephones'
import { Maps } from '@/components/Maps'
import { ListProducts } from '../Produtos/components/ListProducts'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { CONTACT_BANNER } from '@/utils/constants'
import { getGoogleMaps } from '@/utils/functions'

export default function Parceiro({ content }) {
  const route = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const { template, page, collection, menus, categories } = content || {}
  const {
    metaTitle,
    metaDescription,
    address,
    companyName,
    info: { phone },
  } = collection || {}
  const { title, label, backgroundImages } = page || {}

  const arrHeader = template.find((item) => item.label === 'header')
  const header = arrHeader.items.find((item) => item.label === 'redesign-home')
  const footer = template.find((item) => item.label === 'footer')
  const copyright = template.find((item) => item.label === 'copyright')

  const addressFormatted = `${address[0].street}, ${address[0].number} - ${address[0].city} - ${address[0].state} - ${address[0].country}`
  const googleMapsUrl = getGoogleMaps(addressFormatted)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [route])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates template={template} page={page} menus={menus}>
        <BackgroundImageFirst backgrounds={backgroundImages}>
          <Header content={header} page={label} />
          <Banner banners={CONTACT_BANNER} page={page} />
          <Title title={companyName} />
          <Telephones phones={phone} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={backgroundImages}>
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-24">
            <Maps googleMapsUrl={googleMapsUrl} collections={[collection]} />
          </div>
          <ListProducts
            products={categories}
            className="text-black"
            classNameLink="border-[#0000004D]"
          />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
