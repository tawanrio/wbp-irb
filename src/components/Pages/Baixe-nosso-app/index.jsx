// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import { Subtitle } from './components/Subtitle'
import { Catalog } from '@/components/Catalog'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function BaixeNossoApp({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const { template, page, menus } = content || {}
  const {
    metaTitle,
    metaDescription,
    title,
    contentDescription: description,
    components: { catalogTitle, catalogDescription },
    backgroundImages,
    label,
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates template={template} page={page} menus={menus}>
        <BackgroundImageFirst backgrounds={backgroundImages}>
          <Header content={header} page={label} />
          <Title title={catalogTitle.first} />
          <Subtitle subtitle={catalogTitle.last} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={backgroundImages}>
          <Catalog content={catalogDescription} />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
