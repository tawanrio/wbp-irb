// Template / Layout
import Templates from '@/components/Templates'

// Components
import ContentDescription from './components/ContentDescription'
import { CompanyValuesNew } from './components/CompanyValuesNew'
import { CarouselEvent } from './components/CarouselEvents'
import { Infos } from './components/Infos'
// import { Gallery } from './components/Gallery'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Fabrica({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const {
    title,
    contentDescriptionRedesign: description,
    metaTitle,
    metaDescription,
    metaKeywords,
    events,
  } = content?.page || {}

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
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
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
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
          <Infos />
          {/* <Gallery /> */}
          <CompanyValuesNew />
          <ContentDescription
            content={description}
            className="mt-16 pb-10 sm:pb-20"
          />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <CarouselEvent events={events} />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
