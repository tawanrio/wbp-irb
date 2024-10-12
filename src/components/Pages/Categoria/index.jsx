// Template
import Templates from '@/components/Templates'

// Components
import { ContentProduct } from './components/ContentProduct'
import { Utilities } from '../Home/components/Utilities'
import { ListProduct } from './components/ListProduct'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Categoria({ content, locale }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [category, setCategory] = useState(content?.category)
  const [metaDescription, setMetaDescription] = useState(
    content?.category?.metaDescription,
  )
  const [utilities, setUutilities] = useState(
    content?.page?.components.utilities,
  )
  let pageUrl = router.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

  useEffect(() => {
    setCategory(content.category)
    setMetaDescription(
      content?.category?.metaDescription[0]
        .replace('{{geoName}}', '')
        .replace(/\s+\. /g, '. '),
    )
  }, [content.category, pageUrl])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [router])

  useEffect(() => {
    setUutilities(content?.page?.components.utilities)
  }, [locale, content])

  return (
    <>
      <Head>
        <title>{category?.metaTitle || category?.title}</title>
        <meta
          name="description"
          content={metaDescription || category?.contentDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
        banner={content?.category?.banners}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <ContentProduct
            category={category}
            technicalSheet={content?.page?.components.technicalSheet}
          />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          {content?.products.length > 0 && (
            <ListProduct
              products={content?.products.map((product) => ({
                ...product,
                label: `${content?.category?.label}/${product.label}`,
              }))}
            />
          )}
          <Utilities utilities={utilities} className="pb-20" />
          {content?.category?.info?.length > 0 && (
            <Info info={content.category.info} classNameContainer="pb-20" />
          )}
          {content?.category?.faq &&
            Object.entries(content.category.faq).length > 0 && (
              <CommonQuestions faq={content.category.faq} />
            )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
