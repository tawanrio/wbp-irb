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

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SearchPartners from '@/components/SearchPartners'

export default function Autoparts({ content }) {
  const router = useRouter()
  const pageUrl = router.asPath.replace('/', '')
  const [fullUrl, setFullUrl] = useState('')

  const {
    banners,
    title,
    metaTitle,
    metaDescription,
    contentDescription: description,
    imgDescription,
    metaKeywords,
  } = content?.page

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
        <SearchPartners
          geo={content?.geo}
          partnerType="autopeça"
          hiddenProductSearch
          title="Encontre uma autopeça"
          collections={content?.collection}
          products={content?.products}
        />
        <ContentImgDescription content={imgDescription} />
        <Categories
          baseUrl={`${pageUrl}/`}
          categories={content?.categories}
          colors={content?.page?.colors.products}
          title
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
