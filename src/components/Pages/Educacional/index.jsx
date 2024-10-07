// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import { Subtitle } from './components/Subtitle'
import { Description } from './components/Description'
import { Banners } from './components/Banners'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Utilities } from '../Home/components/Utilities'

export default function Educacional({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const {
    title,
    metaTitle,
    metaDescription,
    contentDescription,
    description,
    metaKeywords,
    banners,
    engraxamente,
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
        <meta
          name="description"
          content={metaDescription || contentDescription}
        />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Title title={title} />
          <Description
            description={description}
            className="mt-6 text-white sm:mt-10"
          />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <Banners banners={banners} />
          <Subtitle subtitle={engraxamente.title} />
          <Description
            description={engraxamente.description}
            className="mt-5 text-[#982225]"
          />
          <Utilities className="pb-24 pt-0" />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
