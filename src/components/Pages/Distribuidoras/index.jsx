// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Description } from './components/Description'
import { Title } from './components/Title'
import SearchPartners from '@/components/SearchPartners'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Distribuidoras({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  const {
    banners,
    title,
    metaTitle,
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
    setMetaDescription(
      content?.page?.metaDescription[0].replace(
        '{{geoName}}',
        'IRB Automotive',
      ),
    )
  }, [content?.page?.metaDescription, fullUrl, router])

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
        banner={banners}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Title title={title} />
          <Description description={description} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <SearchPartners
            partnerType="distribuidor"
            title="Encontre um distribuidor"
            collections={content?.collection}
            hiddenProductSearch
            products={content?.products}
            geo={content?.geo}
          />
          {content?.page?.info?.length > 0 && <Info info={content.page.info} />}
          {content?.page?.faq &&
            Object.entries(content.page.faq).length > 0 && (
              <CommonQuestions faq={content.page.faq} />
            )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
