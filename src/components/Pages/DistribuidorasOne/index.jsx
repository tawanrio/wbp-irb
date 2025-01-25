// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Description } from './components/Description'
import { Title } from './components/Title'
import SearchPartnersOne from '@/components/SearchPartnersOne'
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
import { usePathname } from 'next/navigation'
import { capitalize } from '@/utils/functions'

export default function Distribuidoras({ content }) {
  const router = useRouter()
  const pathname = usePathname()
  const [fullUrl, setFullUrl] = useState('')
  const [title, setTitle] = useState(content?.page.title)
  const [metaTitle, setMetaTitle] = useState(content?.page.metaTitle)
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  const { contentDescription: description, metaKeywords } = content?.page

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

  useEffect(() => {
    setTitle(content?.page.title)
    setMetaTitle(content?.page.metaTitle)
    setMetaDescription(
      content?.page?.metaDescription[0].replace(
        '{{geoName}}',
        `em ${capitalize(pathname.split('/').pop())}`,
      ),
    )
  }, [
    content?.page.title,
    content?.page.metaTitle,
    content?.page?.metaDescription,
    fullUrl,
    pathname,
  ])

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
          <Title title={title} />
          <Description description={description} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <SearchPartnersOne
            geo={content?.geo}
            partnerType="distribuidor"
            arrRoute={content?.arrRoute}
            hiddenProductSearch
            title="Encontre um distribuidor"
            collections={content?.collection}
            products={content?.products}
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
