/* eslint-disable @typescript-eslint/no-unused-vars */
// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription'
import Title from '@/components/Title'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import SearchPartners from '@/components/SearchPartners'
import PartnersButton from '../Home/components/PartnersButton'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'
import CategoryGrid from '@/components/CategoryGrid'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Produto({ content }) {
  const router = useRouter()
  let pageUrl = router.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const [fullUrl, setFullUrl] = useState('')
  const [product, setProduct] = useState(content?.arrRoute)
  const [arrRoute, setArrRoute] = useState(content?.arrRoute)
  const [partnerDescription, setPartnerDescription] = useState(
    content?.category?.partner?.description,
  )
  const [metaTitle, setMetaTitle] = useState(
    content?.category?.partner?.metaTitle,
  )
  const [metaKeywords] = useState(content?.category?.metaKeywords)
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  switch (arrRoute[0]) {
    case 'distribuidoras':
      break

    case 'mecanicas':
      break

    case 'autopecas':
      break

    default:
      break
  }

  let partnerName
  if (content?.arrRoute[0] !== 'fabrica') {
    partnerName = content?.partners.types.find(
      (item) => item.label === content?.arrRoute[0],
    )
  } else {
    partnerName = { title: 'Fábricas' }
  }

  useEffect(() => {
    setProduct(content.categories)
    setMetaTitle(content?.category?.partner?.metaTitle)
    setMetaDescription(
      content?.category?.metaDescription[0]
        ?.replace('{{geoName}}', '')
        .replace(/\s+\. /g, '. '),
    )
  }, [
    content.categories,
    content?.category?.metaDescription,
    content?.category?.partner?.metaTitle,
    pageUrl,
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
        <title>{metaTitle || content?.category?.title}</title>
        <meta
          name="description"
          content={metaDescription || content?.category?.contentDescription}
        />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={content?.category.banners} />
        <BreadCrumb />
        <Title title={content?.category?.partner.title} />
        <ContentDescription content={partnerDescription} />
        <SearchPartners
          geo={content?.geo}
          title={`Encontre um(a) ${partnerName.title}`}
          arrRoute={content?.arrRoute}
          collections={content?.collection}
          products={content?.products}
          hiddenProductSearch
        />
        <CategoryGrid categories={content?.categories} />
        <PartnersButton />
        {content?.category?.partner?.info?.length > 0 && (
          <Info info={content.category.partner.info} />
        )}
        {content?.category?.partner?.faq &&
          Object.entries(content.category.partner.faq).length > 0 && (
            <CommonQuestions faq={content.category.partner.faq} />
          )}
      </Templates>
    </>
  )
}
