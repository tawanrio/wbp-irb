// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import ContentImgDescription from '@/components/ContentImgDescription'
import Title from '@/components/Title'
import PartnersButton from '../Home/components/PartnersButton'
import SearchPartners from '@/components/SearchPartners'
import CategoryGrid from '@/components/CategoryGrid'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Autoparts({ content }) {
  const router = useRouter()
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
  const pageUrl = router.asPath.replace('/', '')

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
        <CategoryGrid
          categories={content?.categories}
          baseUrl={pageUrl + '/'}
        />
        <PartnersButton />
      </Templates>
    </>
  )
}
