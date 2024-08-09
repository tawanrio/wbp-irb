/* eslint-disable react-hooks/exhaustive-deps */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'

// Database // Schema
import Categories from '@/components/Categories'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import ContentImgDescription from '@/components/ContentImgDescription'
import Title from '@/components/Title'
import Partners from '@/components/Partners'
import SearchPartnersOne from '@/components/SearchPartnersOne'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Distribuidoras({ content }) {
  const router = useRouter()
  const pageUrl = router.asPath.replace('/', '')
  const [fullUrl, setFullUrl] = useState('')
  const [title, setTitle] = useState(content?.page.title)
  const [metaTitle, setMetaTitle] = useState(content?.page.metaTitle)
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  const {
    banners,
    contentDescription: description,
    imgDescription,
    metaKeywords,
  } = content?.page

  useEffect(() => {
    setTitle(content?.page.title)
    setMetaTitle(content?.page.metaTitle)
    setMetaDescription(content?.page.metaDescription)
  }, [content?.page.title, content?.page.metaTitle])

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
        <Banner banners={banners} />
        <BreadCrumb />
        <Title title={title} />
        <ContentDescription content={description} />

        <SearchPartnersOne
          geo={content?.geo}
          partnerType="distribuidor"
          arrRoute={content?.arrRoute}
          hiddenProductSearch
          title="Encontre um distribuidor"
          collections={content?.collection}
          products={content?.products}
        />

        <ContentImgDescription content={imgDescription} />
        <Categories
          categories={content?.categories}
          colors={content?.page?.colors.products}
          title
          baseUrlGeo={`/${pageUrl}/`}
        />
        <Partners
          title="Nossos parceiros"
          partners={content?.partners?.types}
          colors={content?.partners?.colors}
        />
      </Templates>
    </>
  )
}
