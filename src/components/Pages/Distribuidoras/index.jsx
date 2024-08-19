// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import ContentImgDescription from '@/components/ContentImgDescription'
import Title from '@/components/Title'
import SearchPartners from '@/components/SearchPartners'
import PartnersButton from '../Home/components/PartnersButton'
import CategoryGrid from '@/components/CategoryGrid'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Distribuidoras({ content }) {
  const router = useRouter()
  const pageUrl = router.asPath.replace('/', '')
  const [fullUrl, setFullUrl] = useState('')
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  const {
    banners,
    title,
    metaTitle,
    contentDescription: description,
    imgDescription,
    metaKeywords,
  } = content?.page

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
        <BreadCrumb />
        <Title title={title} />
        <ContentDescription content={description} />
        <SearchPartners
          partnerType="distribuidor"
          title="Encontre um distribuidor"
          collections={content?.collection}
          hiddenProductSearch
          products={content?.products}
          geo={content?.geo}
        />
        <ContentImgDescription content={imgDescription} />
        <CategoryGrid
          categories={content?.categories}
          baseUrl={pageUrl + '/'}
        />
        <PartnersButton />
        {content?.page?.info?.length > 0 && <Info info={content.page.info} />}
        {content?.page?.faq && Object.entries(content.page.faq).length > 0 && (
          <CommonQuestions faq={content.page.faq} />
        )}
      </Templates>
    </>
  )
}
