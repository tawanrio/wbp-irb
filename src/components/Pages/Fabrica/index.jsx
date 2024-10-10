// Template / Layout
import Templates from '@/components/Templates'

// Components
import ContentDescription from './components/ContentDescription'
import { CompanyValuesNew } from './components/CompanyValuesNew'
import { CarouselEvent } from './components/CarouselEvents'
import { Infos } from './components/Infos'
import { Gallery } from './components/Gallery'
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

  const { template, page, menus } = content || {}
  const {
    title,
    contentDescriptionRedesign: description,
    metaTitle,
    metaDescription,
    metaKeywords,
    banners,
    backgroundImages,
    label,
    components: { video, info, companyValues, events, descriptions },
  } = page || {}

  const arrHeader = template.find((item) => item.label === 'header')
  const header = arrHeader.items.find((item) => item.label === 'redesign-home')
  const footer = template.find((item) => item.label === 'footer')
  const copyright = template.find((item) => item.label === 'copyright')

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
        template={template}
        page={page}
        menus={menus}
        banner={banners}
        style={true}
      >
        <BackgroundImageFirst backgrounds={backgroundImages}>
          <Header content={header} page={label} />
          <Infos info={info} video={video} />
          <Gallery />
          <CompanyValuesNew content={companyValues} />
          <ContentDescription
            content={descriptions}
            className="mt-16 pb-10 sm:pb-20"
          />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={backgroundImages}>
          <CarouselEvent events={events} />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
