// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'

// Components
import ContentDescription from '@/components/ContentDescription'
import ContentImgDescription from '@/components/ContentImgDescription'
import Title from '@/components/Title'
import PartnersButton from '../Home/components/PartnersButton'
import SearchPartners from '@/components/SearchPartners'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AutocenterEMecanicas({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )
  const pageUrl = router.asPath.replace('/', '')

  const {
    banners,
    title,
    metaTitle,
    contentDescription: description,
    imgDescription,
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
      content?.page?.metaDescription[0]
        .replace('{{geoName}}', '')
        .replace(/\s+\. /g, '. '),
    )
  }, [content?.page?.metaDescription, router])

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
        <Header content={header} page={content?.page?.label} />
        <Banner banners={banners} />
        <Title title={title} />
        <ContentDescription content={description} />
        <SearchPartners
          geo={content?.geo}
          partnerType="mecanica"
          hiddenProductSearch
          title="Encontre uma mecânica"
          collections={content?.collection}
          products={content?.products}
        />
        <ContentImgDescription
          content={imgDescription}
          baseUrl={pageUrl + '/'}
        />
        <PartnersButton />
        <Footer content={footer} />
        <Copyright content={copyright} />
      </Templates>
    </>
  )
}
