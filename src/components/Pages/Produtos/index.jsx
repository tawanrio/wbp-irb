// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import { Subtitle } from './components/Subtitle'
import { ListProducts } from './components/ListProducts'
import { Info } from '@/components/Info'
import { Utilities } from '../Home/components/Utilities'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Produtos({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const {
    title,
    metaTitle,
    metaDescription,
    contentDescription: description,
    metaKeywords,
  } = content?.page

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
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Title title={content?.page?.mainTitles?.title} />
          <Subtitle subtitle={content?.page?.mainTitles?.subtitle} />
          <ListProducts products={content?.categories} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <Utilities className="pb-20" />
          {content?.page?.info?.length > 0 && (
            <Info
              info={content.page.info}
              classNameTitle="w-full max-w-[22rem]"
              classNameContainer="pb-24"
            />
          )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
